import styles from './AppView.module.css'
import Header from '../Header/Header.jsx'
import MainView from '../MainView/MainView.jsx'
import NavButtons from '../NavButtons/NavButtons.jsx'

function AppView(props) {

  return (
    <>
      <div className={styles.AppView}>
        <Header/>
        <MainView appState={props.appState}/>
        <NavButtons config={props.appState.buttons} onClick={props.onClickNavButtons}/>
      </div>
    </>
  )
}

export default AppView