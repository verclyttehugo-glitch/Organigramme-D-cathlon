// admin.js - Système d'authentification et édition

// État admin
window.isAdminMode = false;
let currentUser = null;

// Utilisateurs autorisés
const adminUsers = {
    'marine': {
        password: 'decathlon2025',
        name: 'Marine DELCHIE',
        role: 'Chief Value Chain Officer'
    },
    'externe': {
        password: 'consultant2025',
        name: 'Consultant Externe',
        role: 'Accès temporaire'
    }
};

// Initialisation des événements
document.addEventListener('DOMContentLoaded', () => {
    setupAdminEvents();
});

function setupAdminEvents() {
    // Bouton connexion
    document.getElementById('btn-login-submit').addEventListener('click', handleLogin);

    // Enter dans les champs de connexion
    document.getElementById('login-password').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });

    // Bouton déconnexion
    document.getElementById('btn-logout').addEventListener('click', handleLogout);

    // Boutons édition
    document.getElementById('btn-edit-save').addEventListener('click', saveEdit);
    document.getElementById('btn-edit-cancel').addEventListener('click', closeEditModal);
    document.getElementById('btn-edit-delete').addEventListener('click', deletePerson);

    // Boutons export/import
    document.getElementById('btn-export').addEventListener('click', exportData);
    document.getElementById('btn-import').addEventListener('click', () => {
        document.getElementById('import-file').click();
    });

    document.getElementById('import-file').addEventListener('change', importData);

    // ⭐ Toggle champs prestataires
    const contractorCheckbox = document.getElementById('edit-has-contractors');
    if (contractorCheckbox) {
        contractorCheckbox.addEventListener('change', toggleContractorsFields);
    }
}

// ⭐ Fonction pour basculer l'affichage des champs
function toggleContractorsFields() {
    const hasContractors = document.getElementById('edit-has-contractors').checked;
    const contractorsFields = document.getElementById('contractors-fields');
    const contractorsTypeField = document.getElementById('contractors-type-field');

    if (contractorsFields && contractorsTypeField) {
        if (hasContractors) {
            contractorsFields.style.display = 'block';
            contractorsTypeField.style.display = 'block';
        } else {
            contractorsFields.style.display = 'none';
            contractorsTypeField.style.display = 'none';
        }
    }
}

function checkAdminSession() {
    const session = sessionStorage.getItem('adminSession');
    if (session) {
        try {
            currentUser = JSON.parse(session);
            activateAdminMode();
        } catch (e) {
            console.error('Session invalide');
        }
    }
}

function openLoginModal() {
    document.getElementById('login-modal').style.display = 'flex';
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
    document.getElementById('login-error').style.display = 'none';
}

function closeLoginModal() {
    document.getElementById('login-modal').style.display = 'none';
}

function handleLogin() {
    const username = document.getElementById('login-username').value.toLowerCase().trim();
    const password = document.getElementById('login-password').value;

    const user = adminUsers[username];
    if (user && user.password === password) {
        currentUser = { username, ...user };
        activateAdminMode();
        closeLoginModal();
    } else {
        const errorDiv = document.getElementById('login-error');
        errorDiv.textContent = '❌ Identifiants incorrects';
        errorDiv.style.display = 'block';
        errorDiv.style.color = '#e53e3e';
        errorDiv.style.marginTop = '10px';
    }
}

function activateAdminMode() {
    window.isAdminMode = true;
    document.body.classList.add('admin-mode');
    document.getElementById('admin-bar').classList.add('active');
    document.getElementById('admin-user-name').textContent = currentUser.name;

    // Sauvegarder la session
    sessionStorage.setItem('adminSession', JSON.stringify(currentUser));

    // Re-render la vue actuelle
    renderView(currentView);
}

function handleLogout() {
    window.isAdminMode = false;
    currentUser = null;
    document.body.classList.remove('admin-mode');
    document.getElementById('admin-bar').classList.remove('active');
    sessionStorage.removeItem('adminSession');

    // Re-render la vue actuelle
    renderView(currentView);
}

function editPerson(personId) {
    const result = findPersonById(personId);
    if (!result) {
        alert('Personne non trouvée');
        return;
    }

    const { person } = result;

    // Remplir le formulaire
    document.getElementById('edit-original-id').value = personId;
    document.getElementById('edit-name').value = person.name;
    document.getElementById('edit-title').value = person.title;
    document.getElementById('edit-phone').value = person.phone || '';
    document.getElementById('edit-email').value = person.email || '';

    // ⭐ REMPLIR CHAMPS PRESTATAIRES
    const hasContractors = person.hasContractors || false;
    const checkbox = document.getElementById('edit-has-contractors');
    if (checkbox) checkbox.checked = hasContractors;

    document.getElementById('edit-contractors-count').value = person.contractorsCount || 0;
    document.getElementById('edit-contractors-type').value = person.contractorsType || '';

    // Mettre à jour visibilité
    toggleContractorsFields();

    // Afficher la modal
    document.getElementById('edit-modal').style.display = 'flex';
}

function closeEditModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

