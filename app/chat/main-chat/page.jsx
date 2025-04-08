"use client";

import { useChatContext } from "@/app/context/ChatContext";
import ChatBotPage from "./chat-bot/page";
import ChatUserPage from "./chat-user/page";

const ChatMainPage = ({ user }) => {
  const { view, selectedUser } = useChatContext();

  return (
    <div className="w-full h-full flex flex-col flex-1 items-center justify-center">
      {view === "bot" ? (
        <ChatBotPage user={user} />
      ) : view === "user" ? (
        <ChatUserPage currentUser={user} selectedUser={selectedUser} />
      ) : (
        <div className="text-muted-foreground">
          Select a user or bot to start chatting
        </div>
      )}
    </div>
  );
};

export default ChatMainPage;
