import React from 'react';
import { Star, Clock, ThumbsUp } from 'lucide-react';
import { Button } from '../ui/Button';
import type { ExpertMatch } from '../../types';

interface ExpertCardProps {
  match: ExpertMatch;
  onSelect: (expertId: string) => void;
}

export const ExpertCard: React.FC<ExpertCardProps> = ({ match, onSelect }) => {
  const { expert, matchScore, estimatedCost } = match;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex gap-6">
      <img
        src={expert.avatar}
        alt={expert.name}
        className="w-24 h-24 rounded-full object-cover"
      />
      
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{expert.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{expert.description}</p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-blue-600">
              {estimatedCost && `From ${estimatedCost}`}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {Math.round(matchScore * 100)}% match
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-6">
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="ml-1 text-sm text-gray-600">
              {expert.rating} ({expert.totalReviews} reviews)
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-gray-400" />
            <span className="ml-1 text-sm text-gray-600">
              {expert.responseTime} response time
            </span>
          </div>
          <div className="flex items-center">
            <ThumbsUp className="h-5 w-5 text-gray-400" />
            <span className="ml-1 text-sm text-gray-600">
              {expert.expertise.join(', ')}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <Button
            onClick={() => onSelect(expert.id)}
            className="w-full"
          >
            Connect with {expert.name}
          </Button>
        </div>
      </div>
    </div>
  );
};