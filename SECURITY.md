# Sécurité - Organigramme Decathlon

## 🔒 Politique de Sécurité

### Versions Supportées

| Version | Support Sécurité |
| ------- | --------------- |
| Latest  | ✅ Oui          |

## 🛡️ Mesures de Sécurité Implémentées

### 1. Protection des Données
- ✅ **Pas de données sensibles** : Aucun mot de passe ou clé API dans le code
- ✅ **Données publiques uniquement** : L'organigramme contient uniquement des informations professionnelles publiques
- ✅ **Pas de PII sensible** : Pas de données personnelles sensibles (adresses, téléphones personnels, etc.)

### 2. Authentification Admin
- ✅ **Session locale** : Les credentials admin sont stockés en `sessionStorage` (non persistant)
- ⚠️ **Credentials en clair** : Pour un environnement de production, utiliser un backend avec authentification sécurisée
- ✅ **Timeout de session** : La session admin expire à la fermeture du navigateur

### 3. Protection XSS (Cross-Site Scripting)
- ✅ **Pas d'innerHTML avec données utilisateur** : Toutes les données sont échappées
- ✅ **Validation des entrées** : Les champs de recherche et formulaires sont validés
- ✅ **CSP recommandé** : Content Security Policy peut être ajouté via headers HTTP

### 4. Protection CSRF
- ✅ **Application statique** : Pas de formulaires POST vers un serveur
- ✅ **Pas de cookies** : Utilisation de sessionStorage uniquement

### 5. Sécurité GitHub Pages
- ✅ **HTTPS forcé** : GitHub Pages force HTTPS automatiquement
- ✅ **Pas de secrets** : Aucun secret ou token dans le repository
- ✅ **Repository public** : Code open-source auditable

## ⚠️ Limitations de Sécurité Connues

### Mode Admin
**Risque** : Les credentials admin sont codés en dur dans `admin.js`

**Impact** : Faible - Application de démonstration sans données sensibles

**Mitigation recommandée** :
```javascript
// Pour production, utiliser un backend avec authentification
// Exemple avec Firebase Auth, Auth0, ou API custom
```

### Stockage Local
**Risque** : Les modifications admin sont stockées en `localStorage`

**Impact** : Moyen - Les données peuvent être modifiées par l'utilisateur

**Mitigation** :
- Pour production, utiliser un backend avec base de données
- Implémenter une validation côté serveur

## 🔍 Audit de Sécurité

### Dernière révision : 2026-01-04

| Catégorie | Statut | Notes |
|-----------|--------|-------|
| Injection SQL | ✅ N/A | Application statique sans base de données |
| XSS | ✅ Protégé | Pas d'innerHTML avec données utilisateur |
| CSRF | ✅ N/A | Pas de formulaires POST |
| Authentification | ⚠️ Basique | Credentials en dur (acceptable pour démo) |
| Autorisation | ✅ OK | Vérification de session avant modifications |
| Données sensibles | ✅ OK | Aucune donnée sensible exposée |
| HTTPS | ✅ OK | Forcé par GitHub Pages |
| Headers sécurité | ⚠️ Manquant | Recommandé d'ajouter CSP |

## 📝 Recommandations pour Production

### 1. Backend Sécurisé
```javascript
// Remplacer l'authentification locale par une API
async function login(username, password) {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    const { token } = await response.json();
    sessionStorage.setItem('authToken', token);
}
```

### 2. Content Security Policy
Ajouter dans les headers HTTP :
```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';
```

### 3. Rate Limiting
Implémenter un rate limiting pour les tentatives de connexion admin

### 4. Logging
Ajouter des logs pour les actions admin (modifications, suppressions)

## 🚨 Signaler une Vulnérabilité

Si vous découvrez une vulnérabilité de sécurité :

1. **NE PAS** créer une issue publique
2. Envoyer un email à : [votre-email-securite@decathlon.com]
3. Inclure :
   - Description de la vulnérabilité
   - Steps pour reproduire
   - Impact potentiel
   - Suggestions de correction (optionnel)

**Délai de réponse** : 48 heures

## 📚 Ressources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)

---

**Dernière mise à jour** : 2026-01-04
**Responsable sécurité** : Équipe DevOps Decathlon