function saveEdit() {
    const personId = document.getElementById('edit-original-id').value;
    const result = findPersonById(personId);

    if (!result) {
        alert('Personne non trouvée');
        return;
    }

    const { person } = result;

    // Mettre à jour les données
    // Mettre à jour les données
    person.name = document.getElementById('edit-name').value;
    person.title = document.getElementById('edit-title').value;
    person.phone = document.getElementById('edit-phone').value;
    person.email = document.getElementById('edit-email').value;

    // ⭐ SAUVEGARDER PRESTATAIRES
    person.hasContractors = document.getElementById('edit-has-contractors').checked;

    if (person.hasContractors) {
        person.contractorsCount = parseInt(document.getElementById('edit-contractors-count').value) || 0;
        person.contractorsType = document.getElementById('edit-contractors-type').value;
    } else {
        // Reset si désactivé
        person.contractorsCount = 0;
        person.contractorsType = '';
    }

    // Mettre à jour les stats globales immediatement
    updateStats();

    // Fermer la modal
    closeEditModal();

    // Re-render
    renderView(currentView);

    // ⭐ SYNCHRO CLOUD
    if (typeof saveAllToFirebase === 'function') {
        saveAllToFirebase();
    }

    alert('✅ Modifications enregistrées');
}

function deletePerson() {
    if (!confirm('⚠️ Êtes-vous sûr de vouloir supprimer cette personne ?')) {
        return;
    }

    const personId = document.getElementById('edit-original-id').value;
    const result = findPersonById(personId);

    if (!result) {
        alert('Personne non trouvée');
        return;
    }

    const { axis } = result;

    // Supprimer de l'axe
    const index = ORG_DATA[axis].findIndex(p => p.id === personId);
    if (index !== -1) {
        ORG_DATA[axis].splice(index, 1);

        // Mettre à jour les stats
        orgConfig.departments[axis]--;
        orgConfig.totalEmployees--;

        updateStats();
        closeEditModal();
        renderView(currentView);

        // ⭐ SYNCHRO CLOUD
        if (typeof saveAllToFirebase === 'function') {
            saveAllToFirebase();
        }

        alert('✅ Personne supprimée');
    }
}

function exportData() {
    const dataStr = `// Données de l'organigramme Decathlon
// Exporté le ${new Date().toLocaleString('fr-FR')}

const ORG_DATA = ${JSON.stringify(ORG_DATA, null, 4)};

const orgConfig = ${JSON.stringify(orgConfig, null, 4)};
`;

    const blob = new Blob([dataStr], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `data-export-${Date.now()}.js`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('✅ Données exportées');
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            // Évaluer le fichier JS
            eval(e.target.result);

            // Mettre à jour les stats
            updateStats();

            // Re-render
            renderView(currentView);

            alert('✅ Données importées avec succès');
        } catch (error) {
            alert('❌ Erreur lors de l\'import: ' + error.message);
        }
    };
    reader.readAsText(file);

    // Reset l'input
    event.target.value = '';
}

// ⭐ AJOUT DE PERSONNES
function openAddModal() {
    document.getElementById('add-modal').style.display = 'flex';
    document.getElementById('add-name').value = '';
    document.getElementById('add-title').value = '';
    document.getElementById('add-is-prestataire').checked = false;

    // Initialiser la liste des managers
    updateManagerSelect();
}

function closeAddModal() {
    document.getElementById('add-modal').style.display = 'none';
}

function updateManagerSelect() {
    const axis = document.getElementById('add-axis').value;
    const managerSelect = document.getElementById('add-manager');
    managerSelect.innerHTML = '';

    // Récupérer toutes les personnes de cet axe
    const people = ORG_DATA[axis] || [];

    // Trier par nom pour faciliter la recherche
    people.sort((a, b) => a.name.localeCompare(b.name));

    people.forEach(person => {
        const option = document.createElement('option');
        option.value = person.id;
        option.textContent = `${person.name} - ${person.title}`;
        managerSelect.appendChild(option);
    });
}

function generateId(name) {
    return name.toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '') + '-' + Math.floor(Math.random() * 1000);
}

function saveNewPerson() {
    const axis = document.getElementById('add-axis').value;
    const managerId = document.getElementById('add-manager').value;
    const name = document.getElementById('add-name').value.trim();
    const title = document.getElementById('add-title').value.trim();
    const isPrestataire = document.getElementById('add-is-prestataire').checked;

    if (!name || !title || !managerId) {
        alert('❌ Veuillez remplir tous les champs obligatoires');
        return;
    }

    const newId = generateId(name);

    // Créer le nouvel objet personne
    const newPerson = {
        id: newId,
        name: name,
        title: title,
        team: "",
        department: axis.toUpperCase(),
        phone: "",
        email: "",
        isTeamManager: false,
        isPrestataire: isPrestataire,
        children: []
    };

    // 1. Ajouter à la liste principale de l'axe
    ORG_DATA[axis].push(newPerson);

    // 2. Mettre à jour le parent (manager)
    const manager = ORG_DATA[axis].find(p => p.id === managerId);
    if (manager) {
        manager.children.push(newId);
        manager.isTeamManager = true; // Devient manager s'il ne l'était pas
    } else {
        alert('❌ Erreur : Manager introuvable');
        return;
    }

    // 3. Mettre à jour les stats globales
    orgConfig.departments[axis]++;
    orgConfig.totalEmployees++;

    updateStats();
    closeAddModal();
    renderView(currentView);

    // ⭐ SYNCHRO CLOUD
    if (typeof saveAllToFirebase === 'function') {
        saveAllToFirebase();
    }

    alert(`✅ ${name} a été ajouté(e) avec succès !`);
}
