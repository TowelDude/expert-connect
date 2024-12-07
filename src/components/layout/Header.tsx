import React from 'react';
import { MessageCircle, Users } from 'lucide-react';

interface HeaderProps {
  showBackButton?: boolean;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ showBackButton, onBack }) => {
  return (
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
  );
};