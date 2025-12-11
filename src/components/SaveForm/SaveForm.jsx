import styles from './SaveForm.module.css';

function SaveForm(props) {
  return (
    <div className={styles.saveFormContainer}>
      <form className={styles.saveForm} onSubmit={props.onClickConnectButton}>
        <div className={styles.saveFormBlock}>
          <label htmlFor="name" className={styles.saveFormLabel}>
            Name
          </label>
          <input id="name" type="text" className={styles.saveFormInput} />
        </div>
        <div className={styles.saveFormBlock}>
          <label htmlFor="email" className={styles.saveFormLabel}>
            Email
          </label>
          <input id="email" type="email" className={styles.saveFormInput} />
        </div>
        <div className={styles.saveFormBlock}>
          <label htmlFor="password" className={styles.saveFormLabel}>
            Password
          </label>
          <input
            id="password"
            type="password"
            className={styles.saveFormInput}
          />
        </div>
        <button className={styles.saveFormBtn} type="submit">
          Connect to Last FM
        </button>
      </form>
    </div>
  );
}

export default SaveForm;
