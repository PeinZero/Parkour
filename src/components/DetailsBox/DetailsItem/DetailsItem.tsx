import styles from "./DetailsItem.module.css";

const DetailsItem = (props) => {
    return (
        <li>
            <div className={styles['infoType']}> {props.label} </div>
            <div className={styles['info']}> {props.info} </div>
        </li>
    )
}

export default DetailsItem
