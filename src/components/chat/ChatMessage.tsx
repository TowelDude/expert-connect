import React from 'react';
import { formatDate } from '../../lib/utils';
import type { Database } from '../../types/database';

type Message = Database['public']['Tables']['messages']['Row'] & {
  sender: {
    name: string;
    avatar_url: string | null;
  };
};

interface ChatMessageProps {
  message: Message;
  user: Message['sender'];
  isOwn: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, user, isOwn }) => {
  return (
    <div
      className={`flex ${
        isOwn ? 'justify-end' : 'justify-start'
      } mb-4`}
    >
      <div
        className={`flex max-w-[70%] ${
          isOwn ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        <img
          src={user.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
          alt={user.name}
          className="h-8 w-8 rounded-full"
        />
        <div
          className={`mx-2 rounded-lg p-3 ${
            isOwn
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-900'
          }`}
        >
          <p className="text-sm">{message.content}</p>
          <span className="mt-1 text-xs opacity-70">
            {formatDate(new Date(message.created_at))}
          </span>
        </div>
      </div>
    </div>
  );
};