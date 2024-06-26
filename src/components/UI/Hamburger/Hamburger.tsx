import React from 'react'
import { Fragment, useState } from 'react'
import Menu from '../../Menu/Menu'
import styles from './Hamburger.module.css'


const Hamburger = () => {
    const [clicked, setClicked] = useState(false);

    const clickHandler = () => {
        setClicked((prevState => {
            return !prevState
        }));
    }

    return (
        <Fragment>
            <div onClick={clickHandler} className={`${styles["hamburgerWrapper"]} ${clicked && styles["open"]}`}>
                <div className={`${styles["hamburger"]} ${clicked && styles["open"]}`}>
                    <div className={styles["lines"]}></div>
                </div>
            </div>
            <Menu clicked={clicked} toggleMenu={clickHandler}/>
        </Fragment>
    )
}

export default Hamburger;

