import { useState } from 'react'
import styles from './App.module.css'
import AppView from './components/AppView/AppView.jsx'
import './variables.css'

function App() {
  const appStates = [
      {number: 1, title: 'Search', view: 'searchbar', buttons: 'config_A'},
      {number: 2, title: 'Select', view: 'trackList', buttons: 'config_B'},
      {number: 3, title: 'Confirm', view: 'trackList2', buttons: 'config_C'},
      {number: 1, title: 'Save on Spotify', view: 'saveForm', buttons: 'config_D'}
    ]
  const [appState, SetAppState] = useState(appStates[1])

  return (
    <>
      <AppView appState={appState} />
    </>
  )
}

export default App
