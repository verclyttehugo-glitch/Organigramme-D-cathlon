# 👥 Guide Gestion des Prestataires (Système Dual)

Ce guide explique comment utiliser le nouveau **système dual** de gestion des prestataires, combinant l'identification individuelle et la gestion par poste.

## 📊 Deux Types de Badges

### 1. 🔵 Prestataire Individuel (`isPrestataire`)
Indique qu'une **personne** spécifique est un prestataire externe.
- **Badge** : Point d'interrogation bleu (`?`) en haut à droite.
- **Usage** : Consultants, freelances, intérimaires insérés dans l'organigramme.

### 2. 👥 Poste Gérant des Prestataires (`hasContractors`)
Indique qu'un **poste** (souvent un manager) supervise une équipe de prestataires externes qui n'apparaissent pas individuellement dans l'organigramme.
- **Badge** : Label violet `👥 X prestataires` en bas de carte.
- **Usage** : Managers pilotant des centres de services, équipes de dev externes, régies.

---

## 🔍 Fonctionnalités de Visualisation

### Filtrage
Un bouton **"👥 AVEC PRESTATAIRES"** est disponible dans la barre de navigation.
- **Clic** : Affiche uniquement les postes gérant des prestataires externes.
- **Clic à nouveau** : Retour à la vue normale.

### Statistiques Globales
L'en-tête affiche désormais deux compteurs distincts :
- **🔵 X Prestataires** : Nombre total de personnes identifiées comme prestataires.
- **👥 Y Externes gérés** : Nombre cumulé de prestataires gérés par les postes.

---

## ✏️ Mode Édition (Admin)

En mode administrateur, vous pouvez configurer ces informations pour chaque personne :

1. Cliquez sur le crayon (✏️) sur une carte.
2. Cochez **"Ce poste gère des prestataires externes"**.
3. Remplissez les nouveaux champs :
   - **Nombre** : Combien de prestataires sont pilotés ?
   - **Type** : (Optionnel) Ex: "Consultants IT", "Designers", etc.
4. Cliquez sur **Enregistrer**.

Le badge violet apparaîtra instantanément.

---

## 💻 Structure des Données (`data.js`)

```javascript
{
    id: "exemple-id",
    name: "Nom PRENOM",
    
    // Cas 1 : La personne EST prestataire
    isPrestataire: true,  // -> Badge bleu ?
    
    // Cas 2 : Le poste GÈRE des prestataires
    hasContractors: true,      // -> Active le badge violet
    contractorsCount: 5,       // -> Nombre affiché
    contractorsType: "Devs"    // -> Info-bulle au survol
}
```
