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
          <div key={conversation.id} className="border rounded-md p-4 shadow-lg mb-4 hover:shadow-xl transition duration-300 ease-in-out">
            <ul>
              {filteredParticipants.map((participant) => (
                <li
                  key={participant.id}
                  className="flex items-center justify-between bg-gradient-to-r from-teal-400 to-teal-500 text-white p-4 rounded-md cursor-pointer hover:bg-teal-600 transition duration-300 ease-in-out"
                  onClick={() => {
                    setId(conversation.id);
                    handleOnClick(conversation.id);
                  }}
                >
                  <div>
                    <span className="font-bold text-lg">{participant.name}</span>
                    <p className="text-gray-300 text-sm">Email: {participant.email}</p>
                  </div>
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
