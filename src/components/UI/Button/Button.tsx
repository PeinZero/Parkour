import { Fragment } from "react"
import styles from './Button.module.css'

const Button = (props) => {
    return (
        <Fragment>
            <button className={`${styles['button']} ${props.className}`} type={props.type || 'submit'} onClick={props.onClick}>
                {props.children}
            </button>
        </Fragment>
    )
}

export default Button
