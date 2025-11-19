import styles from './Header.module.css'

function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.header__title}>Jammming</h1>
            <h2 className={styles.header__subtitle}>Playlists Maker</h2>
        </header>
    );
}

export default Header;