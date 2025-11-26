import styles from './MainView.module.css'
import Menu from '../Menu/Menu'
import SearchBar from '../SearchBar/SearchBar'
import TrackList from '../TrackList/TrackList'
import SaveForm from '../SaveForm/SaveForm'

function MainView(props) {
    return (
        <div className={styles.mainView}>
            <Menu title={props.appState} />
            <div className={styles.mainViewContainer}>
                {props.appState === 'Search' && <SearchBar/>}
                {props.appState === 'Select' && <TrackList/>}
                {props.appState === 'Save to Spotify' && <SaveForm/>}
            </div>
        </div>
    )
}

export default MainView