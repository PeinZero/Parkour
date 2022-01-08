import styles from './Result.module.css'
import Ripple from '../../UI/Button/Ripple/Ripple'

const Result = (props) => {
    return (
        <Ripple className={styles['result']}>
            <h4> {props.name} </h4>
            <p> {props.address} </p>
        </Ripple>
    )
}

export default Result
