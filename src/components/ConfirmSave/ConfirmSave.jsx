import Button2 from "../ui/Button2";
import styles from './ConfirmSave.module.css';

function ConfirmSave(props) {
    return(
        <div className={styles.confirmSaveContainer}>
            <h2 className={styles.confirmSaveTitle}>Féliciatation, ta musique est enregistrée sur ton compte Last FM.</h2>
            <Button2 style='filled' content='Nouvelle Recherche' handleClick={props.onChangeView} />
        </div>
    );
}

export default ConfirmSave;