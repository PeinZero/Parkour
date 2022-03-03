import axios from "axios";
import { userActions } from "./user";
import { backendLink } from "../../helper/backendLink";

export const fetchUser = (userId, token) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await axios.get(
        `${backendLink}/user/getUser/${userId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      return response;
    };

    try {
      const response = await sendRequest();
      dispatch(userActions.createUser(response.data.user));
      
    } catch (error) {
      console.log("Failed to fetch user data!");
    }
  };
};

export const switchRole = (token) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      if(token === localStorage.getItem("token")){
        console.log(token);
      }
      return await axios.put(
        `${backendLink}/user/switchrole`, null, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
    };

    try {
      const response = await sendRequest();

      console.log(response);
      

      dispatch(userActions.createUser(response.data.user));

      return response;

    } catch (error)
    {
      console.log("Failed to fetch user data!");
    }
  };
};
