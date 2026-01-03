/**
 * Gestion de l'administration pour l'organigramme Decathlon
 */

const ADMIN_CONFIG = {
    users: {
        "marine": { pass: "decathlon2024", name: "Marine GRAHAM", role: "superadmin" },
        "externe": { pass: "externe2024", name: "Consultant Externe", role: "editor" }
    },
    storageKey: "decat_org_auth_v1"
};

let CURRENT_USER = null;
let CURRENT_EDIT_DATA = null;

function initAdmin() {
    const storedAuth = localStorage.getItem(ADMIN_CONFIG.storageKey);
    if (storedAuth) {
        try {
            const auth = JSON.parse(storedAuth);
            if (auth.username && ADMIN_CONFIG.users[auth.username]) {
                loginSuccess(auth.username, true);
            }
        } catch (e) {
            console.error("Erreur lecture session", e);
            localStorage.removeItem(ADMIN_CONFIG.storageKey);
        }
    }

    // Event Listeners
    document.getElementById('btn-login-submit')?.addEventListener('click', handleLogin);

    document.querySelector('.admin-trigger')?.addEventListener('click', () => {
        document.getElementById('login-modal').classList.add('active');
    });

    const loginModal = document.getElementById('login-modal');
    if (loginModal) {
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) loginModal.classList.remove('active');
        });
    }

    document.getElementById('btn-logout')?.addEventListener('click', logout);
    document.getElementById('btn-export')?.addEventListener('click', exportData);

    // Import
    document.getElementById('btn-import')?.addEventListener('click', () => {
        document.getElementById('import-file').click();
    });
    document.getElementById('import-file')?.addEventListener('change', importData);

    // Modal Edit Listeners (statiques)
    document.getElementById('btn-edit-save')?.addEventListener('click', saveEditPerson);
    document.getElementById('btn-edit-delete')?.addEventListener('click', deletePerson);
    document.getElementById('btn-edit-cancel')?.addEventListener('click', () => {
        document.getElementById('edit-modal').classList.remove('active');
    });
}

function handleLogin() {
    const userIn = document.getElementById('login-username').value;
    const passIn = document.getElementById('login-password').value;
    const errorMsg = document.getElementById('login-error');

    if (ADMIN_CONFIG.users[userIn] && ADMIN_CONFIG.users[userIn].pass === passIn) {
        loginSuccess(userIn);
        document.getElementById('login-modal').classList.remove('active');
        document.getElementById('login-username').value = '';
        document.getElementById('login-password').value = '';
        if (errorMsg) errorMsg.style.display = 'none';
    } else {
        if (errorMsg) {
            errorMsg.textContent = "Identifiants incorrects";
            errorMsg.style.display = 'block';
            errorMsg.style.color = '#e53e3e';
        }
    }
}

function loginSuccess(username, isRestoration = false) {
    const user = ADMIN_CONFIG.users[username];
    CURRENT_USER = user;

    if (!isRestoration) {
        localStorage.setItem(ADMIN_CONFIG.storageKey, JSON.stringify({
            username: username,
            timestamp: new Date().getTime()
        }));
    }

    document.body.classList.add('admin-active');
    const bar = document.getElementById('admin-bar');
    if (bar) {
        bar.classList.add('visible');
        document.getElementById('admin-user-name').textContent = user.name;
    }

    enableEditMode();

    if (!isRestoration) {
        alert(`Bienvenue ${user.name} ! Mode édition activé.`);
    }
}

function logout() {
    CURRENT_USER = null;
    localStorage.removeItem(ADMIN_CONFIG.storageKey);
    document.body.classList.remove('admin-active');
    document.getElementById('admin-bar').classList.remove('visible');
    disableEditMode();
    window.location.reload();
}

function enableEditMode() {
    document.body.classList.add('mode-edition');
    // Injection des contrôles sur les noeuds existants
    injectControls();

    // Observation des changements DOM pour réinjecter (si re-render)
    // Comme renderTree supprime tout, on peut juste réinjecter après render
    // Hack simple: hook sur window.renderTree si possible, ou intervalle
    // On va modifier refreshView pour réinjecter
}

function disableEditMode() {
    document.body.classList.remove('mode-edition');
    document.querySelectorAll('.edit-controls').forEach(el => el.remove());
}

function injectControls() {
    document.querySelectorAll('.node').forEach(node => {
        if (node.querySelector('.edit-controls')) return;
        if (!node._sourceData) return; // Pas de données liées

        const controls = document.createElement('div');
        controls.className = 'edit-controls';

        // Bouton Edit
        const editBtn = document.createElement('div');
        editBtn.className = 'btn-node-action btn-node-edit';
        editBtn.innerHTML = '✏️';
        editBtn.title = 'Éditer';
        editBtn.onclick = (e) => {
            e.stopPropagation();
            openEditModal(node._sourceData);
        };

        // Bouton Add (seulement si pas Team Manager terminal, ou pour tout le monde)
        const addBtn = document.createElement('div');
        addBtn.className = 'btn-node-action btn-node-add';
        addBtn.innerHTML = '➕';
        addBtn.title = 'Ajouter sous-niveau';
        addBtn.onclick = (e) => {
            e.stopPropagation();
            addChildNode(node._sourceData);
        };

        controls.appendChild(editBtn);
        controls.appendChild(addBtn);
        node.appendChild(controls);
    });
}

