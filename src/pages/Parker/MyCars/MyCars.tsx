import { Fragment } from 'react'

import styles from './MyCars.module.css';
import Button from '../../../components/UI/Button/Button';
import Anchor from '../../../components/UI/Anchor/Anchor';
import Header from '../../../components/UI/Header/Header';
import Ripple from '../../../components/UI/Button/Ripple/Ripple';
import AccordionBox from '../../../components/UI/AccordionBox/AccordionBox';
import AccordionHeader from '../../../components/UI/AccordionBox/AccordionHeader/AccordionHeader';

import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const RegisteredCars = () => {
    return (
        <Fragment>
            <Header backLink="/" content="My Cars" className="small"/>

            <div className={styles['carList']}>
                <AccordionBox header={<AccordionHeader 
                    name={"Corolla"}
                    color={"White"}
                    numPlate={"AUD-208"}
                />}>
                    <div className={styles['accordionDetails']}>
                        <div></div>
                        <div className={styles['buttons']}>
                            <Button btnClass="primary" size="small"> Set as Default</Button>
                            <Button btnClass="delete-icon" size="small"> 
                                <DeleteOutlineRoundedIcon/>
                            </Button>
                        </div>
                    </div>
                </AccordionBox>

                <AccordionBox header={<AccordionHeader 
                    name={"Alto"}
                    color={"Black"}
                    numPlate={"BCD-109"}
                />}>
                    <div className={styles['accordionDetails']}>
                        <div></div>
                        <div className={styles['buttons']}>
                            <Button btnClass="primary" size="small"> Set as Default</Button>
                            <Button btnClass="delete-icon" size="small"> 
                                <DeleteOutlineRoundedIcon/>
                            </Button>
                        </div>
                    </div>
                </AccordionBox>
            </div>

            <div className={styles['registerCar']}>
                <Anchor path="/parker/registerCar">
                    <Ripple>
                        <AddCircleIcon/> 
                    </Ripple>
                </Anchor>
            </div>

            
        </Fragment>
    )
}

export default RegisteredCars
