import styles from './Anchor.module.css';
import { Link } from 'react-router-dom';
import Button from '../Button/Button'

const Anchor = (props) => {
    return (
        <Link to={props.path} className={styles['Link']}>
            <Button className={props.className}> {props.children} </Button>
        </Link>
        
    )
}

export default Anchor
