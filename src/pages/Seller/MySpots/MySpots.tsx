import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  DirectionsRenderer,
} from "react-google-maps";

import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";

import styles from "./MySpots.module.css";
import Button from "../../../components/UI/Button/Button";
import Anchor from "../../../components/UI/Anchor/Anchor";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AccordionBox from "../../../components/UI/AccordionBox/AccordionBox";
import AccordionHeader from "../../../components/UI/AccordionBox/AccordionHeader/AccordionHeader";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const KHI = {
  lat: 24.8607,
  lng: 67.0011,
};

const LHR = {
  lat: 31.5204,
  lng: 74.3587,
};

const newHomeSpot = {
  lat: 25.015378516175804,
  lng: 67.0405867900451,
};

const oldHomeSpot = {
  lat: 24.965782195439317,
  lng: 67.06957614937544,
};

const primarySpot = newHomeSpot;

const MySpots = () => {
  const [center, setCenter] = useState(primarySpot);
  const [zoom, setZoom] = useState(17);
  const [markers, setMarkers] = useState([newHomeSpot, oldHomeSpot]);

  const [directions, setDirections] = useState(null);

  const Map = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        defaultZoom={zoom}
        defaultCenter={center}
        onClick={() => setZoom(zoom - 1)}
      >
        {markers.map((marker, index) => {
          console.log(marker);
          return (
            <Marker
              key={index}
              position={marker}
              onClick={() => setZoom(zoom + 1)}
            />
          );
        })}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    ))
  );

  // const markerClickHandler = () => {
  //   var request = {
  //     origin: new google.maps.LatLng(newHomeSpot.lat, newHomeSpot.lng),
  //     destination: new google.maps.LatLng(oldHomeSpot.lat, oldHomeSpot.lng),
  //     travelMode: google.maps.TravelMode.DRIVING,
  //   };

  //   var directionsService = new google.maps.DirectionsService();
  //   // var directionsRenderer = new google.maps.DirectionsRenderer();
  //   directionsService.route(request, (result, status) => {
  //     if (status === google.maps.DirectionsStatus.OK) {
  //       setDirections(result);
  //     } else {
  //       alert(`error fetching directions ${result}`);
  //     }
  //   });
  // };

  return (
    <Fragment>
      <div style={{ width: "100vw", height: "100vh" }}>
        <div className={styles["header"]}>
          <Link to="/" className={styles["back"]}>
            {" "}
            <ArrowBackIosNewIcon />
          </Link>
          <h3>My Spots</h3>
        </div>
        {/* <Map
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_MAPS_API_KEY}`}
          containerElement={<div style={{ height: `100%` }} />}
          loadingElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        /> */}
      </div>
    </Fragment>
  );
};

export default MySpots;
