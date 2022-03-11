import axios from "axios";
import { userActions } from "./user";
import { backendLink } from "../../helper/backendLink";

export const fetchUser = (userId, token) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      return await axios.get(
        `${backendLink}/user/getUser/${userId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    };

    try {
      const response = await sendRequest();
      return response;
      
    } catch (error) {
      console.log("Failed to fetch user data!");
    }
  };
};

export const switchRole = (token) => {
  return async (dispatch) => {
    const sendRequest = async () => {
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


export const getUserByRole = (userId) => {
  return async (dispatch) => {
    const token = localStorage.getItem('token');

    const sendRequest = async () => {
      const response = await axios.get(
        `${backendLink}/user/getUserByRole/${userId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          }
        }
      );

      return response;
    };


    try{
      const response = await sendRequest();
      return response;
    }
    catch(err){
      console.log("(Thunk) getUserByRole => Error: ", err);
      
      if (err.response.status === 404) {
        console.log("(Thunk) getUserByRole => User not found");
      }

      if (err.response.status === 401) {
        console.log("(Thunk) getUserByRole => Not Authorised");
      }
    }
  }
}