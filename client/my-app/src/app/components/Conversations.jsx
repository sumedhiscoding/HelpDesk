import React, { useState, useEffect, useContext } from "react";
import ConversationsList from "./ConversationList";
import { io } from "socket.io-client";
import { useMessageContext } from "../contexts/MessageContext"; // Update this with the correct path

const Conversations = () => {
//   here we need convesation List for conversations to be rendered
    const {conversations} = useMessageContext(); 
    // console.log("conversations",conversations);
  return (
    <div className="h-screen overflow-auto">
      <div className="text-3xl p-4 font-mono font-semibold border-b-4"  >

      Conversations
      </div>
      {conversations && (<div className="p-3">
        <ConversationsList  />
      </div>)
      }
    </div>
  );
};

export default Conversations;
