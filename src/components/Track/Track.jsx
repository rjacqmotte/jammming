import styles from './Track.module.css';
import moustachuImg from '../../assets/moustachu.jpg';

function Track(props) {
  return (
    <div className={styles.trackContainer}>
      <img
        className={styles.trackImg}
        src={props.track.image[0]['#text']}
        alt="track image"
      />
      <article className={styles.trackInfo}>
        <h2>{props.track.name}</h2>
        <p>{props.track.artist}</p>
      </article>
      <button className={styles.trackAddButton}>+</button>
    </div>
  );
}

export default Track;
