import styles from './SearchBar.module.css'

function SearchBar() {
    return (
            <form className={styles.searchBar}>
                <input placeholder='cherche une chanson pour ta playlist'></input>
                <button>Search</button>
            </form>

    )
}

export default SearchBar