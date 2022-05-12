import { Fragment, useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { useAppDispatch } from "../../../store/hooks";
import { getSpotsBySeller } from "../../../store/Spot/spotActions";

import Map from "../../../components/GMap/Map";
import Loader from "../../../components/UI/Loader/Loader";

const SellerHome = () => {
  console.log("SELLER HOME RUNNING");
  
  const dispatch = useAppDispatch();

  const [sellerSpots, setSellerSpots] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const {geolocation} = navigator;

  const FetchSpots = useCallback( (currentLocation) => {
    dispatch(getSpotsBySeller(1))
      .then( fetchedSpots => {
        ReactDOM.unstable_batchedUpdates( () => {
          setCurrentLocation(currentLocation);
          setSellerSpots(fetchedSpots); 
        });
      })
  }, [dispatch])

  // Fetching the current location...
  useEffect(() => {
    console.log("SELLER HOME => useEffect()");
    
    if (geolocation) {
      geolocation.getCurrentPosition(position => {
        const fetchedLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }

        FetchSpots(fetchedLocation);
      })
    }
  }, [geolocation, FetchSpots])


  return (
    <Fragment>
      { currentLocation === null  && <Loader screen={"empty"}/> }
      { currentLocation && 
        <Map 
          currentLocation = {currentLocation}
          spots = {sellerSpots}
        />
      }
    </Fragment>
  );
};

export default SellerHome;
