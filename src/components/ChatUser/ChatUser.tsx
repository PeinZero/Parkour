// React Imports
import React from "react";
import { useLocation } from "react-router-dom";

// Component Imports
import Header from "../UI/Header/Header";

// Style / Icon Imports
import styles from "./ChatUser.module.css";

let allMessages = [
  {
    id: 1,
    sender: "You",
    message: "Hey, how are you?",
  },
  {
    id: 2,
    sender: "Mahad Khalid",
    message: "I didn't recieve the payment",
  },
  {
    id: 3,
    sender: "You",
    message: "You are not here yet",
  },
  {
    id: 4,
    sender: "You",
    message: "When will you come ?",
  },
  {
    id: 5,
    sender: "Mahad Khalid",
    message: "Yup the Spot is free !",
  },
];

const ChatUser = () => {
  const location = useLocation();
  const { state } = location;
  let chatInfo: any;
  const locationState: any = state;

  if (locationState) {
    chatInfo = locationState.chat;
  }

  let chatList = allMessages.map((msg) => {
    if (msg.sender === "You") {
      return (
        <div className={`${styles["chat-msg"]} ${styles["sent"]}`} key={msg.id}>
          {msg.message}
        </div>
      );
    } else {
      return (
        <div className={`${styles["chat-msg"]} ${styles["received"]}`} key={msg.id}>
          {msg.message}
        </div>
      );
    }
  });

  return (
    <div className={styles["chat-container"]}>
      <Header backLink="/" content="Chat" />

      <div className={styles["chat-header"]}>
        {/* <div className={styles["chat-header-image"]}> */}
        <img src={chatInfo.imgSrc} alt="" />
        {/* </div> */}
        <h3>{chatInfo.name}</h3>
      </div>

      <div className={styles["chat-content"]}>{chatList}</div>

      <div className={styles["chat-input"]}>
        <input type="text" placeholder="send message" />
      </div>
    </div>
  );
};

export default ChatUser;
