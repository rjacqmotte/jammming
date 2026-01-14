import { useEffect } from 'react';
import { createLastfmSession } from '../services/lastfmService';

export function useCallbackLastfm() {
  /* Ecoute l'url de callback pour capturer le token et créer une session lastFM */
  useEffect(() => {
    // Vérifier si on est sur /callback avec un token
    if (window.location.pathname === '/callback') {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');

      if (token) {
        console.log('Token Last.fm reçu:', token);
        localStorage.setItem('lastfm_token', token);

        // Nettoyer l'URL et revenir à la page principale
        window.history.replaceState({}, '', '/');

        // Créer la session Last.fm avec ce token
        const apiKey = import.meta.env.VITE_LASTFM_API_KEY;
        const secret = import.meta.env.VITE_LASTFM_CLIENT_SECRET;
        const apiUrl = import.meta.env.VITE_API_URL;

        // Fonction async avec gestion d'erreur
        const initSession = async () => {
          try {
            let ok = false;
            ok = await createLastfmSession(token, apiKey, secret, apiUrl);
            console.log('Session initialisée');
            return ok;
          } catch (error) {
            console.error('Erreur lors de la création de session:', error);
          }
        };

        let ok = false;
        ok = initSession();
      }
    }
  }, []);
}
