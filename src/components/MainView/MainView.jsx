import styles from './MainView.module.css';
import Menu from '../Menu/Menu';
import SearchBarLogic from '../SearchBarLogic/SearchBarLogic';
import TrackList from '../TrackList/TrackList'
import SaveForm from '../SaveForm/SaveForm';

function MainView(props) {
  return (
    <div className={styles.mainView}>
      <Menu number={props.appState.number} title={props.appState.title} />
      <div className={styles.mainViewContainer}>
        {props.appState.view === 'searchBar' && <SearchBarLogic />}
        {props.appState.view === 'trackList' && <TrackList />}
        {props.appState.view === 'saveForm' && <SaveForm />}
      </div>
    </div>
  );
}

export default MainView;
