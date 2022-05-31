// React Imports
import React from "react";
import { useNavigate } from "react-router-dom";

// Component Imports
import Header from "../../components/UI/Header/Header";

// Style / Icon Imports
import styles from "./Chat.module.css";

let recentlyChatted = [
  {
    id: 1,
    name: "Abdullah Raheel",
    lastMessage: "Hey, how are you?",
    imgSrc: "/images/mahad_profile_pic.jpg",
  },
  {
    id: 2,
    name: "Mahad Khalid",
    lastMessage: "I didn't recieve the payment",
    imgSrc: "/images/mahad_profile_pic.jpg",
  },
  {
    id: 3,
    name: "Ammar Nasir",
    lastMessage: "You are not here yet",
    imgSrc: "/images/mahad_profile_pic.jpg",
  },
  {
    id: 4,
    name: "Elusive",
    lastMessage: "When will you come ?",
    imgSrc: "/images/mahad_profile_pic.jpg",
  },
  {
    id: 5,
    name: "John Doe",
    lastMessage: "Yup the Spot is free !",
    imgSrc: "/images/mahad_profile_pic.jpg",
  },
];

const Chat = () => {
  const navigate = useNavigate();

  let chatList = recentlyChatted.map((chat) => {
    return (
      <div
        className={styles["chat-list-item"]}
        key={chat.id}
        onClick={() => chatClickHander(chat)}>
        <div className={styles["chat-list-image"]}>
          <img src={chat.imgSrc} alt="" />
        </div>
        <div className={styles["chat-text"]}>
          <h3>{chat.name}</h3>
          <p>{chat.lastMessage}</p>
        </div>
      </div>
    );
  });

  const chatClickHander = (chat: any) => {
    navigate(`/chat/${chat.id}`, {
      state: { chat },
    });
  };

  return (
    <div className={styles["chat-container"]}>
      <Header backLink="/" content="Recent Chat" />
      {chatList}
    </div>
  );
};

export default Chat;
