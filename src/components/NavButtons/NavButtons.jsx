import styles from './NavButtons.module.css'

function NavButtons(props) {
    return (
        <nav className={styles.navButtons}>
            <ul className={styles.navButtonsList}>
                <li className={styles.navButtonsItem}>
                    <button className={styles.navButtonsBtn} onClick={props.onClick[1]}>Back</button>
                </li>
                <li className={styles.navButtonsItem}>
                    <button className={styles.navButtonsBtn} onClick={props.onClick[0]}>Done</button>
                </li>
                <li className={styles.navButtonsItem}>
                    <button className={styles.navButtonsBtn} onClick={props.onClick[0]}>Next</button>
                </li>
            </ul>
        </nav>
    )
}

export default NavButtons