import React, { useState } from "react";
import { Link } from "react-router-dom"; // it is used to link our chat
import './Join.css';

const Join = () => {
  const [name, setName] = useState(''); // this will set the name variable to an empty string
  const [room, setRoom] = useState(''); // this will set the room variable to an empty string

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className='heading'>Join</h1>
        <div><input type="text" className='joinInput' placeholder='User Name' onChange={(event)=> setName(event.target.value)} /></div>




        <div><input type="text" className='joinInput mt-20' placeholder='Room Name' onChange={(event)=> setRoom(event.target.value)} /></div>


        {/* Now we pass the link to the chat.js and there we can receive it  */}


        <Link onClick={event=> (!name || !room) ? event.preventDefault():null} to={`/chat?name=${name}&room=${room}`}>

          <button className='button mt-20' type='submit'>Sign In</button>
        </Link>
        
      </div>
    </div>
  );
};

export default Join;
