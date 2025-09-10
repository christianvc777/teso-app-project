import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export type User = {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export type Challenge = {
  id: string
  title: string
  description: string
  category: 'fitness' | 'nutrition' | 'wellness'
  difficulty: 'easy' | 'medium' | 'hard'
  duration_days: number
  participants_count: number
  image_url?: string
  created_at: string
}

export type Event = {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  modality: 'presencial' | 'virtual' | 'híbrido'
  price: number
  max_participants: number
  current_participants: number
  image_url?: string
  created_at: string
}

export type Post = {
  id: string
  user_id: string
  content: string
  type: 'achievement' | 'workout' | 'promotion' | 'tip' | 'product'
  images?: string[]
  price?: number
  product_name?: string
  likes_count: number
  comments_count: number
  shares_count: number
  created_at: string
}

export type UserChallenge = {
  id: string
  user_id: string
  challenge_id: string
  joined_at: string
  completed_at?: string
  progress_percentage: number
}

export type UserEvent = {
  id: string
  user_id: string
  event_id: string
  registered_at: string
}