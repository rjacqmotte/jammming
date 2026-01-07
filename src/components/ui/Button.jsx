import styles from './Button.module.css';
import { useState } from 'react';

const BUTTON_CONFIG = {
  normal: { content: '+', className: styles.trackButtonAdd },
  isSelected: {
    content: 'V',
    className: `${styles.trackButtonAdd} ${styles.trackButtonSelected}`,
  },
  logOut: { 
    content: 'log out', 
    className: styles.logButton
  },
  logIn
};

function Button(props) {
  const [statusTrackBtn, setStatusTrackBtn] = useState('isSelected');

  function handleClick() {
    setStatusTrackBtn(statusTrackBtn === 'normal' ? 'isSelected' : 'normal');
  }

  const config = BUTTON_CONFIG[props.buttonStatus];
  return (
    <button className={config.className} onClick={props.onSelect}>
      <span>{config.content}</span>
    </button>
  );
}

export default Button;
