"use client";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { GetConversationsFromMessenger } from "@/utilities/GetConversations";
import dotenv from "dotenv";
import MainConversation from "../components/MainConversation";
import Information from "../components/Information";
import Conversations from "../components/Conversations";
import { MessageProvider, useMessageContext } from "../contexts/MessageContext";
import { useUserContext } from "../contexts/userContext";

const PAGE_ACCESS_TOKEN =
  "EAAFOSMP8bxYBOZBdT0fJ6XwCnWlTc9PdxagPSa8Pc8qztVfS1GzAUOWVJAZAmqw1qxEMkEcUy6y2L9CZCGjDppbRZA8AvpQAOufFGXYpfHPNauTf1JPhic9Pam70VZAEgincZCElpMTY4lbh2UN5lSNDfc9LUejxZChuMuXqcnf0VRLKOyhuGRxeBwTFrl3vbDi";
const PAGE_ID = "238945609301859";

const page = () => {
  const [socket, setSocket] = useState(null);
  const { addMessage } = useMessageContext();
  const { conversations, setConversations } = useMessageContext();
  const [oldconversations, setOldConversations] = useState();

  useEffect(() => {
    // Fetch old conversations when the component mounts
    getOldConversations();
  }, []);

  useEffect(() => {
    const initializeSocket = async () => {
      // First, get old conversations
      // Check if conversations is truthy before proceeding
      if (conversations) {
        // Connect to the socket.io server
        const newSocket = io("http://localhost:3000/");
        console.log("this is socket", newSocket);
        setSocket(newSocket);

        // Event listener for receiving messages from the server
        newSocket.on("message", handleMessage);

        // Clean up the socket connection when the component unmounts
        return () => {
          newSocket.disconnect();
        };
      }
    };

    initializeSocket();
  }, [conversations]);

  const getOldConversations = async () => {
    const PageAccessToken = `${PAGE_ACCESS_TOKEN}`;
    localStorage.setItem("PageId", PAGE_ID);
    const PageId = localStorage.getItem("PageId");
    const response = await GetConversationsFromMessenger({
      PageId,
      PageAccessToken,
    });
    setConversations(response.response.data);
  };

  useEffect(() => {
    console.log(conversations);
  }, [conversations]);

  const handleMessage = (data) => {
    console.log("Received message from server:", data);
    // addMessage(data);

    if (data.senderId === PAGE_ID) {
      const filtered = conversations.filter((conv) => {
        return conv.participants.data[0].id === data?.recipientId;
      });

      console.log(filtered);
      const temp = filtered[0];

      const obj = {
        id: data.messageId,
        message: data.messageText,
        from: {
          name: "HelperDesk",
          email: `${PAGE_ID}@facebook.com`,
          id: `${PAGE_ID}`,
        },
        to: {
          data: [
            {
              name: temp?.participants.data[0].name,
              email: temp?.participants.data[0].email,
              id: temp?.participants.data[0].id,
            },
          ],
        },
      };
      console.log("hello", obj);
      const requiredId = temp?.id;
      console.log("required", requiredId);
      const newConversation = conversations?.map((conv) => {
        if (conv.id === requiredId) {
          return {
            ...conv,
            messages: {
              data: [obj, ...conv.messages.data], // Append the new message to the existing array
              paging: conv.messages.paging, // Preserve the existing paging information
            },
          };
        } else {
          return conv;
        }
      });
      console.log("newConversation", newConversation);
      setConversations(newConversation);
    } else {
      const filtered = conversations?.filter((conv, idx) => {
        return conv.participants.data[0].id === data?.senderId;
      });

      console.log(filtered);
      const temp = filtered[0];

      const obj = {
        id: data.messageId,
        message: data.messageText,
        from: {
          name: temp?.participants.data[0].name,
          email: temp?.participants.data[0].email,
          id: temp?.participants.data[0].id,
        },
        to: {
          data: [
            {
              name: temp?.participants.data[1].name,
              email: temp?.participants.data[1].email,
              id: temp?.participants.data[1].id,
            },
          ],
        },
      };
      console.log("hello", obj);
      const requiredId = temp?.id;
      console.log("required", requiredId);
      const newConversation = conversations?.map((conv) => {
        if (conv.id === requiredId) {
          return {
            ...conv,
            messages: {
              data: [obj, ...conv.messages.data], // Append the new message to the existing array
              paging: conv.messages.paging, // Preserve the existing paging information
            },
          };
        } else {
          return conv;
        }
      });
      console.log("newConversation", newConversation);
      setConversations(newConversation);
    }
  };

  return (
    <div>
      {
        <div className="grid grid-cols-3 h-screen">
          <div className="">
            <Conversations />
          </div>
          <div>
            <MainConversation />
          </div>
          <div>
            <Information />
          </div>
        </div>
      }
    </div>
  );
};
export default page;
