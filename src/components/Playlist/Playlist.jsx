import styles from './Playlist.module.css';
import Track from '../Track/Track';
import Button from '../ui/Button';
import Button2 from '../ui/Button2';

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
      <div className={styles.buttonsContainer}>
        <Button2 
          style='filled' 
          content='Tagger la playlist' 
          handleClick={(e) => props.onTagPlaylist(e, props.selectedTracks)}
        />
        <Button2 
          style='filled' 
          content='Liker la playlist' 
          handleClick={(e) => props.onLikePlaylist(e, props.selectedTracks)} 
        />
      </div>
    </div>
  );
}

export default Playlist;
