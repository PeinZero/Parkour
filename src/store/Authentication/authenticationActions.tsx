import axios from "axios";
import { authActions } from "./authentication";
import { userActions } from "../User/user";
import { backendLink } from "../../helper/backendLink";

export const sendLoginData = (loginData) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await axios.post(`${backendLink}/auth/login`, loginData);

      return response;
    };

    try {
      const response = await sendRequest();

      dispatch(
        authActions.login({
          isAuth: true,
          token: response.data.token,
          userId: response.data.user._id,
        })
      );

      const remainingTimeInMs = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingTimeInMs);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("expiryDate", expiryDate.toISOString());
      localStorage.setItem("userId", response.data.user._id);
      
      dispatch(userActions.createUser(response.data.user))
      console.log(response.data.message);
    } catch (err) {
      // Validation Check.
      if (err.response.status === 422) {
        console.log("Validation Failed");
      }

      // Authentication Check.
      if (err.response.status !== 200 && err.response.status !== 201) {
        console.log("Could not authenticate you!");
      }

      dispatch(authActions.logout());
    }
  };
};

export const sendSignupData = (signupData) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = axios.post(`${backendLink}/auth/signup`, signupData);
    };

    try {
      await sendRequest();
      dispatch(authActions.signup());
    } catch (err) {
      if (err.response.status === 422) {
        console.log("Validation Failed!");
      }

      if (err.response.status !== 200 && err.response.status !== 201) {
        console.log("Creating a user failed!");
      }

      dispatch(authActions.signup());
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(authActions.logout());
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
  };
};
