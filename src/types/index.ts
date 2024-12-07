export interface User {
  id: string;
  name: string;
  avatar: string;
  role: 'client' | 'expert';
  expertise: string[];
  rating?: number;
  totalReviews?: number;
  responseTime?: string;
  description?: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
}

export interface Chat {
  id: string;
  clientId: string;
  expertId: string;
  messages: Message[];
  status: 'active' | 'closed';
  question: string;
}

export interface ExpertMatch {
  expert: User;
  matchScore: number;
  estimatedCost?: string;
}