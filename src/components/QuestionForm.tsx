import React, { useState } from 'react';
import { Button } from './ui/Button';
import { MessageSquare } from 'lucide-react';

interface QuestionFormProps {
  onSubmit: (question: string) => void;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({ onSubmit }) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      onSubmit(question);
      setQuestion('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Ask an Expert</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="question"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              What do you need help with?
            </label>
            <textarea
              id="question"
              rows={4}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
              placeholder="Describe your problem in detail..."
            />
          </div>
          <Button type="submit" className="w-full">
            <MessageSquare className="mr-2 h-5 w-5" />
            Find an Expert
          </Button>
        </form>
      </div>
    </div>
  );
};