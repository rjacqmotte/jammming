# 📁 Organisation du Code - Aide-Mémoire

## 🔧 `/services`
**Pour : Communication externe et logique métier complexe**

### ✅ À mettre ici :
- **APIs externes** : `spotifyService.js`, `lastfmService.js`
  - Appels HTTP (fetch, axios)
  - Endpoints et requêtes API
- **Authentification** : `authService.js`
  - Gestion des tokens
  - Login/logout
  - Refresh token
- **Stockage** : `storageService.js`
  - localStorage
  - sessionStorage
  - cookies
- **Services de données** : `dataService.js`
  - Logique métier complexe
  - Transformation de données importantes

### ❌ Ne pas mettre ici :
- Composants React
- Fonctions utilitaires simples
- Hooks personnalisés

### 📝 Exemple :
```javascript
// spotifyService.js
export const searchTracks = async (query) => {
  const response = await fetch(`${API_URL}/search?q=${query}`);
  return response.json();
};
```

---

## 🪝 `/hooks`
**Pour : Logique React réutilisable avec state et lifecycle**

### ✅ À mettre ici :
- **Custom hooks** commençant par `use`
- **Gestion d'état** : `useLocalStorage.js`, `useAuth.js`
- **Effets complexes** : `useFetch.js`, `useDebounce.js`
- **Logique UI** : `useModal.js`, `useToggle.js`, `useForm.js`
- **Intégration APIs** : `useSpotify.js`

### ❌ Ne pas mettre ici :
- Fonctions qui ne sont pas des hooks
- Composants React
- Appels API directs (ça va dans services)

### 📝 Exemple :
```javascript
// useDebounce.js
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debouncedValue;
};
```

---

## 🛠️ `/utilities`
**Pour : Fonctions utilitaires pures et helpers**

### ✅ À mettre ici :
- **Formatage** : `formatDate.js`, `formatDuration.js`
- **Validation** : `validateEmail.js`, `validateForm.js`
- **Calculs** : `calculations.js`, `converters.js`
- **Manipulation de données** : `arrayHelpers.js`, `stringHelpers.js`
- **Constantes** : `constants.js`, `config.js`
- **Helpers génériques** : `helpers.js`

### ❌ Ne pas mettre ici :
- Hooks (useXxx)
- Appels API
- Composants
- Logique avec state

### 📝 Exemple :
```javascript
// formatDuration.js
export const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds.padStart(2, '0')}`;
};
```

---

## 🎯 Résumé Rapide

| Dossier | Contient | Exemple |
|---------|----------|---------|
| **services** | Communication externe, APIs | `spotifyService.js` |
| **hooks** | Logique React réutilisable | `useDebounce.js` |
| **utilities** | Fonctions pures, helpers | `formatDate.js` |

## 💡 Règle Simple

- **Services** → Parle à l'extérieur (API, storage)
- **Hooks** → Utilise React (useState, useEffect)
- **Utilities** → Fonction pure (entrée → sortie)
