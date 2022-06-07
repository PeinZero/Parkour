import {Fragment, useCallback, useMemo} from 'react'
import { useNavigate } from 'react-router-dom';

import { GoogleMap, Circle, Marker } from '@react-google-maps/api'

import Hamburger from "../UI/Hamburger/Hamburger";
import SearchBoxWithRecents from "../SearchBoxWithRecents/SearchBoxWithRecents";

import styles from "./Map.module.css";

interface HomeProps{
  currentLocation: any,
  spots: any[],
  isParker?: boolean,
  mapZoom?: number
}

const KHI = {
  lat: 24.8607,
  lng: 67.0011
}


const Map = ({currentLocation, spots, isParker, mapZoom}:HomeProps) => {
  let role = 'SELLER';
  let markerNavigation = '/seller/addspot';

  if(isParker){
    role = "PARKER";
    markerNavigation = '/parker/bookspot';
  }

  const navigate = useNavigate();

  const markerClickHandler = useCallback((spot) => {
    navigate(markerNavigation, { state: spot });
  }, [navigate, markerNavigation]);


  // Creating parker map
  const Map = useMemo( () => {
    return (
     <GoogleMap
       zoom={mapZoom || 13.5}
       center={currentLocation || KHI}
       mapContainerStyle={{ width: '100%', height: '100%' }}
       options={{
        fullscreenControl: false,
        zoomControl: false
      }}
     >
        {console.log(`${role} MAP RUNNING`)}
        {<Marker
          position={currentLocation || KHI}
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

        {isParker &&
          <Circle
            center={currentLocation}
            radius={5000}
            options = {{
              strokeColor: '#6bbaff',
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: '#9efa9b',
              fillOpacity: 0.3,
              zIndex: 1
            }}
          />
        }
      
     </GoogleMap>
   )
 }, [currentLocation, mapZoom, spots, isParker, role, markerClickHandler])
  
  return (
    <Fragment>
      <Hamburger />

      <div className={styles["map"]}>
        {Map}
      </div>

      {isParker && <SearchBoxWithRecents/>}
    </Fragment>
  )
}

export default Map;