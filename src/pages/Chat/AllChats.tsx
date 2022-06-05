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
        onClick={() => chatClickHander(chat)}>
        <div className={styles["chat-list-image"]}>
          <img src="/images/mahad_profile_pic.jpg" alt="" />
        </div>
        <div className={styles["chat-text"]}>
          <h3>{chat.receiver.name}</h3>
          <div>
            <p>{chat.lastMessage.message}</p>
            <p style={{ fontSize: "9px", margin: "0px" }}>{chat.lastMessage.time}</p>
          </div>
        </div>
      </div>
    );
  });

  const chatClickHander = (chat) => {
    navigate(`/chat/${chat._id}`, {
      state: { chat },
    });
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
