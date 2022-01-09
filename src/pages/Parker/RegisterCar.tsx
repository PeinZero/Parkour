import { Fragment } from 'react';
import { Link } from "react-router-dom";
import styles from './RegisterCar.module.css'

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Input2Column from '../../components/UI/Input/Input2Column/Input2Column';
import Header from '../../components/UI/Header/Header';

const RegisterCar = () => {
    const formSubmitHandler = (e) => {
        e.preventDefault();
    }


    return (
        <Fragment>
            <div className={styles['addCar']}>
                <Header backLink="/" content="Add A Car" className="small"/>
                <form onSubmit={formSubmitHandler} className={styles['form']}> 
                    <p>Add a car to use for parking</p>
                    <Input label="Car Registration Number *" name="numberPlate" type="text" 
                        placeholder="ABC-123" className={styles["registerCarFormControl"]}
                    />
                    <Input label="Make *" name="make" type="text" 
                        placeholder="Toyota" className={styles["registerCarFormControl"]}
                    />
                    <Input label="Model *" name="model" type="text" 
                        placeholder="Corolla" className={styles["registerCarFormControl"]}
                    />
                    <Input label="Color *" name="color" type="text" 
                        placeholder="Black" className={styles["registerCarFormControl"]}
                    />
                    <Input label="Year" name="year" type="text" 
                        placeholder="2019" className={styles["registerCarFormControl"]}
                    />
                    <Input2Column label="Mileage" name="mileage" type="text" 
                        placeholder="12" className={styles["registerCarFormControl"]}
                        sideContent="km/litre"
                    />
                    
                    <Button style={{fontSize: '13px'}}>Register Car</Button>
                </form>
            </div>
        </Fragment>
    )
}

export default RegisterCar
