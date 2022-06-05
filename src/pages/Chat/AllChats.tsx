// React Imports
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Component Imports
import Header from "../../components/UI/Header/Header";
import { useAppDispatch } from "../../store/hooks";

// Actions Imports
import { getChatsById } from "../../store/Chat/chatActions";

// Style / Icon Imports
import styles from "./AllChats.module.css";

const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [chats, setChats] = useState([]);

  let chatList = chats.map((chat) => {
    return (
      <div
        className={styles["chat-list-item"]}
        key={chat._id}
        onClick={() => chatClickHander(chat._id)}>
        <div className={styles["chat-list-image"]}>
          <img src="/images/mahad_profile_pic.jpg" alt="" />
        </div>
        <div className={styles["chat-text"]}>
          <h3>{chat.receiver.name}</h3>
          <p>{"What a legend!"}</p>
        </div>
      </div>
    );
  });

  const chatClickHander = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  useEffect(() => {
    dispatch(getChatsById()).then((fetchedChats) => {
      console.log(fetchedChats);
      setChats(fetchedChats);
    });
  }, [dispatch]);

  return (
    <div className={styles["chat-container"]}>
      <Header backLink="/" content="Recent Chat" />
      {chatList}
    </div>
  );
};

export default Chat;
