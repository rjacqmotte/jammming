import styles from './SearchBar.module.css'
import { useState } from 'react'

function SearchBar() {
    const [userInput, setUserInput] = useState()

    function handleUserInput(e) {
        setUserInput(e.target.value)
    }

    function handleSubmit() {
        console.log('handlesubmit acitf')
        e.preventDefault()
        alert('test')
    }

    return (
            <form className={styles.searchBar} onSubmit={handleSubmit}>
                <input id="searchBar" type="text" onChange={handleUserInput} value={userInput} placeholder='cherche une chanson pour ta playlist'></input>
                <button type="submit">Search</button>
            </form>

    )
}

export default SearchBar