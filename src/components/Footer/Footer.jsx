import styles from './Footer.module.css';
import Button2 from '../ui/Button2';

const FOOTER_CONFIG = {
  connect: {
    classVariant: styles.justifyBetween,
    isHidden: true,
    buttons: [
      {
        content: 'Back',
        onClick: 'previousState',
      },
      {
        content: 'Make another search',
        onClick: 'newSearch',
      },
    ],
  },
  searchBar: {
    classVariant: styles.justifyEnd,
    isHidden: true,
    buttons: [
      {
        content: 'Show last results',
        onClick: 'nextState',
      },
    ],
  },
  trackList: {
    classVariant: styles.justifyStart,
    isHidden: false,
    buttons: [
      {
        content: 'Make another search',
        onClick: 'newSearch',
      },
    ],
  },
  playlist: {
    classVariant: styles.justifyBetween,
    isHidden: false,
    buttons: [
      {
        content: 'Back',
        onClick: 'previousState',
      },
      {
        content: 'Make another search',
        onClick: 'newSearch',
      },
    ],
  },
  confirmSave: {
    classVariant: styles.justifyBetween,
    isHidden: true,
    buttons: [],
  },
};

function Footer(props) {
  const config = FOOTER_CONFIG[props.appState.view];
  const clickHandlers = {
    nextState: props.onClickNavButtons[0],
    previousState: props.onClickNavButtons[1],
    newSearch: props.onClickNavButtons[2],
  };

  function isItHidden() {
    let boolean;
    if (props.appState.view === 'searchBar') {
      if (props.trackList.length === 0) {
        boolean = true;
      } else {
        boolean = false;
      }
    } else {
      boolean = config.isHidden;
    }
    return boolean;
  }

  const isHidden = isItHidden();

  return (
    <footer
      className={
        isHidden ? styles.isHidden : `${styles.footer} ${config.classVariant}`
      }
    >
      {config.buttons?.map((button, index) => (
        <Button2
          key={index}
          style="text"
          content={button.content}
          handleClick={clickHandlers[button.onClick]}
        />
      ))}
    </footer>
  );
}

export default Footer;
