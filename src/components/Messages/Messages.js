import React from "react";
import Message from "../Message/Message.js";
import "./Messages.css";


const Messages = ({ messages, name }) => {
  
  


  return (
    <div className="messages">

      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ))}
    
    </div>
  )
    
  
};

export default Messages;
