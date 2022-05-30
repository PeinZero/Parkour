import {useMemo} from 'react'

import { GoogleMap, DirectionsRenderer} from '@react-google-maps/api'

import styles from "./TransitMap.module.css";

const KHI = {
  lat: 24.8607,
  lng: 67.0011
}

const TransitMap = ({origin, destination, routes}) => {

  // Creating parker map
  const Map = useMemo( () => {
   return (
     <GoogleMap
       zoom={13.5}
       center={KHI}
       mapContainerStyle={{ width: '100%', height: '100%' }}
       options={{
        fullscreenControl: false,
        zoomControl: false
      }}
     >
      <DirectionsRenderer directions={routes}/>
     </GoogleMap>
   )
  }, [routes])

 
  return (
    <div className={styles["map"]}>
      {Map}
    </div>
  )
}

export default TransitMap;