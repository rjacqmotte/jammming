import styles from './Menu.module.css'

function Menu(props) {
    return (
        <div className={styles.menuContainer}>
        <nav className={styles.menu}>
            <ul className={styles.menuList}>
                <li className={ props.number === 1 ? styles.menuItemIsActive : styles.menuItem}>1</li>
                <li className={ props.number === 2 ? styles.menuItemIsActive : styles.menuItem}>2</li>
                <li className={ props.number === 3 ? styles.menuItemIsActive : styles.menuItem}>3</li>
                <li className={ props.number === 4 ? styles.menuItemIsActive : styles.menuItem}>4</li>
            </ul>
        </nav>
        <h2 className={styles.menuTitle}>{props.title}</h2>
        </div>
    )
}

export default Menu