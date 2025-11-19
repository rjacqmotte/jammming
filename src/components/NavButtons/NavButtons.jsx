import styles from './NavButtons.module.css'

function NavButtons() {
    return (
        <nav className={styles.NavButtons}>
            <ul className={styles.NavButtons__list}>
                <li className={styles.NavButtons__item}>
                    <button className={styles.NavButtons__Btn}></button>
                </li>
                <li className={styles.NavButtons__item}>
                    <button className={styles.NavButtons__Btn}></button>
                </li>
                <li className={styles.NavButtons__item}>
                    <button className={styles.NavButtons__Btn}></button>
                </li>
            </ul>
        </nav>
    )
}

export default NavButtons