function openEditModal(data) {
    if (!data) return;
    CURRENT_EDIT_DATA = data;

    document.getElementById('edit-name').value = data.name || '';
    document.getElementById('edit-title').value = data.title || '';
    document.getElementById('edit-phone').value = data.phone || '';
    document.getElementById('edit-email').value = data.contact || '';

    document.getElementById('edit-modal').classList.add('active');
}

function saveEditPerson() {
    if (!CURRENT_EDIT_DATA) return;

    CURRENT_EDIT_DATA.name = document.getElementById('edit-name').value;
    CURRENT_EDIT_DATA.title = document.getElementById('edit-title').value;
    CURRENT_EDIT_DATA.phone = document.getElementById('edit-phone').value;
    CURRENT_EDIT_DATA.contact = document.getElementById('edit-email').value;

    document.getElementById('edit-modal').classList.remove('active');
    refreshView();
}

function deletePerson() {
    if (!CURRENT_EDIT_DATA) return;
    if (!confirm(`Supprimer ${CURRENT_EDIT_DATA.name} ?`)) return;

    const parent = findParent(window.ORG_DATA, CURRENT_EDIT_DATA);

    if (parent) {
        if (parent.subLevel) parent.subLevel = parent.subLevel.filter(d => d !== CURRENT_EDIT_DATA);
        else if (parent.children) parent.children = parent.children.filter(d => d !== CURRENT_EDIT_DATA);
        else if (parent.items) parent.items = parent.items.filter(d => d !== CURRENT_EDIT_DATA);

        document.getElementById('edit-modal').classList.remove('active');
        refreshView();
    } else {
        alert("Impossible de supprimer la racine.");
    }
}

function addChildNode(parentData) {
    const name = prompt("Nom :");
    if (!name) return;

    const newNode = {
        name: name,
        title: "Nouveau Poste",
        type: "process",
        subLevel: [] // Important pour pouvoir continuer à ajouter
    };

    // Gestion structurelle souple
    if (!parentData.subLevel) parentData.subLevel = [];
    parentData.subLevel.push(newNode);

    refreshView();
}

function findParent(node, target) {
    let candidates = [];
    if (node.children) candidates = candidates.concat(node.children);
    if (node.subLevel) candidates = candidates.concat(node.subLevel);
    if (node.axes) candidates = candidates.concat(node.axes); // Array of axes
    if (node.items) candidates = candidates.concat(node.items); // Axis items

    // Axes est un array d'objets, items est dans ces objets
    if (Array.isArray(node.axes)) {
        for (let axis of node.axes) {
            const found = findParent(axis, target);
            if (found) return found; // Le parent est l'axe, ou trouvé plus bas
            // Si target est un item direct de l'axe ?
            if (axis.items && axis.items.includes(target)) return axis;
        }
    }

    if (candidates.includes(target)) return node;

    for (let child of candidates) {
        // Eviter recursion infinie sur objets circulaires (pas le cas ici normalement)
        const found = findParent(child, target);
        if (found) return found;
    }
    return null;
}

function refreshView() {
    const activeView = (document.querySelector('.btn-view.active')?.id || '').replace('btn-', '') || 'complete';
    if (window.showView) {
        window.showView(activeView);
        setTimeout(injectControls, 50);
    } else {
        location.reload();
    }
}

function exportData() {
    const dataStr = "const ORG_DATA = " + JSON.stringify(window.ORG_DATA, null, 4) + ";";
    const dataUri = 'data:application/javascript;charset=utf-8,' + encodeURIComponent(dataStr);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', 'data_backup_' + new Date().toISOString().slice(0, 10) + '.js');
    linkElement.click();
}

function importData(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            let content = e.target.result;
            // Nettoyage basique
            const jsonStart = content.indexOf('{');
            if (jsonStart > -1) {
                const jsonStr = content.substring(jsonStart).replace(/;$/, '');
                const newData = JSON.parse(jsonStr);
                if (newData.ceo) {
                    window.ORG_DATA = newData;
                    refreshView();
                    alert("Import réussi !");
                }
            } else {
                throw new Error("Format JSON introuvable");
            }
        } catch (err) {
            alert("Erreur Import: " + err.message);
        }
    };
    reader.readAsText(file);
    e.target.value = '';
}

document.addEventListener('DOMContentLoaded', initAdmin);
