import styles from './Footer.module.css';
import Button2 from '../ui/Button2';

const FOOTER_CONFIG = {
    
};

function Footer() {
    return (
        <footer className={styles.Footer}>
          <Button2 style='text' content='Show last results' />
        </footer>
    );
}

export default Footer;