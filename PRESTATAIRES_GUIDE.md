# 📘 Guide Utilisateur Complet - Gestion des Prestataires

Ce guide est votre référence pour gérer les prestataires dans l'organigramme Decathlon. Il contient les accès administrateur et les modes d'emploi.

---

## 🔐 1. Accès Administrateur

Pour modifier l'organigramme, vous devez vous connecter en cliquant sur le cadenas (Admin) en bas à droite de l'écran.

### Comptes Disponibles

| Utilisateur | Mot de passe | Rôle |
| :--- | :--- | :--- |
| **`marine`** | `decathlon2025` | **Admin Principal** (Marine GRAHAM) |
| **`externe`** | `consultant2025` | **Accès Temporaire** (Consultant) |

> **Note :** Une fois connecté, le cadenas disparaît et une barre d'administration noire apparaît en haut de l'écran avec votre nom.

---

## 👥 2. Comprendre le Système Dual

L'organigramme gère deux situations différentes :

### 🔵 Cas A : La personne EST un prestataire
C'est un individu (freelance, consultant) qui a sa propre carte dans l'organigramme.
*   **Visuel :** Bulle bleue **`?`** en haut à droite de sa photo.
*   **Exemple :** Un Expert Technique en mission pour 6 mois.

### 🟣 Cas B : Le poste GÈRE des prestataires
C'est un manager interne qui pilote une équipe externe (qui n'est pas affichée carte par carte).
*   **Visuel :** Badge violet **`👥 8 prestataires`** en bas de sa carte.
*   **Exemple :** Un Chef de Projet qui pilote une équipe de 10 dévs via une ESN.

---

## ✏️ 3. Comment Ajouter / Modifier (Tutoriel)

Une fois connecté en admin :

1.  **Trouvez la personne** concernée dans l'organigramme.
2.  Cliquez sur le **bouton Crayon (Edit)** qui apparaît sur sa carte.
3.  La fenêtre d'édition s'ouvre.

### Pour ajouter des prestataires gérés (Cas B) :
1.  Cochez la case : **`☑️ Ce poste gère des prestataires externes`**
2.  Deux champs apparaissent :
    *   **Nombre :** Inscrivez le nombre (ex: `12`)
    *   **Type :** (Optionnel) Inscrivez le métier (ex: `Consultants Design`)
3.  Cliquez sur **`Enregistrer`**.

✨ **Résultat :** Le badge violet apparaît immédiatement avec le compteur à jour.

---

## 🔍 4. Visualisation & Filtres

### Le Bouton Magique
En haut de la page, cliquez sur le bouton violet :
**`👥 AVEC PRESTATAIRES`**

*   **Effet :** L'organigramme masque tout le monde SAUF les managers qui gèrent des prestataires.
*   **Utilité :** Permet de voir en une seconde où se trouve la force de travail externe dans l'organisation.

### Les Compteurs (En haut de page)
*   **Total Collaborateurs :** L'effectif interne classique.
*   **🔵 X Prestataires :** Le nombre de consultants individuels présents.
*   **👥 Y Externes gérés :** Le volume total de sous-traitance piloté par les managers.

---

## ❓ 5. FAQ Rapide

**Q: Comment retirer le badge violet d'une personne ?**
R: Passez en mode édition, **décochez** la case "Ce poste gère des prestataires" et enregistrez.

**Q: Est-ce que les prestataires gérés (Badge Violet) comptent dans le "Total Collaborateurs" ?**
R: Non, ils sont comptés à part dans "Externes gérés" pour ne pas fausser l'effectif officiel.

**Q: J'ai modifié des données, comment sauvegarder ?**
R: Les modifications sont locales. Pour sauvegarder définitivement, utilisez le bouton **"Export Données"** dans la barre admin pour récupérer le fichier `data.js` mis à jour.
