import { useEffect, useState, Fragment } from 'react';
import { useLocation} from 'react-router-dom';
import { useAppDispatch } from '../../../store/hooks';

import { getUserByRole } from '../../../store/User/userActions';
import { convertTimeToString } from '../../../helper/timeFunctions';

import styles from './RequestDetails.module.css';

import DetailsBox from '../../../components/DetailsBox/DetailsBox';
import DetailsItem from '../../../components/DetailsBox/DetailsItem/DetailsItem';
import Header from '../../../components/UI/Header/Header';
import Button from '../../../components/UI/Button/Button';
import Ripple from '../../../components/UI/Button/Ripple/Ripple';
import Loader from '../../../components/UI/Loader/Loader';


import RoomIcon from '@mui/icons-material/Room';

const RequestDetails = (props) => {
  console.log("REQUEST DETAILS RUNNING!");
  
  const dispatch = useAppDispatch();
  const [parker, setParker] = useState(null);

  const {state:requestInfo}:any = useLocation();
  let {bookingRequestor, car, spot, day, slots, message} = requestInfo;
  const {addressLine1, addressLine2, nearestLandmark, pricePerHour, comment} = spot;

  const address = (
    <>
      <p>{addressLine1}</p>
      <p>{addressLine2}</p>
    </>
  );

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

  useEffect( ()=> {
    dispatch(getUserByRole(bookingRequestor))
      .then(fetchedUser => {
        const updatedUser = {
          name: fetchedUser.user.name,
          phone: fetchedUser.user.phone,
          rating: fetchedUser.user.parker.cumulativeRating,
          reviews: fetchedUser.user.parker.reviews
        }
        setParker(updatedUser)
      })
  }, [dispatch, bookingRequestor])

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
              title='Requested Time Slots'
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
          </div>
        </div>
      }
    </Fragment>
  );
};

export default RequestDetails;
