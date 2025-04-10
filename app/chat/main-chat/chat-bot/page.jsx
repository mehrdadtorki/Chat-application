"use client";

import { useChat } from "ai/react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SendHorizonal, User } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Image from "next/image";
import robotImage from "@/public/static/illustration/robot.png";

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

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
        ? format(new Date(message.timestamp), "p")
        : "",
    }));
  }, [messages]);

  return (
    <div className="h-full w-full flex flex-col rounded-2xl border-muted border-2 bg-background">
      {/* Header */}
      <div className="w-full flex items-center justify-between px-6 py-4 border-b bg-muted/50 gap-2">
        <Image
          src={robotImage}
          alt="AI Bot"
          className="h-6 w-6 rounded-full"
          // objectFit="cover"
          // className="absolute inset-0 dark:[filter:brightness(0.5)]"
        />
        <h2 className="text-md text-blue-400 dark:text-blue-200 font-semibold flex-1">
          You are connecting to <span className="font-bold text-blue-500 dark:text-blue-400">AI Bot</span>, start chatting with it!
        </h2>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 overflow-y-hidden p-4 space-y-2 relative bg-background">
        {/* Optional background pattern */}
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundRepeat: "repeat",
            backgroundSize: "390px 390px",
            backgroundImage: `url(@/public/static/illustration/shapeBg.svg)`,
          }}
        />
        <div className="relative z-10 flex flex-col space-y-3">
          {formattedMessages.map((msg) => {
            const isUser = msg.role === "user";
            const avatarSrc = isUser ? user?.profile : "/bot-avatar.png";

            return (
              <div
                key={msg.id}
                className={cn("flex gap-2 items-end", {
                  "justify-end": isUser,
                  "justify-start": !isUser,
                })}
              >
                {!isUser && (
                  <Avatar className="h-9 w-9 rounded-full ring-2 ring-muted shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out bg-background">
                    <AvatarImage src={avatarSrc} />
                    <AvatarFallback>
                      <User className="w-4 h-4 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={cn(
                    "max-w-[75%] px-4 py-2 rounded-xl shadow-sm text-sm",
                    isUser
                      ? "bg-blue-400 text-primary-foreground rounded-br-none"
                      : "bg-muted text-muted-foreground rounded-bl-none"
                  )}
                >
                  <div className="text-xs mb-0.5">
                    {isUser ? user.username : "AI"}
                  </div>
                  <div className="text-md font-semibold whitespace-pre-wrap">
                    {msg.content}
                  </div>
                  <div className="text-xs mt-1 text-right opacity-70">
                    {msg.timestamp}
                  </div>
                </div>

                {isUser && (
                  <Avatar className="h-9 w-9 rounded-full ring-2 ring-muted shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out bg-background">
                    <AvatarImage src={avatarSrc} />
                    <AvatarFallback>
                      <User className="w-4 h-4 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            );
          })}

          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t p-4 bg-background rounded-b-2xl">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            type="submit"
            className="bg-blue-400 hover:bg-blue-500 transition-all"
            size="icon"
            disabled={isLoading}
          >
            <SendHorizonal className="w-6 h-6" />
          </Button>
        </form>
      </div>
    </div>
  );
}
