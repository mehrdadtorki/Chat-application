// app/test-chat/page.jsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChat } from "ai/react";
import { useCallback, useMemo } from "react";

export default function ChatBotPage({ user }) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
    setInput,
  } = useChat({
    api: "/api/chat/chat-bot",
  });

  const handleSendMessage = useCallback(
    async (e) => {
      e.preventDefault();
      if (!input.trim()) return;

      const userMessage = {
        role: "user",
        content: input,
        timestamp: new Date().toISOString(),
      };
      append(userMessage);
      setInput("");

      try {
        const res = await fetch("/api/chat/chat-bot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: [...messages, userMessage] }),
        });

        const data = await res.json();

        if (data.messages && data.messages.length > 0) {
          append({ ...data.messages[0], timestamp: new Date().toISOString() });
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    },
    [input, messages, append, setInput]
  );

  const formattedMessages = useMemo(() => {
    return messages.map((message, index) => ({
      ...message,
      id: index,
      timestamp: message.timestamp
        ? new Date(message.timestamp).toLocaleTimeString()
        : "",
    }));
  }, [messages]);

  return (
    <div className="w-full mx-auto p-4 flex flex-col flex-1">
      <div className="w-full rounded-lg border-zinc-200 border-1 item-center flex">
        <h1 className="text-3xl font-bold mb-6">Chat Bot</h1>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {formattedMessages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 gap-2 ${
              message.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <Avatar className="rounded-full">
              <AvatarImage
                className="rounded-full"
                src={user?.profile}
                // src={message.role === "user" ? user?.profile : "/default-avatar.png" }
              />
              <AvatarFallback className="rounded-full">
                {/* <User className="h-3/5 w-3/5 text-muted-foreground" /> */}
                {user?.username.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div
              className={`p-4 rounded-lg max-w-xs ${
                message.role === "user" ? "bg-blue-100" : "bg-gray-100"
              }`}
            >
              <span className="text-sm font-semibold">
                {message.role === "user" ? user.username : "AI"}
              </span>
              <p className="mt-1 whitespace-pre-wrap">{message.content}</p>
              <span className="text-xs text-gray-500">{message.timestamp}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full">
        <form
          onSubmit={handleSendMessage}
          className="flex gap-2 sticky bottom-0 bg-white p-2 border-t"
        >
          <input
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
