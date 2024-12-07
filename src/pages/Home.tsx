import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionForm } from '../components/QuestionForm';
import { useStore } from '../store/useStore';
import { MessageCircle, Users } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { findExperts } = useStore();
  const [error, setError] = useState<string | null>(null);

  const handleQuestionSubmit = async (question: string) => {
    try {
      setError(null);
      await findExperts(question);
      navigate('/experts');
    } catch (err) {
      setError('Failed to find experts. Please try again.');
      console.error('Failed to find experts:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <MessageCircle className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">
                ExpertConnect
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Users className="h-6 w-6 text-gray-600" />
              <span className="text-gray-600">
                Find Your Expert
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Get Expert Help, Instantly
          </h2>
          <p className="text-xl text-gray-600">
            Connect with qualified experts who can solve your problems in real-time
          </p>
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <QuestionForm onSubmit={handleQuestionSubmit} />
      </main>
    </div>
  );
};