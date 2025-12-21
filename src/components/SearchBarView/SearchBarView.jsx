import styles from './SearchBarView.module.css';

function SearchBarView(props) {
  return (
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
  );
}

export default SearchBarView;
