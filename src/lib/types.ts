// Tipos principais do sistema
export interface User {
  id: string
  email: string
  password_hash?: string
  email_verified: boolean
  name: string
  birthdate?: Date
  sex?: 'male' | 'female' | 'other' | null
  height_cm?: number | null
  weight_kg?: number | null
  units: 'metric' | 'imperial'
  locale: 'pt-BR' | 'en' | 'es'
  role: 'user' | 'admin'
  created_at: Date
  updated_at: Date
  // Novas propriedades V8
  fitness_level?: 'beginner' | 'intermediate' | 'advanced'
  goals?: string[]
  preferences?: UserPreferences
  streak_days?: number
  total_points?: number
  achievements?: string[]
}

export interface UserPreferences {
  workout_reminder_time?: string
  notification_types?: string[]
  preferred_workout_duration?: number
  favorite_exercises?: string[]
  training_frequency?: number // dias por semana
  rest_day_preference?: string[]
}

export interface WorkoutLog {
  id: string
  user_id: string
  date: string // YYYY-MM-DD
  type: string
  exercises: Exercise[]
  notes?: string
  calories?: number
  tags: string[]
  created_at: Date
  updated_at: Date
  // Novas propriedades V8
  duration_minutes?: number
  difficulty_rating?: number // 1-10
  mood_before?: number // 1-10
  mood_after?: number // 1-10
  energy_level?: number // 1-10
  workout_plan_id?: string
  completed?: boolean
  weather?: string
  location?: string
}

export interface Exercise {
  name: string
  sets: number
  reps: number
  weight: number
  distance: number
  duration_sec: number
  rpe: number // Rate of Perceived Exertion (1-10)
  // Novas propriedades V8
  rest_time?: number // segundos
  tempo?: string // ex: "2-1-2-1"
  notes?: string
  muscle_groups?: string[]
  equipment?: string[]
  completed?: boolean
}

export interface BMIResult {
  bmi: number
  bmiPrime: number
  category: string
  healthyWeightRange: {
    min: number
    max: number
  }
  recommendations: string[]
  // Novas propriedades V8
  body_fat_estimate?: number
  metabolic_age?: number
  ideal_weight?: number
  weight_to_lose?: number
  weight_to_gain?: number
}

export interface Translation {
  [key: string]: {
    'pt-BR': string
    'en': string
    'es': string
  }
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
}

export interface WorkoutTemplate {
  id: string
  name: string
  type: string
  exercises: Exercise[]
  estimated_duration: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  // Novas propriedades V8
  description?: string
  target_muscle_groups?: string[]
  equipment_needed?: string[]
  calories_estimate?: number
  frequency_per_week?: number
  created_by?: string
  rating?: number
  reviews?: number
}

// Novos tipos V8
export interface Goal {
  id: string
  user_id: string
  type: 'weight_loss' | 'weight_gain' | 'muscle_gain' | 'endurance' | 'strength' | 'flexibility' | 'custom'
  title: string
  description?: string
  target_value?: number
  current_value?: number
  unit?: string
  target_date?: Date
  status: 'active' | 'completed' | 'paused' | 'cancelled'
  progress_percentage?: number
  created_at: Date
  updated_at: Date
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  category: 'workout' | 'consistency' | 'progress' | 'social' | 'milestone'
  points: number
  requirements: {
    type: string
    value: number
    timeframe?: string
  }
  unlocked_by?: string[]
}

export interface Notification {
  id: string
  user_id: string
  type: 'workout_reminder' | 'goal_progress' | 'achievement' | 'milestone' | 'social'
  title: string
  message: string
  read: boolean
  action_url?: string
  created_at: Date
  scheduled_for?: Date
}

export interface WorkoutPlan {
  id: string
  name: string
  description: string
  duration_weeks: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  goal: string
  workouts_per_week: number
  workout_templates: WorkoutTemplate[]
  created_by?: string
  is_public: boolean
  rating?: number
  reviews?: number
  created_at: Date
  updated_at: Date
}

export interface ProgressMetrics {
  date: string
  weight?: number
  body_fat?: number
  muscle_mass?: number
  measurements?: {
    chest?: number
    waist?: number
    hips?: number
    arms?: number
    thighs?: number
  }
  photos?: string[]
  notes?: string
}

export interface WearableData {
  id: string
  user_id: string
  device_type: 'fitbit' | 'apple_watch' | 'garmin' | 'samsung' | 'other'
  date: string
  steps?: number
  calories_burned?: number
  active_minutes?: number
  heart_rate_avg?: number
  heart_rate_max?: number
  sleep_hours?: number
  sleep_quality?: number
  distance_km?: number
  floors_climbed?: number
  created_at: Date
}

export interface NutritionLog {
  id: string
  user_id: string
  date: string
  meals: Meal[]
  total_calories: number
  total_protein: number
  total_carbs: number
  total_fat: number
  water_intake_ml: number
  created_at: Date
  updated_at: Date
}

export interface Meal {
  id: string
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  foods: Food[]
  total_calories: number
  time?: string
}

export interface Food {
  name: string
  quantity: number
  unit: string
  calories_per_unit: number
  protein?: number
  carbs?: number
  fat?: number
  fiber?: number
}

export interface SocialFeatures {
  id: string
  user_id: string
  type: 'workout_share' | 'achievement_share' | 'progress_share' | 'challenge'
  content: any
  likes: number
  comments: Comment[]
  visibility: 'public' | 'friends' | 'private'
  created_at: Date
}

export interface Comment {
  id: string
  user_id: string
  user_name: string
  content: string
  created_at: Date
}

export interface Challenge {
  id: string
  name: string
  description: string
  type: 'individual' | 'group'
  duration_days: number
  goal_type: string
  goal_value: number
  participants: string[]
  start_date: Date
  end_date: Date
  prize?: string
  status: 'upcoming' | 'active' | 'completed'
  created_by: string
}