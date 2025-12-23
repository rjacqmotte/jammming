import styles from './Button.module.css';
import { useState } from 'react';

function handleClick() {}

const BUTTON_CONFIG = {
  normal: { content: '+', className: styles.trackButtonAdd },
  isSelected: {
    content: 'V',
    className: `${styles.trackButtonAdd} ${styles.trackButtonSelected}`,
  },
};

function Button() {
  const [statusTrackBtn, setStatusTrackBtn] = useState('isSelected');

  function handleClick() {
    setStatusTrackBtn(statusTrackBtn === 'normal' ? 'isSelected' : 'normal');
  }

  const config = BUTTON_CONFIG[statusTrackBtn];
  return (
    <button className={config.className} onClick={handleClick}>
      <span>{config.content}</span>
    </button>
  );
}

export default Button;
