import { Fragment } from 'react';
import { Link } from "react-router-dom";
import styles from './RegisterCar.module.css'

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const RegisterCar = () => {
    const formSubmitHandler = (e) => {
        e.preventDefault();
    }


    return (
        <Fragment>
            <div className={styles['wrapper']}>
                <div className={styles['header']}>
                        <Link to="/page/registeredCars" className={styles['backLink']}>
                            <ArrowBackIosNewIcon className={styles['back']} sx={{ fontSize: 36 }}/>
                        </Link>
                        <h1>Register Car</h1>
                </div>
                <form onSubmit={formSubmitHandler} className={styles['form']}> 
                    <Input label="Car Registration Number" name="numberPlate" type="text" 
                        placeholder="e.g. ABC-123" className={styles["registerCarFormControl"]}
                    />
                    <Input label="Make" name="make" type="text" 
                        placeholder="e.g. Toyota" className={styles["registerCarFormControl"]}
                    />
                    <Input label="Model" name="model" type="text" 
                        placeholder="e.g. Corolla" className={styles["registerCarFormControl"]}
                    />
                    <Input label="Color" name="color" type="text" 
                        placeholder="e.g. Black" className={styles["registerCarFormControl"]}
                    />
                    <Input label="Year" name="year" type="text" 
                        placeholder="e.g. 2019" className={styles["registerCarFormControl"]}
                    />
                    <Input label="Mileage (Optional)" name="mileage" type="text" 
                        placeholder="e.g. 12" className={styles["registerCarFormControl"]}
                    />
                    
                    <Button style={{fontSize: '13px'}}>Register Car</Button>
                </form>
            </div>
        </Fragment>
    )
}

export default RegisterCar
