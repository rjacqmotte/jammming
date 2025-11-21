import styles from './Container.module.css'
import Menu from '../Menu/Menu'
import MainView from '../MainView/MainView'

function Container() {
    return (
        <div className={styles.container}>
            <Menu/>
            <MainView/>
        </div>
    )
}

export default Container