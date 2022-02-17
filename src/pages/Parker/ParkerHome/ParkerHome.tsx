import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from "../../../store/hooks";
import { getSpotsByRadius } from "../../../store/Spot/spotActions";

import styles from "./ParkerHome.module.css";

import ParkerMap from "../ParkerMap/ParkerMap";
import Hamburger from "../../../components/UI/Hamburger/Hamburger";
import Anchor from "../../../components/UI/Anchor/Anchor";
import Ripple from "../../../components/UI/Button/Ripple/Ripple";
import Loader from "../../../components/UI/Loader/Loader";

import RoomIcon from "@mui/icons-material/Room";
import SearchIcon from "@mui/icons-material/Search";


const ParkerHome= () => {
  console.log("PARKER HOME RUNNING");
  
  const dispatch = useAppDispatch();

  const {state: searchedLocation} = useLocation();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [spots, setSpots] = useState(null);

  const {geolocation} = navigator;
  const radius = 3;  // 3 KM
  const zoom = 14;

  console.log("Current Location: ", currentLocation);
  console.log("Spots: ", spots);
  
  // Fetching the current or searched location...
  useEffect(() => {
    console.log("PARKER HOME => useEffect() 1");
    if(searchedLocation){
      console.log("Fetching searched location...");
      setCurrentLocation(searchedLocation);
    }
    else if (geolocation && currentLocation === null) {
      console.log("Fetching current location...");
      geolocation.getCurrentPosition(position => {
        const currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }  
        setCurrentLocation(currentPosition);  
      })
    }
  }, [geolocation, searchedLocation, currentLocation])


  // Fetching spots arourd the current or searched location...
  useEffect(() => {
    console.log("PARKER HOME => useEffect() 2");
    
    if (currentLocation !== null){
      console.log("Fetching spots...");
      dispatch(getSpotsByRadius(currentLocation, radius))
        .then( fetchedData => {
          const fetchedSpots = fetchedData.spots;

          if(fetchedSpots.length > 0 || spots === null){
            setSpots(fetchedSpots);
          }
        })
    } 
  }, [currentLocation, radius])
  
  return(
    <Fragment>
      { (currentLocation === null || spots === null) && <Loader/> }
      { (currentLocation && spots) && 
        <>
        <Hamburger />

        <div className={styles["map"]}>
          <ParkerMap coordinates = {currentLocation} spots = {spots} zoom={zoom}/>
        </div>

        <div className={styles["searchBox"]}>
          <div className={styles["searchTopBox"]}>
            <h4>Where do you want to park?</h4>
            <p>Tip: We search for parking spots near the pin you drop</p>
          </div>
          <div className={styles["searchBottomBox"]}>
            <Anchor path="/search" className={styles["searchBar"]}>
              <Ripple>
                <div className={styles["searchIcon"]}>
                  <SearchIcon />
                </div>
                <div>Enter your destination</div>
              </Ripple>
            </Anchor>
            <div className={styles["recents"]}>
              <Ripple className={styles["recent"]}>
                <div className={styles["icon"]}>
                  <RoomIcon />
                </div>
                <div className={styles["location"]}>
                  <div className={styles["locationName"]}>Fast</div>
                  <div className={styles["locationAddress"]}>
                    Korangi - Karachi - Sindh
                  </div>
                </div>
              </Ripple>
            </div>
          </div>
        </div>
        </>
      }
    </Fragment>
  )
};

export default ParkerHome;
