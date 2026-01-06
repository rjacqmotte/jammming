import styles from './AppView.module.css';
import Header from '../Header/Header.jsx';
import MainView from '../MainView/MainView.jsx';

function AppView(props) {
  return (
    <>
      <div className={styles.AppView}>
        <Header />
        <MainView
          appState={props.appState}
          onClickConnectButton={props.onClickConnectButton}
          onSearch={props.onSearch}
          onSearchChange={props.onSearchChange}
          searchValue={props.searchValue}
          trackList={props.trackList}
          onSelectedTrack={props.onSelectedTrack}
          selectedTracks={props.selectedTracks}
          onTagPlaylist={props.onTagPlaylist}
          onLikePlaylist={props.onLikePlaylist}
        />
      </div>
    </>
  );
}

export default AppView;
