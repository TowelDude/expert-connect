import { Database } from './database.types'

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface ExpertMatchResult {
  expert_id: string
  match_score: number
  service_areas: string[]
  topics: string[]
}

export interface ChatMessage {
  id: string
  created_at: string
  chat_id: string
  sender_id: string
  content: string
}

export interface ReviewSubmission {
  expert_id: string
  rating: number
  review_text: string
}

export type Tables = Database['public']['Tables']
export type ExpertProfile = Tables['expert_profiles']['Row']
export type ServiceArea = Tables['service_areas']['Row']
export type Topic = Tables['topics']['Row']
export type Review = Tables['reviews']['Row']