import styles from './Button.module.css';

const BUTTON_CONFIG = {
  normal: { content: '+', className: styles.trackAddButton },
  isSelected: { content: 'V', className: `${styles.trackButtonAdd} ${styles.trackButtonSelected}` }
};

function Button({ state = 'isSelected' }) {
  const config = BUTTON_CONFIG[state];
  return <button className={config.className}><span>{config.content}</span></button>;
}

export default Button;