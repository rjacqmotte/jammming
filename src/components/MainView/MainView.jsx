import styles from './MainView.module.css'
import SearchBar from '../SearchBar/SearchBar'

function MainView() {
    return (
        <div className={styles.mainView}>
            <SearchBar/>
        </div>
    )
}

export default MainView