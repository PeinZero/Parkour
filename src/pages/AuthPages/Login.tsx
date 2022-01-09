import { Fragment } from 'react'
import { Link } from "react-router-dom";
import { useAppDispatch } from '../../store/hooks';
import {sendLoginData} from '../../store/Authentication/authenticationActions';

import styles from './Login.module.css'

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Header from '../../components/UI/Header/Header';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Login: React.FC = () => {
    const dispatch = useAppDispatch();

    const formSubmitHandler = (e) => {
        e.preventDefault();
        
        dispatch(sendLoginData({
            phone: e.target.phone.value,
            password: e.target.password.value,
        })) 
    }

    return (
        <Fragment>
            <Header backLink="/" content="Login"/>
            <form onSubmit = {formSubmitHandler} className={styles['form']}>
                <Input label="Phone Number" name="phone" type="text" 
                       placeholder="03158542543"
                />
                <Input label="Password" name="password" type="password" />
                <Button btnClass="primary">Login</Button>
            </form>
        </Fragment>
    )
}

// interface LoginProps {
//     onLogin: (event: React.FormEvent<HTMLInputElement>, authData: {}) => void
// }

export default Login
