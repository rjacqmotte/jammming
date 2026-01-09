import styles from './Playlist.module.css';
import Track from '../Track/Track';
import Button from '../ui/Button';

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
      <div className={buttonsContainer}>
        <button onClick={(e) => props.onTagPlaylist(e, props.selectedTracks)}>
          Tagger la playlist
        </button>
        <button onClick={(e) => props.onLikePlaylist(e, props.selectedTracks)}>
          Liker la playlist
        </button>
      </div>
    </div>
  );
}

export default Playlist;
