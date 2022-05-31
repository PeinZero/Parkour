// React Imports
import React, { Fragment, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Component Imports
import Header from "../UI/Header/Header";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";

// Style / Icon Imports
import styles from "./ChatUser.module.css";
import SendIcon from "@mui/icons-material/Send";

let allMessages = [
  {
    id: 1,
    sender: "You",
    message: "Hey, how are you?",
    time: "12:00",
  },
  {
    id: 2,
    sender: "Mahad Khalid",
    message: "I didn't recieve the payment",
    time: "12:01",
  },
  {
    id: 3,
    sender: "You",
    message: "You are not here yet",
    time: "12:02",
  },
  {
    id: 4,
    sender: "You",
    message: "When will you come ?",
    time: "12:03",
  },
  {
    id: 5,
    sender: "Mahad Khalid",
    message: "Yup the Spot is free !",
    time: "12:04",
  },
  {
    id: 6,
    sender: "You",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    time: "12:05",
  },
  {
    id: 7,
    sender: "Ammar",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    time: "12:06",
  },
];

const ChatUser = () => {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const [messages, setMessages] = React.useState(allMessages);
  const [chat, setChat] = React.useState(null);

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
      })
    );
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = (e: any) => {
    e.preventDefault();
    console.log(e.target.message.value);
    setMessages((msgs) => [
      ...msgs,
      {
        id: msgs.length + 1,
        sender: "You",
        message: e.target.message.value,
        time: "12:07",
      },
    ]);
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
