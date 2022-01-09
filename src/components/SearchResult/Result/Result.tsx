import { useState } from 'react'
import styles from './Result.module.css'
import Ripple from '../../UI/Button/Ripple/Ripple'

const Result = (props) => {
    const [hovered, setHovered] = useState(false);

    const clickHandler = () => {
        props.selectHandler(props.name)
    }

    const changeBackgroundHandler = (e) => {
       setHovered(!hovered);
    }

    return (
        <Ripple className={`${styles['result']} ${hovered && styles['hovered']}`} onClick = {clickHandler} onMouseEnter={changeBackgroundHandler} onMouseLeave={changeBackgroundHandler}>
            <h4> {props.name} </h4>
            <p> {props.address} </p>
        </Ripple>
    )
}

export default Result
