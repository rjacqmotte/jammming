import styles from './Menu.module.css'

function Menu(props) {
    return (
        <div className={styles.menuContainer}>
        <nav className={styles.menu}>
            <ul className={styles.menuList}>
                <li className={styles.menuItem}>1</li>
                <li className={styles.menuItem}>2</li>
                <li className={styles.menuItem}>3</li>
                <li className={styles.menuItem}>4</li>
            </ul>
        </nav>
        <h2 className={styles.menuTitle}>{props.title}</h2>
        </div>
    )
}

export default Menu