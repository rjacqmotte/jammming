import styles from './MainView.module.css'
import Menu from '../Menu/Menu'
import SearchBar from '../SearchBar/SearchBar'

function MainView() {
    return (
        <div className={styles.mainView}>
            <Menu />
            <div className={styles.mainViewContainer}>
                <SearchBar />
            </div>
        </div>
    )
}

export default MainView