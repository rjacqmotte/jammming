import styles from './SearchBarView.module.css';

function SearchBarView(props) {
  return (
    <form className={styles.searchBar} onSubmit={props.onSubmit}>
      <input
        id="searchBar"
        type="text"
        onChange={props.handleUserInput}
        value={props.inputValue}
        placeholder="cherche une chanson pour ta playlist"
      ></input>
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBarView;
