import { Fragment } from 'react';
import { Link } from "react-router-dom";
import { useAppDispatch } from '../../store/hooks';
import { sendSignupData } from '../../store/Authentication/authenticationActions';

import styles from './Signup.module.css'

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Signup: React.FC = ()=> {
    const dispatch = useAppDispatch();

    const formSubmitHandler = (e) => {
        e.preventDefault();
        
        dispatch(sendSignupData({
            name: e.target.name.value,
            phone: e.target.phone.value,
            email: e.target.email.value,
            password: e.target.password.value,
            confirmPassword: e.target.confirmPassword.value,
        })) 
    }

    return (
        <Fragment>
            <div className={styles['wrapper']}>
                <form onSubmit={formSubmitHandler} className={styles['form']}> 
                    <Link to="/" className={styles['backLink']}>
                        <ArrowBackIosNewIcon className={styles['back']} sx={{ fontSize: 36 }}/>
                    </Link>
                    <h1>Register</h1>

                    <Input label="Full Name" name="name" type="text" 
                        placeholder="Mahad Khalid"
                    />
                    <Input label="Phone Number" name="phone" type="text" 
                        placeholder="03158542543"
                    />
                    <Input label="Email" name="email" type="email" 
                        placeholder="mahadzx@gmail.com"
                    />
                    <Input label="Password" name="password" type="password" />
                    <Input label="Confirm Password" name="confirmPassword" type="password" />

                    <Button>Register</Button>

                    <p>By registering, you agree to Parkour’s <Link className={styles['Link']} to="">Terms of Service</Link> and <Link className={styles['Link']} to="">Privacy Policy</Link></p>
                </form>
            </div>
        </Fragment>
    )
}


// interface SignupProps {
//     onSignup: (event: React.FormEvent<HTMLInputElement>, authData: {}) => void
// }

export default Signup
