import axios from "axios";
import { authActions } from "./authentication";
import { } from "../User/user";
import { backendLink } from "../../helper/backendLink";

export const sendLoginData = (loginData) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      return await axios.post(`${backendLink}/auth/login`, loginData);
    };

    try {
      const response = await sendRequest();

      const remainingTimeInMs = 60 * 60 * 1000;
      // const expiryDate = new Date(new Date().getTime() + remainingTimeInMs);

      localStorage.setItem("token", response.data.token);
      // localStorage.setItem("expiryDate", expiryDate.toISOString());
      localStorage.setItem("userId", response.data.user._id);

      return response;

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
      axios.post(`${backendLink}/auth/signup`, signupData);
    };

    try {
      const response = await sendRequest();
      dispatch(authActions.signup());

      return response;
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
