import styles from './MainView.module.css'
import Menu from '../Menu/Menu'
import SearchBar from '../SearchBar/SearchBar'
import Track from '../Track/Track'

function MainView() {
    return (
        <div className={styles.mainView}>
            <Menu />
            <div className={styles.mainViewContainer}>
                <TrackList/>
            </div>
        </div>
    )
}

export default MainView