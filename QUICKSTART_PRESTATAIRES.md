# 🚀 Quick Start - Système de Prestataires

## ⚡ En 3 Étapes

### 1️⃣ Marquer un Prestataire

Ouvrez `data.js` et modifiez :

```javascript
"isPrestataire": true
```

### 2️⃣ L'Ajouter à un Manager

Ajoutez l'ID dans le tableau `children` du manager :

```javascript
"children": [
    "employee-1",
    "prestataire-id",  // ← Ajouter ici
    "employee-2"
]
```

### 3️⃣ Rafraîchir

Appuyez sur **F5** dans le navigateur

## ✅ Résultat

- 🔵 **Bulle "?"** sur le prestataire
- 📊 **Badge compteur** sur le manager
- 📈 **Total global** dans le header

## 📋 Exemple Complet

```javascript
// Dans data.js, section "process"
{
    "id": "consultant-externe-1",
    "name": "Jean DUPONT",
    "title": "Service provider - Consultant IT",
    "team": "PROCESS",
    "department": "PROCESS",
    "phone": "",
    "email": "jean.dupont@external.com",
    "isTeamManager": false,
    "isPrestataire": true,  // ← Important !
    "children": []
}
```

Puis ajoutez à un manager :

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
        "consultant-externe-1"  // ← Ajouter ici
    ]
}
```

## 🎨 Apparence

### Prestataire
```
┌──────────────────┐
│               🔵?│
│  Jean DUPONT     │
│  Consultant IT   │
└──────────────────┘
```

### Manager
```
┌──────────────────┐
│1 Prestataire     │
│  Matthieu BRIERE │
│  Process Director│
│  ⭐ Manager      │
└──────────────────┘
```

## 🔍 Vérification

Après rafraîchissement, vérifiez dans "🌳 HIÉRARCHIE COMPLÈTE" :

- [ ] Bulle bleue visible
- [ ] Badge compteur affiché
- [ ] Compteur global mis à jour

## 📚 Documentation

- **RESUME_PRESTATAIRES.md** - Résumé exécutif
- **PRESTATAIRES_GUIDE.md** - Guide complet
- **IMPLEMENTATION_PRESTATAIRES.md** - Détails techniques

---

**Prêt à l'emploi !** ✅
