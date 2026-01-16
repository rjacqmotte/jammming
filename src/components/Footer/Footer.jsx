import styles from './Footer.module.css';
import Button2 from '../ui/Button2';
import { useEffect, useState } from 'react';

const FOOTER_CONFIG = { 
    connect: {
        classVariant: styles.justifyBetween,
        isHidden: true,
        buttons: [
            {        
                content: 'Back',
                onClick: 'previousState',
            }, {        
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
            }
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
            }, {        
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

    // gèrer l'état affiché ou non
    const (isHidden, setIsHidden) = useState(false);

    // utilise .isHidden de FOOTER_CONFIG pour modifier l'état isHidden
    useEffect(() => {
        function isItHidden() {
            let boolean;
            if(props.appState.view === 'searchBar') {
                if(Boolean(props.trackList)) {
                    boolean = false;
                } else {
                    boolean = true;
                }
            } else {
                boolean = config.isHidden;
            }
            return boolean;
        }
        setIsHidden(isItHidden());
    }, [props.trackList, props.appState.view]);

    console.log('dans Footer,');
    console.log('props.appState vaut:');
    console.log(props.appState);
    console.log('props.onClickNavButtons vaut:');
    console.log(props.onClickNavButtons);
    
    console.log('props.onClickNavButtons[0] vaut:');
    console.log(props.onClickNavButtons[0]);

    console.log('config.onClick vaut:');
    console.log(config.buttons);

    
    return (
        <footer className={ isHidden  ? styles.isHidden : `${styles.footer} ${config.classVariant}`}>
          {config.buttons?.map((button, index) => (
            <Button2 
              key={index}
              style='text'
              content={button.content}
              handleClick={clickHandlers[button.onClick]}
            />
          ))}
        </footer>
    );
}

export default Footer;