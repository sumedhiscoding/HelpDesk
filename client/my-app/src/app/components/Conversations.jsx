import React, { useState, useEffect, useContext } from "react";
import ConversationsList from "./ConversationList";
import { io } from "socket.io-client";
import { useMessageContext } from "../contexts/MessageContext"; // Update this with the correct path

const Conversations = () => {
//   here we need convesation List for conversations to be rendered
    const {conversations} = useMessageContext(); 
    // console.log("conversations",conversations);
  return (
    <>
      Conversations
      {conversations && (<div>
        <ConversationsList  />
      </div>)
      }
    </>
  );
};

export default Conversations;
