import styles from './Track.module.css'

function Track() {
    return (
        <div className={trackContainer}>
            <img className={trackImg}/>
            <article className={trackInfo}>
                <h2>Titre de la chanson</h2>
                <p>info supplémentaire sur la chanson</p>
            </article>
            <button className={styles.TrackAddButton}>+</button>
        </div>
    )
}

export default Track