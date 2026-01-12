import { useState, useEffect, use } from 'react';
import AppView from './components/AppView/AppView.jsx';
import './variables.css';
import {
  createLastfmSession,
  connectToLastfm,
  requestSearchTracks,
  saveTags,
  likeTrack,
} from './services/lastfmService.js';
import { useCallbackLastfm } from './hooks/useCallbackLastfm.js';



function App() {
  
  // --- AUTHENTIFICATION ---
  /* Envoie la demande de token et renvoie le client sur la page de connection*/
  function handleConnectToLastFM(event) {
    event.preventDefault();
    console.log('connect button clicked!!!');
    connectToLastfm();
  }

  /* Ecoute l'url de callback pour capturer 
  le token et créer une session lastFM */
  useCallbackLastfm();
  
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
    for (const track of playlist) {
      await saveTags(track.artist, track.name, tags);
      console.log(`track sauvegardée`);
      console.log(track);
    }
  }
  
  // --- LIKE TRACKS ---
  // like les tracks enregistré sur la session utilisateur lastFM
  async function handleLikePlaylist(event, playlist) {
    event.preventDefault();
    
    for (const track of playlist) {
      await likeTrack(track.name, track.artist);
      console.log('track likée:');
      console.log(track);
    }
  }
  

  // --- GESTION DE L'ETAT DE L'APPLICATION ---
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

  // série de fonction de navigation envoyée en props
  const handleClickNavButtons = [nextState, previousState, newSearch];

  /* gestion de l'état de l'application*/
  const appStates = [
    { view: 'connect' },
    { view: 'searchBar' },
    { view: 'trackList' },
    { view: 'playlist' },
    { view: 'saveForm' },
  ];

  // On dérive l’état courant à partir de l’index
  const appState = appStates[0];
  console.log('la variable appState vaut :');
  console.log(appState);



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
      />
    </>
  );
}

export default App;
