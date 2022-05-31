// React Imports
import React, { Fragment, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Component Imports
import Header from "../UI/Header/Header";
import ChatMessage from "../ChatMessage/ChatMessage";

// Style / Icon Imports
import styles from "./ChatUser.module.css";
import SendIcon from "@mui/icons-material/Send";

// Util Imports
import io from "socket.io-client";
import { formatAMPM } from "../../helper/timeFunctions";

let allMessages = [
  {
    id: 1,
    sender: "627d6089d0cd1a6120024216",
    message: "Hey, how are you?",
    time: "12:00 PM",
  },
  {
    id: 2,
    sender: "627d6092d0cd1a612002421d",
    message: "I didn't recieve the payment",
    time: "12:01 PM",
  },
  {
    id: 3,
    sender: "627d6089d0cd1a6120024216",
    message: "You are not here yet",
    time: "12:02 PM",
  },
  {
    id: 4,
    sender: "627d6089d0cd1a6120024216",
    message: "When will you come ?",
    time: "12:03 PM",
  },
  {
    id: 5,
    sender: "627d6092d0cd1a612002421d",
    message: "Yup the Spot is free !",
    time: "12:04 PM",
  },
  {
    id: 6,
    sender: "627d6089d0cd1a6120024216",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    time: "12:05 PM",
  },
  {
    id: 7,
    sender: "627d6092d0cd1a612002421d",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    time: "12:06 PM",
  },
];

const ChatUser = () => {
  const socket = io("http://localhost:5001");

  const [messages, setMessages] = React.useState(allMessages);
  const [chat, setChat] = React.useState(null);

  const userId = localStorage.getItem("userId");
  const messagesEnd = useRef(null);
  const location = useLocation();
  const { state } = location;
  let chatInfo: any;
  const locationState: any = state;

  if (locationState) {
    chatInfo = locationState.chat;
  }

  useEffect(() => {
    setChat(
      messages.map((msg) => {
        return <ChatMessage message={msg} key={msg.id} />;
      })
    );
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((msgs) => [
        ...msgs,
        {
          id: msgs.length + 1,
          sender: msg.sender,
          message: msg.message,
          time: msg.time,
        },
      ]);
    });
  }, [socket]);

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = (e: any) => {
    e.preventDefault();
    if (e.target.message.value.length < 0) {
      return;
    }

    socket.emit("sendMessage", {
      id: messages.length + 1,
      sender: userId,
      message: e.target.message.value,
      time: formatAMPM(new Date()),
    });
  };

  return (
    <Fragment>
      <Header backLink="/" content="Chat" />
      <div className={styles["chat-container"]}>
        <div className={styles["chat-header"]}>
          <img src={chatInfo.imgSrc} alt="" />
          <h3>{chatInfo.name}</h3>
        </div>

        <div className={styles["chat-content"]}>
          {chat}
          <div
            style={{ float: "left", clear: "both", border: "1px solid black" }}
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
    </Fragment>
  );
};

export default ChatUser;
