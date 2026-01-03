/**
 * Moteur de rendu Hiérarchique & Interactif (Version 542 Postes)
 * Restaure l'aspect "Organigramme" avec connecteurs et noeuds déroulables.
 */

// Global state for expansion
const COLLAPSED_NODES = new Set();

/**
 * Construit un arbre hiérarchique à partir des listes d'axes
 */
function buildTreeStructure() {
    // 1. Root: Direction
    const root = ORG_DATA.direction[0]; // Julien LECLERCQ
    const ceo = ORG_DATA.direction[1];  // Javier LOPEZ
    const cvco = ORG_DATA.direction[2]; // Marine GRAHAM

    // Link top level
    root.children = [ceo];
    ceo.children = [cvco];

    // 2. Link Axes to CVCO
    const axesNodes = [
        { id: 'axis-process', name: '🏭 AXE PROCESS', type: 'axis', color: 'blue', items: ORG_DATA.process },
        { id: 'axis-sports', name: '🏂 AXE SPORTS', type: 'axis', color: 'red', items: ORG_DATA.sports },
        { id: 'axis-transverse', name: '🔄 AXE TRANSVERSE', type: 'axis', color: 'green', items: ORG_DATA.transverse }
    ];
    cvco.children = axesNodes;

    // 3. Group Axis items by Department
    axesNodes.forEach(axis => {
        const groups = {};
        axis.items.forEach(item => {
            const dept = item.team || item.department || "AUTRE";
            if (!groups[dept]) groups[dept] = [];
            groups[dept].push(item);
        });

        axis.children = Object.keys(groups).map(deptName => ({
            id: `dept-${axis.id}-${deptName}`,
            name: deptName,
            type: 'department',
            count: groups[deptName].length,
            children: groups[deptName]
        }));
    });

    return root;
}

/**
 * Crée l'élément HTML pour un noeud
 */
function createNodeElement(data) {
    const isLeaf = !data.children || data.children.length === 0;
    const isCollapsed = COLLAPSED_NODES.has(data.id);

    const nodeWrapper = document.createElement('div');
    nodeWrapper.className = 'node-wrapper';
    if (data.type) nodeWrapper.classList.add(`type-${data.type}`);

    const nodeCard = document.createElement('div');
    nodeCard.className = `node-card ${data.type || 'person'}`;
    if (data.isTeamManager) nodeCard.classList.add('team-manager');
    nodeCard._sourceData = data;

    // Expand/Collapse Button
    if (!isLeaf) {
        const toggle = document.createElement('div');
        toggle.className = 'node-toggle';
        toggle.textContent = isCollapsed ? '+' : '−';
        toggle.onclick = (e) => {
            e.stopPropagation();
            toggleNodeExpansion(data.id);
        };
        nodeCard.appendChild(toggle);
    }

    const content = document.createElement('div');
    content.className = 'node-content';

    const name = document.createElement('div');
    name.className = 'node-name';
    name.textContent = data.name + (data.count ? ` (${data.count})` : '');
    content.appendChild(name);

    if (data.title) {
        const title = document.createElement('div');
        title.className = 'node-title';
        title.textContent = data.title;
        content.appendChild(title);
    }

    nodeCard.appendChild(content);
    nodeWrapper.appendChild(nodeCard);

    // Render Children
    if (!isLeaf && !isCollapsed) {
        const childrenContainer = document.createElement('div');
        childrenContainer.className = 'children-container';

        // Optimize: If too many children (like in a department), use a grid
        if (data.type === 'department' && data.children.length > 5) {
            childrenContainer.classList.add('grid-layout');
        }

        data.children.forEach(child => {
            childrenContainer.appendChild(createNodeElement(child));
        });
        nodeWrapper.appendChild(childrenContainer);
    }

    return nodeWrapper;
}

function toggleNodeExpansion(id) {
    if (COLLAPSED_NODES.has(id)) {
        COLLAPSED_NODES.delete(id);
    } else {
        COLLAPSED_NODES.add(id);
    }
    refreshCurrentView();
}

function renderFullTree() {
    const container = document.getElementById('section-complete');
    if (!container) return;
    container.innerHTML = '';

    const treeData = buildTreeStructure();
    const treeRoot = document.createElement('div');
    treeRoot.className = 'org-tree-root';
    treeRoot.appendChild(createNodeElement(treeData));
    container.appendChild(treeRoot);
}

function showView(view) {
    document.querySelectorAll('.org-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.btn-view').forEach(b => b.classList.remove('active'));

    const section = document.getElementById('section-' + view);
    const btn = document.getElementById('btn-' + view);

    if (section) section.classList.add('active');
    if (btn) btn.classList.add('active');

    // For now, always render the full tree or axis-specific tree
    // (We could filter ORG_DATA but since it's hierarchical, 
    // we just hide/show the branches of the complete tree for simplicity)
    renderFullTree();
}

function refreshCurrentView() {
    const activeView = (document.querySelector('.btn-view.active')?.id || 'btn-complete').replace('btn-', '');
    showView(activeView);
    if (window.injectControls) window.injectControls();
}

document.addEventListener('DOMContentLoaded', () => {
    // Collapse departments by default for readability
    // (IDs would need to be stable, let's just collapse a few types for now)
    showView('complete');
});
