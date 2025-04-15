"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizonal } from "lucide-react";
import animationData from "../../../../public/static/illustration/NoChatAnimation.json";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const ChatNotFound = () => {
  return (
    <div className="h-full w-full flex flex-col rounded-2xl border-muted border-2 bg-background">
      {/* Header */}
      <div className="w-full flex items-center justify-between px-6 py-4 border-b bg-muted/50">
        <h2 className="text-xl font-semibold">Chat</h2>
      </div>

      <div className="flex flex-1 items-center justify-center overflow-y-hidden p-4 relative bg-background">
        <Lottie animationData={animationData} loop={true} className="w-1/2" />
      </div>

      {/* Message Input */}
      <div className="border-t p-4 bg-background rounded-b-2xl">
        <div className="flex items-center gap-2">
          <Input
            value=""
            readOnly
            placeholder="You have to select a chat ..."
            className="flex-1"
          />
          <Button
            disabled
            className="bg-blue-400 hover:bg-blue-500 transition-all"
            size="icon"
          >
            <SendHorizonal className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatNotFound;
