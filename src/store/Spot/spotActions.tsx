import axios from "axios";
import { backendLink } from "../../helper/backendLink";
import { userActions } from "../User/user";

export const getAllSpotsBySeller = (token) => {
  return async (dispatch) => {
    const sendRequest = async () => {
        return await axios.get(`${backendLink}/spot/getAllSpotsBySeller`,
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
