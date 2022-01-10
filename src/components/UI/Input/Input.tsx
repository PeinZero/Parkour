import styles from './Input.module.css'

const Input = (props) => {
    return (
        <div className={`${styles['formControl']} ${props.className}`} >
            <label htmlFor={props.name}>{props.label}</label>
            <input 
                type = {props.type}
                name = {props.name} 
                placeholder = {props.placeholder || ''}
                value = {props.value}
                onChange={props.onChange}
            />
        </div>
    )
}

export default Input
