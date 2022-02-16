import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { GoogleMap, Marker } from '@react-google-maps/api'

const KHI = {
  lat: 24.8607,
  lng: 67.0011,
}

const SellerMap = (props) => {
  console.log("SELLER MAP RUNNING");
  
  const navigate = useNavigate()
  const {activeSpots, seller} = props.model.data

  const markerClickHandler = (spot, seller) => {
    let model = spot
    model = { ...model, seller }

    navigate('/parker/spotdetails', { state: model })
  }

  // Creating seller map
  const Map = useMemo( () => {
     return (
      <GoogleMap
        zoom={11}
        center={KHI}
        mapContainerStyle={{ width: '100%', height: '100%' }}
      >
        {console.log("Seller Google Map!")}
        {activeSpots.map((spot) => {
          
          const lng = spot.location.coordinates[0]
          const lat = spot.location.coordinates[1]

          return (
            <Marker
              key={spot._id}
              position={{ lat, lng }}
              onClick={() => markerClickHandler(spot, seller)}
            />
          )
        })}
      </GoogleMap>
    )
  }, [activeSpots, seller])

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {Map}
    </div>
  )
}

export default SellerMap
