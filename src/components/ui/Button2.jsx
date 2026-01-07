import styles from './Button2.module.css';
const BTN_CONFIG_CLASS = {
    filled: styles.filledButton,
    tonal: styles.tonalButton,
    text: styles.textButton,
}

function Button2(props) {
    const config = {
        content: props.content,
        handleClick: props.handleClick,
    };
    
    if(props.style) {config.className = BTN_CONFIG_CLASS[props.style]};
    if(props.type) {config.type = props.type}; 

    console.log(config);

    return (
        <button 
            type={config.type}
            className={config.className}
            onClick={config.handleClick}
        >
            {config.content}
        </button>
    );
}

export default Button2;
