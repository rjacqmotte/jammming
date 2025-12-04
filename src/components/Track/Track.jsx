import styles from './Track.module.css';
import moustachuImg from '../../assets/moustachu.jpg';

function Track() {
  return (
    <div className={styles.trackContainer}>
      <img
        className={styles.trackImg}
        src={moustachuImg}
        alt="un beau moustachu"
      />
      <article className={styles.trackInfo}>
        <h2>Titre de la chanson</h2>
        <p>info supplémentaire sur la chanson</p>
      </article>
      <button className={styles.trackAddButton}>+</button>
    </div>
  );
}

export default Track;
