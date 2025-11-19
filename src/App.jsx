import styles from './App.module.css'
import Header from './components/Header/Header.jsx'
import Menu from './components/Menu/Menu.jsx'
import Container from './components/Container/Container.jsx'
import NavButtons from './components/NavButtons/NavButtons.jsx'

function App() {

  return (
    <>
      <div className={styles.App__main_container}>
        <Header/>
        <Menu/>
        <Container />
        <NavButtons />
      </div>
    </>
  )
}

export default App
