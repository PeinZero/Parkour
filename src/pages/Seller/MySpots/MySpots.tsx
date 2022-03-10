import { Fragment, useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from "../../../store/hooks";
import { getSpotsBySeller, deleteSpot, deactivateSpot } from "../../../store/Spot/spotActions";

import styles from "./MySpots.module.css";
import Button from "../../../components/UI/Button/Button";
import Anchor from "../../../components/UI/Anchor/Anchor";
import Header from "../../../components/UI/Header/Header";
import Loader from "../../../components/UI/Loader/Loader";
import AccordionBox from "../../../components/UI/AccordionBox/AccordionBox";

import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddCircleIcon from "@mui/icons-material/AddCircle";

enum Filters {
  activeSpots = "1",
  inActiveSpots = "-1",
  allSpots = "0"
}

const MySpots = () => {
  console.log("MY SPOTS RUNNING");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [sellerSpots, setSellerSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(Filters.activeSpots);

  if(!loading){
    console.log(sellerSpots);
  }

  // Handlers
  const deactivateSpotHandler = (spotId) => {
    setLoading(true);
    dispatch(deactivateSpot(spotId)).then( (response) => {
      getSellerSpots(filter);
    });
  } 

  const deleteSpotHandler = (spotId) => {
    setLoading(true);
    dispatch(deleteSpot(spotId)).then( (response) => {
      getSellerSpots(filter);
    });
  }

  const filterChangeHandler = (event) => {
    setLoading(true);
    setFilter(event.target.value);
  }

  const getSellerSpots = useCallback((filter) => {
    dispatch(getSpotsBySeller(filter))
      .then( fetchedSpots => {
        ReactDOM.unstable_batchedUpdates( () => {
          console.log("Fetching spots...");
          setLoading(false);
          setSellerSpots(fetchedSpots)
        });
      })
  },[dispatch])

  const viewSpotHandler = (spot) => {
    navigate('/seller/addSpot', { state: spot })
  }

  // Dynamically Rendering spots
  const renderedSellerSpots = sellerSpots.map( (spot, index) => {
    return(
      <AccordionBox 
        key={spot._id}
        spotInfo = {{
          spotName: spot.spotName,
          pricePerHour: spot.pricePerHour,
          nearestLandmark: spot.nearestLandmark
        }}
      >
        <div className={styles["accordionDetails"]}>
          <div className={styles["leftButtons"]}>
            <Button btnClass="delete-icon" size="small" onClick={() => deleteSpotHandler(spot._id)}>
              <DeleteOutlineRoundedIcon />
            </Button>
            <Button btnClass="negative-outline" size="small" onClick={() => deactivateSpotHandler(spot._id)}> Deactivate</Button>
          </div>
          <div className={styles["rightButtons"]}>
            <Button btnClass="primary" size="small" onClick={() => {viewSpotHandler(spot)}}>Edit</Button>
          </div>
        </div>
      </AccordionBox>
    );
  });

  useEffect(() => {
    console.log("My Spots => useEffect()");
    getSellerSpots(filter);
      
  },[dispatch, filter, getSellerSpots]);
  
  return (
    <Fragment>
      <Header backLink="/" content="My Spots"/>
      <div  className={styles["filterBox"]}>
        <select name="typeOfSpots" value={filter} onChange={filterChangeHandler}>
          <option value={Filters.activeSpots} > Active Spots </option>
          <option value={Filters.inActiveSpots}> Inactive Spots </option>
          <option value={Filters.allSpots}> All Spots </option>
        </select>
      </div>
      {loading && <Loader screen= {"subScreen"} size={"60"}/>}
      {!loading &&
        <>
          {sellerSpots.length > 0 ?
            <div className={styles["carList"]}>
              {renderedSellerSpots}
            </div>
            :
            <p className={styles["noSpots"]}>No Spots available</p>
          }
          { (filter !== Filters.inActiveSpots) &&
            <div className={styles["addSpot"]}>
              <div>
                <Anchor path="/seller/addSpot">
                  <AddCircleIcon />
                </Anchor>
              </div>
            </div>
          } 
        </>
      }
    </Fragment>
  );
};

export default MySpots;