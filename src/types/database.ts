export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          created_at: string
          email: string
          name: string
          avatar_url: string | null
          role: 'client' | 'expert'
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          name: string
          avatar_url?: string | null
          role: 'client' | 'expert'
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          name?: string
          avatar_url?: string | null
          role?: 'client' | 'expert'
        }
      }
      expert_profiles: {
        Row: {
          user_id: string
          full_name: string
          professional_summary: string
          average_rating: number
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          full_name: string
          professional_summary: string
          average_rating?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          full_name?: string
          professional_summary?: string
          average_rating?: number
          created_at?: string
          updated_at?: string
        }
      }
      chats: {
        Row: {
          id: string
          created_at: string
          client_id: string
          expert_id: string
          status: 'active' | 'closed'
          question: string
        }
        Insert: {
          id?: string
          created_at?: string
          client_id: string
          expert_id: string
          status?: 'active' | 'closed'
          question: string
        }
        Update: {
          id?: string
          created_at?: string
          client_id?: string
          expert_id?: string
          status?: 'active' | 'closed'
          question?: string
        }
      }
      messages: {
        Row: {
          id: string
          created_at: string
          chat_id: string
          sender_id: string
          content: string
          sender?: {
            name: string
            avatar_url: string | null
          }
        }
        Insert: {
          id?: string
          created_at?: string
          chat_id: string
          sender_id: string
          content: string
        }
        Update: {
          id?: string
          created_at?: string
          chat_id?: string
          sender_id?: string
          content?: string
        }
      }
    }
  }
}