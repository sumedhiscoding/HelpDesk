import React,{useEffect,useState} from "react";
import {  useMessageContext } from "../contexts/MessageContext";
const ConversationsList = () => {
  const {conversations,selectedConversation,setSelectedConversation} = useMessageContext();
  const [Id,setId]=useState(conversations[0]?.id);
  useEffect(() => {
    console.log("conversations",conversations);
    // console.log(mainConversation);
    //we have to take the  conversations and append the new messages
    const conversationsId = conversations.find((conversation,idx) => {
      if (conversation.id === Id) {
        return conversation;
      }
    });
    console.log("conversation to be send to main",conversationsId?.messages)
    setSelectedConversation(conversationsId?.messages);
    console.log("selectedconversation",selectedConversation);
  }, [conversations,selectedConversation]);

  const handleOnClick = (id) => {
    const conversationsId = conversations.find((conversation,idx) => {
      if (conversation.id === id) {
        return conversation;
      }
    });
    console.log("conversations",conversationsId.messages)
    setSelectedConversation(conversationsId.messages);
  };
//   console.log(conversations);
  return (
    <div>
      {conversations.map((conversation) => {
        const participants = conversation.participants.data;
        const filteredParticipants = participants.filter(
          (participant) => participant.name !== "HelperDesk"
        );

        return (
          <div key={conversation.id}>
            <h3>Conversation ID: {conversation.id}</h3>
            <ul>
              {filteredParticipants.map((participant) => (
                <li
                  key={participant.id}
                  className="bg-orange-400 m-4 p-4"
                  onClick={() => {
                    setId(conversation.id);
                    handleOnClick(conversation.id);
                  }}
                >
                  Name: {participant.name}, Email: {participant.email}, ID:{" "}
                  {participant.id}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default ConversationsList;
