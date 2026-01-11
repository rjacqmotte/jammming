import styles from './ConnectView.module.css';
import Button2 from '../ui/Button2';

function ConnectView(props) {
    return (
        <div className={styles.connectViewContainer}>
            <h2 className={styles.connectViewTitle} >Connect to your LastFm account to start</h2>
            <Button2 
                style='filled' 
                content='Connect'
                handleClick={props.onClickConnectButton}
            />
        </div>
    );
}

export default ConnectView;