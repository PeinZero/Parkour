import React from "react";
import Header from "../../components/UI/Header/Header";
import styles from "./Chat.module.css";

let recentlyChatted = [
  {
    id: 1,
    name: "Abdullah Raheel",
    lastMessage: "Hey, how are you?",
  },
  {
    id: 2,
    name: "Mahad Khalid",
    lastMessage: "I didn't recieve the payment",
  },
  {
    id: 3,
    name: "Ammar Nasir",
    lastMessage: "You are not here yet",
  },
  {
    id: 4,
    name: "Elusive",
    lastMessage: "When will you come ?",
  },
  {
    id: 5,
    name: "John Doe",
    lastMessage: "Yup the Spot is free !",
  },
];

const chatClickHander = (id) => {
  console.log(id);
};

const Chat = () => {
  let chatList = recentlyChatted.map((chat) => {
    return (
      <div
        className={styles["chat-list-item"]}
        key={chat.id}
        onClick={() => chatClickHander(chat.id)}>
        <div className={styles["chat-list-image"]}>
          <img src="/images/mahad_profile_pic.jpg" alt="" />
        </div>
        <div className={styles["chat-text"]}>
          <h3>{chat.name}</h3>

          <p>{chat.lastMessage}</p>
        </div>
      </div>
    );
  });

  return (
    <div className={styles["chat-container"]}>
      <Header backLink="/" content="Recent Chat" />
      {chatList}
    </div>
  );
};

export default Chat;
