import { Fragment, useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchRequests } from "../../store/Request/requestActions";

import styles from "./BookingRequest.module.css";
import RequestCard from "../../components/RequestCard/RequestCard";
import Header from "../../components/UI/Header/Header";
import Loader from "../../components/UI/Loader/Loader";
import { convertTimeToString } from "../../helper/timeFunctions";

const MONTHS = [
  'January',
  'Febuary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

enum Status {
  pendingRequests = "pending",
  acceptedRequests = "accepted",
  allRequests = "all"
}

const BookingRequest = () => {
  console.log("BOOKING REQUEST RUNNING");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const currentRoleParker = useAppSelector(state => state.user.currentRoleParker);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(Status.acceptedRequests);

  // Handlers
  const filterChangeHandler = (event) => {
    setLoading(true);
    setFilter(event.target.value);
  }

  const getRequests = useCallback((filter) => {
    dispatch(fetchRequests(filter, currentRoleParker))
      .then( (fetchedRequests) => {
        ReactDOM.unstable_batchedUpdates( () => {
          console.log("Fetching requests...");
          setLoading(false);
          setRequests(fetchedRequests)
        });
      })
  },[dispatch, currentRoleParker])

  // const viewRequestHandler = (spot) => {
  //   navigate('/seller/addSpot', { state: spot })
  // }

  // Dynamically Rendering requests
  const renderedRequests = requests.map( (request, index) => {
    const formattedDate = {
      year: new Date(request.day).getFullYear(),
      month: MONTHS[new Date(request.day).getMonth()],
      date: new Date(request.day).getDate()
    }

    const address = {
      addressLine1: request.spot.addressLine1,
      addressLine2: request.spot.addressLine2
    }

    const startTime = new Date(request.slots[0].startTime);
    const endTime = new Date(request.slots[0].endTime);

    const time = {
      startTime: convertTimeToString(startTime),
      endTime: convertTimeToString(endTime)
    }

    return(
      <RequestCard key={request._id} day={formattedDate} status={request.status} address= {address} nearestLandmark={request.spot.nearestLandmark} time={time} pricePerHour={request.spot.pricePerHour}/>
    );
  });

  useEffect(() => {
    console.log("Booking Request => useEffect()");
    getRequests(filter);
      
  },[filter, getRequests]);
  
  return (
    <Fragment>
      <Header backLink="/" content="Booking Requests"/>
      <div  className={styles["filterBox"]}>
        <select name="typeOfRequests" value={filter} onChange={filterChangeHandler}>
          <option value={Status.acceptedRequests} > Accepted Requests </option>
          <option value={Status.pendingRequests}> Pending Requests </option>
          <option value={Status.allRequests}> All Requests </option>
        </select>
      </div>
      {loading && <Loader screen= {"subScreen"} size={"60"}/>}
      
      { (!loading && requests.length > 0) &&
          <div className={styles["requestList"]}>
            {renderedRequests}
          </div>
      }
      { (!loading && requests.length === 0) &&
          <p className={styles["noRequests"]}>No Spots available</p>
      }
    </Fragment>
  );
};

export default BookingRequest;