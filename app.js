/**
 * Moteur de rendu de l'organigramme Decathlon (Version Onglets & Connexions Fixes)
 */

function createNodeElement(data) {
    const node = document.createElement('div');
    node.className = `node ${data.type || ''} ${data.specialStyle || ''}`;
    node._sourceData = data; // Référence pour l'édition admin

    const nameDiv = document.createElement('div');
    nameDiv.className = 'name';
    nameDiv.innerHTML = `${data.name} <span class="prestataire-bubble" title="Prestataires">?</span>`;
    node.appendChild(nameDiv);

    if (data.title) {
        const titleDiv = document.createElement('div');
        titleDiv.className = 'title';
        titleDiv.textContent = data.title;
        node.appendChild(titleDiv);
    }

    if (data.department) {
        const deptDiv = document.createElement('div');
        deptDiv.className = 'department';
        deptDiv.textContent = data.department;
        node.appendChild(deptDiv);
    }

    if (data.badge) {
        const badgeSpan = document.createElement('span');
        badgeSpan.className = 'badge';
        badgeSpan.textContent = data.badge;
        node.appendChild(badgeSpan);
    }

    if (data.teamInfo) {
        const infoDiv = document.createElement('div');
        infoDiv.className = 'team-info';
        infoDiv.textContent = data.teamInfo;
        node.appendChild(infoDiv);
    }

    if (data.contact) {
        const contactDiv = document.createElement('div');
        contactDiv.className = 'contact';
        contactDiv.textContent = `📧 ${data.contact}`;
        node.appendChild(contactDiv);
    }

    if (data.phone) {
        const phoneDiv = document.createElement('div');
        phoneDiv.className = 'contact';
        phoneDiv.textContent = `📞 ${data.phone}`;
        node.appendChild(phoneDiv);
    }

    return node;
}

function renderTree(data, container) {
    if (!data) return;

    const nodeEl = createNodeElement(data);
    container.appendChild(nodeEl);

    // Si c'est un noeud "AXE" (ex: AXE PROCESS), on veut peut-être l'afficher différemment ou pas du tout
    // Ici on traite tout génériquement, le CSS fera le reste.

    let allChildren = [];

    // 1. Enfants directs (children)
    if (data.children && data.children.length > 0) {
        allChildren = allChildren.concat(data.children);
    }

    // 2. Axes (transformés en enfants pour le rendu)
    if (data.axes) {
        allChildren = allChildren.concat(data.axes);
    }

    // 3. Items d'un axe
    if (data.items) {
        allChildren = allChildren.concat(data.items);
    }

    // 4. Sous-niveaux (subLevel)
    if (data.subLevel) {
        allChildren = allChildren.concat(data.subLevel);
    }

    // Rendu des enfants
    if (allChildren.length > 0) {
        const level2 = document.createElement('div');
        level2.className = 'level-2';
        container.appendChild(level2);

        allChildren.forEach(child => {
            const branch = document.createElement('div');
            branch.className = 'branch';
            level2.appendChild(branch);
            renderTree(child, branch);
        });
    }
}

// --- LOGIQUE DE FILTRAGE PAR VUE ---

function getFilteredData(root, axisType) {
    // Clone profond pour ne pas modifier l'original
    const clone = JSON.parse(JSON.stringify(root));

    // On ne garde que Marine GRAHAM (index 0 de children de CEO)
    // Et dans Marine, on filtre les axes.
    if (clone.children && clone.children[0]) {
        const marine = clone.children[0];
        if (marine.axes) {
            marine.axes = marine.axes.filter(axis => axis.type === axisType);
        }
    }
    return clone;
}

function renderView(viewName, filterType) {
    const container = document.getElementById('section-' + viewName);
    if (!container) return;
    container.innerHTML = '<div class="tree"></div>'; // Reset

    let dataToRender = ORG_DATA.ceo; // Par défaut TOUT

    if (filterType) {
        dataToRender = getFilteredData(ORG_DATA.ceo, filterType);
    }

    renderTree(dataToRender, container.querySelector('.tree'));
}

function showView(view) {
    // UI Updates
    document.querySelectorAll('.org-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.btn-view').forEach(b => b.classList.remove('active'));

    const section = document.getElementById('section-' + view);
    const btn = document.getElementById('btn-' + view);

    if (section) section.classList.add('active');
    if (btn) btn.classList.add('active');

    // Render logic triggering
    if (view === 'complete') renderView('complete', null);
    if (view === 'process') renderView('process', 'axis-process');
    if (view === 'sports') renderView('sports', 'axis-sports');
    if (view === 'transverse') renderView('transverse', 'axis-transverse');
}

function initPrestataireBubbles() {
    // Utiliser la délégation d'événements sur le document entier
    document.body.addEventListener('click', function (e) {
        // Vérifier si l'élément cliqué ou son parent est une bulle prestataire
        const bubble = e.target.closest('.prestataire-bubble');
        if (bubble) {
            e.preventDefault();
            e.stopPropagation();

            const currentValue = bubble.textContent.trim();
            const newValue = prompt('Prestataires ?\nFormat: "Oui 3" ou "Non"', currentValue === '?' ? '' : currentValue);

            if (newValue !== null) {
                bubble.textContent = newValue || '?';

                // Réinitialiser les styles
                bubble.style.background = '';
                bubble.style.borderColor = '';
                bubble.style.color = '';

                // Appliquer les nouveaux styles selon la réponse
                if (newValue.toLowerCase().includes('non')) {
                    bubble.style.background = '#1c4532';
                    bubble.style.borderColor = '#48bb78';
                    bubble.style.color = '#ffffff';
                } else if (newValue.toLowerCase().includes('oui')) {
                    bubble.style.background = '#742a2a';
                    bubble.style.borderColor = '#fc8181';
                    bubble.style.color = '#ffffff';
                }
            }
        }
    }, true); // Utiliser la phase de capture pour intercepter avant d'autres handlers
}

// Initialisation
document.addEventListener('DOMContentLoaded', function () {
    initPrestataireBubbles(); // Initialiser les événements d'abord
    showView('complete'); // Puis charger la vue complète
});

