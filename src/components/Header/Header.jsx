import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>Jammming</h1>
      <h2 className={styles.headerSubtitle}>Playlists Maker</h2>
    </header>
  );
}

export default Header;
