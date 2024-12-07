import { supabase } from '../supabase';
import type { Database } from '../../types/database';

type Review = Database['public']['Tables']['reviews']['Row'];

export async function submitReview(
  expertId: string,
  rating: number,
  reviewText: string,
  clientId: string
): Promise<Review> {
  const { data, error } = await supabase
    .from('reviews')
    .insert({
      expert_id: expertId,
      client_id: clientId,
      rating,
      review_text: reviewText,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getExpertReviews(expertId: string): Promise<Review[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      client:users!client_id (
        name,
        avatar_url
      )
    `)
    .eq('expert_id', expertId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}