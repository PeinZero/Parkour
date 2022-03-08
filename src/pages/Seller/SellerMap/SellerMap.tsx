import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { GoogleMap, Marker } from '@react-google-maps/api'

const SellerMap = ({coordinates, activeSpots, zoom}) => {
  console.log("SELLER MAP RUNNING");
  
  const navigate = useNavigate()

  const markerClickHandler = (spot) => {
    navigate('/seller/addSpot', { state: spot })
  }

  // Creating seller map
  const Map = useMemo( () => {
     return (
      <GoogleMap
        zoom={zoom}
        center={coordinates}
        mapContainerStyle={{ width: '100%', height: '100%' }}
      >
        {console.log("Seller Google Map!")}

        {<Marker
          position={coordinates}
          options={{ 
            icon: { 
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", 
              scaledSize:  new google.maps.Size(50, 50), 
            } 
          }}
        />}
        
        {activeSpots.map((spot) => {
          
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
  }, [activeSpots])

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {Map}
    </div>
  )
}

export default SellerMap
