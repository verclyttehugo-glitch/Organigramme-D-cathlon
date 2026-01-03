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
    document.getElementById('count-process').textContent = `${orgConfig.departments.process} postes`;
    document.getElementById('count-sports').textContent = `${orgConfig.departments.sports} postes`;
    document.getElementById('count-transverse').textContent = `${orgConfig.departments.transverse} postes`;
}

function showView(viewName) {
    currentView = viewName;
    renderView(viewName);
}

function renderView(viewName) {
    // Mise à jour des boutons actifs
    document.querySelectorAll('.btn-view').forEach(btn => {
        btn.classList.remove('active');
    });
    event?.target?.classList.add('active') ||
        document.querySelector(`.btn-view:nth-child(${viewName === 'complete' ? 1 : viewName === 'process' ? 2 : viewName === 'sports' ? 3 : 4})`).classList.add('active');

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
            section.innerHTML = renderProcessView();
            break;
        case 'sports':
            section.innerHTML = renderSportsView();
            break;
        case 'transverse':
            section.innerHTML = renderTransverseView();
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

function renderProcessView() {
    const departments = groupByDepartment(ORG_DATA.process);
    let html = '<h2 style="text-align: center; margin-bottom: 30px; color: var(--color-process);">🏭 AXE PROCESS & ENGINEERING</h2>';

    for (const [dept, people] of Object.entries(departments)) {
        html += `
            <div class="department-section">
                <h3 class="department-title">${dept} (${people.length})</h3>
                <div class="people-grid">
                    ${people.map(p => renderPersonCard(p, 'process')).join('')}
                </div>
            </div>
        `;
    }

    return html;
}

function renderSportsView() {
    let html = '<h2 style="text-align: center; margin-bottom: 30px; color: var(--color-sports);">🏂 AXE SPORTS / MARQUES</h2>';
    html += `
        <div class="people-grid">
            ${ORG_DATA.sports.map(p => renderPersonCard(p, 'sports')).join('')}
        </div>
    `;
    return html;
}

function renderTransverseView() {
    const departments = groupByDepartment(ORG_DATA.transverse);
    let html = '<h2 style="text-align: center; margin-bottom: 30px; color: var(--color-transverse);">🔄 MÉTIERS TRANSVERSES</h2>';

    for (const [dept, people] of Object.entries(departments)) {
        html += `
            <div class="department-section">
                <h3 class="department-title">${dept} (${people.length})</h3>
                <div class="people-grid">
                    ${people.map(p => renderPersonCard(p, 'transverse')).join('')}
                </div>
            </div>
        `;
    }

    return html;
}

function renderPersonCard(person, type) {
    const isTeamManager = person.isTeamManager || false;
    const showContact = window.isAdminMode || false;

    let html = `<div class="person-card ${type} ${isTeamManager ? 'team-manager' : ''}" data-id="${person.id}">`;

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
        html += '<div class="team-manager-badge">⭐ Team Manager</div>';
    }

    if (window.isAdminMode) {
        html += `<button class="btn-edit" onclick="editPerson('${person.id}')">✏️</button>`;
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
    // Chercher dans tous les axes
    for (const axis of ['direction', 'process', 'sports', 'transverse']) {
        const person = ORG_DATA[axis].find(p => p.id === id);
        if (person) {
            return { person, axis };
        }
    }
    return null;
}
