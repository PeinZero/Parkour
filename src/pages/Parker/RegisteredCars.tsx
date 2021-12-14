import { Fragment } from 'react'
import {Link} from 'react-router-dom'

import styles from './RegisteredCars.module.css';
import Button from '../../components/UI/Button/Button';
import Anchor from '../../components/UI/Anchor/Anchor';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AccordionBox from '../../components/UI/AccordionBox/AccordionBox';
import AccordionHeader from '../../components/UI/AccordionBox/AccordionHeader/AccordionHeader';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useAppSelector } from '../../store/hooks';

const RegisteredCars = () => {

    const userCarList = useAppSelector(state => state.user.parker.cars);
    console.log(userCarList);

    const btnStyle = {
        fontSize: '12px'
    }

    const btnStyle2 = {
        fontSize: '18px'
    }
    return (
        <Fragment>
            <div className={styles['header']}>
                <Link to="/" className={styles['back']}> <ArrowBackIosNewIcon/> </Link>
                <h3>My Cars</h3>
            </div>

            <div className={styles['carList']}>
                <AccordionBox header={<AccordionHeader 
                    name={"Corolla"}
                    color={"White"}
                    numPlate={"AUD-208"}
                />}>
                    <div className={styles['accordionDetails']}>
                        <div></div>
                        <div className={styles['buttons']}>
                            <Button className="primary" style={btnStyle}> Set as Default</Button>
                            <Button className="delete-icon" style={btnStyle2}> 
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
                            <Button className="primary" style={btnStyle}> Set as Default</Button>
                            <Button className="delete-icon" style={btnStyle2}> 
                                <DeleteOutlineRoundedIcon/>
                            </Button>
                        </div>
                    </div>
                </AccordionBox>
            </div>

            <div className={styles['registerCar']}>
                <div>
                    <Anchor path="/page/registerCar"> <AddCircleIcon/> </Anchor>
                </div>
            </div>

            
        </Fragment>
    )
}

export default RegisteredCars
