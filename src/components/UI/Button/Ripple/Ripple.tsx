import styles from './Ripple.module.css';
import { ButtonBase } from '@material-ui/core';

const Ripple = (props) => {
    return (
        <ButtonBase className={`${styles['Ripple']} ${props.className}`} type={props.type || 'submit'} onClick={props.onClick} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave}>
            {props.children}
        </ButtonBase>
    )
}

export default Ripple
