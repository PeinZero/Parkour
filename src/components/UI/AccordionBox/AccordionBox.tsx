import styles from './AccordionBox.module.css';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AccordionBox = (props) => {
    return (
        <Accordion className={styles['car']}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className={styles['carHeader']}
            >
                {props.header}
            </AccordionSummary>
            <AccordionDetails>
                    {props.children}
            </AccordionDetails>
        </Accordion>
    )
}

export default AccordionBox
