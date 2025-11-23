import styles from './MainView.module.css'
import Menu from '../Menu/Menu'
import SearchBar from '../SearchBar/SearchBar'
import TrackList from '../TrackList/TrackList'

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