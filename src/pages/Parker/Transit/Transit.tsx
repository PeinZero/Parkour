import ReactDOM from 'react-dom';
import { useState, useEffect, Fragment } from 'react';
import { useLocation } from 'react-router-dom';

import Hamburger from '../../../components/UI/Hamburger/Hamburger';
import TransitMap from '../../../components/GMap/TransitMap/TransitMap'
import Loader from '../../../components/UI/Loader/Loader';

const Transit = () => {
  console.log("TRANSIT RUNNING");
  const {state: destination} = useLocation();
  
  const [currentLocation, setCurrentLocation] = useState(null);
  const [routes, setRoutes] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const {geolocation} = navigator;

  
  const findRoute = async (origin) => {
    try{
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING
      })

      console.log(results.routes[0].legs[0].distance.text, results.routes[0].legs[0].duration.text )

      ReactDOM.unstable_batchedUpdates( () => {
        setCurrentLocation(origin); 
        setRoutes(results);
        setDistance(results.routes[0].legs[0].distance.text);
        setDuration(results.routes[0].legs[0].duration.text);
      });
    }
    catch(err){
      setCurrentLocation(origin); 
    }
    
  }

  const displayError = error => {
    var errors = {
      1: 'Permission denied',
      2: 'Position unavailable',
      3: 'Request timeout'
    };
    console.log("Error: " + errors[error.code]);
  }
  

  useEffect(() => {
    console.log("TRANSIT => useEffect()");
    
    if (geolocation){
      geolocation.getCurrentPosition(position => {
        const fetchedLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        } 
        findRoute(fetchedLocation);  
      }, displayError, { enableHighAccuracy: true})
    }
  }, [geolocation])

  return (
    <Fragment>
      <Hamburger />
      {!currentLocation && <Loader screen= {"subScreen"} size={"60"} /> }
      {currentLocation && <TransitMap origin = {currentLocation} destination={destination} routes={routes}/> }
    </Fragment>
  )
}

export default Transit;