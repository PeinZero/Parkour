import axios from "axios";
import { backendLink } from "../../helper/backendLink";

export const fetchRequests = (filter, currentRoleParker) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    let requestUrl = 'sellerRequests';

    if(currentRoleParker){
      requestUrl = 'parkerRequests';
    }

    const sendRequest = async () => {
        return await axios.get(`${backendLink}/bookingRequest/${requestUrl}`,
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
      return response.data.bookingRequests;

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