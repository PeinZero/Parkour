import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  DirectionsRenderer,
} from "react-google-maps";
import { useState} from "react";
import { useNavigate } from "react-router-dom";


const KHI = {
  lat: 24.8607,
  lng: 67.0011,
};

const ParkerMap = (props) => {
  console.log("Parker Map",props.spotList)
  
  const navigate = useNavigate();
  const [center, setCenter] = useState(null);
  const [zoom, setZoom] = useState(12);
  const spotList = props.spotList;

  const markerClickHandler = (spot, seller) => {
    let model = spot;
    model = {...model, seller  }
    console.log(model);
    
    navigate("/parker/spotdetails", { state: model });
  };


  const Map = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap defaultZoom={zoom} defaultCenter={KHI}>
        {spotList.map((model) => {
          return model.seller.activeSpots.map(spot => {
            const lng = spot.location.coordinates[0];
            const lat = spot.location.coordinates[1];

            let seller = {};
            seller['name'] = model.name;
            seller['rating'] = model.seller.cumulativeRating;
            seller['reviews'] = model.seller.reviews;
  
            return (
              <Marker
                key={spot._id}
                position={{ lat, lng }}
                onClick={() => markerClickHandler(spot, seller)}
              />
            );

          })
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

export default ParkerMap;
