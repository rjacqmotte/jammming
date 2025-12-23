import styles from './Button.module.css';

function Button({ state = 'isSelected' }) {
  switch (state) {
      case 'normal': 
      return (
          <button className={styles.trackAddButton}>
          <span>+</span>
          </button>
        );
      case 'isSelected':
         return (          
          <button className={`${styles.trackAddButton} ${styles.trackAddButtonSelected}`}>
          <span>V</span>
          </button>
        );
          default:
      return (
        <button className={styles.trackAddButton}>
          <span>+</span>
        </button>
      );
    }
}

export default Button;


/** a essayer après! 
  const BUTTON_CONFIG = {
  normal: { content: '+', className: styles.trackAddButton },
  isSelected: { content: 'V', className: `${styles.trackAddButton} ${styles.trackButtonSelected}` }
};

function Button({ state = 'normal' }) {
  const config = BUTTON_CONFIG[state];
  return <button className={config.className}><span>{config.content}</span></button>;
} */