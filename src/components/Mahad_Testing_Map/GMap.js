import React, { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const KHI = {
  lat: 24.8607,
  lng: 67.0011,
}

const GMap = (props) => {
  console.log("GMAP RUNNING");

  let markerPosition;
  if(props.markerPosition){
    markerPosition = props.markerPosition
  }
  else{
    markerPosition = KHI;
  }

  return (
    <GoogleMap
      mapContainerClassName={props.className}
      zoom={props.zoom}
      center={ markerPosition }
    >
      {
        <Marker
        position={markerPosition}
        onDragEnd={props.onDragEnd}
        draggable={true} /> 
      }
    </GoogleMap>
  )
}

export default React.memo(GMap)
