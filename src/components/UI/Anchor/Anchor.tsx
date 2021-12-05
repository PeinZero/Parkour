import styles from './Anchor.module.css';
import {ButtonBase} from '@material-ui/core';
import { Link } from 'react-router-dom';

const Anchor = (props) => {
    return (
        <ButtonBase className={`${styles['ButtonBase']} ${props.ClassName}`}>
            <Link to={props.path} className={styles['Link']}>
                {props.children}
            </Link>
        </ButtonBase>
    )
}

export default Anchor
