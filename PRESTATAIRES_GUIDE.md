# 📘 Guide des Prestataires - Organigramme Decathlon

## 🎯 Vue d'ensemble

Ce guide explique comment fonctionne le système de visualisation et de comptage des prestataires dans l'organigramme Decathlon.

## ✨ Fonctionnalités Implémentées

### 1. 🔵 Bulle Prestataire Individuelle

Chaque personne marquée comme prestataire affiche une **bulle bleue avec un "?"** en haut à droite de sa carte.

**Caractéristiques visuelles :**
- Fond bleu : `#007abd`
- Texte blanc
- Forme ronde (24px × 24px)
- Caractère : `?`
- Position : coin supérieur droit de la carte
- Ombre portée bleue pour meilleure visibilité

### 2. 📊 Compteur d'Équipe

Pour chaque manager ayant des prestataires dans son équipe (directe ou indirecte), un **badge récapitulatif** s'affiche en haut à gauche de sa carte.

**Format du badge :**
- `X Prestataire` (si X = 1)
- `X Prestataires` (si X > 1)

**Logique de calcul :**
- Compte récursivement tous les prestataires dans l'équipe
- Inclut les subordonnés directs ET indirects
- S'affiche uniquement si le compteur > 0

## 🔧 Comment Marquer une Personne comme Prestataire

### Dans le fichier `data.js`

Pour marquer une personne comme prestataire, définissez la propriété `isPrestataire` à `true` :

```javascript
{
    "id": "exemple-id",
    "name": "Jean DUPONT",
    "title": "Service provider - Consultant",
    "team": "PROCESS",
    "department": "PROCESS",
    "phone": "+33 6 12 34 56 78",
    "email": "jean.dupont@external.com",
    "isTeamManager": false,
    "isPrestataire": true,  // ← Marquer comme prestataire
    "children": []
}
```

### Méthodes de Détection

Le système détecte automatiquement les prestataires de deux façons :

1. **Par propriété** : `isPrestataire: true`
2. **Par titre** : Si le titre contient "Service provider"

## 📝 Exemples d'Utilisation

### Exemple 1 : Prestataire Simple

```javascript
{
    "id": "consultant-a",
    "name": "Alice MARTIN",
    "title": "Service provider - IT Consultant",
    "team": "DIGITAL",
    "department": "TRANSVERSE",
    "phone": "",
    "email": "alice.martin@external.com",
    "isTeamManager": false,
    "isPrestataire": true,
    "children": []
}
```

**Résultat :** Une bulle bleue "?" apparaît sur la carte d'Alice.

### Exemple 2 : Manager avec Prestataires dans l'Équipe

```javascript
{
    "id": "manager-b",
    "name": "Bob DURAND",
    "title": "Team Manager",
    "team": "PROCESS",
    "department": "PROCESS",
    "phone": "+33 6 98 76 54 32",
    "email": "bob.durand@decathlon.com",
    "isTeamManager": true,
    "isPrestataire": false,
    "children": ["consultant-a", "consultant-c"]
}
```

**Résultat :** 
- Badge "2 Prestataires" en haut à gauche de la carte de Bob
- Bulles "?" sur les cartes des consultants A et C

## 🎨 Styles CSS Appliqués

### Bulle Prestataire (`.provider-bubble`)

```css
.provider-bubble {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #007abd;
    color: #ffffff;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85em;
    font-weight: bold;
    border: 2px solid var(--bg-dark);
    box-shadow: 0 2px 8px rgba(0, 122, 189, 0.6);
    z-index: 3;
    cursor: help;
}
```

### Compteur d'Équipe (`.team-prestataire-count`)

```css
.team-prestataire-count {
    position: absolute;
    top: -8px;
    left: -8px;
    background: #2d3748;
    color: #90cdf4;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.7em;
    font-weight: bold;
    border: 2px solid var(--bg-dark);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    z-index: 2;
    white-space: nowrap;
}
```

## 🔍 Logique de Comptage (Code JavaScript)

### Fonction de Comptage Récursif

```javascript
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
```

### Rendu dans la Carte

```javascript
// Bulle individuelle
if (isPrestataire) {
    html += `<div class="provider-bubble" title="Prestataire Externe">?</div>`;
}

// Compteur d'équipe
if (peopleMap && person.children && person.children.length > 0) {
    const teamPrestataireCount = countPrestatairesinTeam(person, peopleMap);
    if (teamPrestataireCount > 0) {
        const label = teamPrestataireCount === 1 ? 'Prestataire' : 'Prestataires';
        html += `<div class="team-prestataire-count" title="${teamPrestataireCount} prestataire(s) dans l'équipe">${teamPrestataireCount} ${label}</div>`;
    }
}
```

