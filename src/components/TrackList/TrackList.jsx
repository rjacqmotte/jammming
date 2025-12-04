import styles from './TrackList.module.css';
import Track from '../Track/Track';

function TrackList() {
  return (
    <div className={styles.trackListContainer}>
      <ul className={styles.trackList}>
        <li className={styles.trackListItem}>
          <Track />
        </li>
        <li className={styles.trackListItem}>
          <Track />
        </li>
        <li className={styles.trackListItem}>
          <Track />
        </li>
        <li className={styles.trackListItem}>
          <Track />
        </li>
        <li className={styles.trackListItem}>
          <Track />
        </li>
        <li className={styles.trackListItem}>
          <Track />
        </li>
        <li className={styles.trackListItem}>
          <Track />
        </li>
        <li className={styles.trackListItem}>
          <Track />
        </li>
        <li className={styles.trackListItem}>
          <Track />
        </li>
        <li className={styles.trackListItem}>
          <Track />
        </li>
        <li className={styles.trackListItem}>
          <Track />
        </li>
      </ul>
    </div>
  );
}

export default TrackList;
