import styles from './Footer.module.css';
import Button2 from '../ui/Button2';

const FOOTER_CONFIG = { 
    connect: {},
    searchBar: { 
        classVariant: styles.justifyEnd,
        content: ['Show last results'],
    },
    trackList: {},
    playlist: {},
    saveForm: {},
};

const config = FOOTER_CONFIG['searchBar'];

function Footer() {
    return (
        <footer className={`${styles.footer} ${config.classVariant}`}>
          <Button2 style='text' content={config.content[0]} />
        </footer>
    );
}

export default Footer;