import styles from './AccordionHeader.module.css';
import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded';

const AccordionHeader = (props) => {
    return (
        <div className={styles['header']}>
            <div className={styles['avatar']}> 
                  <DirectionsCarRoundedIcon/>
            </div>
            <div className={styles['content']}>
                <h4>{props.name || "Corolla"}</h4>
                <div></div>
                <p>{props.color || "Black"}</p>
                <div></div>
                <p>{props.numPlate || "ABC-123"}</p>   
            </div>   
        </div>
    )
}

export default AccordionHeader
