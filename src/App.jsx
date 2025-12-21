import { useState, useEffect } from 'react';
import styles from './App.module.css';
import AppView from './components/AppView/AppView.jsx';
import './variables.css';
import CryptoJS from 'crypto-js';

function App() {
  /* --- gestion de l'API --- */
  // Méthode de hachage MD5 nécessaire pour signer l'authentification Last.fm
  function calculateMD5(text) {
    return CryptoJS.MD5(text).toString();
  }

  // --- LAST.FM AUTHENTICATION FLOW ---
  // Créer une session Last.fm avec le token reçu
  async function createLastfmSession(token, apiKey, secret, apiUrl) {
    try {
      // Construire la string à hasher (paramètres en ordre alphabétique + secret)
      const stringToHash = `api_key${apiKey}methodauth.getSessiontoken${token}${secret}`;
      const apiSignature = calculateMD5(stringToHash);

      console.log('Signature créée:', apiSignature);

      // Envoyer la requête à Last.fm pour créer la session
      const response = await fetch(
        `${apiUrl}?method=auth.getSession&api_key=${apiKey}&token=${token}&api_sig=${apiSignature}&format=json`
      );

      const sessionData = await response.json();

      if (sessionData.error) {
        console.error('Erreur Last.fm:', sessionData.message);
        return false;
      }

      if (sessionData.session?.key) {
        console.log('Session créée avec succès!');
        console.log('Session key:', sessionData.session.key);
        console.log('Username:', sessionData.session.name);

        // Sauvegarder la clé de session pour les appels futurs
        localStorage.setItem('lastfm_session_key', sessionData.session.key);
        localStorage.setItem('lastfm_username', sessionData.session.name);
        return true;
      }
    } catch (error) {
      console.error('Erreur lors de la création de la session:', error);
      return false;
    }
  }

  /* Envoie la demande de token et renvoie le client sur la page de connection*/
  function handleConnectToLastFM(event) {
    event.preventDefault();
    console.log(event);
    console.log('connect button clicked!!!');
    console.log(import.meta.env.VITE_TEST);

    const apiKey = import.meta.env.VITE_LASTFM_API_KEY;
    const callbackUrl = encodeURIComponent('http://localhost:5173/callback');

    window.location.href = `http://www.last.fm/api/auth/?api_key=${apiKey}&cb=${callbackUrl}`;
  }

  /* Ecoute l'url de callback pour capturer le token */
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

        // Appel simple et lisible de la fonction async
        createLastfmSession(token, apiKey, secret, apiUrl);
      }
    }
  }, []);

  // --- SEARCH ---

  // search value
  const [searchValue, setSearchValue] = useState();

  function handleSearchChange(e) {
    setSearchValue(e.target.value);
  }

  // api
  const [trackList, setTrackList] = useState(null);
  const [searchQuerry, setSearchQuerry] = useState('roxanne');

  async function handleSearch(event) {
    event.preventDefault();
    console.log('button search cliqué');

    // construction de l'url
    const apiKey = import.meta.env.VITE_LASTFM_API_KEY;
    const apiURL = 'http://ws.audioscrobbler.com/2.0/';
    const urlToFetch = `${apiURL}?method=track.search&track=${searchQuerry}&api_key=${apiKey}&format=json`;
    console.log(`url envoyée: ${urlToFetch}`);

    const response = await fetch(urlToFetch);
    console.log(response);
    const searchData = await response.json();
    console.log(searchData);
    const tracks = searchData.results.trackmatches.track;
    console.log(tracks);

    setTrackList(tracks);

    nextState();

    if (searchData.error) {
      console.error('Erreur Last.fm:', sessionSearch.message);
      return false;
    }
  }

  // --- GESTION DE L'APPLICATION ---
  /* gestion de l'état de l'application*/
  const appStates = [
    { number: 1, title: 'Search', view: 'searchBar', buttons: 'config_A' },
    { number: 2, title: 'Select', view: 'trackList', buttons: 'config_B' },
    { number: 3, title: 'Confirm', view: 'trackList2', buttons: 'config_C' },
    {
      number: 4,
      title: 'Save on Spotify',
      view: 'saveForm',
      buttons: 'config_D',
    },
  ];

  const [indexState, setIndexState] = useState(0);

  function nextState() {
    setIndexState((prev) => Math.min(prev + 1, appStates.length - 1));
  }
  function previousState() {
    setIndexState((prev) => Math.max(prev - 1, 0));
  }

  const handleClickNavButtons = [nextState, previousState];

  // On dérive l’état courant à partir de l’index
  const appState = appStates[indexState];

  return (
    <>
      <AppView
        appState={appState}
        onClickNavButtons={handleClickNavButtons}
        onClickConnectButton={handleConnectToLastFM}
        onSearch={handleSearch}
        onSearchChange={handleSearchChange}
        searchValue={searchValue}
        trackList={trackList}
        
      />
    </>
  );
}

export default App;
