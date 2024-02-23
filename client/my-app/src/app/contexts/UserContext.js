"use client";
import React, { createContext, useState, useContext } from "react";

// Create the MessageContext
const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);


export const UserProvider = ({ children }) => {
  const [userStatus, setUserStatus] = useState();

  const contextValue = {
    userStatus,
    setUserStatus,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
