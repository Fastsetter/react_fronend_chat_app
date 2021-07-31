import React from "react";
import queryString from "query-string";
import { useEffect } from "react";
import io from "socket.io-client";
import { useState } from "react";
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar.js';
import Input from '../Input/Input.js'
import Messages from '../Messages/Messages.js'
let socket;

const Chat = ({ location }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { name, room } = queryString.parse(location.search);
  const endpoint = "https://chat-app757.herokuapp.com/";
  useEffect(() => {
    

    socket = io(endpoint, {
      reconnection: false,
      withCredentials: true,
      reconnectionDelayMax: 10000,
      reconnectionDelayd: 2000,
      extraHeaders: {
        "my-custom": "chat",
      },
    });

    socket.io.on("reconnect_failed", () => {
      console.log("reconnecting");
    });

    socket.io.on("reconnect_error", (error) => {
      console.log("server closed");
    });

    socket.io.on("reconnect_attempt", (attempt) => {
      console.log("attempting to reconnect");
    });

    socket.io.on("reconnect", (attempt) => {
      console.log("connected");
    });

    socket.emit("join", { name, room },(err)=>{

    });

    return()=>{
      socket.emit('disconnect');
      socket.off();
    }

  }, [endpoint, location.search,name,room]);

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages([...messages, msg]);
    });
    const messageddiv=document.querySelector('.messages');
    messageddiv.scrollTop=messageddiv.scrollHeight;

  
  }, [messages]);

  // function for sending message;
  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendmsg", message, () => setMessage(""));
    }
  };
  


  return (
    <div className="outerContainer">

      <div className="container">


      <InfoBar room={room}/>
      <Messages messages={messages} name={name}/>
      {}
      <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      

      </div>
    </div>
  );
};

export default Chat;
