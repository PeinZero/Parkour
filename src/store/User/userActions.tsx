import axios from "axios";
import { userActions } from "./user";

export const fetchUser = (userId, token) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_backendLink}/user/getUser/${userId}`,
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
      console.log("Failed to fetch user date!");
    }
  };
};
