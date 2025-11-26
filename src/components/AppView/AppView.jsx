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
        <NavButtons />
      </div>
    </>
  )
}

export default AppView