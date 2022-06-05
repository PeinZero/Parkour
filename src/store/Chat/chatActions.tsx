import axios from "axios";
import { backendLink } from "../../helper/backendLink";

export const createChat = (sellerId) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    const sendRequest = async () => {
      return await axios.post(
        `${backendLink}/chat`,
        { sellerId },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    };

    try {
      const response = await sendRequest();
      return response.data.chatId;
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

export const getChat = (chatId) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    const sendRequest = async () => {
      return await axios.get(`${backendLink}/chat/${chatId.toString()}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
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

export const getChatsById = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    const sendRequest = async () => {
      return await axios.get(`${backendLink}/chat/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    };

    try {
      const response = await sendRequest();
      return response.data.chats;
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

// export const sendNotification = (chatId, ) => {

// }