## 📊 Statistiques Globales

Le header de l'application affiche également le **nombre total de prestataires** :

```javascript
const prestataires = [
    ...ORG_DATA.direction,
    ...ORG_DATA.process,
    ...ORG_DATA.sports,
    ...ORG_DATA.transverse
].filter(p => p.isPrestataire).length;

prestataireEl.innerHTML = `<span class="prestataire-badge-inline" title="Prestataires Externes">👤 ${prestataires} Prestataires</span>`;
```

## 🧪 Test de l'Implémentation

### Étape 1 : Ajouter des Prestataires de Test

Modifiez `data.js` pour ajouter quelques prestataires :

```javascript
// Dans la section "process"
{
    "id": "test-prestataire-1",
    "name": "Test PRESTATAIRE",
    "title": "Service provider - Consultant",
    "team": "PROCESS",
    "department": "PROCESS",
    "phone": "",
    "email": "test@external.com",
    "isTeamManager": false,
    "isPrestataire": true,
    "children": []
}
```

### Étape 2 : Ajouter le Prestataire à un Manager

Ajoutez l'ID du prestataire dans le tableau `children` d'un manager existant :

```javascript
{
    "id": "briere-m",
    "name": "Matthieu BRIERE",
    "title": "Process Director",
    // ...
    "children": [
        "frejaville-e",
        "riviere-j",
        // ... autres enfants
        "test-prestataire-1"  // ← Ajouter ici
    ]
}
```

### Étape 3 : Vérifier le Résultat

1. Ouvrez `index.html` dans un navigateur
2. Naviguez vers la vue "HIÉRARCHIE COMPLÈTE"
3. Vérifiez :
   - ✅ Bulle bleue "?" sur la carte du prestataire
   - ✅ Badge "X Prestataires" sur la carte du manager
   - ✅ Compteur global dans le header

## 🎯 Cas d'Usage Réels

### Identifier les Décideurs pour les Prestataires Externes

L'objectif principal est d'identifier rapidement :
- **Qui sont les prestataires** dans l'organisation (bulle "?")
- **Qui gère ces prestataires** (badge de comptage)
- **Combien de prestataires** sont présents au total (header)

Cela permet aux parties prenantes de :
1. Visualiser la répartition des prestataires
2. Identifier les managers responsables
3. Analyser la dépendance aux ressources externes

## 🔄 Hiérarchie et Propagation

Le comptage se propage **récursivement** dans la hiérarchie :

```
Manager A (Badge: "5 Prestataires")
├── Manager B (Badge: "2 Prestataires")
│   ├── Employé 1
│   ├── Prestataire 1 (Bulle ?)
│   └── Prestataire 2 (Bulle ?)
├── Manager C (Badge: "3 Prestataires")
│   ├── Prestataire 3 (Bulle ?)
│   ├── Prestataire 4 (Bulle ?)
│   └── Prestataire 5 (Bulle ?)
└── Employé 2
```

## 📱 Responsive Design

Les badges et bulles sont conçus pour être visibles sur tous les écrans :
- Desktop : Taille normale
- Tablette : Taille adaptée
- Mobile : Taille optimisée

## 🎨 Personnalisation

### Changer la Couleur de la Bulle

Dans `style.css`, modifiez :

```css
.provider-bubble {
    background: #007abd;  /* ← Changer cette couleur */
}
```

### Changer le Texte de la Bulle

Dans `app.js`, ligne 302, modifiez :

```javascript
html += `<div class="provider-bubble" title="Prestataire Externe">?</div>`;
//                                                                  ↑ Changer ici
```

## ✅ Checklist de Vérification

- [x] CSS `.provider-bubble` ajouté
- [x] CSS `.team-prestataire-count` présent
- [x] Fonction `countPrestatairesinTeam()` implémentée
- [x] Rendu de la bulle dans `renderPersonCard()`
- [x] Rendu du compteur dans `renderPersonCard()`
- [x] Compteur global dans le header
- [x] Support de la propriété `isPrestataire`
- [x] Support de la détection par titre "Service provider"

## 🚀 Prochaines Étapes

Pour utiliser pleinement cette fonctionnalité :

1. **Identifier les prestataires** dans votre organisation
2. **Mettre à jour `data.js`** avec `isPrestataire: true`
3. **Vérifier la hiérarchie** pour s'assurer que les prestataires sont bien rattachés à leurs managers
4. **Tester l'affichage** dans toutes les vues de l'organigramme

---

**Créé le :** 03/01/2026  
**Version :** 1.0  
**Auteur :** Système d'organigramme Decathlon
