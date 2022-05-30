import { Fragment, useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { useAppDispatch } from "../../../store/hooks";
import { getSpotsByRadius } from "../../../store/Spot/spotActions";

import Map from "../../../components/GMap/Map";
import Loader from "../../../components/UI/Loader/Loader";

import { useLocation } from 'react-router-dom';

const ParkerHome= () => {
  console.log("PARKER HOME RUNNING");
  
  const {state:searchedLocation} = useLocation();
  const dispatch = useAppDispatch();
  
  const [spots, setSpots] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const {geolocation} = navigator;

  const radius = 5;  // in KM

  const FetchSpots = useCallback( (currentLocation) => {
    dispatch(getSpotsByRadius(currentLocation, radius))
      .then( fetchedData => {
        const fetchedSpots = fetchedData.spots;

        ReactDOM.unstable_batchedUpdates( () => {
          setCurrentLocation(currentLocation);
          setSpots(fetchedSpots); 
        });
      })
  }, [dispatch])

  const displayError = error => {
    var errors = {
      1: 'Permission denied',
      2: 'Position unavailable',
      3: 'Request timeout'
    };
    console.log("Error: " + errors[error.code]);
  }
  

  // Fetching the current or searched location...
  useEffect(() => {
    console.log("PARKER HOME => useEffect()");

    if(searchedLocation){
      FetchSpots(searchedLocation);
    }
    else if (geolocation){
      geolocation.getCurrentPosition(position => {
        const fetchedLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        } 
        
        FetchSpots(fetchedLocation);  
      }, displayError, {enableHighAccuracy: true})
    }
  }, [FetchSpots, searchedLocation, geolocation])

  return(
    <Fragment>
      { currentLocation === null  && <Loader screen={"empty"}/> }
      { currentLocation && 
        <Map 
          currentLocation = {currentLocation}
          spots = {spots}
          isParker = {true}
        />
      }
    </Fragment>
    
  )
};

export default ParkerHome;
