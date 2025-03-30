import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import ChatBotPage from "./chat-bot/page";

export default async function ChatPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>You must be logged in to view this page.</p>;
  }

  return (
    <div className="w-full flex flex-col flex-1 items-center justify-center">
      <ChatBotPage user={session?.user} />
    </div>
  );
}
