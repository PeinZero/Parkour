import { io } from "socket.io-client";

const createSocket = async (userId = localStorage.getItem("userId") ) => {

  if(!userId){
    return;
  }

  const userSocket = await io("http://localhost:5001",{
    autoConnect: false
  });

  userSocket.auth = {userId};   
  userSocket.connect();

  userSocket.on('connect', () => {
    console.log("User Connected!\n", userSocket);
  });

  return userSocket;
}

export default createSocket;