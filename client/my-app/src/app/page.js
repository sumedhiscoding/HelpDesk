"use client"
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const WebSocketComponent = () => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    //first we need to get the 
    
    
    // Connect to the socket.io server
    const newSocket = io('http://localhost:3000/');
    console.log("this is socket",newSocket);
    setSocket(newSocket);
    // Event listener for receiving messages from the server
    newSocket.on('message', (data) => {
      console.log('Received message from server:', data);
      // setMessages((prev)=>[...prev, data.messageText]);
      setMessages((prevMessages) => prevMessages.length > 0 ? [...prevMessages, {id:data.senderId, text:data.messageText}] : [{id:data.senderId, text:data.messageText}]);
      // setMessages((prevMessages) => prevMessages.slice(1, prevMessages.length));
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    // Send message to the server
    socket.emit('clientMessage', { message });
    setMessage(''); // Clear input after sending
  };

  return (
    <div>
      <h1>Socket.IO Example</h1>

      <div>
        <p>Socket.IO State: {socket ? 'Connected' : 'Not Connected'}</p>
        <button onClick={handleSendMessage} disabled={!socket}>
          Send Message
        </button>
      </div>
      <div>
        {/* Render received messages */}
        {messages.map((msg, index) => (
          <div key={index}>
            <p>ID: {msg.id}</p>
            <p>Text: {msg.text}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebSocketComponent;
