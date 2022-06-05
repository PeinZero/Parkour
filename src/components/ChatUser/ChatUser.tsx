// React Imports
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

// Component Imports
import Header from "../UI/Header/Header";
import ChatMessage from "../ChatMessage/ChatMessage";
import Loader from "../UI/Loader/Loader";

// Style / Icon Imports
import styles from "./ChatUser.module.css";
import SendIcon from "@mui/icons-material/Send";

// Util Imports
import io, { Socket } from "socket.io-client";
import { formatAMPM } from "../../helper/timeFunctions";

// Redux Imports
import { useAppDispatch } from "../../store/hooks";
import { getChat } from "../../store/Chat/chatActions";
import ReactDOM from "react-dom";

// let allMessages = [
//   {
//     id: 1,
//     sender: "627d6089d0cd1a6120024216",
//     message: "Hey, how are you?",
//     time: "12:00 PM",
//   },
//   {
//     id: 2,
//     sender: "627d6092d0cd1a612002421d",
//     message: "I didn't recieve the payment",
//     time: "12:01 PM",
//   },
//   {
//     id: 3,
//     sender: "627d6089d0cd1a6120024216",
//     message: "You are not here yet",
//     time: "12:02 PM",
//   },
//   {
//     id: 4,
//     sender: "627d6089d0cd1a6120024216",
//     message: "When will you come ?",
//     time: "12:03 PM",
//   },
//   {
//     id: 5,
//     sender: "627d6092d0cd1a612002421d",
//     message: "Yup the Spot is free !",
//     time: "12:04 PM",
//   },
//   {
//     id: 6,
//     sender: "627d6089d0cd1a6120024216",
//     message:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//     time: "12:05 PM",
//   },
//   {
//     id: 7,
//     sender: "627d6092d0cd1a612002421d",
//     message:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//     time: "12:06 PM",
//   },
// ];

const ChatUser = () => {
  console.log("CHATUSER RUNNING");

  const { chatId } = useParams();
  const [socket, setSocket] = useState<Socket>(null);
  const [messages, setMessages] = React.useState([]);

  const userId = localStorage.getItem("userId");
  const messagesEnd = useRef(null);
  const dispatch = useAppDispatch();

  // console.log("Messages", messages);
  const renderedMessages = messages.map((msg) => {
    return <ChatMessage message={msg} key={msg._id} />;
  });

  const setMessageHandler = (message) => {
    setMessages((prevState) => [message, ...prevState]);
  };
  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = (e: any) => {
    e.preventDefault();
    const msg = e.target.message.value;
    if (msg === "") {
      return;
    }

    const message = {
      sender: userId,
      message: msg,
      time: formatAMPM(new Date()),
    };

    socket.emit("SendMessage", {
      chatId,
      message,
    });

    setMessageHandler(message);

    e.target.message.value = "";
  };

  useEffect(() => {
    console.log("ChatUser => useEffect() => Socket Init");

    dispatch(getChat(chatId)).then((fetchedChat) => {
      const { messages } = fetchedChat.chat;
      const mySocket = io("http://localhost:5001");

      mySocket.emit("JoinRoom", chatId);

      ReactDOM.unstable_batchedUpdates(() => {
        setSocket(mySocket);
        setMessages(messages.reverse());
      });
    });
  }, [chatId, dispatch]);

  useEffect(() => {
    if (socket) {
      socket.on("ReceiveMessage", ({ chatId, message }) => {
        console.log("ChatUser => useEffect() => Socket Message");
        console.log("Recieved Message: ", message);

        setMessageHandler(message);
      });
    }
  }, [socket, chatId]);

  return (
    <div className={styles["chatRoom-wrapper"]}>
      <Header
        className={styles["headerChatRoom"]}
        backLink="/"
        content={
          <div className={styles["chat-header"]}>
            <img src="/images/mahad_profile_pic.jpg" alt="" />
            <h3>Mahad Chuttar</h3>
          </div>
        }
      />
      <div className={styles["chat-content"]}>
        {renderedMessages}
        <div
          style={{
            float: "left",
            clear: "both",
          }}
          ref={messagesEnd}></div>
      </div>

      <form onSubmit={sendMessage} className={styles["send-message-container"]}>
        <input
          name="message"
          type="text"
          placeholder="send message"
          className={styles["input"]}
        />
        <button className={styles["send-message-button"]}>
          <SendIcon className={styles["send-message-icon"]} />
        </button>
      </form>
    </div>
  );
};

export default ChatUser;
