import { useEffect, useState, Fragment } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';

import { getUserByRole } from '../../../store/User/userActions';
import { convertTimeToString } from '../../../helper/timeFunctions';

import styles from './RequestDetails.module.css';

import DetailsBox from '../../../components/DetailsBox/DetailsBox';
import DetailsItem from '../../../components/DetailsBox/DetailsItem/DetailsItem';
import Header from '../../../components/UI/Header/Header';
import Button from '../../../components/UI/Button/Button';
import Loader from '../../../components/UI/Loader/Loader';

import RoomIcon from '@mui/icons-material/Room';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']

const RequestDetails = (props) => {
  console.log("REQUEST DETAILS RUNNING!");
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userRoleParker = useAppSelector(state => state.user.currentRoleParker);
  const [parker, setParker] = useState(null);

  const {state:requestInfo}:any = useLocation();
  let {bookingRequestor, car, spot, day, slots, message, spotOwner, status} = requestInfo;

  const {addressLine1, addressLine2, nearestLandmark, pricePerHour, comment, location} = spot;

  let reviewedId = bookingRequestor;
  if(userRoleParker){
    reviewedId = spotOwner
  }

  const address = (
    <>
      <p>{addressLine1}</p>
      <p>{addressLine2}</p>
    </>
  );

  let userId = bookingRequestor;
  if(userRoleParker){
    userId = spotOwner
  }

  let parkerName = null, parkerRating;
  if(parker){
    parkerName = parker.name;
    parkerRating = parker.rating < 0 ? "Not Rated" : parker.rating;
  }

  const renderedSlots = slots.map(slot => {
    const startTime = convertTimeToString(new Date(slot.startTime));
    const endTime = convertTimeToString(new Date(slot.endTime));

    return(
      <p key={slot._id}> {startTime} - {endTime} </p>
    )
  })

  const startBookingHandler = () => {
    const destination = {
      lat: location.coordinates[1],
      lng: location.coordinates[0]
    } 
    navigate("/parker/intransit", {state: {destination, car}}) 
  }

  const viewReviewsHandler = () => {
    navigate("/reviews", { state: { details: requestInfo, reviewedId: reviewedId  } });
  }

  useEffect( ()=> {
    dispatch(getUserByRole(userId))
      .then(fetchedUser => {
        const user = fetchedUser.user;
        let rating = user.parker.cumulativeRating;

        if(userRoleParker){
          rating = user.seller.cumulativeRating;
        }

        const updatedUser = {
          name: user.name,
          rating: rating,
        }

        setParker(updatedUser);
      })
  }, [dispatch, userId, userRoleParker])

  return (
    <Fragment>
      {!parker && <Loader screen= {"subScreen"} size={"60"} />}
      {parker &&
        <div className={styles['spotDetails']}>
          <Header backLink='/bookingRequest' content='Request Details' className='small' />
          <br />
          <div className={styles['details']}>
            <DetailsBox
              boxClass='primary'
              name={parkerName}
              rating={parkerRating}
              viewReviews={viewReviewsHandler}>
            </DetailsBox>
            <DetailsBox
              title='location'
              icon={<RoomIcon />}
              iconLink={'/'}
              iconText='View on map'
            >
              <ul className={styles['spotInfo']}>
                <DetailsItem label='Address' info={address} />
                <DetailsItem
                  label='Nearest Landmark'
                  info={nearestLandmark}
                />
                <DetailsItem
                  label='Price Per Hour'
                  info={pricePerHour}
                />
                <DetailsItem label='Comment' info={comment} />
              </ul>
            </DetailsBox>

            <DetailsBox title='Booking Details' className={styles['bookingDetails']}>
              <div className={styles['car']}>
                <div className={styles['carName']}>
                  <h3>{car.make} {car.model}</h3>
                </div>
                <div className={styles['carDetails']}>
                  <p>{car.numberPlate}</p>
                  &bull;
                  <p>{car.color}</p>
                  &bull;
                  <p>{car.prodYear}</p>
                </div>
              </div>

              <div className={styles['timeSlot']}>
                <div  className={styles['day']} > {`${ DAYS[new Date(day).getDay()]}${","} ${day}`} </div>
                {renderedSlots}
              </div>

              <div className={styles['message']}>
                <h3>Message</h3>
                <p>{message}</p>  
              </div>

               
            </DetailsBox>

            {userRoleParker && 
              // status === "pending" ? true : false
              <Button type='button' btnClass='primary' onClick={startBookingHandler} disabled={false}> 
                Preview Route
              </Button>
            }
            {!userRoleParker && 
              <div className={styles['sellerButtons']}>
                <Button type='button' btnClass='negative-outline' size="small" onClick={startBookingHandler}> 
                  Reject
                </Button>
                <Button type='button' btnClass='primary' size="small" onClick={startBookingHandler}> 
                  Accept
                </Button>
              </div>
            }
          </div>
        </div>
      }
    </Fragment>
  );
};

export default RequestDetails;
