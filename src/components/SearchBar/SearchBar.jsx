import styles from './SearchBar.module.css';
import Button2 from '../ui/Button2';

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
        <Button2 style={ 'text' } content={ 'Search' } type={ 'submit' } />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;
