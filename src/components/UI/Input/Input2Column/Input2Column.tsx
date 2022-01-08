import styles from './Input2Column.module.css'

const Input2Column = (props) => {
    return (
        <div className={`${styles['formControl']} ${props.className}`} >
            <label htmlFor={props.name}>{props.label}</label>
            <div className={styles['input2Column']}>
                <input 
                    type = {props.type}
                    name = {props.name} 
                    placeholder = {props.placeholder || ''}
                />
                <div className={styles['secondColumn']}>{props.sideContent}</div>
            </div>
            
        </div>
    )
}

export default Input2Column
