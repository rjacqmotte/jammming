import styles from './NavButtons.module.css'

function NavButtons() {
    return (
        <nav className={styles.NavButtons}>
            <ul className={styles.NavButtons__list}>
                <li className={styles.NavButtons__item}>
                    <button className={styles.NavButtons__Btn}>Back</button>
                </li>
                <li className={styles.NavButtons__item}>
                    <button className={styles.NavButtons__Btn}>Done</button>
                </li>
                <li className={styles.NavButtons__item}>
                    <button className={styles.NavButtons__Btn}>Next</button>
                </li>
            </ul>
        </nav>
    )
}

export default NavButtons