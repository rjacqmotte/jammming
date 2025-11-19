import styles from './Menu.module.css'

function Menu() {
    return (
        <nav className={styles.menu}>
            <ul className={styles.menu__list}>
                <li className={styles.menu__item}>1</li>
                <li className={styles.menu__item}>2</li>
                <li className={styles.menu__item}>3</li>
                <li className={styles.menu__item}>4</li>
            </ul>
        </nav>
    )
}

export default Menu