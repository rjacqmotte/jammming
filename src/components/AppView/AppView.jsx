import styles from './AppView.module.css';
import Header from '../Header/Header.jsx';
import MainView from '../MainView/MainView.jsx';
import Button2 from '../ui/Button2.jsx';
import Footer from '../Footer/Footer.jsx';

function AppView(props) {
  return (
    <>
      <div className={styles.AppView}>
        <Header onLogOut={props.onLogOut} />
        <MainView
          appState={props.appState}
          onClickConnectButton={props.onClickConnectButton}
          onClickNavButtons={props.onClickNavButtons}
          onSearch={props.onSearch}
          onSearchChange={props.onSearchChange}
          searchValue={props.searchValue}
          trackList={props.trackList}
          onSelectedTrack={props.onSelectedTrack}
          selectedTracks={props.selectedTracks}
          onTagPlaylist={props.onTagPlaylist}
          onLikePlaylist={props.onLikePlaylist}
        />
        <Footer
          appState={props.appState}
          onClickNavButtons={props.onClickNavButtons}
        />
      </div>
    </>
  );
}

export default AppView;
