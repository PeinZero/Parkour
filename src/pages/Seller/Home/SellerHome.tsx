import { Fragment, useEffect, useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { getAllSpotsBySeller } from "../../../store/Spot/spotActions";
import styles from "./SellerHome.module.css";

import SellerMap from "../SellerMap/SellerMap";
import Hamburger from "../../../components/UI/Hamburger/Hamburger";
import Loader from "../../../components/UI/Loader/Loader";


const SellerHome = () => {
  console.log("SELLER HOME RUNNING");
  
  const dispatch = useAppDispatch();

  const [sellerSpots, setSellerSpots] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  
  const {geolocation} = navigator;
  const zoom = 14;

  console.log("Current Location: ", currentLocation);
  console.log("Seller Spots: ", sellerSpots);
  

  // Fetching the current location...
  useEffect(() => {
    console.log("SELLER HOME => useEffect() 1");
    
    if (geolocation && currentLocation === null) {
      console.log("Fetching current location...");

      geolocation.getCurrentPosition(position => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        setCurrentLocation(location);
      })
    }
  }, [geolocation, currentLocation])

  //Fetching all spots of the seller...
  useEffect(() => {
    console.log("SELLER HOME => useEffect() 2");
    
    dispatch(getAllSpotsBySeller())
      .then( fetchedData => {
        console.log("Fetching spots...");
        const fetchedSpots = fetchedData.activeSpots;
        setSellerSpots(fetchedSpots);
      })
  },[]);

  return (
    <Fragment>
      { (currentLocation === null || sellerSpots === null) && <Loader/> }
      { (currentLocation && sellerSpots) && 
      <>
        <Hamburger />
        <div className={styles["map"]}>  
          <SellerMap coordinates = {currentLocation} activeSpots = {sellerSpots} zoom={zoom}/>  
        </div>
      </>
    }
    </Fragment>
  );
};

export default SellerHome;
