import { Fragment, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { logout } from "../../store/Authentication/authenticationActions"
import { fetchUser } from "../../store/User/userActions"

import styles from './ParkerHome.module.css'

import ParkerMap from '../../components/ParkerMap/ParkerMap'
import Button  from '../../components/UI/Button/Button';

import Hamburger from '../../components/UI/Hamburger/Hamburger';
import RoomIcon from '@mui/icons-material/Room';
import SearchIcon from '@mui/icons-material/Search';
import {ButtonBase} from '@material-ui/core';

const ParkerHome: React.FC = () => {
    const dispatch = useAppDispatch();
    const userId = useAppSelector(state => state.authentication.userId);
    const token = useAppSelector(state => state.authentication.token);
    
    useEffect(() => {
        dispatch(fetchUser(userId, token));
    }, []);

    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <Fragment>
            <Hamburger/>
            <div className={styles['map']}>
                {/* <ParkerMap /> */}
            </div>
            <Button onClick={logoutHandler}> Logout </Button>
            <div className={styles['searchBox']}>
                <div className={styles['searchTopBox']}>
                    <h4>Where do you want to park?</h4>
                    <p>Tip: We search for parking spots near the pin you drop</p>
                </div>
                <div className={styles['searchBottomBox']} >
                        <ButtonBase className={styles['searchBar']}>
                            <div className={styles['searchIcon']}>
                                    <SearchIcon/>
                            </div>
                            <div>Enter your destination</div>
                        </ButtonBase>
                    <div className={styles['recents']}>
                        <ButtonBase className={styles['recent']}>
                            <div className={styles['icon']}>
                                <RoomIcon/>
                            </div>
                            <div className={styles['location']}>
                                <div className={styles['locationName']}>
                                    Fast
                                </div>
                                <div className={styles['locationAddress']}>
                                    Korangi - Karachi - Sindh
                                </div>
                            </div>
                        </ButtonBase>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ParkerHome;
