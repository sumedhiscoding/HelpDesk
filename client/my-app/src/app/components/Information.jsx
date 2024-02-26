"use client";
import React, { useEffect, useState } from "react";
import { useMessageContext } from "../contexts/MessageContext";
import { signOut } from "firebase/auth";
const Information = () => {
  const { selectedConversation, conversations } = useMessageContext();
  const [currentUser, setCurrentUser] = useState({});
  const findUser = (data) => {
    if (data && data.data && data.data[0]) {
      return data.data[0].from.name === "HelpDesk"
        ? data.data[0].to
        : data.data[0].from;
    }
    return "";
  };

  const handleLogout = async () => {
    try {
      // Add Firebase sign out logic here
      await signOut(auth);
      router.push("/"); // Redirect to the login page or home page after logout
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    console.log("inside INfo ", selectedConversation);
    if (selectedConversation) {
      setCurrentUser(findUser(selectedConversation));
    }
    console.log("inside current user", currentUser);
  }, [selectedConversation, currentUser]);
  return (
    <div className="h-screen overflow-hidden">
    <div className="flex justify-end"><button onClick={handleLogout} className="mt-4 bg-red-500 mx-5 text-white px-4 py-2 rounded-md">SignOut</button></div>
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 bg-gray-200 rounded-md shadow-md">
        {currentUser ? (
          <div>
            {/* {console.log("inside infor", selectedConversation, conversations)} */}
            <div>
              <div className="mb-2">
                <label className="text-lg font-bold">Name:</label>
                <div className="text-lg font-bold">{currentUser.name}</div>
              </div>
              <div className="mb-2">
                <label className="text-sm text-gray-600">Email:</label>
                <div className="text-sm text-gray-600">{currentUser.email}</div>
              </div>
              <div className="mb-2">
                <label className="text-sm text-gray-600">ID:</label>
                <div className="text-sm text-gray-600">{currentUser.id}</div>
              </div>
            </div>
          </div>
        ) : (
          <div>Select a Conversation...</div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Information;
