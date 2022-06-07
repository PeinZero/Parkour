import axios from "axios";
import { backendLink } from "../../helper/backendLink";
import { userActions } from "../../store/User/user";

export const getCredit = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('token');

    const sendRequest = async () => {
      return await axios.get(
        `${backendLink}/transaction`,
        {
          headers: {
            Authorization: "Bearer " + token,
          }
        }
      );
    };

    try{
      const response = await sendRequest();
      const payload = {
        credit: response.data.credit,
      }
      dispatch(userActions.set_credit(payload));
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

export const addCredit = (creditAdded) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
  
    const sendRequest = async () => {
      return await axios.put(
        `${backendLink}/transaction`,
        creditAdded,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    };

    try {
      console.log("here", creditAdded);
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