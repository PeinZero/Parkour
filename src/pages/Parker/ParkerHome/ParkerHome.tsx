import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from "../../../store/hooks";
import { useAppSelector } from "../../../store/hooks";
import { getSpotsAroundDestination, getAllSpots } from "../../../store/Spot/spotActions";

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
  
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState(null)

  console.log(currentLocation);
  
  useEffect(() => {
    console.log("PARKER HOME => useEffect()");

    if(location.state){
      setCurrentLocation(location.state);
    }
    else if (navigator.geolocation && currentLocation === null) {
      navigator.geolocation.getCurrentPosition(position => {  
          setCurrentLocation(prevState => {
            return {
              ...prevState,
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          });  
      })
    }
  }, [])
  
  return(
    <Fragment>
      {currentLocation === null && <Loader/> }
      {currentLocation && 
        <>
        <Hamburger />
        <div className={styles["map"]}>
          <ParkerMap coordinates = {currentLocation}/>
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
