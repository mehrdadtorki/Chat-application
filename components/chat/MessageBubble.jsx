'use client';

export default function MessageBubble({ message, isCurrentUser }) {
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] rounded-lg p-3 ${
        isCurrentUser ? 'bg-primary text-white' : 'bg-gray-200 text-black'
      }`}>
        <p>{message.text}</p>
      </div>
    </div>
  );
}