// React Imports
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

// Component Imports
import Header from "../UI/Header/Header";
import ChatMessage from "../ChatMessage/ChatMessage";

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

const ChatUser = () => {
  console.log("CHATUSER RUNNING");

  const { chatId } = useParams();
  const [socket, setSocket] = useState<Socket>(null);
  const [messages, setMessages] = React.useState([]);

  const userId = localStorage.getItem("userId");
  const messagesEnd = useRef(null);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { state } = location;
  const locationState: any = state;
  let chatData;

  if (locationState) {
    chatData = locationState.chat;
  }

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
            <h3>{chatData.receiver.name}</h3>
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
