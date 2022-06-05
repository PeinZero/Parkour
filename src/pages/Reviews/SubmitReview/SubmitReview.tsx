import styles from './SubmitReview.module.css';

import Header from "../../../components/UI/Header/Header"
import Card from '../../../components/UI/Card/Card';
import Button from '../../../components/UI/Button/Button'

import Rating from '@mui/material/Rating';


const SubmitReview = () => {
  return (
    <div className={styles['rateReviewWrapper']}>
      <Header backLink="/" content="Rate and Review" className="small" /> 
      <Card className={styles['card']}>
        <div className={styles['Heading']}>
          Seller Review
        </div>
        <div className={styles['Content']}>
          <div className={styles['AvatarBox']}>
            <div className={styles['Avatar']}>
              <img src="/images/mahad_profile_pic.jpg" alt="" />
            </div>
          </div>
          <div className={styles['Name']}>
            Mahad Khalid
          </div>
          <div className={styles['Description']}>
            How was your experience ?
          </div>
          <div className={styles['Rating']}>
            <Rating name="half-rating" defaultValue={2.5} precision={0.5} className={styles["ratingBar"]}/>
          </div>

          <textarea placeholder='Additional comments..'></textarea>

          <div className={styles['Buttons']}>
            <Button btnClass="negative-outline"> Not Now</Button>
            <Button btnClass="primary"> Submit</Button>
          </div>
        </div>
      </Card> 
    </div>
  )
}

export default SubmitReview