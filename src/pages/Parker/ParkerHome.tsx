import { Fragment } from 'react';
import {useAppDispatch } from '../../store/hooks';
import { logout } from "../../store/authenticationActions"

import styles from './ParkerHome.module.css'

import ParkerMap from '../../components/ParkerMap/ParkerMap'
import Button  from '../../components/UI/Button/Button';


const ParkerHome: React.FC = () => {
    const dispatch = useAppDispatch();

    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <Fragment>
            <div className={styles['map']}>
                {/* <ParkerMap /> */}
            </div>
            <Button onClick={logoutHandler}> Logout </Button>
        </Fragment>
    );
}

export default ParkerHome;
