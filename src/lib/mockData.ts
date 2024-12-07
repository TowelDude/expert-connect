import type { ExpertMatch, Message, User } from '../types';

const mockClient: User = {
  id: 'client-1',
  name: 'You',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
  role: 'client',
  expertise: [],
};

export const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: '1',
      senderId: '1',
      content: "Hello! I've reviewed your question. I'd be happy to help you with your technical issue.",
      timestamp: new Date(Date.now() - 120000),
    },
    {
      id: '2',
      senderId: 'client-1',
      content: 'Thanks for responding so quickly! Can you help me understand the first steps I should take?',
      timestamp: new Date(Date.now() - 60000),
    },
    {
      id: '3',
      senderId: '1',
      content: "Of course! Let's start by gathering some more information about your specific situation.",
      timestamp: new Date(Date.now() - 30000),
    },
  ],
  '2': [
    {
      id: '1',
      senderId: '2',
      content: "Hi there! I see you're having some hardware issues. I can definitely assist with that.",
      timestamp: new Date(Date.now() - 120000),
    },
  ],
  '3': [
    {
      id: '1',
      senderId: '3',
      content: 'Hello! I understand you need help with web development. What framework are you using?',
      timestamp: new Date(Date.now() - 120000),
    },
  ],
};

export const generateMockExperts = (question: string): ExpertMatch[] => {
  const mockExperts: ExpertMatch[] = [
    {
      expert: {
        id: '1',
        name: 'Dr. Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        role: 'expert',
        expertise: ['Technical Support', 'Software Development', 'Cloud Computing'],
        rating: 4.9,
        totalReviews: 284,
        responseTime: '< 5 min',
        description: '10+ years in software development and technical consulting',
      },
      matchScore: 0.95,
      estimatedCost: '$50/hour',
    },
    {
      expert: {
        id: '2',
        name: 'James Wilson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        role: 'expert',
        expertise: ['Hardware Repair', 'Networking', 'Security'],
        rating: 4.8,
        totalReviews: 156,
        responseTime: '< 10 min',
        description: 'Certified IT professional specializing in hardware and networking',
      },
      matchScore: 0.88,
      estimatedCost: '$45/hour',
    },
    {
      expert: {
        id: '3',
        name: 'Maria Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
        role: 'expert',
        expertise: ['Web Development', 'UI/UX Design', 'Mobile Apps'],
        rating: 4.7,
        totalReviews: 198,
        responseTime: '< 15 min',
        description: 'Full-stack developer with focus on modern web technologies',
      },
      matchScore: 0.82,
      estimatedCost: '$55/hour',
    },
  ];

  return mockExperts;
};

export const getMockExpert = (expertId: string): User | undefined => {
  return generateMockExperts('').find(match => match.expert.id === expertId)?.expert;
};

export const getMockClient = (): User => mockClient;