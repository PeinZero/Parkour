import ReactDOM from 'react-dom';
import { useState, useEffect, useCallback, Fragment } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Hamburger from '../../../components/UI/Hamburger/Hamburger';
import TransitMap from '../../../components/GMap/TransitMap/TransitMap'
import Loader from '../../../components/UI/Loader/Loader';

import styles from './Transit.module.css';
import { useAppSelector } from '../../../store/hooks';

const Transit = () => {
  console.log("TRANSIT RUNNING");
  const navigate = useNavigate();
  const {state}:any = useLocation();
  const {destination, car} = state;

  const [currentLocation, setCurrentLocation] = useState(null);
  const [routes, setRoutes] = useState(null);
  const [distance, setDistance] = useState('NA');
  const [duration, setDuration] = useState('NA');

  const {geolocation} = navigator;
  const mileage = car.mileage;
  let fuelConsumption = 'NA';

  const updatedDistance = distance.slice(0, -3);
  const numberDistance = Number(updatedDistance);

  if(distance !== 'NA'){
    const ltr = (numberDistance/ mileage).toFixed(2);
    fuelConsumption =  String(ltr);
  }

  const findRoute = useCallback(async (origin) => {
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
  }, [destination])

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
  }, [geolocation, findRoute])

  return (
    <Fragment>
      <Hamburger />
      {!currentLocation && <Loader screen= {"subScreen"} size={"60"} /> }
      {currentLocation && <TransitMap origin = {currentLocation} destination={destination} routes={routes}/> }
      <div className={styles['routeDetails']}>
        <p> <span> ETA to Destination:</span> {duration}</p>
        <p> <span> Distance (KM):</span> {distance}</p>
        <p> <span> Approximate Fuel Consumption (Ltr):</span> { fuelConsumption }</p>
      </div>
    </Fragment>
  )
}

export default Transit;