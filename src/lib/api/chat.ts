import { supabase } from '../supabase';
import type { Database } from '../../types/database';

type Tables = Database['public']['Tables'];
type Message = Tables['messages']['Row'];

export async function getChatMessages(chatId: string): Promise<Message[]> {
  const { data, error } = await supabase
    .from('messages')
    .select(`
      *,
      sender:users!sender_id (
        name,
        avatar_url
      )
    `)
    .eq('chat_id', chatId)
    .order('created_at');

  if (error) throw error;
  return data || [];
}

export async function sendMessage(chatId: string, content: string, senderId: string): Promise<Message> {
  const { data, error } = await supabase
    .from('messages')
    .insert({
      chat_id: chatId,
      sender_id: senderId,
      content,
    })
    .select(`
      *,
      sender:users!sender_id (
        name,
        avatar_url
      )
    `)
    .single();

  if (error) throw error;
  return data;
}

export async function subscribeToChat(
  chatId: string,
  callback: (message: Message) => void
) {
  return supabase
    .channel(`chat:${chatId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `chat_id=eq.${chatId}`,
      },
      async (payload) => {
        const { data } = await supabase
          .from('messages')
          .select(`
            *,
            sender:users!sender_id (
              name,
              avatar_url
            )
          `)
          .eq('id', payload.new.id)
          .single();

        if (data) {
          callback(data);
        }
      }
    )
    .subscribe();
}