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
}

export interface Exercise {
  name: string
  sets: number
  reps: number
  weight: number
  distance: number
  duration_sec: number
  rpe: number // Rate of Perceived Exertion (1-10)
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
}