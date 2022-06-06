import axios from "axios";
import { backendLink } from "../../helper/backendLink";

export const changeProfileInfo = (userInfo) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    console.log(userInfo);
    
    const sendRequest = async () => {
      return await axios.post(
        `${backendLink}/setting`,
        userInfo ,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    };

    try {
      const response = await sendRequest();
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