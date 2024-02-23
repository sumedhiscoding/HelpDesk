"use client";
import React, { useEffect, useState } from "react";
import { useMessageContext } from "../contexts/MessageContext";
const Information = () => {
  const { conversations,selectedConversation } = useMessageContext();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  // const [info ,setInfo]=useState(conversations[0]?.messages);
  console.log("selectedConversation in information", selectedConversation);
  // const name=selectedConversation?.data[0]?.to?.data[0]?.name;
  // const email=selectedConversation?.data[0]?.to?.data[0]?.email;
  useEffect(() => {
    // if (selectedConversation.data.length > 0) {
      // console.log("name is", selectedConversation?.data[0]?.to?.data[0]?.name);
      // setInfo(selectedConversation)
      console.log(selectedConversation)
      // setName(info?.data[0]?.to?.data[0]?.name);
      // setEmail(info?.data[0]?.to?.data[0]?.email);
    // }
  }, [selectedConversation]);

  return (
    <div>
      <div>Information</div>
      {/* <div>{name}</div>/<div>{email}</div> */}
    </div>
  );
};

export default Information;
