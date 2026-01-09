import styles from './AppView.module.css';
import Header from '../Header/Header.jsx';
import MainView from '../MainView/MainView.jsx';
import Button2 from '../ui/Button2.jsx';

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
        <footer className={styles.AppViewFooter}>
          <Button2 className={styles.buttonShowLastResults} style='text' content='Show last results' />
        </footer>
      </div>
    </>
  );
}

export default AppView;
