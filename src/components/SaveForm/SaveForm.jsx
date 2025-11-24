import styles from './SaveForm.module.css'

function SaveForm() {
    return (
        <div className={styles.saveFormContainer}>
            <form className={styles.saveForm}>
                <div className={styles.saveFormBlock}>
                    <label htmlFor='name' className={styles.saveFormLabel}>Name</label>
                    <input id='name' type='text' className={styles.saveFormInput} />
                </div>
                <div className={styles.saveFormBlock}>
                    <label htmlFor='email' className={styles.saveFormLabel}>Email</label>
                    <input id='email' type='email' className={styles.saveFormInput} />
                </div>
                <div className={styles.saveFormBlock}>
                    <label htmlFor='password' className={styles.saveFormLabel}>Password</label>
                    <input id='password' type='password' className={styles.saveFormInput} />
                </div>
                <button className={styles.saveFormBtn} type='submit'>Save to Spotify</button>
            </form>

        </div>
    )
}

export default SaveForm