import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from "react-google-maps";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const KHI = {
  lat: 24.8607,
  lng: 67.0011,
};

const SellerMap = (props) => {
  const navigate = useNavigate();
  const [zoom, setZoom] = useState(11);
  const model = props.model.data;
  console.log(model);
  

  const markerClickHandler = (spot, seller) => {
    let model = spot;
    model = {...model, seller  }
    
    navigate("/parker/spotdetails", { state: model });
  };

  const Map = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap defaultZoom={zoom} defaultCenter={KHI}>
        {model.activeSpots.map((spot) => {
          const lng = spot.location.coordinates[0];
          const lat = spot.location.coordinates[1];

          return (
            <Marker
              key={spot._id}
              position={{ lat, lng }}
              onClick={() => markerClickHandler(spot, model.seller)}
            />
          );
        })}
      </GoogleMap>
    ))
  );

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

export default SellerMap;
