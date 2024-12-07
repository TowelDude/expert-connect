import { supabase } from '../supabase';
import type { ExpertMatch } from '../../types';

export async function matchExpertsForQuestion(question: string): Promise<ExpertMatch[]> {
  const { data: experts, error } = await supabase
    .from('expert_profiles')
    .select(`
      *,
      user:user_id (
        id,
        name,
        avatar_url
      ),
      expert_service_areas (
        service_area:service_areas (
          name
        )
      ),
      expert_topics (
        topic:topics (
          name
        )
      )
    `)
    .order('average_rating', { ascending: false })
    .limit(5);

  if (error) {
    throw new Error(`Failed to fetch experts: ${error.message}`);
  }

  if (!experts || experts.length === 0) {
    return [];
  }

  return experts.map((expert: any) => ({
    expert: {
      id: expert.user.id,
      name: expert.user.name,
      avatar: expert.user.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(expert.user.name)}`,
      role: 'expert',
      expertise: expert.expert_topics.map((t: any) => t.topic.name),
      rating: expert.average_rating,
      totalReviews: expert.total_reviews || 0,
      responseTime: '< 15 min',
      description: expert.professional_summary
    },
    matchScore: 0.95,
    estimatedCost: '$50/hour'
  }));
}