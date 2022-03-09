import axios from "axios";
import { backendLink } from "../../helper/backendLink";

export const getSpotsByRadius = (coordinates, radius) => {
  return async (dispatch) => {

    const token = localStorage.getItem("token");

    const sendRequest = async () => {
        return await axios.get(`${backendLink}/spot/getSpotsByRadius`,
          {
            params: {
              lat: coordinates.lat,
              lng: coordinates.lng,
              radius
            },
            headers: {
              Authorization: 'Bearer ' + token
            }
          }
        );
    };

    try {
      const response =  await sendRequest();
      return response.data;

    } catch (err) {
      console.log(err.message);
      if (err.response.status === 404) {
        console.log("Validation Failed!");
      }

      if (err.response.status === 401) {
        console.log("Not Authorized!");
      }
    }
  };
};

export const getSpotsBySeller = (filter) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    
    const sendRequest = async () => {
        return await axios.get(`${backendLink}/spot/getAllSpotsBySeller`,
        {
          params: {
            filter
          },
          headers: {
            Authorization: "Bearer " + token,
          }
        });

    };

    try {
      const response =  await sendRequest();
      return response.data.data;

    } catch (err) {
      console.log(err.message);
      if (err.response.status === 404) {
        console.log("Validation Failed!");
      }

      if (err.response.status === 401) {
        console.log("Not Authorized!");
      }
    }
  };
};


export const getAllSpots = (token) => {
  return async (dispatch) => {
    const sendRequest = async () => {
        return await axios.get(`${backendLink}/spot/getAllSpots`,
        {
            headers: {
              Authorization: "Bearer " + token,
            },
        });
    };

    try {
      const response =  await sendRequest();
      return response.data.data;

    } catch (err) {
      console.log(err.message);
      if (err.response.status === 404) {
        console.log("Validation Failed!");
      }

      if (err.response.status === 401) {
        console.log("Not Authorized!");
      }
    }
  };
};


export const addSpot = (addSpotData) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    const sendRequest = async () => {
        return await axios.post(`${backendLink}/spot/addSpot`,
        addSpotData,
        {
            headers: {
              Authorization: "Bearer " + token,
            },
        });
    };

    try {
      const response =  await sendRequest();
      console.log(response);
      
      return response;

    } catch (err) {
      console.log(err.message);
      if (err.response.status === 404) {
        console.log("Validation Failed!");
      }

      if (err.response.status === 401) {
        console.log("Not Authorized!");
      }
    }
  };
};
