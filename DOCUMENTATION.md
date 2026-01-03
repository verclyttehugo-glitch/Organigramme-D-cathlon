# 🌳 Organigramme Decathlon - Documentation

Bienvenue dans l'interface de gestion de l'organigramme Decathlon. Ce projet permet de visualiser la structure organisationnelle de l'entreprise selon trois axes métiers : **Process**, **Sports**, et **Transverse**.

## 🚀 Fonctionnalités Clés

- **Visualisation par Axes** : Filtrez l'organigramme pour ne voir que les départements qui vous intéressent.
- **Mode Administrateur** : Modifiez les informations en temps réel directement depuis l'interface.
- **Design Premium** : Interface moderne avec mode sombre, glassmorphism et animations fluides.
- **Import/Export** : Sauvegarder vos modifications dans un fichier `data.js` pour une persistance simple sans base de données complexe.

## 🔑 Accès Administrateur

Pour accéder au mode édition, cliquez sur l'icône de cadenas (🔓) en bas à droite de l'écran.

### Comptes par défaut :
| Utilisateur | Mot de passe | Rôle |
| :--- | :--- | :--- |
| **marine** | `decathlon2024` | Super Admin (Accès total) |
| **externe** | `externe2024` | Éditeur (Modification uniquement) |

## 🛠️ Guide de l'Administrateur

### 1. Modifier une personne
Une fois connecté, survolez n'importe quelle boîte (nœud) de l'organigramme. Une icône de crayon (✏️) apparaîtra. Cliquez dessus pour ouvrir la fenêtre de modification.

### 2. Ajouter un collaborateur
Survolez un responsable et cliquez sur le bouton plus (➕) pour ajouter un subordonné directement sous lui.

### 3. Sauvegarder les changements (IMPORTANT)
Les modifications effectuées sont temporaires (stockées en mémoire). Pour les rendre permanentes :
1. Cliquez sur **📥 Exporter** dans la barre d'administration en haut.
2. Téléchargez le fichier généré.
3. Remplacez le fichier `data.js` original dans le dossier du projet par ce nouveau fichier si vous êtes le développeur, ou conservez-le pour une utilisation ultérieure.

### 4. Charger des données
Utilisez le bouton **📤 Importer** pour charger un fichier de données précédemment exporté.

## 🏭 Structure Technique

Le projet est construit avec des technologies web standards :
- **HTML5/CSS3** (CSS personnalisé avec animations et Glassmorphism)
- **JavaScript Vanille** (Aucun framework lourd n'est requis)
- **Data.js** : Fichier contenant l'arborescence complète au format JSON.

## 💎 Personnalisation du Design

Les styles principaux se trouvent dans :
- `style.css` : Design global, arbre hiérarchique et animations.
- `admin.css` : Interface de connexion et outils d'édition.

---
*Projet optimisé pour une expérience fluide sur tous les navigateurs modernes.*
