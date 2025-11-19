import styles from './Container.module.css'
import Menu from '../Menu/Menu'

function Container() {
    return (
        <div className={styles.container}>
            <Menu/>
        </div>
    )
}

export default Container