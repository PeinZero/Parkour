import React from "react";
import styles from "./ChatMessage.module.css";

const ChatMessage = (props: any) => {
  const userId = localStorage.getItem("userId");
  const { id, message, sender, time } = props.message;
  const isSender = sender === userId;
  const messageClass = isSender ? styles.sent : styles.received;

  return (
    <div className={`${styles["chat-msg"]} ${messageClass}`} key={id}>
      {message}
      <div className={styles["chat-msg-time"]}>{time}</div>
    </div>
  );
};

export default ChatMessage;
