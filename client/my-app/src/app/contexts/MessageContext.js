"use client"
import React, { createContext, useState, useContext } from 'react';

// Create the MessageContext
const MessageContext = createContext();

// Create a custom hook to access the MessageContext
export const useMessageContext = () => useContext(MessageContext);

// Create the MessageProvider component
export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]); 
  const [mainConversation, setMainConversation] = useState([]);
  const [conversations,setConversations]=useState([]);
  const [selectedConversation,setSelectedConversation] = useState({});
  // Function to add a new message to the context
  const addMessage = (newMessage) => {
    setMessages((prevMessages) =>[...prevMessages, newMessage]);
  };
  
  // Function to clear all messages from the context
  const clearMessages = () => {
    setMessages([]);
  };

  // Value object to be passed to the context provider
  const contextValue = {
    mainConversation,setMainConversation,
    setConversations,
    conversations,
    messages,
    addMessage,
    clearMessages,selectedConversation,setSelectedConversation
  };

  return (
    <MessageContext.Provider value={contextValue}>
      {children}
    </MessageContext.Provider>
  );
};
