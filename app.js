// app.js - Logique d'affichage et navigation de l'organigramme

// État global
let currentView = 'hierarchy';
let showOnlyContractors = false;

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Mettre à jour les compteurs
    updateStats();

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




// ⭐ Show Org Chart Image
window.showDecisionTree = function () {
    currentView = 'decision-tree';

    // Hide all sections
    document.querySelectorAll('.org-section').forEach(section => section.classList.remove('active'));

    // Show decision tree section
    const section = document.getElementById('section-decision-tree');
    section.classList.add('active');

    // Clear search
    document.getElementById('search-results').classList.remove('active');
    document.getElementById('search-input').value = '';

    // Render org chart image
    section.innerHTML = renderOrgChartImage();

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render Org Chart as Image
function renderOrgChartImage() {
    let html = `<div class="tree-container org-chart-image-view">`;
    html += `<h2 class="view-title">🌳 ORGANIGRAMME COMPLET - VUE D'ENSEMBLE</h2>`;

    html += `
        <div class="tree-controls no-print" style="text-align: center; margin-bottom: 15px; display: flex; gap: 10px; justify-content: center; align-items: center; flex-wrap: wrap;">
            <button class="btn-admin" onclick="renderView('hierarchy')">🔙 Retour Vue Hiérarchie</button>
            <button class="btn-admin" onclick="downloadOrgChart()" style="background: linear-gradient(135deg, #38b2ac 0%, #2c7a7b 100%);">💾 Télécharger l'Image</button>
            <button class="btn-admin" onclick="window.print()" style="background: linear-gradient(135deg, #38b2ac 0%, #2c7a7b 100%);">🖨️ Imprimer</button>
        </div>
    `;

    html += `
        <div class="org-chart-image-container" style="text-align: center; padding: 20px; background: white; border-radius: 10px; overflow: auto;">
            <img src="docs/images/organigramme_decathlon.png" 
                 alt="Organigramme Complet Decathlon" 
                 id="org-chart-image"
                 style="max-width: 100%; height: auto; display: block; margin: 0 auto; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
        </div>
    `;

    html += `</div>`;
    return html;
}

// Download org chart image
window.downloadOrgChart = function () {
    const link = document.createElement('a');
    link.href = 'docs/images/organigramme_decathlon.png';
    link.download = 'Organigramme_Decathlon_Complet.png';
    link.click();
}

// Render node for decision tree (symmetrical)
function renderDecisionTreeNode(person, peopleMap, level = 0) {
    const children = person.children.map(cid => peopleMap[cid]).filter(Boolean);
    const hasChildren = children.length > 0;

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

    // Node content with card and toggle below it
    html += `<div class="node-content ${hasChildren ? 'has-children' : ''}">`;
    html += renderPersonCard(person, cardType, peopleMap);
    html += `</div>`;

    // Toggle icon below the card
    if (hasChildren) {
        html += `<span class="toggle-icon" onclick="event.stopPropagation(); toggleNode('${person.id}')">▼</span>`;
    } else {
        html += `<span class="leaf-icon">●</span>`;
    }

    // Children container
    if (hasChildren) {
        html += `<div class="node-children" id="children-${person.id}">`;
        children.forEach(child => {
            html += renderDecisionTreeNode(child, peopleMap, level + 1);
        });
        html += `</div>`;
    }

    html += `</div>`;
    return html;
}

// Restore vertical hierarchy view
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
    html += `<h2 class="view-title">🌳 HIÉRARCHIE COMPLÈTE - VUE VERTICALE</h2>`;
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
    const isExpanded = level < 2; // Default: expand first 2 levels

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

    // Get axis from first person in allData
    const axis = allData[0]?.department?.toLowerCase() || 'unknown';
    const uniqueId = `${axis}-${person.id}`;

    let html = `<div class="tree-node" data-id="${uniqueId}" data-level="${level}">`;

    html += `
        <div class="node-content ${hasChildren ? 'has-children' : ''}" onclick="${hasChildren ? `toggleNodeInContext(this, '${uniqueId}')` : ''}">
            ${hasChildren ? `<span class="toggle-icon">${isExpanded ? '▼' : '▶'}</span>` : '<span class="leaf-icon">●</span>'}
            ${renderPersonCard(person, person.axis || 'process', peopleMap)}
        </div>
    `;

    if (hasChildren) {
        html += `<div class="node-children" id="children-${uniqueId}" style="display: ${isExpanded ? 'block' : 'none'}">`;
        children.forEach(child => {
            html += renderTreeNode(child, allData, level + 1);
        });
        html += `</div>`;
    }

    html += `</div>`;
    return html;
}

// Context-aware toggle function
window.toggleNodeInContext = function (element, uniqueId) {
    const node = element.closest('.tree-node');
    const childrenDiv = document.getElementById(`children-${uniqueId}`);
    const icon = node.querySelector('.toggle-icon');

    if (!childrenDiv || !icon) {
        console.warn('Toggle failed: elements not found for', uniqueId);
        return;
    }

    const isHidden = childrenDiv.style.display === 'none' ||
        window.getComputedStyle(childrenDiv).display === 'none';

    if (isHidden) {
        childrenDiv.style.display = 'block';
        icon.textContent = '▼';
    } else {
        childrenDiv.style.display = 'none';
        icon.textContent = '▶';
    }
}

