import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  DirectionsRenderer,
} from "react-google-maps";
import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getSpotsAroundDestination } from "../../../store/Spot/spotActions";

const ParkerMap = ({coordinates}) => {
  console.log("Parker Map")
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const token = useAppSelector(state => state.authentication.token);
  const [center, setCenter] = useState(coordinates);
  const [zoom, setZoom] = useState(14);
  const [allSpots, setAllSpots] = useState([]);

  console.log("Coordinates:", coordinates);

  const markerClickHandler = (spot, seller) => {
    let model = spot;
    model = {...model, seller  }
    console.log(model);
    
    navigate("/parker/spotdetails", { state: model });
  };


  const Map = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap defaultZoom={zoom} defaultCenter={center}>
        <Marker
          position={coordinates}
          options={{ 
            icon: { 
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", 
              scaledSize:  new google.maps.Size(50, 50), 
            } 
          }}
        />
        {/* {spotList.map((model) => {
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
        })} */}
      </GoogleMap>
    ))
  );

  // useEffect(() => {
  //   dispatch(getSpotsAroundDestination(token, coordinates))
  //     .then( fetchedSpots => {
  //       setAllSpots(fetchedSpots);
  //   })

  // }, [])

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
