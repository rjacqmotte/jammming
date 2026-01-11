import styles from './MainView.module.css';
import SearchBar from '../SearchBar/SearchBar';
import TrackList from '../TrackList/TrackList';
import Playlist from '../Playlist/Playlist';
import ConnectView from '../ConnectView/ConnectView';

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
            onClickNavButtons={props.onClickNavButtons}
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
        {props.appState.view === 'connect' && (
          <ConnectView onClickConnectButton={props.onClickConnectButton}/>
        )}

      </div>
    </div>
  );
}

export default MainView;
