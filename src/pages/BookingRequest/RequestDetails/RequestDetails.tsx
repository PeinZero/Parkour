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

const RequestDetails = (props) => {
  console.log("REQUEST DETAILS RUNNING!");
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userRoleParker = useAppSelector(state => state.user.currentRoleParker);
  const [parker, setParker] = useState(null);

  const {state:requestInfo}:any = useLocation();
  let {bookingRequestor, car, spot, day, slots, message, spotOwner, status} = requestInfo;

  const {addressLine1, addressLine2, nearestLandmark, pricePerHour, comment, location} = spot;

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

  let parkerName = null, parkerPhone = null, parkerRating = null, parkerReviews = null;
  if(parker){
    parkerName = parker.name;
    parkerPhone = parker.phone;
    parkerReviews = parker.reviews;
    parkerRating = parker.rating < 0 ? "Not Rated" : parker.rating;
  }

  const renderedSlots = slots.map(slot => {
    const startTime = convertTimeToString(new Date(slot.startTime));
    const endTime = convertTimeToString(new Date(slot.endTime));

    return(
      <li key={slot._id}> {startTime} - {endTime} </li>
    )
  })

  const startBookingHandler = () => {
    const destination = {
      lat: location.coordinates[1],
      lng: location.coordinates[0]
    }
    navigate("/submitReview") 
    // navigate("/parker/intransit", {state: destination}) 
  }

  useEffect( ()=> {
    dispatch(getUserByRole(userId))
      .then(fetchedUser => {
        const user = fetchedUser.user;
        let rating = user.parker.cumulativeRating;
        let reviews = user.parker.reviews;

        if(userRoleParker){
          rating = user.seller.cumulativeRating;
          reviews = user.seller.reviews;
        }

        const updatedUser = {
          name: user.name,
          phone: user.phone,
          rating: rating,
          reviews: reviews
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
            ></DetailsBox>
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

            <DetailsBox title='Car' className={styles['carSelectBox']}>
              <h3>{car.make} {car.model}</h3>
              <p>{car.numberPlate}</p>
              <p>{car.color}</p>
              <p>{car.prodYear}</p>
            </DetailsBox>

            <DetailsBox
              title='Requested Time Slot'
              className={styles['availibilityBottom']}
            >
              <div  className={styles['day']} > {day} </div>
              <div  className={styles['slots']} >
                <h3>Slots</h3>
                <ul>
                  {renderedSlots}
                </ul>
              </div>
              
            </DetailsBox>
            {/* <DetailsBox boxClass="Images"></DetailsBox> */}
            <DetailsBox title='Message' className={styles['messageBox']}>
              {message}
            </DetailsBox>
            {userRoleParker && 
              // status === "pending" ? true : false
              <Button type='button' btnClass='primary' onClick={startBookingHandler} disabled={false}> 
                Start
              </Button>
            }
          </div>
        </div>
      }
    </Fragment>
  );
};

export default RequestDetails;
