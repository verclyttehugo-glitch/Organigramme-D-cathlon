// app.js - Logique d'affichage et navigation de l'organigramme

// État global
// État global
let currentView = 'hierarchy';
let showOnlyContractors = false;  // ⭐ NEW - Filter for positions with contractors

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Mettre à jour les compteurs
    updateStats();

    // Afficher la vue par défaut
    // Afficher la vue par défaut
    renderView('hierarchy');

    // Vérifier si session admin active
    checkAdminSession();
}

function updateStats() {
    const total = orgConfig.totalEmployees;
    document.getElementById('total-count').textContent = `${total} collaborateurs`;

    // 1. Prestataires individuels (Badge bleu ?)
    let individualContractors = 0;
    ['direction', 'process', 'sports', 'transverse'].forEach(key => {
        individualContractors += ORG_DATA[key].filter(p => p.isPrestataire === true).length;
    });

    // 2. Prestataires gérés (Badge violet 👥)
    let totalManagedContractors = 0;
    let postesWithContractors = 0;
    ['direction', 'process', 'sports', 'transverse'].forEach(key => {
        ORG_DATA[key].forEach(person => {
            if (person.hasContractors) {
                totalManagedContractors += person.contractorsCount || 0;
                postesWithContractors++;
            }
        });
    });

    const prestataireEl = document.getElementById('prestataire-count');
    if (prestataireEl) {
        prestataireEl.innerHTML = `
            <span class="prestataire-badge-inline" title="Personnes prestataires (Badge ?)">
                🔵 ${individualContractors} Prestataires
            </span>
            <span class="contractors-badge-inline" title="Prestataires gérés externe (Badge 👥)">
                👥 ${totalManagedContractors} Externes gérés
            </span>
        `;
    }

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
    // Générer le contenu
    switch (viewName) {
        case 'hierarchy':
            section.innerHTML = renderCompleteHierarchy();
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



function renderCompleteHierarchy() {
    // Combine all axes to find the true root
    const allPeople = [
        ...ORG_DATA.direction,
        ...ORG_DATA.process,
        ...ORG_DATA.sports,
        ...ORG_DATA.transverse
    ];

    // Build ID to person map
    const peopleMap = {};
    allPeople.forEach(p => peopleMap[p.id] = p);

    // Find all people who are children
    const allChildIds = new Set();
    allPeople.forEach(p => p.children.forEach(cid => allChildIds.add(cid)));

    // Find root (person with no parent)
    const roots = allPeople.filter(p => !allChildIds.has(p.id));

    let html = `<div class="tree-container hierarchy-complete">`;
    html += `<h2 class="view-title">🌳 HIÉRARCHIE COMPLÈTE - ORGANIGRAMME GLOBAL</h2>`;
    html += `<div class="scrollable-content">`;

    roots.forEach(root => {
        html += renderCompleteTreeNode(root, peopleMap);
    });

    html += `</div></div>`;
    return html;
}

function renderCompleteTreeNode(person, peopleMap, level = 0) {
    const children = person.children.map(cid => peopleMap[cid]).filter(Boolean);
    const hasChildren = children.length > 0;
    const isExpanded = level < 2;

    // Determine card type based on role
    let cardType = 'transverse';
    const role = person.title.toLowerCase();
    if (role.includes('process') || role.includes('engineer') || role.includes('lab')) {
        cardType = 'process';
    } else if (role.includes('sport') || role.includes('design') || role.includes('brand')) {
        cardType = 'sports';
    } else if (level === 0) {
        cardType = 'executive';
    }

    let html = `<div class="tree-node" data-id="${person.id}" data-level="${level}">`;

    html += `
        <div class="node-content ${hasChildren ? 'has-children' : ''}" onclick="${hasChildren ? `toggleNode('${person.id}')` : ''}">
            ${hasChildren ? `<span class="toggle-icon">${isExpanded ? '▼' : '▶'}</span>` : '<span class="leaf-icon">●</span>'}
            ${renderPersonCard(person, cardType, peopleMap)}
        </div>
    `;

    if (hasChildren) {
        html += `<div class="node-children" id="children-${person.id}" style="display: ${isExpanded ? 'block' : 'none'}">`;
        children.forEach(child => {
            html += renderCompleteTreeNode(child, peopleMap, level + 1);
        });
        html += `</div>`;
    }

    html += `</div>`;
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
    const isExpanded = level < 2; // Expand first 2 levels by default

    // Build peopleMap for this axis
    const peopleMap = {};
    allData.forEach(p => peopleMap[p.id] = p);

    let html = `<div class="tree-node" data-id="${person.id}" data-level="${level}">`;

    html += `
        <div class="node-content ${hasChildren ? 'has-children' : ''}" onclick="${hasChildren ? `toggleNode('${person.id}')` : ''}">
            ${hasChildren ? `<span class="toggle-icon">${isExpanded ? '▼' : '▶'}</span>` : '<span class="leaf-icon">●</span>'}
            ${renderPersonCard(person, person.axis || 'process', peopleMap)}
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

function countPrestatairesinTeam(person, peopleMap) {
    let count = 0;

    function countRecursive(personId) {
        const p = peopleMap[personId];
        if (!p) return;

        if (p.isPrestataire) {
            count++;
        }

        p.children.forEach(childId => countRecursive(childId));
    }

    person.children.forEach(childId => countRecursive(childId));
    return count;
}

function renderPersonCard(person, type, peopleMap = null) {
    const isTeamManager = person.isTeamManager || false;
    const isPrestataire = person.isPrestataire || false;
    const hasContractors = person.hasContractors || false;
    const contractorsCount = person.contractorsCount || 0;
    const showContact = true; // Always show contact info

    let html = `<div class="person-card ${type} ${isTeamManager ? 'team-manager' : ''} ${isPrestataire ? 'prestataire' : ''} ${hasContractors ? 'has-contractors' : ''}" data-id="${person.id}">`;

    if (isPrestataire) {
        html += `<div class="provider-bubble" title="Prestataire Externe">?</div>`;
    }

    // Count prestataires in team if peopleMap is provided
    if (peopleMap && person.children && person.children.length > 0) {
        const teamPrestataireCount = countPrestatairesinTeam(person, peopleMap);
        if (teamPrestataireCount > 0) {
            const label = teamPrestataireCount === 1 ? 'Prestataire' : 'Prestataires';
            html += `<div class="team-prestataire-count" title="${teamPrestataireCount} prestataire(s) dans l'équipe">${teamPrestataireCount} ${label}</div>`;
        }
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

    // ⭐ NEW - Purple badge for positions managing contractors
    if (hasContractors && contractorsCount > 0) {
        const contractorLabel = contractorsCount > 1 ? 'prestataires' : 'prestataire';
        html += `<div class="contractors-badge" title="${person.contractorsType || 'Prestataires externes'}">
                   👥 ${contractorsCount} ${contractorLabel}
                 </div>`;

        if (person.contractorsType) {
            html += `<div class="contractors-type">${person.contractorsType}</div>`;
        }
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

// ⭐ NEW - Contractors Filter Functions
function toggleContractorsFilter() {
    showOnlyContractors = !showOnlyContractors;

    const btn = document.getElementById('btn-contractors');
    if (btn) {
        if (showOnlyContractors) {
            btn.classList.add('active');
            btn.innerHTML = '👥 AVEC PRESTATAIRES ✓';
        } else {
            btn.classList.remove('active');
            btn.innerHTML = '👥 AVEC PRESTATAIRES';
        }
    }

    renderView(currentView);
}

function filterByContractors(data) {
    if (!showOnlyContractors) {
        return data;
    }
    return data.filter(person => person.hasContractors === true);
}

// Expose to window for onclick handlers
window.toggleContractorsFilter = toggleContractorsFilter;
