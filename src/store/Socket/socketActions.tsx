import createSocket from "../../helper/createSocket"

export const initializeSocket = () => {
  return async (dispatch) => {
    try {
      return await createSocket();
    } 
    catch (error) {
      console.log(error);
    }
  };
};