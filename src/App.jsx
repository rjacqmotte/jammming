import { useState, useEffect, use } from 'react';
import AppView from './components/AppView/AppView.jsx';
import './variables.css';
import {
  connectToLastfm,
  requestSearchTracks,
  saveTags,
  likeTrack,
  createLastfmSession,
} from './services/lastfmService.js';
import { useCallbackLastfm } from './hooks/useCallbackLastfm.js';

function App() {
  // --- AUTHENTIFICATION ---
  // retient l'état de connection au compte lastFm de l'utilisateur
  const [isLogged, setIsLogged] = useState(false);
  // état de chargeament en cours pour notifier l'utilisateur
  const [loading, setLoading] = useState(false);

  // vérifie à chaque first render si la clé de session est existante est défini isLogged
  useEffect(() => {
    const sessionKey = localStorage.getItem('lastfm_session_key');
    const userName = localStorage.getItem('lastfm_username');
    if (sessionKey && userName) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, []);

  function logoutLastfm() {
    // met isLogged = false;
    setIsLogged(false);
    // efface toutes les clés et variables de connection utilisateur
    localStorage.clear();
  }

  /* Envoie la demande de token et renvoie le client sur la page de connection*/
  function handleConnectToLastFM(event) {
    event.preventDefault();
    console.log('connect button clicked!!!');
    connectToLastfm();
  }

  /* Ecoute l'url de callback pour capturer 
  le token et créer une session lastFM */
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

        // Fonction async pour créer la session avec gestion d'erreur
        // nécessiyte une IIFE async (une fonction qui se lance de suite)
        // pour gérer createLastfmSession qui est async. on ne peut pas mettre
        // de async dans un useEffect
        (async () => {
          try {
            let ok = false;
            setLoading(true);
            ok = await createLastfmSession(token, apiKey, secret, apiUrl);
            if (ok) {
              console.log('Session initialisée');
              setIsLogged(true);
            } else {
              console.error('problème de connexion à lastFM');
            }
            setLoading(false);
          } catch (error) {
            console.error('Erreur lors de la création de session:', error);
          }
        })();
      }
    }
  }, [setLoading, setIsLogged]);

  // --- SEARCH ---
  /** liste de morceau. c'est la réponse de l'api à la demande de recherche. array d'object.
   * cette variable est envoyée à TrackList qui la décompose en différentes Track. */
  const [trackList, setTrackList] = useState();

  // gérer le input de la barre de recherche des morceaus de chanson dans SearchBar.jsx
  const [searchValue, setSearchValue] = useState('');

  // synchronise la valeur du champ input
  function handleSearchChange(e) {
    setSearchValue(e.target.value);
  }

  // lance l'appe à api via requestSearchTracks au onClick
  async function handleSearch(event) {
    event.preventDefault();
    console.log('button search cliqué');

    const tracks = await requestSearchTracks(searchValue);
    setTrackList(tracks);
    nextState();
  }

  // --- SELECTION ET SAUVEGARDE DES TRACKS ---
  /** variable pour sauver les tracks sélectionnées. array d'objet 'track'.
   *  - enregistre les tracks sélectionnées sur base des recherches
   *  - références pour les styles css de Track et Button */
  const [selectedTracks, setSelectedTracks] = useState([]);

  useEffect(() => {
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

  // --- ADD TAG ---
  // ajoute un tag dans le compte lastFM de l'utilisateur sur les morceaux enregistés dans la playlist ('selectedTrack').
  async function handleTagPlaylist(event, playlist, tags = 'my_playlist') {
    event.preventDefault();
    console.log('bouton - enregistrer la playlist - cliqué!');

    // boucle d'appel api, un appel pour chaque track de la playlist
    /** for (const track of playlist) {
      await saveTags(track.artist, track.name, tags);
      console.log(`track sauvegardée`);
      console.log(track);
    }
    */
    setTrackList([]);
    setSelectedTracks([]);
    nextState();
  }

  // --- LIKE TRACKS ---
  // like les tracks enregistré sur la session utilisateur lastFM
  async function handleLikePlaylist(event, playlist) {
    event.preventDefault();
    /** 
    for (const track of playlist) {
      await likeTrack(track.name, track.artist);
      console.log('track likée:');
      console.log(track);
    }
    */

    setTrackList([]);
    setSelectedTracks([]);
    nextState();
  }

  // --- GESTION DES VUES ET DE LA NAVIGATION DE L'APPLICATION ---
  // retient l'état de l'application et gère l'affichage des différentes vues.
  const [indexState, setIndexState] = useState(2);

  /* gestion de l'état de l'application*/
  const appStates = [
    { view: 'connect' },
    { view: 'confirmLog' },
    { view: 'searchBar' },
    { view: 'trackList' },
    { view: 'playlist' },
    { view: 'confirmSave' },
  ];

  // On dérive l’état courant à partir de l’index
  const appState = appStates[indexState];
  useEffect(() => {
    console.log('la variable appState vaut :');
    console.log(appState);
  }, [appState]);

  // fonctions de navigation entre les états/vues de l'app
  function nextState() {
    setIndexState((prev) => Math.min(prev + 1, appStates.length - 1));
  }

  function previousState() {
    setIndexState((prev) => Math.max(prev - 1, 0));
  }

  function newSearch() {
    setIndexState(2);
  }

  function newConnection() {
    setIndexState(0);
  }

  // si l'utilisateur est loggé, présente la vue search, sinon la vue connect
  useEffect(() => {
    console.log(isLogged);
    if (isLogged) {
      newSearch();
    } else {
      newConnection();
    }
  }, [isLogged]);

  // série de fonction de navigation envoyée en props
  const handleClickNavButtons = [nextState, previousState, newSearch];

  // --- JSX ---
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
        onLogOut={logoutLastfm}
        onChangeView={newSearch}
      />
    </>
  );
}

export default App;
