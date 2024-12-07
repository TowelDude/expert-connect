import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/database';
import type { ExpertMatch, User, Chat } from '../types';
import { matchExpertsForQuestion } from '../lib/api/experts';

interface Store {
  currentUser: User | null;
  chats: Chat[];
  expertMatches: ExpertMatch[];
  setCurrentUser: (user: User | null) => void;
  addChat: (chat: Chat) => Promise<void>;
  addMessage: (chatId: string, content: string) => Promise<void>;
  fetchChats: () => Promise<void>;
  setExpertMatches: (matches: ExpertMatch[]) => void;
  findExperts: (question: string) => Promise<void>;
}

export const useStore = create<Store>((set, get) => ({
  currentUser: {
    id: 'temp-client-id',
    name: 'Test Client',
    avatar: 'https://ui-avatars.com/api/?name=Test+Client',
    role: 'client',
    expertise: []
  },
  chats: [],
  expertMatches: [],
  
  setCurrentUser: (user) => set({ currentUser: user }),
  
  addChat: async (chat) => {
    const { data, error } = await supabase
      .from('chats')
      .insert(chat)
      .select()
      .single();

    if (error) throw error;
    
    set((state) => ({ chats: [...state.chats, data] }));
  },
  
  addMessage: async (chatId, content) => {
    const { currentUser } = get();
    if (!currentUser) throw new Error('Not authenticated');

    const { data: message, error } = await supabase
      .from('messages')
      .insert({
        chat_id: chatId,
        sender_id: currentUser.id,
        content
      })
      .select()
      .single();

    if (error) throw error;
    
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? { ...chat, messages: [...(chat.messages || []), message] }
          : chat
      ),
    }));
  },
  
  fetchChats: async () => {
    const { currentUser } = get();
    if (!currentUser) return;

    const { data, error } = await supabase
      .from('chats')
      .select(`
        *,
        expert:users!expert_id(*),
        client:users!client_id(*),
        messages(*)
      `)
      .or(`client_id.eq.${currentUser.id},expert_id.eq.${currentUser.id}`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    set({ chats: data });
  },

  setExpertMatches: (matches) => set({ expertMatches: matches }),

  findExperts: async (question) => {
    try {
      const matches = await matchExpertsForQuestion(question);
      set({ expertMatches: matches });
    } catch (error) {
      console.error('Failed to find experts:', error);
      throw error;
    }
  },
}));