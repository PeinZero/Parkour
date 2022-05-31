import styles from './Review.module.css'

const Review = ({details, backGround}) => {
  return (
    <div className={`${styles['reviewCard']} ${backGround && styles['greyBg']}`} >
      <div className={styles['leftBox']}>
        <div className={styles['circle']}>
          <div className={styles['rating']}>
            {details.providedRating}
          </div>
        </div>
      </div>
      <div className={styles['rightBox']}>
        <div className={styles['content']}>
          <h3>{details.author.name}</h3>
          <div className={styles['text']}>
            <p>{details.text}</p>
          </div>
        </div> 
        <div className={styles['readMore']}> 
          <p>read more</p>
          <div></div>
        </div>     
      </div>
      
    </div>
  )
}

export default Review