import {GoogleMap, withScriptjs, withGoogleMap, Marker, DirectionsRenderer } from "react-google-maps";

import { useState } from "react";

const KHI = {
  lat: 24.8607,
  lng: 67.0011
}

const LHR = {
  lat: 31.5204,
  lng: 74.3587
}

const TESTMARKER = {
  lat: 24.9281,
  lng: 67.0879
}

const TESTMARKER2 = {
  lat: 24.9012,
  lng: 67.1155
}


const ParkerMap: React.FC = () => {

  const [center, setCenter] = useState(KHI);
  const [zoom, setZoom] = useState(13);
  const [markers, setMarkers] = useState([
    TESTMARKER,
    TESTMARKER2
  ]);

  const [directions, setDirections] = useState(null);

  const Map = withScriptjs(withGoogleMap(props => 
    <GoogleMap
            defaultZoom={zoom}
            defaultCenter={center}
            onClick = {markerClickHandler}
    >
      {markers.map( (marker, index) => {
        console.log(marker)
        return <Marker key = {index} position={marker} onClick={markerClickHandler}/>
      })}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  ))

  const markerClickHandler = () => {
    var request = {
      origin: new google.maps.LatLng(TESTMARKER.lat, TESTMARKER.lng),
      destination: new google.maps.LatLng(TESTMARKER2.lat, TESTMARKER2.lng),
      travelMode: google.maps.TravelMode.DRIVING
    }
  
    var directionsService = new google.maps.DirectionsService();
    // var directionsRenderer = new google.maps.DirectionsRenderer();
    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        setDirections(result);
      } else {
        alert(`error fetching directions ${result}`);
      }
    })
}

  

  return(
    <div style={{width: '100vw', height: '100vh'}}>
      <Map 
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_MAPS_API_KEY}`}
        containerElement={<div style={{ height: `100%` }} />}
        loadingElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  )
}

export default ParkerMap;