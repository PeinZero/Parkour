import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { LoadScript } from '@react-google-maps/api'

import App from './App';
import store from './store/store'; 

ReactDOM.render(
  <React.StrictMode>
    <LoadScript
      googleMapsApiKey={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=`} // ${process.env.REACT_APP_MAPS_API_KEY}
    >
    <Provider store={store}>
      <App />
    </Provider>
    </LoadScript>
  </React.StrictMode>,
  document.getElementById('root')
);
