import React, { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import type { Message, User } from '../../types';

interface ChatContainerProps {
  messages: Message[];
  currentUser: User;
  onSendMessage: (content: string) => void;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  currentUser,
  onSendMessage,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              user={message.sender!}
              isOwn={message.sender_id === currentUser?.id}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="bg-white border-t">
        <div className="max-w-3xl mx-auto">
          <ChatInput onSendMessage={onSendMessage} />
        </div>
      </div>
    </div>
  );
};