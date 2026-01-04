# 📘 Guide Utilisateur Complet - Gestion des Prestataires

Ce guide est votre référence pour gérer les prestataires dans l'organigramme Decathlon. Il contient les accès administrateur et les modes d'emploi.

---

## 🔐 1. Accès Administrateur

Pour modifier l'organigramme, vous devez vous connecter en cliquant sur le cadenas (Admin) en bas à droite de l'écran.

### Comptes Disponibles

| Utilisateur | Mot de passe | Rôle |
| :--- | :--- | :--- |
| **`marine`** | `decathlon2025` | **Admin Principal** (Marine DELCHIE) |
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

✨ **Résultat :** Le badge violet apparaît immédiatement avec le compteur à jour.

---

## ➕ 4. Gestion des Postes (Ajouter / Supprimer)

Vous avez la main totale sur la structure de l'organigramme.

### Créer un nouveau poste
1.  Dans la barre noire d'administration (en haut), cliquez sur **`➕ Ajouter`**.
2.  Une fenêtre s'ouvre :
    *   **Axe :** Choisissez le département (ex: Process, Sports...).
    *   **Manager :** Sélectionnez le manager hiérarchique direct dans la liste.
    *   **Nom et Titre :** Remplissez les infos.
3.  Cliquez sur **`Créer`**. La nouvelle carte s'ajoute immédiatement sous son manager.

### Supprimer un poste
1.  Cliquez sur le **crayon (✏️)** du poste à supprimer.
2.  En bas à gauche de la fenêtre, cliquez sur le bouton rouge **`🗑️ Supprimer`**.
3.  Confirmez l'alerte.

> **Attention :** Si vous supprimez un manager, pensez à réaffecter ses équipes avant !

---

## 🔍 5. Visualisation & Filtres

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

## ☁️ 5. Sauvegarde Automatique & Cloud
 
 L'organigramme est désormais doté d'une **synchronisation en temps réel**. Vous n'avez plus besoin de sauvegarder manuellement vos changements.
 
 ### Indicateur de Synchro (Haut de page)
 À côté du titre, une icône de nuage vous indique l'état de la connexion :
 *   **Nuage Vert (☁️) :** Connecté au Cloud. Tous vos changements sont enregistrés instantanément pour tout le monde.
 *   **Sablier (⏳) :** Enregistrement en cours.
 *   **Dossier (📁) :** Mode Hors-ligne. Les changements restent sur votre ordinateur mais ne sont pas partagés.
 *   **Croix Rouge (❌) :** Erreur de connexion.
 
 > **💡 Astuce :** Si vous travaillez à plusieurs sur l'organigramme, les changements faits par un collègue apparaîtront sur votre écran sans même rafraîchir la page !
 
 ---
 
 ## ❓ 6. FAQ Rapide
 
 **Q: Comment retirer le badge violet d'une personne ?**
 R: Passez en mode édition, **décochez** la case "Ce poste gère des prestataires" et enregistrez.
 
 **Q: Est-ce que les prestataires gérés (Badge Violet) comptent dans le "Total Collaborateurs" ?**
 R: Non, ils sont comptés à part dans "Externes gérés" pour ne pas fausser l'effectif officiel.
 
 **Q: Dois-je envoyer mes modifications à l'équipe technique ?**
 R: Non ! Grâce à la sauvegarde automatique Cloud, dès que vous cliquez sur "Enregistrer" ou "Créer", le site est mis à jour pour tous les utilisateurs de Decathlon.
 
 **Q: Puis-je quand même faire une sauvegarde de sécurité ?**
 R: Oui, le bouton **"💾 Exporter"** dans la barre admin reste disponible pour télécharger une copie de secours de la base de données actuelle.
