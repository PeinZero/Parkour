// import {
//   GoogleMap,
//   withScriptjs,
//   withGoogleMap,
//   Marker,
//   DirectionsRenderer,
// } from "react-google-maps";

import React, { useCallback, useMemo} from "react";
import { useNavigate } from "react-router-dom";


import { GoogleMap, GroundOverlay, Marker } from '@react-google-maps/api'

const ParkerMap = ({coordinates, spots, zoom}) => {
  console.log("PARKER MAP RUNNING")
  const navigate = useNavigate();


  const bounds = useMemo( () => {
    return(
      new google.maps.LatLngBounds(
        {
          lat: 32.698335045970396,
          lng: -92.0217273125
        }, 
        {
          lat: 50.01038826014866,
          lng: -118.6525866875
        })
    )
  }, [])
  
  const markerClickHandler = useCallback((spot) => {
    navigate("/parker/bookspot", { state: spot });
  }, []);

  // Creating seller map
  const Map = useMemo( () => {
    return (
     <GoogleMap
       zoom={zoom}
       center={coordinates}
       mapContainerStyle={{ width: '100%', height: '100%' }}
       options={{
        fullscreenControl: false,
        zoomControl: false
      }}
     >
       {console.log("Parker Google Map!")}

       {<Marker
          position={coordinates}
          options={{ 
            icon: { 
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", 
              scaledSize:  new google.maps.Size(50, 50), 
            } 
          }}
        />}

       {spots.map((spot) => {
         
         const lng = spot.location.coordinates[0]
         const lat = spot.location.coordinates[1]

         return (
           <Marker
             key={spot._id}
             position={{ lat, lng }}
             onClick={() => markerClickHandler(spot)}
           />
         )
       })}

      <GroundOverlay
        url= "/images/1920x1080-light-green-solid-color-background.jpg"
        bounds= {bounds}
        opacity = {1}
      />
      
     </GoogleMap>
   )
 }, [coordinates, markerClickHandler, zoom, spots, bounds])

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {Map}
    </div>
  );
};

export default React.memo(ParkerMap);
