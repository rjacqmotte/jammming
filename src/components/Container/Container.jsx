import styles from './Container.module.css'
import Menu from '../Menu/Menu'
import SearchBar from '../SearchBar/SearchBar'

function Container() {
    return (
        <div className={styles.container}>
            <Menu />
            <div className={styles.containerInner}>
                <SearchBar />
            </div>
        </div>
    )
}

export default Container