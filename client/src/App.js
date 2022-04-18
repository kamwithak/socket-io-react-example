import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";

const socket = io.connect("http://localhost:3001");

function App() {
  //Room State
  const [room, setRoom] = useState("");

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div className="App">
      <Typography variant="h2" component="h2">
        socket.io messaging system
      </Typography>;
      <TextField id="outlined-basic" label="Room Number" variant="outlined" onChange={(event) => {
          setRoom(event.target.value);
        }}/>
      <Button onClick={joinRoom} variant="text">Join Room</Button>
      <TextField id="outlined-basic" label="Message" variant="outlined" onChange={(event) => {
          setMessage(event.target.value);
        }}/>
      <Button onClick={sendMessage} variant="text">Send Message</Button>
      <Typography variant="h5" component="h5">
        Message Board:
      </Typography>;
      {messageReceived}
    </div>
  );
}

export default App;
