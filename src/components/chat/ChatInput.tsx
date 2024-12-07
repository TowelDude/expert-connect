import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '../ui/Button';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
      />
      <Button type="submit" variant="primary">
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
};