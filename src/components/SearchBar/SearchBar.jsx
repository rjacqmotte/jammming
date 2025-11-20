import styles from './SearchBar.module.css'

function SearchBar() {
    return (
        <div className={styles.searchBar__container}>
            <form className={styles.searchBar}>
                <input placeholder='cherche une chanson pour ta playlist'></input>
                <button>Search</button>
            </form>
        </div>
    )
}

export default SearchBar