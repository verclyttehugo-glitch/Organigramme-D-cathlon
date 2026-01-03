/**
 * Moteur de rendu de l'organigramme Decathlon (Version 542 Postes)
 */

function createNodeElement(data) {
    const node = document.createElement('div');
    node.className = `node ${data.type || ''} ${data.specialStyle || ''}`;
    if (data.isTeamManager) node.classList.add('team-manager');
    node._sourceData = data;

    const nameDiv = document.createElement('div');
    nameDiv.className = 'name';
    nameDiv.textContent = data.name;
    node.appendChild(nameDiv);

    if (data.title) {
        const titleDiv = document.createElement('div');
        titleDiv.className = 'title';
        titleDiv.textContent = data.title;
        node.appendChild(titleDiv);
    }

    if (data.team || data.department) {
        const deptDiv = document.createElement('div');
        deptDiv.className = 'department';
        deptDiv.textContent = data.team || data.department;
        node.appendChild(deptDiv);
    }

    if (data.email) {
        const emailDiv = document.createElement('div');
        emailDiv.className = 'contact';
        emailDiv.textContent = `📧 ${data.email}`;
        node.appendChild(emailDiv);
    }

    if (data.phone) {
        const phoneDiv = document.createElement('div');
        phoneDiv.className = 'contact';
        phoneDiv.textContent = `📞 ${data.phone}`;
        node.appendChild(phoneDiv);
    }

    return node;
}

function groupDataByDepartment(dataList) {
    const groups = {};
    dataList.forEach(item => {
        const dept = item.team || item.department || "AUTRE";
        if (!groups[dept]) groups[dept] = [];
        groups[dept].push(item);
    });
    return groups;
}

function renderView(viewName) {
    const container = document.getElementById('section-' + viewName);
    if (!container) return;
    container.innerHTML = '';

    let dataToRender = [];
    if (viewName === 'complete') {
        dataToRender = [
            ...ORG_DATA.direction,
            ...ORG_DATA.process,
            ...ORG_DATA.sports,
            ...ORG_DATA.transverse
        ];
    } else {
        dataToRender = ORG_DATA[viewName] || [];
    }

    const groups = groupDataByDepartment(dataToRender);

    const treeDiv = document.createElement('div');
    treeDiv.className = 'tree';

    // Rendu par groupes
    Object.keys(groups).forEach(deptName => {
        const groupSection = document.createElement('div');
        groupSection.className = 'dept-section';

        const header = document.createElement('h3');
        header.className = 'dept-header';
        header.textContent = `${deptName} (${groups[deptName].length})`;
        groupSection.appendChild(header);

        const nodesGrid = document.createElement('div');
        nodesGrid.className = 'nodes-grid';

        groups[deptName].forEach(person => {
            nodesGrid.appendChild(createNodeElement(person));
        });

        groupSection.appendChild(nodesGrid);
        treeDiv.appendChild(groupSection);
    });

    container.appendChild(treeDiv);
}

function showView(view) {
    document.querySelectorAll('.org-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.btn-view').forEach(b => b.classList.remove('active'));

    const section = document.getElementById('section-' + view);
    const btn = document.getElementById('btn-' + view);

    if (section) section.classList.add('active');
    if (btn) btn.classList.add('active');

    renderView(view);
}

// Initialisation
document.addEventListener('DOMContentLoaded', function () {
    showView('complete');
});
