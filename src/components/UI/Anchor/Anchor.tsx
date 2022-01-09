import styles from './Anchor.module.css';
import { Link } from 'react-router-dom';
import Button from '../Button/Button'

const Anchor = (props) => {
    return (
        <Link to={props.path} className={`${styles['Link']} ${props.className}`}>
            {props.children}
        </Link> 
    )
}

export default Anchor
