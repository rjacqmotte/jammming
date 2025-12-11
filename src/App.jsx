import { useState } from 'react';
import styles from './App.module.css';
import AppView from './components/AppView/AppView.jsx';
import './variables.css';

function App() {
  /* gestion de l'API*/
  /* Envoie la demande de token et renvoie le client sur la page de connection*/
  function handleConnectToLastFM(event) {
    event.preventDefault();
    console.log(event);
    console.log('connect button clicked!!!');
    console.log(import.meta.env.VITE_TEST);
  }

  /* Ecoute l'url de callback pour capturer le token */
  const [isCallback, setIsCallback] = useState(false);

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
        setIsCallback(false);

        // TODO: Créer la session Last.fm avec ce token
      }
    }
  }, []);

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
      />
    </>
  );
}

export default App;
