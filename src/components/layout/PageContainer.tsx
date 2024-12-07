import React from 'react';
import { Header } from './Header';

interface PageContainerProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  showBackButton,
  onBack,
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header showBackButton={showBackButton} onBack={onBack} />
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};