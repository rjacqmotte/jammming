import styles from './Header.module.css';
import Button2 from '../ui/Button2';

function Header() {
  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.headerTitle}>Jammming</h1>
        <p className={styles.headerSubtitle}>Playlists Maker</p>
      </div>
      <div>
      <Button2 style="text" content="Log out" />
      <p className={styles.headerSubtitle}>LastFM</p>
      </div>
    </header>
  );
}

export default Header;
