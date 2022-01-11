import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  DirectionsRenderer,
} from "react-google-maps";
import { useState, useRef, useCallback, useEffect } from "react";
// import Geocode from "react-geocode";

const KHI = {
  lat: 24.8607,
  lng: 67.0011,
};

const LHR = {
  lat: 31.5204,
  lng: 74.3587,
};

const TESTMARKERPOSITION = {
  lat: 24.9281,
  lng: 67.0879,
};

const TESTMARKER2 = {
  lat: 24.9012,
  lng: 67.1155,
};

const TESTMARKER3 = {
  lat: 25.9012,
  lng: 68.1155,
};

const ParkerMap = (props) => {
  // console.log(props.spotData)
  
  const [center, setCenter] = useState(null);
  const [zoom, setZoom] = useState(13);
  const refMap = useRef(null);
  const refMarker = useRef(null);
  // const [markers, setMarkers] = useState([TESTMARKER]);
  // const [selectedMarker, setSelectedMarker] = useState(null);

  const [directions, setDirections] = useState(null);

  const Map = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap ref={refMap} defaultZoom={zoom} defaultCenter={KHI}>
        <Marker
          // onDragStart={dragHandler}
          // onClick={markerClickHandler}
          // onDrag={handleBoundsChanged}
          draggable={true}
          // defaultPosition={TESTMARKER}
          ref={refMarker}
          // position={{ lng: dummySpot.location[0], lat: dummySpot.location[1] }}
          position={center}
          onClick={markerClickHandler}
          // onIdle={useCallback(handleBoundsChanged, [])}
        />
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    ))
  );

  const mapClickHandler = (e) => {
    console.log("Direction Clicked");
    var request = {
      origin: new google.maps.LatLng(
        TESTMARKERPOSITION.lat,
        TESTMARKERPOSITION.lng
      ),
      destination: new google.maps.LatLng(TESTMARKER2.lat, TESTMARKER2.lng),
      travelMode: google.maps.TravelMode.DRIVING,
    };

    console.log(e);

    var directionsService = new google.maps.DirectionsService();
    // var directionsRenderer = new google.maps.DirectionsRenderer();
    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        setDirections(result);
      } else {
        alert(`error fetching directions ${result}`);
      }
    });
  };

  // CENTERING MAP ON DRAG
  const handleBoundsChanged = () => {
    const mapCenter = refMap.current.getCenter(); //get map center
    setCenter(mapCenter);
  };

  const markerClickHandler = (e) => {
    let coordinates = refMarker.current.getPosition();

  };

  const dragHandler = (e) => {
    console.log("Dragging");
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Map
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=`} // ${process.env.REACT_APP_MAPS_API_KEY}
        containerElement={<div style={{ height: `100%` }} />}
        loadingElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );

};

export default ParkerMap;
