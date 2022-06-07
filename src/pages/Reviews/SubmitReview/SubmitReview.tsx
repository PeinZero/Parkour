import styles from './SubmitReview.module.css';

import Header from "../../../components/UI/Header/Header"
import Card from '../../../components/UI/Card/Card';
import Button from '../../../components/UI/Button/Button'
import Loader from '../../../components/UI/Loader/Loader';

import Rating from '@mui/material/Rating';

import { useNavigate, useLocation} from 'react-router-dom';
import { getUserByRole } from '../../../store/User/userActions';
import { submitReview } from '../../../store/Reviews/reviewsActions';

import { useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';


const SubmitReview = () => {
  const {state:targetUserId}:any = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [rating, setRating] = useState(2.5);

  console.log(user);

  const giveReviewHandler = (e) => {
    e.preventDefault();
    const text = e.target.textarea.value;
    dispatch(submitReview(targetUserId, text, rating))
      .then(()=> {
        navigate('/');
      })
  }

  useState(() => {
    dispatch(getUserByRole(targetUserId))
      .then((fetchedUser) => {
        setUser(fetchedUser.user)
      })
  })

  return (
    <div className={styles['rateReviewWrapper']}>
      <Header backLink="/" content="Rate and Review" className="small" />
      {!user && <Loader/>} 
      {user && 
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
              {user.name}
            </div>
            <div className={styles['Description']}>
              How was your experience ?
            </div>

            <form action="" onSubmit={giveReviewHandler}>
              <div className={styles['Rating']}>
                <Rating name="half-rating" value ={rating} precision={0.5} className={styles["ratingBar"]}  
                  onChange={(event, newValue) => { setRating(newValue)}}
                />
              </div>

              <textarea name="textarea" placeholder='Additional comments..'></textarea>

              <div className={styles['Buttons']}>
                <Button btnClass="negative-outline" type="button" onClick={()=> navigate('/')}> Not Now</Button>
                <Button btnClass="primary"> Submit</Button>
              </div>
            </form>
          </div>
        </Card> 
      }
    </div>
  )
}

export default SubmitReview