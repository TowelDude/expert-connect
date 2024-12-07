import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ExpertCard } from '../components/experts/ExpertCard';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const ExpertMatches: React.FC = () => {
  const navigate = useNavigate();
  const { expertMatches, currentUser } = useStore();

  const handleExpertSelect = async (expertId: string) => {
    try {
      const { data: chat, error } = await supabase
        .from('chats')
        .insert({
          expert_id: expertId,
          client_id: currentUser?.id,
          question: "How can you help me with my problem?",
          status: 'active'
        })
        .select()
        .single();

      if (error) throw error;
      
      navigate(`/chat/${chat.id}`);
    } catch (err) {
      console.error('Failed to create chat:', err);
    }
  };

  if (!expertMatches.length) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to question
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-2 text-lg font-medium text-gray-900">No Experts Found</h2>
            <p className="mt-1 text-sm text-gray-500">
              We couldn't find any experts matching your criteria. Please try again with a different question.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to question
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Matching Experts
        </h1>
        <p className="text-gray-600 mb-8">
          We've found {expertMatches.length} experts who can help with your question
        </p>

        <div className="space-y-6">
          {expertMatches.map((match) => (
            <ExpertCard
              key={match.expert.id}
              match={match}
              onSelect={handleExpertSelect}
            />
          ))}
        </div>
      </main>
    </div>
  );
};