import { Fragment } from "react"
import styles from './Button.module.css'
import {ButtonBase} from '@material-ui/core';

const Button = (props) => {
    return (
        <ButtonBase className={`${styles['button']} ${styles[props.className]}`} type={props.type || 'submit'} onClick={props.onClick} style={props.style}>
            {props.children}
        </ButtonBase>
    )
}

export default Button
