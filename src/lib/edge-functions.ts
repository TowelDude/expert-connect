import { supabaseAdmin } from './supabase-admin';

const EDGE_FUNCTIONS_URL = import.meta.env.VITE_EDGE_FUNCTIONS_URL || 'http://localhost:54321';

export async function matchExperts(question: string, serviceAreaIds?: string[], topicIds?: string[]) {
  const response = await fetch(`${EDGE_FUNCTIONS_URL}/match-experts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${supabaseAdmin.auth.session()?.access_token}`,
    },
    body: JSON.stringify({ question, service_area_ids: serviceAreaIds, topic_ids: topicIds }),
  });

  if (!response.ok) {
    throw new Error('Failed to match experts');
  }

  return response.json();
}

export async function sendChatMessage(chatId: string, content: string, senderId: string) {
  const response = await fetch(`${EDGE_FUNCTIONS_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${supabaseAdmin.auth.session()?.access_token}`,
    },
    body: JSON.stringify({ chat_id: chatId, content, sender_id: senderId }),
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  return response.json();
}

export async function submitReview(expertId: string, rating: number, reviewText: string) {
  const response = await fetch(`${EDGE_FUNCTIONS_URL}/submit-review`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${supabaseAdmin.auth.session()?.access_token}`,
      'x-user-id': supabaseAdmin.auth.user()?.id,
    },
    body: JSON.stringify({ expert_id: expertId, rating, review_text: reviewText }),
  });

  if (!response.ok) {
    throw new Error('Failed to submit review');
  }

  return response.json();
}