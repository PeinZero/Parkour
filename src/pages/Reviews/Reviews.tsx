import {Fragment} from 'react'
import {useLocation, useNavigate} from 'react-router-dom';

import Header from '../../components/UI/Header/Header'
import Review from './Review/Review';

import styles from './Reviews.module.css'

const Reviews = () => {
  const navigate = useNavigate();
  const {state}:any = useLocation();
  const {reviews} = state;
  const {spotDetails} = state;

  const renderedReviews = reviews.map( (review, index) => {
    console.log(review);

    let backGround = false
    if(index%2 !== 0){
      backGround = true
    }
    return(
      <Review key={index} details={review} backGround={backGround} /> 
    )
  })

  const navigateHandler = () => {
    navigate('/parker/bookSpot', { state: spotDetails})
  }
 
  return (
    <Fragment>
      <Header backLink="#" content="Reviews" className="small" navigateHandler={navigateHandler} data/>
      <div className={styles['reviewsList']}>
        {reviews.length > 0  && renderedReviews}
        {reviews.length <= 0 && <p> No reviews available</p>}
        </div>
      
    </Fragment>
  )
}

export default Reviews