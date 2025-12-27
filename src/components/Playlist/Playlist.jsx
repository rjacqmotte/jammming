import styles from './TrackList.module.css';
import Track from '../Track/Track';

function PLaylist(props) {
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
    </div>
  );
}

export default Playlist;