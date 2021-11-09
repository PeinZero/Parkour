import GoogleMapReact from 'google-map-react';



const PMap = (props) => {
    return (
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
          defaultCenter={props.center}
          defaultZoom={props.zoom}
        >
        </GoogleMapReact>
      </div>
    )
}

export default PMap
