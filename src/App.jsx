import { useState } from 'react'
import styles from './App.module.css'
import AppView from './components/AppView/AppView.jsx'
import './variables.css'

function App() {
  const appStates = [
      {number: 1, title: 'Search', view: 'searchBar', buttons: 'config_A'},
      {number: 2, title: 'Select', view: 'trackList', buttons: 'config_B'},
      {number: 3, title: 'Confirm', view: 'trackList2', buttons: 'config_C'},
      {number: 4, title: 'Save on Spotify', view: 'saveForm', buttons: 'config_D'}
    ]

  const [appState, setAppState] = useState(appStates[3])

  return (
    <>
      <AppView appState={appState} />
    </>
  )
}

export default App
