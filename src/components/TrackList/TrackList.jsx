import styles from './TrackList.module.css';
import Track from '../Track/Track';
import Button2 from '../ui/Button2';

function TrackList(props) {
  return (
    <div className={styles.trackListContainer}>
      <ul className={styles.trackList}>
        {props.trackList.map((track, index) => (
          <li key={track.url || index} className={styles.trackListItem}>
            <Track
              track={track}
              onSelectedTrack={props.onSelectedTrack}
              selectedTracks={props.selectedTracks}
            />
          </li>
        ))}
      </ul>
      <Button2 
        style='filled'
        content='Manage Playlist' 
        handleClick={props.onClickNavButtons?.[0]}
      />
    </div>
  );
}

export default TrackList;