window.toggleNode = function (personId) {
    const childrenDiv = document.getElementById(`children-${personId}`);
    const node = document.querySelector(`.tree-node[data-id="${personId}"]`);

    if (!childrenDiv || !node) {
        console.warn('Toggle failed: elements not found for', personId);
        return;
    }

    const icon = node.querySelector('.toggle-icon');

    // Check current display state (handle both 'none' and empty/undefined)
    const isHidden = childrenDiv.style.display === 'none' ||
        window.getComputedStyle(childrenDiv).display === 'none';

    if (isHidden) {
        childrenDiv.style.display = 'block';
        if (icon) icon.textContent = '▼';
    } else {
        childrenDiv.style.display = 'none';
        if (icon) icon.textContent = '▶';
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

// ⭐ SEARCH FUNCTIONALITY
let allPeopleFlat = [];
let parentIndex = {};

function buildSearchIndex() {
    allPeopleFlat = [];
    parentIndex = {};

    ['direction', 'process', 'sports', 'transverse'].forEach(axis => {
        if (ORG_DATA[axis]) {
            ORG_DATA[axis].forEach(person => {
                allPeopleFlat.push({ ...person, axis }); // Store axis for context if needed

                // Build parent index
                if (person.children && person.children.length > 0) {
                    person.children.forEach(childId => {
                        parentIndex[childId] = person.id;
                    });
                }
            });
        }
    });

    // Ensure we capture cross-axis relationships if any
    // The previous loop captures all "child -> parent" links based on the `children` array of the parent.
}

window.handleSearch = function (query) {
    const resultsContainer = document.getElementById('search-results');
    const input = document.getElementById('search-input');

    if (!query || query.trim().length < 2) {
        resultsContainer.classList.remove('active');
        resultsContainer.innerHTML = '';
        return;
    }

    // Build index if empty (first run)
    if (allPeopleFlat.length === 0) buildSearchIndex();

    const lowerQuery = query.toLowerCase().trim();

    const matches = allPeopleFlat.filter(p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.title.toLowerCase().includes(lowerQuery)
    ).slice(0, 10); // Limit results

    displaySearchResults(matches);
}

function displaySearchResults(results) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<div class="search-result-item"><span class="result-name">Aucun résultat</span></div>';
    } else {
        results.forEach(person => {
            const el = document.createElement('div');
            el.className = 'search-result-item';
            el.innerHTML = `
                <span class="result-name">${person.name}</span>
                <span class="result-title">${person.title}</span>
            `;
            el.onclick = () => goToPerson(person.id);
            resultsContainer.appendChild(el);
        });
    }

    resultsContainer.classList.add('active');
}

// Close search on click outside
document.addEventListener('click', (e) => {
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer && !searchContainer.contains(e.target)) {
        document.getElementById('search-results').classList.remove('active');
    }
});

// ⭐ GO TO PERSON & HIGHLIGHT
window.goToPerson = function (personId) {
    // 1. Switch to hierarchy view
    showView('hierarchy');

    // 2. Expand path to person
    expandPathToPerson(personId);

    // 3. Find and scroll to element
    // Wait for DOM update if needed (usually sync, but good to be safe)
    setTimeout(() => {
        const element = document.querySelector(`.person-card[data-id="${personId}"]`);

        if (element) {
            // Scroll
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Highlight
            element.classList.remove('highlight-person');
            void element.offsetWidth; // Trigger reflow
            element.classList.add('highlight-person');

            // Remove highlight after animation (optional, but CSS animation handles pulsing)
            setTimeout(() => {
                element.classList.remove('highlight-person');
            }, 5000);

            // ⭐ ALSO EXPAND THE PERSON'S OWN CHILDREN (To show "connections" below)
            const childrenDiv = document.getElementById(`children-${personId}`);
            if (childrenDiv && childrenDiv.style.display === 'none') {
                toggleNode(personId);
            }

        } else {
            console.warn("Element not found even after expansion:", personId);
        }
    }, 100);

    // Clear search
    document.getElementById('search-results').classList.remove('active');
    document.getElementById('search-input').value = '';
}

function expandPathToPerson(targetId) {
    // Build index if needed
    if (Object.keys(parentIndex).length === 0) buildSearchIndex();

    const path = [];
    let currentId = targetId;

    // Trace back up to root
    while (parentIndex[currentId]) {
        currentId = parentIndex[currentId];
        path.push(currentId);
    }

    // Path is [Parent, GrandParent, Root...]
    // We need to expand from Top -> Down
    const pathDown = path.reverse();

    pathDown.forEach(parentId => {
        const childrenDiv = document.getElementById(`children-${parentId}`);
        if (childrenDiv && childrenDiv.style.display === 'none') {
            // Use the toggle function to update icon and display
            toggleNode(parentId);
            // Ensure it is block if toggle logic is flip-flop and we don't know state? 
            // Actually toggleNode flips it. If it was none, it becomes block. Correct.
        }
    });
}

// Re-init index on data changes (optional, but good practice if editing)
const originalRenderView = renderView;
renderView = function (viewName) {
    if (allPeopleFlat.length === 0) buildSearchIndex();
    originalRenderView(viewName);
}
