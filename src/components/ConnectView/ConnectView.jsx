import styles from './ConnectView.module.css';

function ConnectView(props) {
    return (
        <div className={styles.connectViewContainer}>
            <h2>Connect your account to start</h2>
            <Button2 
                style='filled' 
                content='Connect LastFM'
            />
        </div>
    );
}

export default ConnectView;