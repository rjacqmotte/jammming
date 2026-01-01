import styles from './Track.module.css';
import moustachuImg from '../../assets/moustachu.jpg';
import Button from '../ui/Button';

// à implémenter: si le track est enregistrer, alors changer le style du track et envoyé un props de config au bouton

function Track(props) {
  const TRACK_CONFIG = {
    default : { 
      className : styles.trackContainer,
      buttonStatus : 'normal'
    },
    isSelected : { 
      className : `${styles.trackContainer} ${styles.isSelected}`,
      buttonStatus : 'isSelected'
    }
  };

    function handleSelect() {
    props.onSelectedTrack(props.track);
  }

  const trackIsSelected = props.selectedTracks.includes(props.track);
  const config = trackIsSelected ? TRACK_CONFIG.isSelected : TRACK_CONFIG.default ;

  return (
    <div className= {config.className}>
      <img
        className={styles.trackImg}
        src={props.track.image[0]['#text'] === '' ? null : props.track.image[0]['#text']}
        alt="track image"
      />
      <article className={styles.trackInfo}>
        <h2>{props.track.name}</h2>
        <p>{props.track.artist}</p>
      </article>
      <Button 
        onSelect={handleSelect}
        buttonStatus= {config.buttonStatus}/>
    </div>
  );
}

export default Track;
