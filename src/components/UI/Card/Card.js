import styles from './Card.module.css';

const Card = (props) => {
  return (
    <div className={`${styles['CardBox']} ${props.className}`}>
      {props.children}
    </div>
  )
}

export default Card