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
      console.log("Failed to fetch user date!");
    }
  };
};
