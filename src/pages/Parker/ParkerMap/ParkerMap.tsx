// import {
//   GoogleMap,
//   withScriptjs,
//   withGoogleMap,
//   Marker,
//   DirectionsRenderer,
// } from "react-google-maps";

import React, { useCallback, useMemo} from "react";
import { useNavigate } from "react-router-dom";


import { GoogleMap, Marker } from '@react-google-maps/api'

const ParkerMap = ({coordinates, spots, zoom}) => {
  console.log("PARKER MAP RUNNING")
  
  const navigate = useNavigate();
  
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
     </GoogleMap>
   )
 }, [coordinates, markerClickHandler, zoom, spots])

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {Map}
    </div>
  );
};

export default React.memo(ParkerMap);
