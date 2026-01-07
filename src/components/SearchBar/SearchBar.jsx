import styles from './SearchBar.module.css';

function SearchBar(props) {
  return (
    <div className={styles.searchContainer}>
      <h2 className={styles.searchTitle}>Find a song for your playlist</h2>
      <form className={styles.searchBar} onSubmit={props.onSearch}>
        <input
          id="searchBar"
          type="text"
          onChange={props.onSearchChange}
          value={props.searchValue}
          placeholder="cherche une chanson pour ta playlist"
        ></input>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;
