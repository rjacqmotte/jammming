import styles from './Playlist.module.css';
import Track from '../Track/Track';
import Button from '../ui/Button'

function Playlist(props) {
  return (
    <div className={styles.trackListContainer}>
      <ul className={styles.trackList}>
        {props.selectedTracks.map((track, index) => (
          <li key={track.url || index} className={styles.trackListItem}>
            <Track
              track={track}
              onSelectedTrack={props.onSelectedTrack}
              selectedTracks={props.selectedTracks}
            />
          </li>
        ))}
      </ul>
      <button>Enregistrer la playlist</button>
    </div>
  );
}

export default Playlist;