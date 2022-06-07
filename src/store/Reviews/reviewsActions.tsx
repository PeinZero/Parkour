import axios from "axios";
import { backendLink } from "../../helper/backendLink";

export const fetchReviews = (userId) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    const sendRequest = async () => {
        return await axios.get(`${backendLink}/user/review/${userId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          }
        });

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

export const submitReview = (targetUserId, text, providedRating) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    const sendRequest = async () => {
        return await axios.patch(`${backendLink}/user/review`,
        {
          providedRating,
          text,
          targetUserId
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          }
        });

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


