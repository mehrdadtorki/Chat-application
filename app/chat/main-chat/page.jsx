"use client";

import { useChatContext } from "@/app/context/ChatContext";
import ChatBotPage from "./chat-bot/page";
import ChatNotFound from "./chat-not-found/page";
import ChatUserPage from "./chat-user/page";

const ChatMainPage = ({ user }) => {
  const { view, selectedUser } = useChatContext();

  return (
    <div className="w-full h-full max-h-[calc(100dvh-100px)] flex flex-col flex-1 items-center justify-center">
      {view === "bot" ? (
        <ChatBotPage user={user} />
      ) : view === "user" ? (
        <ChatUserPage currentUser={user} selectedUser={selectedUser} />
      ) : (
        <ChatNotFound />
      )}
    </div>
  );
};

export default ChatMainPage;
