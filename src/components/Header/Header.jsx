import styles from './Header.module.css';

function Header() {
  const test = import.meta.env.VITE_TEST || 'Test par défaut';

  console.log('Toutes les variables:', import.meta.env);
  console.log('Test:', import.meta.env.REACT_APP_TEST);

  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>{test}</h1>
      <h2 className={styles.headerSubtitle}>Playlists Maker</h2>
    </header>
  );
}

export default Header;
