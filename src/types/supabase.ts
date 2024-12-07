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
          avatar_url: string
          role: 'client' | 'expert'
        }
        Insert: {
          id: string
          created_at?: string
          email: string
          name: string
          avatar_url?: string
          role: 'client' | 'expert'
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          name?: string
          avatar_url?: string
          role?: 'client' | 'expert'
        }
      }
      expert_profiles: {
        Row: {
          user_id: string
          full_name: string
          professional_summary: string
          average_rating: number
          total_reviews: number
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          full_name: string
          professional_summary: string
          average_rating?: number
          total_reviews?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          full_name?: string
          professional_summary?: string
          average_rating?: number
          total_reviews?: number
          created_at?: string
          updated_at?: string
        }
      }
      service_areas: {
        Row: {
          id: string
          created_at: string
          name: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
        }
      }
      topics: {
        Row: {
          id: string
          created_at: string
          name: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
        }
      }
      expert_service_areas: {
        Row: {
          expert_id: string
          service_area_id: string
          created_at: string
        }
        Insert: {
          expert_id: string
          service_area_id: string
          created_at?: string
        }
        Update: {
          expert_id?: string
          service_area_id?: string
          created_at?: string
        }
      }
      expert_topics: {
        Row: {
          expert_id: string
          topic_id: string
          created_at: string
        }
        Insert: {
          expert_id: string
          topic_id: string
          created_at?: string
        }
        Update: {
          expert_id?: string
          topic_id?: string
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          expert_id: string
          client_id: string
          rating: number
          review_text: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          expert_id: string
          client_id: string
          rating: number
          review_text: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          expert_id?: string
          client_id?: string
          rating?: number
          review_text?: string
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