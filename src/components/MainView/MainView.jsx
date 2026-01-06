import styles from './MainView.module.css';
import SearchBar from '../SearchBar/SearchBar';
import TrackList from '../TrackList/TrackList';
import Playlist from '../Playlist/Playlist';
import SaveForm from '../SaveForm/SaveForm';

function MainView(props) {
  return (
    <div className={styles.mainView}>
      <div className={styles.mainViewContainer}>
        {props.appState.view === 'searchBar' && (
          <SearchBar
            searchValue={props.searchValue}
            onSearchChange={props.onSearchChange}
            onSearch={props.onSearch}
          />
        )}
        {props.appState.view === 'trackList' && (
          <TrackList
            trackList={props.trackList}
            onSelectedTrack={props.onSelectedTrack}
            selectedTracks={props.selectedTracks}
          />
        )}
        {props.appState.view === 'playlist' && (
          <Playlist
            onSelectedTrack={props.onSelectedTrack}
            selectedTracks={props.selectedTracks}
            onTagPlaylist={props.onTagPlaylist}
            onLikePlaylist={props.onLikePlaylist}
          />
        )}
        {props.appState.view === 'saveForm' && (
          <SaveForm onClickConnectButton={props.onClickConnectButton} />
        )}
      </div>
    </div>
  );
}

export default MainView;
