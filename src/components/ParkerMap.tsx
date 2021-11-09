import {GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

const KHI_LAT = 24.8607;
const KHI_LNG = 67.0011;

const LHR_LAT = 31.5204;
const LHR_LNG = 74.3587;


function Map() {
    return (
        <GoogleMap
            defaultZoom={13}
            defaultCenter={{lat: KHI_LAT, lng: KHI_LNG}}
        />
    );
}

function PrintMessage() {
    console.log(process.env.REACT_APP_MAPS_API_KEY);
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

const ParkerMapTwo: React.FC = () => {
    return (
        <div onClick={PrintMessage} style={{width: '100vw', height: '100vh'}}>
            <WrappedMap 
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_MAPS_API_KEY}`}
                containerElement={<div style={{ height: `100%` }} />}
                loadingElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    );
}

export default ParkerMapTwo;