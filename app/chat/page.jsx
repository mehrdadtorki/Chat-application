import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function ChatPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>You must be logged in to view this page.</p>;
  }

  return (
    <div>
      <h1>Welcome, {session.user.username}!</h1>
      {/* Chat components go here */}
    </div>
  );
}