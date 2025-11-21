import styles from './NavButtons.module.css'

function NavButtons() {
    return (
        <nav className={styles.navButtons}>
            <ul className={styles.navButtonsList}>
                <li className={styles.navButtonsItem}>
                    <button className={styles.navButtonsBtn}>Back</button>
                </li>
                <li className={styles.navButtonsItem}>
                    <button className={styles.navButtonsBtn}>Done</button>
                </li>
                <li className={styles.navButtonsItem}>
                    <button className={styles.navButtonsBtn}>Next</button>
                </li>
            </ul>
        </nav>
    )
}

export default NavButtons