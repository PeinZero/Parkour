import { Fragment } from 'react'

import styles from './Home.module.css'

import Anchor from '../../components/UI/Anchor/Anchor';
import Button from '../../components/UI/Button/Button';

const Home = () => {
    return (
        <Fragment>
            <div className={styles['wrapper']}>
                <div className={styles['topBox']}>
                    <div className={styles['heading']}>
                        <div>Welcome to</div>
                        <div className={styles['name']}>
                            Parkour
                            <span>!</span>
                        </div>
                    </div>
                    <p>A parking application which assists users in finding spots for parking near your destination.</p>
                    <p>You can also become a Spot provider and sell a parking spot you own instead!</p>
                </div>
                <div></div>
                <div className={styles['bottomBox']}>
                    <Anchor className="primary" path="/login">
                       Login
                    </Anchor>
                    <Anchor className="primary-invert" path="/signup">
                        Register
                    </Anchor>
                </div>
            </div>
        </Fragment>
    )
}

export default Home
