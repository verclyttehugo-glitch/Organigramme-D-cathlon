// app.js - Logique d'affichage et navigation de l'organigramme

// État global
let currentView = 'complete';

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Mettre à jour les compteurs
    updateStats();

    // Afficher la vue par défaut
    renderView('complete');

    // Vérifier si session admin active
    checkAdminSession();
}

function updateStats() {
    const total = orgConfig.totalEmployees;
    document.getElementById('total-count').textContent = `${total} collaborateurs`;

    // Add null checks for safety
    if (document.getElementById('count-process')) document.getElementById('count-process').textContent = `${orgConfig.departments.process} postes`;
    if (document.getElementById('count-sports')) document.getElementById('count-sports').textContent = `${orgConfig.departments.sports} postes`;
    if (document.getElementById('count-transverse')) document.getElementById('count-transverse').textContent = `${orgConfig.departments.transverse} postes`;
}

function showView(viewName) {
    currentView = viewName;
    renderView(viewName);
}

function renderView(viewName) {
    // Update dropdown selection
    const selector = document.getElementById('view-selector');
    if (selector) {
        selector.value = viewName;
    }

    // Afficher la section active
    document.querySelectorAll('.org-section').forEach(section => {
        section.classList.remove('active');
    });

    const section = document.getElementById(`section-${viewName}`);
    section.classList.add('active');

    // Générer le contenu
    switch (viewName) {
        case 'complete':
            section.innerHTML = renderCompleteView();
            break;
        case 'process':
            section.innerHTML = renderTreeView('process');
            break;
        case 'sports':
            section.innerHTML = renderTreeView('sports');
            break;
        case 'transverse':
            section.innerHTML = renderTreeView('transverse');
            break;
    }

    // Scroll vers le haut
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderCompleteView() {
    let html = '<div class="overview-grid">';

    // Direction
    if (ORG_DATA.direction && ORG_DATA.direction.length > 0) {
        html += `
            <div class="overview-card">
                <h3>⭐ DIRECTION</h3>
                <div class="people-grid">
                    ${ORG_DATA.direction.map(p => renderPersonCard(p, 'executive')).join('')}
                </div>
            </div>
        `;
    }

    // Process
    html += `
        <div class="overview-card process">
            <h3>🔵 PROCESS & ENGINEERING</h3>
            <p>${orgConfig.departments.process} collaborateurs</p>
            <p style="margin-top: 10px; color: var(--text-secondary);">
                Engineering, Industrialisation, Tests, Laboratoires
            </p>
        </div>
    `;

    // Sports
    html += `
        <div class="overview-card sports">
            <h3>🔴 SPORTS / MARQUES</h3>
            <p>${orgConfig.departments.sports} collaborateurs</p>
            <p style="margin-top: 10px; color: var(--text-secondary);">
                Business Units, Design, Innovation
            </p>
        </div>
    `;

    // Transverse
    html += `
        <div class="overview-card transverse">
            <h3>🟢 TRANSVERSE</h3>
            <p>${orgConfig.departments.transverse} collaborateurs</p>
            <p style="margin-top: 10px; color: var(--text-secondary);">
                Achats, Sustainability, Qualité, Digital, Support
            </p>
        </div>
    `;

    html += '</div>';

    return html;
}

function renderTreeView(axis) {
    const data = ORG_DATA[axis];
    if (!data || data.length === 0) return '<p class="empty-msg">Aucune donnée pour cet axe.</p>';

    // Find root nodes (no one reports to them in this axis, or they are directors)
    const allChildIds = new Set();
    data.forEach(p => p.children.forEach(cid => allChildIds.add(cid)));

    const roots = data.filter(p => !allChildIds.has(p.id));

    let html = `<div class="tree-container axis-${axis}">`;
    html += `<h2 class="view-title">${axis.toUpperCase()} - STRUCTURE HIÉRARCHIQUE</h2>`;
    html += `<div class="scrollable-content">`;

    roots.forEach(root => {
        html += renderTreeNode(root, data);
    });

    html += `</div></div>`;
    return html;
}

function renderTreeNode(person, allData, level = 0) {
    const children = allData.filter(p => person.children.includes(p.id));
    const hasChildren = children.length > 0;
    const isExpanded = level < 1; // Expand first level by default

    let html = `<div class="tree-node" data-id="${person.id}" style="margin-left: ${level > 0 ? 25 : 0}px">`;

    html += `
        <div class="node-content ${hasChildren ? 'has-children' : ''}" onclick="${hasChildren ? `toggleNode('${person.id}')` : ''}">
            ${hasChildren ? `<span class="toggle-icon">${isExpanded ? '▼' : '▶'}</span>` : '<span class="leaf-icon">○</span>'}
            ${renderPersonCard(person, person.axis || 'process')}
        </div>
    `;

    if (hasChildren) {
        html += `<div class="node-children" id="children-${person.id}" style="display: ${isExpanded ? 'block' : 'none'}">`;
        children.forEach(child => {
            html += renderTreeNode(child, allData, level + 1);
        });
        html += `</div>`;
    }

    html += `</div>`;
    return html;
}

window.toggleNode = function (personId) {
    const childrenDiv = document.getElementById(`children-${personId}`);
    const node = document.querySelector(`.tree-node[data-id="${personId}"]`);
    const icon = node.querySelector('.toggle-icon');

    if (childrenDiv.style.display === 'none') {
        childrenDiv.style.display = 'block';
        icon.textContent = '▼';
    } else {
        childrenDiv.style.display = 'none';
        icon.textContent = '▶';
    }
}

function renderPersonCard(person, type) {
    const isTeamManager = person.isTeamManager || false;
    const isPrestataire = person.isPrestataire || false;
    const showContact = window.isAdminMode || false;

    let html = `<div class="person-card ${type} ${isTeamManager ? 'team-manager' : ''} ${isPrestataire ? 'prestataire' : ''}" data-id="${person.id}">`;

    if (isPrestataire) {
        html += `<div class="prestataire-badge" title="Prestataire Externe">👤 P</div>`;
    }

    html += `<div class="person-name">${person.name}</div>`;
    html += `<div class="person-title">${person.title}</div>`;

    if (person.team) {
        html += `<div class="person-team">${person.team}</div>`;
    }

    if (showContact && (person.email || person.phone)) {
        html += '<div class="person-contact">';
        if (person.email) {
            html += `<div>📧 ${person.email}</div>`;
        }
        if (person.phone) {
            html += `<div>📞 ${person.phone}</div>`;
        }
        html += '</div>';
    }

    if (isTeamManager) {
        html += '<div class="team-manager-badge">⭐ Manager</div>';
    }

    if (window.isAdminMode) {
        html += `<button class="btn-edit" onclick="event.stopPropagation(); editPerson('${person.id}')">✏️</button>`;
    }

    html += '</div>';
    return html;
}

function groupByDepartment(data) {
    const grouped = {};
    data.forEach(person => {
        const dept = person.department || 'AUTRES';
        if (!grouped[dept]) {
            grouped[dept] = [];
        }
        grouped[dept].push(person);
    });
    return grouped;
}

function findPersonById(id) {
    for (const axis of ['direction', 'process', 'sports', 'transverse']) {
        const person = ORG_DATA[axis].find(p => p.id === id);
        if (person) {
            return { person, axis };
        }
    }
    return null;
}
