/**
 * Gestion de l'administration pour l'organigramme Decathlon (Version 2025)
 */

const ADMIN_CONFIG = {
    users: {
        "marine": { pass: "decathlon2025", name: "Marine GRAHAM", role: "superadmin" },
        "externe": { pass: "consultant2025", name: "Consultant Externe", role: "editor" }
    },
    storageKey: "decat_org_auth_v2025"
};

let CURRENT_USER = null;
let CURRENT_EDIT_DATA = null;

function initAdmin() {
    // Utilisation de sessionStorage comme demandé
    const storedAuth = sessionStorage.getItem(ADMIN_CONFIG.storageKey);
    if (storedAuth) {
        try {
            const auth = JSON.parse(storedAuth);
            if (auth.username && ADMIN_CONFIG.users[auth.username]) {
                loginSuccess(auth.username, true);
            }
        } catch (e) {
            sessionStorage.removeItem(ADMIN_CONFIG.storageKey);
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
    document.getElementById('btn-import')?.addEventListener('click', () => {
        document.getElementById('import-file').click();
    });
    document.getElementById('import-file')?.addEventListener('change', importData);

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
        sessionStorage.setItem(ADMIN_CONFIG.storageKey, JSON.stringify({
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
}

function logout() {
    CURRENT_USER = null;
    sessionStorage.removeItem(ADMIN_CONFIG.storageKey);
    window.location.reload();
}

function enableEditMode() {
    document.body.classList.add('mode-edition');
    injectControls();
}

function injectControls() {
    document.querySelectorAll('.node').forEach(node => {
        if (node.querySelector('.edit-controls')) return;

        const controls = document.createElement('div');
        controls.className = 'edit-controls';

        const editBtn = document.createElement('div');
        editBtn.className = 'btn-node-action btn-node-edit';
        editBtn.innerHTML = '✏️';
        editBtn.onclick = (e) => {
            e.stopPropagation();
            openEditModal(node._sourceData);
        };

        controls.appendChild(editBtn);
        node.appendChild(controls);
    });
}

function openEditModal(data) {
    if (!data) return;
    CURRENT_EDIT_DATA = data;

    document.getElementById('edit-name').value = data.name || '';
    document.getElementById('edit-title').value = data.title || '';
    document.getElementById('edit-phone').value = data.phone || '';
    document.getElementById('edit-email').value = data.email || '';

    document.getElementById('edit-modal').classList.add('active');
}

function saveEditPerson() {
    if (!CURRENT_EDIT_DATA) return;

    CURRENT_EDIT_DATA.name = document.getElementById('edit-name').value;
    CURRENT_EDIT_DATA.title = document.getElementById('edit-title').value;
    CURRENT_EDIT_DATA.phone = document.getElementById('edit-phone').value;
    CURRENT_EDIT_DATA.email = document.getElementById('edit-email').value;

    document.getElementById('edit-modal').classList.remove('active');
    refreshView();
}

function deletePerson() {
    if (!CURRENT_EDIT_DATA) return;
    if (!confirm(`Supprimer ${CURRENT_EDIT_DATA.name} ?`)) return;

    // Suppression dans les 4 axes
    ['direction', 'process', 'sports', 'transverse'].forEach(axis => {
        if (ORG_DATA[axis]) {
            ORG_DATA[axis] = ORG_DATA[axis].filter(p => p.id !== CURRENT_EDIT_DATA.id);
        }
    });

    document.getElementById('edit-modal').classList.remove('active');
    refreshView();
}

function refreshView() {
    const activeView = (document.querySelector('.btn-view.active')?.id || '').replace('btn-', '') || 'complete';
    if (window.showView) {
        window.showView(activeView);
        setTimeout(injectControls, 100);
    }
}

function exportData() {
    const dataStr = "const ORG_DATA = " + JSON.stringify(ORG_DATA, null, 4) + ";";
    const blob = new Blob([dataStr], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.js';
    link.click();
}

function importData(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            let content = e.target.result;
            const jsonStart = content.indexOf('{');
            if (jsonStart > -1) {
                const jsonStr = content.substring(jsonStart);
                const newData = JSON.parse(jsonStr.replace(/;$/, ''));
                if (newData.direction) {
                    Object.assign(ORG_DATA, newData);
                    refreshView();
                    alert("Import réussi !");
                }
            }
        } catch (err) {
            alert("Erreur Import: Format invalide");
        }
    };
    reader.readAsText(file);
}

document.addEventListener('DOMContentLoaded', initAdmin);
