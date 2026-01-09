import styles from './Footer.module.css';
import Button2 from '../ui/Button2';

const FOOTER_CONFIG = { 
    connect: {},
    searchBar: { 
        classVariant: styles.justifyEnd,
        buttons: [
            {
                content: 'Show last results',
                onClick: 'nextState',
            }
        ],
    },
    trackList: {
        classVariant: styles.justifyStart,
        buttons: [
            {        
                content: 'Make another search',
                onClick: 'previousState',
            }
        ],
    },
    playlist: {
        classVariant: styles.justifyStart,
        buttons: [
            {        
                content: 'Back',
                onClick: 'previousState',
            }
        ],
    },
    saveForm: {},
};


function Footer(props) {
    const config = FOOTER_CONFIG[props.appState.view];

    console.log('dans Footer,');
    console.log('props.appState vaut:');
    console.log(props.appState);
    console.log('props.onClickNavButtons vaut:');
    console.log(props.onClickNavButtons);
    
    console.log('props.onClickNavButtons[0] vaut:');
    console.log(props.onClickNavButtons[0]);

    console.log('config.onClick vaut:');
    console.log(config.onClick);

    
    return (
        <footer className={`${styles.footer} ${config.classVariant}`}>
          {config.buttons?.map((button, index) => (
            <Button2 
              key={index}
              style='text'
              content={button.content}
              handleClick={
                  button.onClick === 'nextState' ? props.onClickNavButtons[0] : props.onClickNavButtons[1]
              } 
            />
          ))}
        </footer>
    );
}

export default Footer;