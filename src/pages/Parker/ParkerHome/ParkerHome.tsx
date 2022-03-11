import React, { Fragment, useCallback, useEffect, useState } from "react";
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
import ReactDOM from "react-dom";


const ParkerHome= () => {
  console.log("PARKER HOME RUNNING");
  
  const dispatch = useAppDispatch();

  const {state: searchedLocation} = useLocation();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [spots, setSpots] = useState([]);

  const {geolocation} = navigator;
  const radius = 5;  // in KM
  const zoom = 13.5;
  const loaderScreenType = "empty";

  console.log("Current Location: ", currentLocation);
  console.log("Spots: ", spots);

  const FetchSpots = useCallback( (currentLocation, radius) => {
    dispatch(getSpotsByRadius(currentLocation, radius))
      .then( fetchedData => {
        const fetchedSpots = fetchedData.spots;

        ReactDOM.unstable_batchedUpdates( () => {
          setCurrentLocation(currentLocation);
          setSpots(fetchedSpots); 
        });
      })
  }, [dispatch])
  
  
  // Fetching the current or searched location...
  useEffect(() => {
    console.log("PARKER HOME => useEffect() 1");

    if(searchedLocation){
      FetchSpots(searchedLocation, radius);
    }
    else{
      geolocation.getCurrentPosition(position => {
        const fetchedLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        } 
        
        FetchSpots(fetchedLocation, radius);  
      })
    }
  }, [FetchSpots, searchedLocation, geolocation])

  return(
    <Fragment>
      { currentLocation === null  && <Loader screen={loaderScreenType}/> }
      { currentLocation && 
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
