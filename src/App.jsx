import { useState, useEffect } from 'react';
import styles from './App.module.css';
import AppView from './components/AppView/AppView.jsx';
import './variables.css';
import CryptoJS from 'crypto-js';

function App() {
  
  /* --- API --- */
  // --- LAST.FM AUTHENTICATION FLOW ---

  // Méthode de hachage MD5 nécessaire pour signer l'authentification Last.fm
  function calculateMD5(text) {
    return CryptoJS.MD5(text).toString();
  }

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

// --- API : SEARCH ---

  /** liste de morceau. c'est la réponse de l'api à la demande de recherche. array d'object.
   * cette variable est envoyée à TrackList qui la décompose en différentes Track. */
  const [trackList, setTrackList] = useState();

  // construit l'url pour une demande API de recherche de morceau sur base de la valeur input de l'utilisatuer 'searchValue'
  async function handleSearch(event) {
    event.preventDefault();
    console.log('button search cliqué');

    // construction de l'url
    const apiKey = import.meta.env.VITE_LASTFM_API_KEY;
    const apiURL = 'http://ws.audioscrobbler.com/2.0/';
    const urlToFetch = `${apiURL}?method=track.search&track=${encodeURIComponent(searchValue)}&api_key=${apiKey}&format=json`;
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

  // --- API : TAG TRACK ---
  // ajoute un tag dans le compte lastFM de l'utilisateur sur les morceaux enregistés dans la playlist ('selectedTrack').

  async function handleTagPlaylist(event, playlist, tags = 'my_playlist') {
    event.preventDefault();
    console.log('bouton - enregistrer la playlist - cliqué!');
    // boucle d'appel api, un appel pour chaque track de la playlist
    for (const track of playlist) {
      await saveTags(track.artist, track.name, tags);
      console.log(`track sauvegardée`);
      console.log(track);
    }
  }
  // appel API POST pour tagger les morceau de musique enregistrée dans 'selectedTrack' dans le compte lastFM de l'utilisateur. (il n'y a pas de possibilité de faire de playlist)
  async function saveTags(artist, trackName, tags) {
    const apiKey = import.meta.env.VITE_LASTFM_API_KEY;
    const sessionKey = localStorage.getItem('lastfm_session_key');
    const apiURL = 'http://ws.audioscrobbler.com/2.0/';
    try {
      //construction de la signature
      const stringToHash = `api_key${apiKey}artist${artist}methodtrack.addTagssk${sessionKey}tags${tags}track${trackName}${import.meta.env.VITE_LASTFM_CLIENT_SECRET}`;
      const apiSignature = calculateMD5(stringToHash);
      console.log('Signature créée pour saveTags:', apiSignature);

      // Construction du body en application/x-www-form-urlencoded
      const params = new URLSearchParams({
        method: 'track.addTags',
        artist: artist,
        track: trackName,
        tags: tags,
        api_key: apiKey,
        api_sig: apiSignature,
        sk: sessionKey,
        format: 'json',
      });

      console.log('Body envoyé:', params.toString());

      // POST request avec le body

      // Etape 1 : Objet response natif
      const response = await fetch(apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });
      console.log(response);

      // etape 2 : vérifier le HTTP (réseau, serveur, etc.)
      if (!response.ok) {
        throw new Error(
          `Erreur réseau: ${response.status} - ${response.statusText}`
        );
      }

      // étape 3 : Parser le JSON => objet JS normal
      const confirmation = await response.json();
      console.log(`la variable confirmation vaut : `);
      console.log(confirmation);

      // étape 4 : vérifier la logique Last.FM
      if (confirmation.error) {
        // confirmation.error est juste un nombre (10, 4, 6, etc.)
        // confirmation.message est juste un string
        throw new Error(
          `Last.fm : ${confirmation.error} ${confirmation.message}`
        );
      }

      // étape 5 : Succés !
      if (confirmation.status === 'ok') {
        console.log('Tags sauvegardés!');
      }
    } catch (error) {
        console.log('Echec:', error.message);
        // on relance l'erreur pour qu'elle puisse être gérée plus haut
        throw error;
    }
  }



  // --- API : LIKE TRACK ---
  // like les tracks enregistré sur la session utilisateur lastFM
  async function handleLikePlaylist(event, playlist) {
    event.preventDefault();

    for (const track of playlist) {
      await likeTrack(track.name, track.artist);
      console.log('track likée:');
      console.log(track);
    }
  }

  // appel API POST pour liker les morceau selectionnés dans 'selectedTrack'
  async function likeTrack(trackName, artist) {
    const apiKey = import.meta.env.VITE_LASTFM_API_KEY;
    const sessionKey = localStorage.getItem('lastfm_session_key');
    const apiURL = 'http://ws.audioscrobbler.com/2.0/';

    try {
      // construction de la signature
      /**  api_key, artist, (api_sig), method, sk, track + clientsecret */
      const stringToHash = `api_key${apiKey}artist${artist}methodtrack.lovesk${sessionKey}track${trackName}${import.meta.env.VITE_LASTFM_CLIENT_SECRET}`;
      const apiSignature = calculateMD5(stringToHash);
      console.log(`Signature crée pour likeTrack: ${apiSignature}`);

      // construction du body en application/x-www-form-urlencoded
      const params = new URLSearchParams({
        method: 'track.love',
        track: trackName,
        artist: artist,
        api_key: apiKey,
        api_sig: apiSignature,
        sk: sessionKey,
        format: 'json'
      });

      console.log(params.toString());

      // POST resquest avec le body
      // étape 1: Objet response natif
      const response = await fetch(apiURL, {
        method: 'POST',
        headers: {
          'content-Type' : 'application/x-www-form-urlencoded',
        },
        body : params.toString(),
      });

      console.log(response);

      // étape 3: Parser le JSON => objet JS normal
      // check for the response body in case of error
      const confirmation = await response.json(); // Parse even on error to get details
      console.log('la variable confirmation vaut : ');
      console.log(confirmation); // Log the response to see error details
      
      // étape 2: vérifier le HTTP (réseau, serveur, etc.)
      if (!response.ok) {
        throw new Error(
          `Erreur réseau: ${response.status} - ${response.statusText}`
        );
      }

      // étape 4: vérifier la logique last FM
      if (confirmation.error) {
        throw new Error(
          `Last.fm api error : ${confirmation.error} ${confirmation.message}`
        );
      }

      // étape 5: succès!
      if (confirmation.status === 'ok') {
        console.log('Les tracks ont été liké.')
      }
      
    } catch (error) {
        console.log(`Echec: ${error.message}`);
        // on relance l'erreur pour qu'elle puisse être traiter plus haut
        throw error;
    }
  }

  // --- SEARCH ---

  // gérer le input de la barre de recherche des morceaus de chanson dans SearchBar.jsx
  const [searchValue, setSearchValue] = useState('');

  function handleSearchChange(e) {
    setSearchValue(e.target.value);
  }

  // --- SELECTION ET SAUVEGARDE DES TRACKS ---

  /** variable pour sauver les tracks sélectionnées. array d'objet 'track'.
   *  - enregistre les tracks sélectionnées sur base des recherches
   *  - références pour les styles css de Track et Button */
  const [selectedTracks, setSelectedTracks] = useState([]);

  useEffect(() => {
    console.log();
    console.log(`il y a ${selectedTracks.length} sélectioné(s).`);
    console.log('selectedTracks vaut maintenant :');
    console.log(selectedTracks);
  }, [selectedTracks]);

  // si  le track est déjà dans l'array, on l'enlève. s'il n'y est pas, on l'ajoute.
  function handleSelectedTrack(track) {
    setSelectedTracks((prev) => {
      if (prev.includes(track)) {
        console.log('une track est supprimée.');
        console.log(track);
        return prev.filter((item) => item !== track);
      } else {
        console.log('une track est ajouté.');
        console.log(track);
        return [...prev, track];
      }
    });
  }

  // --- GESTION DE L'APPLICATION ---
  
  const [indexState, setIndexState] = useState(1);
  
  function nextState() {
    setIndexState((prev) => Math.min(prev + 1, appStates.length - 1));
  }
  function previousState() {
    setIndexState((prev) => Math.max(prev - 1, 0));
  }

  function newSearch() {
    setIndexState(1);
  }
  
  const handleClickNavButtons = [nextState, previousState, newSearch];
  
  /* gestion de l'état de l'application*/
  const appStates = [
    { view: 'connect'},
    { view: 'searchBar'},
    { view: 'trackList'},
    { view: 'playlist'},
    { view: 'saveForm'},
  ];
  // On dérive l’état courant à partir de l’index
  const appState = appStates[0];
  console.log('la variable appState vaut :');
  console.log(appState);

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
        onSelectedTrack={handleSelectedTrack}
        selectedTracks={selectedTracks}
        onTagPlaylist={handleTagPlaylist}
        onLikePlaylist={handleLikePlaylist}
      />
    </>
  );
}

export default App;
