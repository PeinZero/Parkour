import {Fragment, useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../store/hooks';

import Header from '../../components/UI/Header/Header'
import Review from './Review/Review';

import { fetchReviews } from '../../store/Reviews/reviewsActions';

import styles from './Reviews.module.css'

const Reviews = () => {
  console.log("REVIEWS RUNNING!");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const {state}:any = useLocation();
  const {details, reviewedId} = state;

  const [reviews, setReviews] = useState([]);

  const renderedReviews = reviews.map( (review, index) => {
    console.log(review);

    let backGround = false
    if(index%2 !== 0){
      backGround = true
    }
    return(
      <Review key={review._id} details={review} backGround={backGround} /> 
    )
  })

  const navigateHandler = () => {
    navigate('/')
  }

  useEffect(() => {
    console.log("REVIEWS RUNNING! => useState()");
    dispatch(fetchReviews(reviewedId))
      .then( (fetchedReviews) => {
        setReviews(fetchedReviews.reviews);
      })
  }, []);
 
  return (
    <Fragment>
      <Header backLink="#" content="Reviews" className="small" navigateHandler={navigateHandler} data/>
      <div className={styles['reviewsList']}>
        {reviews.length > 0  && renderedReviews}
        {reviews.length <= 0 && <p className={styles['noReviews']}> No reviews available</p>}
        </div>
      
    </Fragment>
  )
}

export default Reviews