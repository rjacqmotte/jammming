import styles from './TrackList.module.css'
import Track from '../Track/Track'

function TrackList() {
    return (
        <div className={styles.trackListContainer}>
            <h2 calssName={styles.trackListTitle}>Select</h2>
            <ul className={styles.trackList}>
                <li className={styles.trackListItem}><Track /></li>
                <li className={styles.trackListItem}><Track /></li>
                <li className={styles.trackListItem}><Track /></li>
                <li className={styles.trackListItem}><Track /></li>
                <li className={styles.trackListItem}><Track /></li>
                <li className={styles.trackListItem}><Track /></li>
                <li className={styles.trackListItem}><Track /></li>
                <li className={styles.trackListItem}><Track /></li>
                <li className={styles.trackListItem}><Track /></li>
                <li className={styles.trackListItem}><Track /></li>
                <li className={styles.trackListItem}><Track /></li>
            </ul>
        </div>
    )
}

export default TrackList