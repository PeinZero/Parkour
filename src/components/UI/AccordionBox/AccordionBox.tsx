import styles from './AccordionBox.module.css';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import AccordionHeader from "./AccordionHeader/AccordionHeader";

const AccordionBox = (props) => {
    return (
        <Accordion className={styles['accordion']}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className={styles['header']}
            >
                <AccordionHeader spotInfo={props.spotInfo} carInfo={props.carInfo} />
            </AccordionSummary>
            <AccordionDetails className={styles['details']}>
                    {props.children}
            </AccordionDetails>
        </Accordion>
    )
}

export default AccordionBox
