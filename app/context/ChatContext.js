"use client";

import { createContext, useContext, useState } from "react";

const ChatViewContext = createContext();

export const ChatViewProvider = ({ children }) => {
  const [view, setView] = useState("bot");
  const [selectedUser, setSelectedUser] = useState(null);

  const value = {
    view,
    setView,
    selectedUser,
    setSelectedUser,
  };
  return (
    <ChatViewContext.Provider value={value}>
      {children}
    </ChatViewContext.Provider>
  );
};

export const useChatContext  = () => {
  const context = useContext(ChatViewContext);
  if (!context)
    throw new Error("useChatContext must be used within ChatViewProvider");
  return context;
};
