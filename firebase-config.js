// firebase-config.js - Configuration et synchronisation temps réel

// ⚠️ À REMPLACER PAR TES CLÉS FIREBASE (voir firebase_plan.md)
const firebaseConfig = {
    apiKey: "ENTRE_TA_CLE_ICI",
    authDomain: "ton-projet.firebaseapp.com",
    databaseURL: "https://ton-projet-default-rtdb.firebaseio.com",
    projectId: "ton-projet",
    storageBucket: "ton-projet.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};

// Initialisation (Compat mode)
let database = null;
let isFirebaseEnabled = false;

if (firebaseConfig.apiKey !== "ENTRE_TA_CLE_ICI") {
    firebase.initializeApp(firebaseConfig);
    database = firebase.database();
    isFirebaseEnabled = true;
    console.log("✅ Firebase Initialisé");
} else {
    console.warn("⚠️ Firebase non configuré. Utilisation des données locales (data.js)");
    updateSyncStatus('offline');
}

// Fonction pour mettre à jour l'icône de statut
function updateSyncStatus(status) {
    const el = document.getElementById('sync-status');
    if (!el) return;

    switch (status) {
        case 'online':
            el.textContent = '☁️';
            el.style.color = '#48bb78'; // Vert
            el.title = 'Connecté - Synchronisation temps réel active';
            break;
        case 'syncing':
            el.textContent = '⏳';
            el.style.color = '#ecc94b'; // Jaune
            el.title = 'Synchronisation en cours...';
            break;
        case 'offline':
            el.textContent = '📁';
            el.style.color = '#a0aec0'; // Gris
            el.title = 'Mode local - Données non sauvegardées sur le cloud';
            break;
        case 'error':
            el.textContent = '❌';
            el.style.color = '#f56565'; // Rouge
            el.title = 'Erreur de connexion Firebase';
            break;
    }
}

// --- LOGIQUE DE LECTURE ---

function listenToDataChanges() {
    if (!isFirebaseEnabled) return;

    updateSyncStatus('syncing');

    // Écouter tout changement dans la branche 'org_data'
    database.ref('org_data').on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            console.log("🔄 Données reçues de Firebase");

            // Mettre à jour les variables globales
            if (data.ORG_DATA) window.ORG_DATA = data.ORG_DATA;
            if (data.orgConfig) window.orgConfig = data.orgConfig;

            // Re-render la vue actuelle
            if (typeof renderView === 'function') {
                updateStats();
                renderView(currentView);
            }

            updateSyncStatus('online');
        } else {
            // Si la base est vide (premier run), on l'initialise avec data.js
            console.log("🆕 Base vide. Initialisation avec data.js...");
            saveAllToFirebase();
        }
    }, (error) => {
        console.error("❌ Erreur Firebase:", error);
        updateSyncStatus('error');
    });
}

// --- LOGIQUE D'ÉCRITURE ---

function saveAllToFirebase() {
    if (!isFirebaseEnabled) return;

    updateSyncStatus('syncing');

    database.ref('org_data').set({
        ORG_DATA: window.ORG_DATA,
        orgConfig: window.orgConfig,
        lastUpdate: new Date().toISOString(),
        updatedBy: window.currentUser ? window.currentUser.name : 'System'
    }).then(() => {
        updateSyncStatus('online');
        console.log("💾 Sauvegarde complète réussie");
    }).catch((error) => {
        console.error("❌ Erreur sauvegarde:", error);
        updateSyncStatus('error');
    });
}
