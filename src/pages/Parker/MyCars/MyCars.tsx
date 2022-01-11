import { Fragment } from 'react'
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { deleteCar, setDefaultCar } from '../../../store/Cars/carActions';


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
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);
    const token = useAppSelector(state => state.authentication.token);
    let cars = [];

    if(user.currentRoleParker && user.parker !== null){
        cars = user.parker.cars;
    }

    const deleteCarHandler = (carId) => {
        dispatch(deleteCar(carId, token));
    }

    const setDefaultCarHandler = (carId) => {
        dispatch(setDefaultCar(carId))
    }
    
    const carsMapped = cars.map( car => {;
        return (
            <AccordionBox key={car._id} header={<AccordionHeader 
                name={car.make}
                color={car.color}
                numPlate={car.numberPlate}
            />}>
                <div className={styles['accordionDetails']}>
                    <div></div>
                    <div className={styles['buttons']}>
                        <Button btnClass="primary" size="small" onClick={() => setDefaultCarHandler(car._id)}> Set as Default</Button>
                        <Button btnClass="delete-icon" size="small" onClick={() => deleteCarHandler(car._id)}> 
                            <DeleteOutlineRoundedIcon/>
                        </Button>
                    </div>
                </div>
            </AccordionBox>
        )
    })

    return (
        <Fragment>
            <Header backLink="/" content="My Cars" className="small"/>

            <div className={styles['carList']}>
                {carsMapped}
            </div>

            { cars.length <= 0 &&
                <p className={styles['noCars']}> No Registered Cars</p>
            }

             
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
