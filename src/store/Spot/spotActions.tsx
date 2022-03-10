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
        return await axios.get(`${backendLink}/spot/getSpotsBySeller`,
        {
          params: {
            filter: filter
          },
          headers: {
            Authorization: "Bearer " + token,
          }
        });

    };

    try {
      const response =  await sendRequest();
      return response.data.spots;

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
        return await axios.post(`${backendLink}/spot`,
        addSpotData,
        {
            headers: {
              Authorization: "Bearer " + token,
            },
        });
    };

    try {
      const response =  await sendRequest();
    
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

export const editSpot = (spotId, addSpotData) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    const sendRequest = async () => {
        return await axios.put(`${backendLink}/spot/${spotId}`,
        addSpotData,
        {
            headers: {
              Authorization: "Bearer " + token,
            },
        });
    };

    try {
      const response =  await sendRequest();
    
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

export const deleteSpot = (spotId) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    const sendRequest = async () => {
        return await axios.delete(`${backendLink}/spot/${spotId}`,
        {
            headers: {
              Authorization: "Bearer " + token,
            },
        });
    };

    try {
      const response =  await sendRequest();
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

export const deactivateSpot = (spotId) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    const sendRequest = async () => {
        return await axios.put(`${backendLink}/spot/switchStatus/${spotId}`,
        null,
        {
            headers: {
              Authorization: "Bearer " + token,
            },
        });
    };

    try {
      const response =  await sendRequest();
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

export const bookingRequest = (bookingData) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    const sendRequest = async () => {
        return await axios.post(`${backendLink}/bookingRequest`,
        bookingData,
        {
            headers: {
              Authorization: "Bearer " + token,
            },
        });
    };

    try {
      const response =  await sendRequest();
    
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

//  Dev Api
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
