import { useState } from 'react';
import styles from './App.module.css';
import AppView from './components/AppView/AppView.jsx';
import './variables.css';

function App() {
  //logique API - test pour l'instant
/*
  const testUserSearch = 'tailor swift';
  const testEncodeUserSearch = encodeURIComponent(testUserSearch);
  console.log(`testQuerry: ${testEncodeUserSearch}`);

  const testParams = `?q=${testEncodeUserSearch}&type=track&limit=10`;
  const testSpotifyBaseUrl = 'https://api.spotify.com';
  const testFullUrl = `${testSpotifyBaseUrl}${testParams}`;
  console.log(`testFullUrl : ${testFullUrl}`);
  const accessToken =
    'BQAK05wEzllpJi2I5ExWUrwSXz9w_rgLiMktKPvBTT7xTQ1XxJYchT5loMIBUR7qiG2DVKepWgiQy9Knj84xqIDPgnnslaf2Na49AMIPJgIQyF6nZqbjEQ0a_FCbRVyzASMeEh2c';

  const getData = async () => {
    try {
      const response = await fetch(testFullUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
      }
      throw new Error('Request failed');
    } catch (error) {
      console.log(error);
    }
  };

  getData();
*/



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
      <AppView appState={appState} onClickNavButtons={handleClickNavButtons} />
    </>
  );
}

export default App;
