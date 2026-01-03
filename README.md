# 🌳 Organigramme Interactif Decathlon

Application web moderne et interactive pour visualiser l'organigramme Decathlon avec 542 collaborateurs organisés par axes métiers.

## ✨ Fonctionnalités

### 🎯 Navigation par Axes
- **Vue Globale** : Aperçu complet des 3 axes métiers
- **Axe Process** : Engineering, Industrialisation, Tests (~270 postes)
- **Axe Sports** : Business Units, Design, Innovation (~50 postes)
- **Axe Transverse** : Achats, Sustainability, Qualité, Digital (~220 postes)

### 🛡️ Mode Administrateur
- **Authentification sécurisée** avec 2 comptes :
  - `marine` / `decathlon2025` (Marine GRAHAM)
  - `externe` / `consultant2025` (Consultant Externe)
- **Édition en temps réel** : Modifier nom, titre, téléphone, email
- **Suppression** de postes avec confirmation
- **Export/Import** des données au format JavaScript

### 🎨 Design Moderne
- **Dark mode** élégant avec gradients
- **Animations smooth** et transitions fluides
- **Responsive** : Compatible mobile, tablette, desktop
- **Badges visuels** : Team Managers, couleurs par axe

## 📁 Structure du Projet

```
Organigramme-Decathlon/
├── index.html          # Page principale
├── data.js             # Données des collaborateurs
├── app.js              # Logique d'affichage
├── style.css           # Design dark mode
├── admin.css           # Styles interface admin
├── admin.js            # Système d'authentification
├── extraction/         # Scripts d'extraction
│   ├── Oui.html        # Fichier source
│   └── extract_org_data.py  # Script Python
└── README.md           # Documentation
```

## 🚀 Installation & Utilisation

### Méthode 1 : Serveur Local Simple

```bash
# Ouvrir directement index.html dans un navigateur
# OU utiliser un serveur HTTP simple :

# Python 3
python -m http.server 8000

# Node.js (avec npx)
npx http-server -p 8000

# Puis ouvrir : http://localhost:8000
```

### Méthode 2 : Live Server (VS Code)

1. Installer l'extension "Live Server"
2. Clic droit sur `index.html`
3. Sélectionner "Open with Live Server"

## 🔐 Mode Administrateur

### Accès
1. Cliquer sur le bouton flottant 🔓 en bas à droite
2. Se connecter avec :
   - **Identifiant** : `marine` ou `externe`
   - **Mot de passe** : `decathlon2025` ou `consultant2025`

### Fonctionnalités Admin
- ✏️ **Éditer** : Cliquer sur le bouton ✏️ sur chaque carte
- 🗑️ **Supprimer** : Bouton dans la modal d'édition
- 📥 **Exporter** : Télécharger `data-export-[timestamp].js`
- 📤 **Importer** : Charger un fichier `data.js`

## 📊 Extraction des Données

### Depuis Oui.html (Python requis)

```bash
cd extraction
python extract_org_data.py
```

Le script :
1. Parse le fichier `Oui.html`
2. Extrait les 542 postes avec regex
3. Classifie par axe métier
4. Génère `data.js` structuré

### Classification Automatique

**Axe Process** : Process Director, Methods Engineer, Technical Director, Product Engineer, Test Engineer, Laboratory Manager

**Axe Sports** : Business Unit Manager, Design Director, Designer, Innovation Manager

**Axe Transverse** : Purchasing, Supply Chain, Sustainability, Office Manager, IS Engineer, Digital Product Manager

## 🎨 Personnalisation

### Couleurs (dans `style.css`)
```css
:root {
    --color-process: #4299e1;    /* Bleu */
    --color-sports: #e53e3e;     /* Rouge */
    --color-transverse: #38b2ac; /* Teal */
    --color-manager: #ecc94b;    /* Doré */
}
```

### Comptes Admin (dans `admin.js`)
```javascript
const adminUsers = {
    'votre-login': {
        password: 'votre-mdp',
        name: 'Votre Nom',
        role: 'Votre Rôle'
    }
};
```

## 🌐 Déploiement GitHub Pages

```bash
# 1. Initialiser Git
git init
git add .
git commit -m "🎉 Initial commit - Organigramme Decathlon"

# 2. Créer le repo sur GitHub
# Puis :
git remote add origin https://github.com/username/Organigramme-Decathlon.git
git branch -M main
git push -u origin main

# 3. Activer GitHub Pages
# Settings → Pages → Source: main branch → Save
```

**URL finale** : `https://username.github.io/Organigramme-Decathlon/`

## 🛠️ Technologies Utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Dark mode, gradients, animations
- **JavaScript (Vanilla)** : Logique sans framework
- **Python 3** : Script d'extraction (optionnel)

## 📝 Format des Données

```javascript
{
    id: "nom-prenom",
    name: "Prénom NOM",
    title: "Titre du Poste",
    team: "Équipe",
    department: "Département",
    phone: "+33 6 XX XX XX XX",
    email: "prenom.nom@decathlon.com",
    isTeamManager: true/false,
    children: []
}
```

## 🔄 Mise à Jour des Données

### Manuelle
1. Éditer `data.js`
2. Modifier les objets dans `orgData`
3. Mettre à jour `orgConfig.totalEmployees`
4. Rafraîchir la page

### Via Interface Admin
1. Se connecter en mode admin
2. Éditer les postes via l'interface
3. Exporter les modifications
4. Remplacer `data.js` par le fichier exporté

## 📞 Support

Pour toute question ou problème :
- **Auteur** : Keyvan Motamed (Head of Innovation, Phenix Group)
- **Projet** : Organigramme Decathlon Interactif
- **Version** : 2.0
- **Date** : Janvier 2026

## 📄 Licence

Ce projet est destiné à un usage interne Decathlon.

---

**🚀 Prêt à explorer l'organigramme !**
