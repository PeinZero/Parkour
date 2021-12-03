import { Fragment, useState } from 'react'
import styles from './Hamburger.module.css'

const Hamburger = (props) => {
    const [clicked, setClicked] = useState(false)
    const clickHandler = () => {
        setClicked(!clicked);
    }

    return (
        <Fragment>
            <div onClick={clickHandler} className={`${styles["hamburgerWrapper"]} ${clicked && styles["open"]}`}>
                <div className={`${styles["hamburger"]} ${clicked && styles["open"]}`}>
                    <div className={styles["lines"]}></div>
                </div>
            </div>
            <div className={`${styles["hamburgerBack"]} ${clicked && styles["open"]}`}>
                <div className={`${styles["name"]} ${clicked && styles["open"]}`}>Mahad Khalid</div>
            </div>
        </Fragment>
    )
}

export default Hamburger

