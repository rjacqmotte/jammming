import styles from './Button.module.css';

function Button() {
  return (
    <button className={styles.trackAddButton}>
      <span>+</span>
    </button>
  );
}

export default Button;
