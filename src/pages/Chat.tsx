import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ChatMessage } from '../components/chat/ChatMessage';
import { ChatInput } from '../components/chat/ChatInput';
import { useChat } from '../hooks/useChat';
import { sendMessage } from '../lib/api';
import { ArrowLeft } from 'lucide-react';

export const Chat: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useStore();
  const { messages, loading, error } = useChat(chatId || '');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!chatId || !currentUser) return;
    
    try {
      await sendMessage(chatId, content, currentUser.id);
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-600">Loading chat...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-600">Error loading chat: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/experts')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to experts
          </button>
        </div>
      </header>

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
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};