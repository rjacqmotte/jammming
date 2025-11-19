import styles from './App.module.css'
import Header from './components/Header/Header.jsx'
import Menu from './components/Menu/Menu.jsx'

function App() {

  return (
    <>
      <div className={styles.App__main_container}>
        <Header/>
        <Menu/>
      </div>
    </>
  )
}

export default App
