'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  User, 
  Target, 
  Utensils, 
  Dumbbell, 
  Moon, 
  Briefcase, 
  Activity,
  Crown,
  Play,
  CheckCircle,
  Star,
  TrendingUp,
  Calendar,
  ShoppingCart,
  ArrowLeft,
  Home,
  Settings,
  BarChart3,
  Heart,
  Zap,
  Award,
  Users,
  Clock,
  Shield,
  Sparkles,
  X,
  Timer,
  Flame,
  LogIn,
  UserPlus,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ChefHat,
  Scale,
  TrendingDown,
  Beef,
  Apple,
  Coffee,
  Salad,
  Fish,
  Egg,
  Wheat,
  Milk,
  Carrot,
  Grape,
  TreePine,
  MapPin,
  Building,
  Save,
  Edit,
  BookOpen,
  PlayCircle
} from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  height: string
  weight: string
  age: string
  gender: string
  goal: string
  currentActivity: string
  trainingLevel: string
  sleepHours: string
  workType: string
  stressLevel: string
  waterIntake: string
  mealFrequency: string
  dietRestrictions: string
  supplementUse: string
  motivation: string
  medicalHistory: string
  chronicDiseases: string
  medications: string
  injuries: string
  isPro: boolean
  createdAt: Date
  currentWeight: string
  targetWeight: string
  weeklyWeightLoss: number
  completedWorkouts: number
  totalCaloriesBurned: number
  streakDays: number
}

interface QuestionnaireData {
  height: string
  weight: string
  age: string
  gender: string
  goal: string
  currentActivity: string
  trainingLevel: string
  sleepHours: string
  workType: string
  stressLevel: string
  waterIntake: string
  mealFrequency: string
  dietRestrictions: string
  supplementUse: string
  motivation: string
  medicalHistory: string
  chronicDiseases: string
  medications: string
  injuries: string
}

interface Assessment {
  score: number
  level: 'Iniciante' | 'Intermediário' | 'Avançado'
  recommendations: string[]
  bmi: number
  bmiCategory: string
}

interface ChallengeDay {
  day: number
  exercises: {
    name: string
    reps: string
    sets?: number
    duration?: string
    description: string
  }[]
  focus: string
  difficulty: 'Fácil' | 'Médio' | 'Difícil'
  estimatedTime: string
}

interface Ingredient {
  name: string
  amount: string
  unit: string
}

interface Meal {
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  ingredients: Ingredient[]
  instructions: string[]
}

interface DietPlan {
  breakfast: Meal
  snack1: Meal
  lunch: Meal
  snack2: Meal
  dinner: Meal
  totalCalories: number
  totalProtein: number
  totalCarbs: number
  totalFat: number
}

interface Recipe {
  id: string
  name: string
  category: 'Café da Manhã' | 'Almoço' | 'Jantar' | 'Lanche' | 'Sobremesa'
  calories: number
  protein: number
  prepTime: number
  difficulty: 'Fácil' | 'Médio' | 'Difícil'
  ingredients: Ingredient[]
  instructions: string[]
  image?: string
  tags: string[]
}

interface GymExercise {
  id: string
  name: string
  muscleGroup: string
  reps: string
  sets: number
  description: string
  tips: string
  animationUrl?: string
}

interface WorkoutLog {
  exerciseId: string
  weight: number
  reps: number
  completed: boolean
  date: string
}

interface GymWorkout {
  day: string
  focus: string
  exercises: GymExercise[]
}

export default function FitApp() {
  const [currentStep, setCurrentStep] = useState<'home' | 'login' | 'register' | 'questionnaire' | 'assessment' | 'pro' | 'free' | 'dashboard' | 'diet' | 'workout' | 'products' | 'progress' | 'purchased' | 'challenge' | 'recipes'>('home')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<QuestionnaireData>({
    height: '',
    weight: '',
    age: '',
    gender: '',
    goal: '',
    currentActivity: '',
    trainingLevel: '',
    sleepHours: '',
    workType: '',
    stressLevel: '',
    waterIntake: '',
    mealFrequency: '',
    dietRestrictions: '',
    supplementUse: '',
    motivation: '',
    medicalHistory: '',
    chronicDiseases: '',
    medications: '',
    injuries: ''
  })
  const [assessment, setAssessment] = useState<Assessment | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<string>('')
  const [challengeDay, setChallengeDay] = useState(1)
  const [completedDays, setCompletedDays] = useState<number[]>([])
  const [dietGoal, setDietGoal] = useState<'emagrecimento' | 'ganho_massa' | ''>('')
  const [currentDietPlan, setCurrentDietPlan] = useState<DietPlan | null>(null)
  const [workoutLocation, setWorkoutLocation] = useState<'outdoor' | 'home' | 'gym' | ''>('')
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([])
  const [selectedDay, setSelectedDay] = useState<string>('segunda')

  // Simular dados do usuário logado
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      // Simular dados reais atualizados
      const updatedUser = {
        ...currentUser,
        currentWeight: (parseFloat(currentUser.weight) - currentUser.weeklyWeightLoss).toFixed(1),
        completedWorkouts: Math.floor(Math.random() * 25) + 10,
        totalCaloriesBurned: Math.floor(Math.random() * 3000) + 1500,
        streakDays: Math.floor(Math.random() * 14) + 1,
        weeklyWeightLoss: Math.random() * 2 + 0.5
      }
      setCurrentUser(updatedUser)
    }
  }, [isAuthenticated])

  // Treinos de Academia por Dia da Semana
  const gymWorkouts: GymWorkout[] = [
    {
      day: 'segunda',
      focus: 'Peito, Ombros e Tríceps',
      exercises: [
        {
          id: 'supino-reto',
          name: 'Supino Reto',
          muscleGroup: 'Peito',
          reps: '8-12',
          sets: 4,
          description: 'Exercício principal para desenvolvimento do peitoral',
          tips: 'Mantenha os pés firmes no chão e controle a descida',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'supino-inclinado',
          name: 'Supino Inclinado',
          muscleGroup: 'Peito',
          reps: '10-12',
          sets: 3,
          description: 'Foca na parte superior do peitoral',
          tips: 'Inclinação de 30-45 graus é ideal',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'crucifixo',
          name: 'Crucifixo',
          muscleGroup: 'Peito',
          reps: '12-15',
          sets: 3,
          description: 'Isolamento do peitoral com amplitude completa',
          tips: 'Controle o movimento, evite usar muito peso',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'desenvolvimento-ombros',
          name: 'Desenvolvimento de Ombros',
          muscleGroup: 'Ombros',
          reps: '8-10',
          sets: 4,
          description: 'Exercício composto para ombros',
          tips: 'Não desça a barra além da linha das orelhas',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'elevacao-lateral',
          name: 'Elevação Lateral',
          muscleGroup: 'Ombros',
          reps: '12-15',
          sets: 3,
          description: 'Isolamento do deltoide médio',
          tips: 'Eleve até a altura dos ombros, pause e desça controlado',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'elevacao-frontal',
          name: 'Elevação Frontal',
          muscleGroup: 'Ombros',
          reps: '10-12',
          sets: 3,
          description: 'Trabalha a parte anterior do deltoide',
          tips: 'Mantenha o core contraído durante o movimento',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'triceps-pulley',
          name: 'Tríceps Pulley',
          muscleGroup: 'Tríceps',
          reps: '12-15',
          sets: 3,
          description: 'Isolamento do tríceps',
          tips: 'Mantenha os cotovelos fixos ao lado do corpo',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'triceps-testa',
          name: 'Tríceps Testa',
          muscleGroup: 'Tríceps',
          reps: '10-12',
          sets: 3,
          description: 'Exercício de isolamento para tríceps',
          tips: 'Desça a barra até próximo da testa, suba controlado',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        }
      ]
    },
    {
      day: 'terca',
      focus: 'Costas e Bíceps',
      exercises: [
        {
          id: 'puxada-frontal',
          name: 'Puxada Frontal',
          muscleGroup: 'Costas',
          reps: '8-10',
          sets: 4,
          description: 'Exercício principal para largura das costas',
          tips: 'Puxe até o peito, contraia as escápulas',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'remada-baixa',
          name: 'Remada Baixa',
          muscleGroup: 'Costas',
          reps: '10-12',
          sets: 4,
          description: 'Desenvolve a espessura das costas',
          tips: 'Mantenha o peito estufado e puxe até o abdômen',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'remada-curvada',
          name: 'Remada Curvada',
          muscleGroup: 'Costas',
          reps: '8-10',
          sets: 3,
          description: 'Exercício composto para costas',
          tips: 'Mantenha a coluna neutra, puxe a barra até o abdômen',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'pulldown',
          name: 'Pulldown',
          muscleGroup: 'Costas',
          reps: '12-15',
          sets: 3,
          description: 'Isolamento do latíssimo',
          tips: 'Foque na contração das costas, não dos braços',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'rosca-direta',
          name: 'Rosca Direta',
          muscleGroup: 'Bíceps',
          reps: '10-12',
          sets: 4,
          description: 'Exercício básico para bíceps',
          tips: 'Controle a descida, não balance o corpo',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'rosca-alternada',
          name: 'Rosca Alternada',
          muscleGroup: 'Bíceps',
          reps: '12-15',
          sets: 3,
          description: 'Trabalha cada braço individualmente',
          tips: 'Alterne os braços, mantenha o cotovelo fixo',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'rosca-martelo',
          name: 'Rosca Martelo',
          muscleGroup: 'Bíceps',
          reps: '10-12',
          sets: 3,
          description: 'Trabalha bíceps e antebraço',
          tips: 'Pegada neutra, movimento controlado',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        }
      ]
    },
    {
      day: 'quarta',
      focus: 'Pernas e Glúteos',
      exercises: [
        {
          id: 'agachamento-livre',
          name: 'Agachamento Livre',
          muscleGroup: 'Pernas',
          reps: '8-12',
          sets: 4,
          description: 'Rei dos exercícios para pernas',
          tips: 'Desça até 90 graus, mantenha o peito ereto',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'leg-press',
          name: 'Leg Press',
          muscleGroup: 'Pernas',
          reps: '12-15',
          sets: 4,
          description: 'Exercício seguro para quadríceps',
          tips: 'Desça até 90 graus, não trave os joelhos',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'stiff',
          name: 'Stiff',
          muscleGroup: 'Posterior',
          reps: '10-12',
          sets: 3,
          description: 'Foca nos isquiotibiais e glúteos',
          tips: 'Mantenha as pernas levemente flexionadas',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'cadeira-extensora',
          name: 'Cadeira Extensora',
          muscleGroup: 'Quadríceps',
          reps: '12-15',
          sets: 3,
          description: 'Isolamento do quadríceps',
          tips: 'Controle a descida, pause no topo',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'mesa-flexora',
          name: 'Mesa Flexora',
          muscleGroup: 'Posterior',
          reps: '12-15',
          sets: 3,
          description: 'Isolamento dos isquiotibiais',
          tips: 'Movimento controlado, contraia no topo',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'panturrilha-em-pe',
          name: 'Panturrilha em Pé',
          muscleGroup: 'Panturrilha',
          reps: '15-20',
          sets: 4,
          description: 'Desenvolvimento das panturrilhas',
          tips: 'Amplitude completa, pause no topo',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        }
      ]
    },
    {
      day: 'quinta',
      focus: 'Peito, Ombros e Tríceps',
      exercises: [
        {
          id: 'supino-inclinado-2',
          name: 'Supino Inclinado com Halteres',
          muscleGroup: 'Peito',
          reps: '8-10',
          sets: 4,
          description: 'Variação com halteres para maior amplitude',
          tips: 'Desça até sentir alongamento no peito',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'supino-declinado',
          name: 'Supino Declinado',
          muscleGroup: 'Peito',
          reps: '10-12',
          sets: 3,
          description: 'Foca na parte inferior do peitoral',
          tips: 'Controle a barra, não bata no peito',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'fly-peck-deck',
          name: 'Fly Peck Deck',
          muscleGroup: 'Peito',
          reps: '12-15',
          sets: 3,
          description: 'Isolamento do peitoral na máquina',
          tips: 'Movimento suave, contraia no centro',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'desenvolvimento-arnold',
          name: 'Desenvolvimento Arnold',
          muscleGroup: 'Ombros',
          reps: '10-12',
          sets: 3,
          description: 'Variação que trabalha todos os deltoides',
          tips: 'Rotacione os punhos durante o movimento',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'elevacao-posterior',
          name: 'Elevação Posterior',
          muscleGroup: 'Ombros',
          reps: '12-15',
          sets: 3,
          description: 'Isolamento do deltoide posterior',
          tips: 'Incline o tronco, eleve os braços para trás',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'encolhimento',
          name: 'Encolhimento',
          muscleGroup: 'Trapézio',
          reps: '12-15',
          sets: 3,
          description: 'Desenvolvimento do trapézio',
          tips: 'Eleve os ombros, pause e desça controlado',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'triceps-frances',
          name: 'Tríceps Francês',
          muscleGroup: 'Tríceps',
          reps: '10-12',
          sets: 3,
          description: 'Exercício de isolamento para tríceps',
          tips: 'Mantenha os cotovelos fixos, desça atrás da cabeça',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'mergulho',
          name: 'Mergulho',
          muscleGroup: 'Tríceps',
          reps: '8-12',
          sets: 3,
          description: 'Exercício composto para tríceps',
          tips: 'Desça até 90 graus, suba com força',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        }
      ]
    },
    {
      day: 'sexta',
      focus: 'Costas e Bíceps',
      exercises: [
        {
          id: 'barra-fixa',
          name: 'Barra Fixa',
          muscleGroup: 'Costas',
          reps: '6-10',
          sets: 4,
          description: 'Exercício funcional para costas',
          tips: 'Se necessário, use assistência ou elástico',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'remada-unilateral',
          name: 'Remada Unilateral',
          muscleGroup: 'Costas',
          reps: '10-12',
          sets: 3,
          description: 'Trabalha cada lado individualmente',
          tips: 'Apoie um joelho no banco, puxe até o quadril',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'puxada-triangulo',
          name: 'Puxada Triângulo',
          muscleGroup: 'Costas',
          reps: '10-12',
          sets: 3,
          description: 'Variação da puxada com pegada fechada',
          tips: 'Puxe até o peito, foque nas costas',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'face-pull',
          name: 'Face Pull',
          muscleGroup: 'Costas',
          reps: '15-20',
          sets: 3,
          description: 'Exercício para deltoide posterior e trapézio médio',
          tips: 'Puxe até a face, abra bem os cotovelos',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'rosca-concentrada',
          name: 'Rosca Concentrada',
          muscleGroup: 'Bíceps',
          reps: '10-12',
          sets: 3,
          description: 'Isolamento máximo do bíceps',
          tips: 'Apoie o cotovelo na coxa, movimento lento',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'rosca-scott',
          name: 'Rosca Scott',
          muscleGroup: 'Bíceps',
          reps: '8-10',
          sets: 3,
          description: 'Exercício no banco scott',
          tips: 'Não estenda completamente o braço',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'rosca-cabo',
          name: 'Rosca no Cabo',
          muscleGroup: 'Bíceps',
          reps: '12-15',
          sets: 3,
          description: 'Tensão constante no bíceps',
          tips: 'Mantenha tensão durante todo o movimento',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        }
      ]
    },
    {
      day: 'sabado',
      focus: 'Pernas e Glúteos',
      exercises: [
        {
          id: 'agachamento-sumo',
          name: 'Agachamento Sumo',
          muscleGroup: 'Pernas',
          reps: '10-12',
          sets: 4,
          description: 'Variação que enfatiza glúteos e adutores',
          tips: 'Pés mais afastados, pontas para fora',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'afundo',
          name: 'Afundo',
          muscleGroup: 'Pernas',
          reps: '12-15',
          sets: 3,
          description: 'Exercício unilateral para pernas',
          tips: 'Desça até 90 graus, alterne as pernas',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'cadeira-adutora',
          name: 'Cadeira Adutora',
          muscleGroup: 'Adutores',
          reps: '15-20',
          sets: 3,
          description: 'Isolamento dos adutores',
          tips: 'Movimento controlado, pause na contração',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'cadeira-abdutora',
          name: 'Cadeira Abdutora',
          muscleGroup: 'Abdutores',
          reps: '15-20',
          sets: 3,
          description: 'Isolamento dos abdutores',
          tips: 'Abra as pernas contra a resistência',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'elevacao-pelvica',
          name: 'Elevação Pélvica',
          muscleGroup: 'Glúteos',
          reps: '15-20',
          sets: 3,
          description: 'Isolamento dos glúteos',
          tips: 'Contraia os glúteos no topo do movimento',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'panturrilha-sentado',
          name: 'Panturrilha Sentado',
          muscleGroup: 'Panturrilha',
          reps: '15-20',
          sets: 3,
          description: 'Trabalha o sóleo',
          tips: 'Amplitude completa, movimento controlado',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        }
      ]
    }
  ]

  // Função para obter repetições baseadas no objetivo
  const getRepsForGoal = (baseReps: string, goal: string): string => {
    if (goal === 'Perder peso') {
      return baseReps.replace(/(\d+)-(\d+)/, (match, min, max) => `${Math.max(10, parseInt(min))}-${Math.min(15, parseInt(max) + 2)}`)
    } else if (goal === 'Ganhar massa muscular') {
      return baseReps.replace(/(\d+)-(\d+)/, (match, min, max) => `${Math.max(6, parseInt(min) - 2)}-${Math.max(10, parseInt(max) - 2)}`)
    }
    return baseReps
  }

  // Função para registrar treino
  const logWorkout = (exerciseId: string, weight: number, reps: number) => {
    const today = new Date().toISOString().split('T')[0]
    const existingLogIndex = workoutLogs.findIndex(
      log => log.exerciseId === exerciseId && log.date === today
    )

    if (existingLogIndex >= 0) {
      const updatedLogs = [...workoutLogs]
      updatedLogs[existingLogIndex] = { exerciseId, weight, reps, completed: true, date: today }
      setWorkoutLogs(updatedLogs)
    } else {
      setWorkoutLogs([...workoutLogs, { exerciseId, weight, reps, completed: true, date: today }])
    }
  }

  // Função para marcar exercício como completo
  const toggleExerciseComplete = (exerciseId: string) => {
    const today = new Date().toISOString().split('T')[0]
    const existingLogIndex = workoutLogs.findIndex(
      log => log.exerciseId === exerciseId && log.date === today
    )

    if (existingLogIndex >= 0) {
      const updatedLogs = [...workoutLogs]
      updatedLogs[existingLogIndex].completed = !updatedLogs[existingLogIndex].completed
      setWorkoutLogs(updatedLogs)
    } else {
      setWorkoutLogs([...workoutLogs, { exerciseId, weight: 0, reps: 0, completed: true, date: today }])
    }
  }

  // Função para obter log do exercício
  const getExerciseLog = (exerciseId: string): WorkoutLog | undefined => {
    const today = new Date().toISOString().split('T')[0]
    return workoutLogs.find(log => log.exerciseId === exerciseId && log.date === today)
  }

  // Receitas Fit
  const fitRecipes: Recipe[] = [
    {
      id: '1',
      name: 'Omelete Proteica com Espinafre',
      category: 'Café da Manhã',
      calories: 280,
      protein: 24,
      prepTime: 10,
      difficulty: 'Fácil',
      ingredients: [
        { name: 'Ovos inteiros', amount: '3', unit: 'unidades' },
        { name: 'Claras', amount: '2', unit: 'unidades' },
        { name: 'Espinafre fresco', amount: '1', unit: 'xícara' },
        { name: 'Tomate cereja', amount: '1', unit: 'unidade' },
        { name: 'Queijo cottage', amount: '30', unit: 'g' },
        { name: 'Sal e pimenta', amount: 'a gosto', unit: '' },
        { name: 'Azeite', amount: '1', unit: 'colher de chá' }
      ],
      instructions: [
        'Bata os ovos e claras em uma tigela',
        'Tempere com sal e pimenta',
        'Aqueça o azeite na frigideira',
        'Adicione o espinafre e refogue por 1 minuto',
        'Despeje os ovos batidos',
        'Adicione o tomate e queijo cottage',
        'Dobre a omelete ao meio e sirva'
      ],
      tags: ['Proteína', 'Low Carb', 'Vegetais']
    },
    {
      id: '2',
      name: 'Frango Grelhado com Batata Doce',
      category: 'Almoço',
      calories: 420,
      protein: 35,
      prepTime: 25,
      difficulty: 'Médio',
      ingredients: [
        { name: 'Peito de frango', amount: '150', unit: 'g' },
        { name: 'Batata doce média', amount: '1', unit: 'unidade' },
        { name: 'Brócolis', amount: '1', unit: 'xícara' },
        { name: 'Azeite', amount: '1', unit: 'colher de sopa' },
        { name: 'Alho', amount: '2', unit: 'dentes' },
        { name: 'Cebola', amount: '1/2', unit: 'unidade' },
        { name: 'Orégano', amount: '1', unit: 'colher de chá' },
        { name: 'Sal e pimenta', amount: 'a gosto', unit: '' }
      ],
      instructions: [
        'Tempere o frango com sal, pimenta e orégano',
        'Corte a batata doce em cubos',
        'Grelhe o frango por 6-8 minutos de cada lado',
        'Asse a batata doce por 20 minutos a 200°C',
        'Cozinhe o brócolis no vapor por 5 minutos',
        'Sirva tudo junto com um fio de azeite'
      ],
      tags: ['Alto Proteína', 'Carboidrato Complexo', 'Completo']
    },
    {
      id: '3',
      name: 'Smoothie Verde Detox',
      category: 'Lanche',
      calories: 180,
      protein: 8,
      prepTime: 5,
      difficulty: 'Fácil',
      ingredients: [
        { name: 'Banana', amount: '1', unit: 'unidade' },
        { name: 'Espinafre', amount: '1', unit: 'xícara' },
        { name: 'Abacate', amount: '1/2', unit: 'unidade' },
        { name: 'Whey protein vanilla', amount: '1', unit: 'colher de sopa' },
        { name: 'Água de coco', amount: '200', unit: 'ml' },
        { name: 'Chia', amount: '1', unit: 'colher de chá' },
        { name: 'Gelo', amount: 'a gosto', unit: '' }
      ],
      instructions: [
        'Adicione todos os ingredientes no liquidificador',
        'Bata por 1-2 minutos até ficar homogêneo',
        'Adicione gelo se desejar mais gelado',
        'Sirva imediatamente'
      ],
      tags: ['Detox', 'Antioxidante', 'Hidratante']
    },
    {
      id: '4',
      name: 'Salmão com Quinoa e Aspargos',
      category: 'Jantar',
      calories: 380,
      protein: 32,
      prepTime: 20,
      difficulty: 'Médio',
      ingredients: [
        { name: 'Filé de salmão', amount: '120', unit: 'g' },
        { name: 'Quinoa', amount: '1/2', unit: 'xícara' },
        { name: 'Aspargos', amount: '150', unit: 'g' },
        { name: 'Limão', amount: '1', unit: 'unidade' },
        { name: 'Azeite', amount: '1', unit: 'colher de sopa' },
        { name: 'Ervas finas', amount: 'a gosto', unit: '' },
        { name: 'Sal e pimenta', amount: 'a gosto', unit: '' }
      ],
      instructions: [
        'Cozinhe a quinoa conforme instruções da embalagem',
        'Tempere o salmão com sal, pimenta e limão',
        'Grelhe o salmão por 4-5 minutos de cada lado',
        'Refogue os aspargos com azeite por 3 minutos',
        'Sirva o salmão sobre a quinoa com aspargos',
        'Finalize com ervas finas e limão'
      ],
      tags: ['Ômega 3', 'Superalimento', 'Anti-inflamatório']
    },
    {
      id: '5',
      name: 'Pudim de Chia com Frutas Vermelhas',
      category: 'Sobremesa',
      calories: 220,
      protein: 12,
      prepTime: 5,
      difficulty: 'Fácil',
      ingredients: [
        { name: 'Chia', amount: '3', unit: 'colheres de sopa' },
        { name: 'Leite de amêndoas', amount: '200', unit: 'ml' },
        { name: 'Mel', amount: '1', unit: 'colher de sopa' },
        { name: 'Frutas vermelhas', amount: '1/2', unit: 'xícara' },
        { name: 'Whey protein', amount: '1', unit: 'colher de sopa' },
        { name: 'Canela em pó', amount: 'a gosto', unit: '' }
      ],
      instructions: [
        'Misture chia, leite de amêndoas, mel e whey',
        'Mexa bem para não formar grumos',
        'Deixe na geladeira por pelo menos 2 horas',
        'Sirva com frutas vermelhas por cima',
        'Polvilhe canela antes de servir'
      ],
      tags: ['Sobremesa Saudável', 'Rico em Fibras', 'Antioxidante']
    },
    {
      id: '6',
      name: 'Wrap de Frango com Abacate',
      category: 'Lanche',
      calories: 320,
      protein: 28,
      prepTime: 15,
      difficulty: 'Fácil',
      ingredients: [
        { name: 'Tortilla integral', amount: '1', unit: 'unidade' },
        { name: 'Frango desfiado', amount: '100', unit: 'g' },
        { name: 'Abacate', amount: '1/2', unit: 'unidade' },
        { name: 'Folhas de alface', amount: '2', unit: 'unidades' },
        { name: 'Tomate pequeno', amount: '1', unit: 'unidade' },
        { name: 'Iogurte grego', amount: '1', unit: 'colher de sopa' },
        { name: 'Temperos', amount: 'a gosto', unit: '' }
      ],
      instructions: [
        'Amasse o abacate com um garfo',
        'Tempere o frango com especiarias',
        'Espalhe o abacate na tortilla',
        'Adicione alface, tomate e frango',
        'Coloque uma colherada de iogurte grego',
        'Enrole bem apertado e corte ao meio'
      ],
      tags: ['Prático', 'Gordura Boa', 'Portátil']
    }
  ]

  // Planos de dieta personalizados
  const generateDietPlan = (goal: 'emagrecimento' | 'ganho_massa', user: User): DietPlan => {
    const baseCalories = goal === 'emagrecimento' ? 1400 : 2200
    const proteinRatio = goal === 'emagrecimento' ? 0.3 : 0.25
    const carbRatio = goal === 'emagrecimento' ? 0.35 : 0.45
    const fatRatio = goal === 'emagrecimento' ? 0.35 : 0.3

    if (goal === 'emagrecimento') {
      return {
        breakfast: {
          name: 'Omelete com Vegetais',
          calories: 280,
          protein: 24,
          carbs: 8,
          fat: 18,
          ingredients: [
            { name: 'Ovos', amount: '3', unit: 'unidades' },
            { name: 'Espinafre', amount: '50', unit: 'g' },
            { name: 'Tomate', amount: '1', unit: 'unidade' },
            { name: 'Queijo cottage', amount: '30', unit: 'g' }
          ],
          instructions: ['Bata os ovos', 'Refogue os vegetais', 'Faça a omelete']
        },
        snack1: {
          name: 'Iogurte com Frutas Vermelhas',
          calories: 150,
          protein: 12,
          carbs: 18,
          fat: 2,
          ingredients: [
            { name: 'Iogurte grego natural', amount: '150', unit: 'g' },
            { name: 'Frutas vermelhas', amount: '80', unit: 'g' },
            { name: 'Chia', amount: '1', unit: 'colher de chá' }
          ],
          instructions: ['Misture todos os ingredientes']
        },
        lunch: {
          name: 'Salada de Frango Grelhado',
          calories: 380,
          protein: 35,
          carbs: 15,
          fat: 20,
          ingredients: [
            { name: 'Peito de frango', amount: '120', unit: 'g' },
            { name: 'Mix de folhas', amount: '100', unit: 'g' },
            { name: 'Abacate', amount: '1/2', unit: 'unidade' },
            { name: 'Azeite', amount: '1', unit: 'colher de sopa' }
          ],
          instructions: ['Grelhe o frango', 'Monte a salada', 'Tempere com azeite']
        },
        snack2: {
          name: 'Smoothie Verde',
          calories: 180,
          protein: 8,
          carbs: 25,
          fat: 6,
          ingredients: [
            { name: 'Whey protein', amount: '1', unit: 'scoop' },
            { name: 'Espinafre', amount: '50', unit: 'g' },
            { name: 'Banana', amount: '1/2', unit: 'unidade' },
            { name: 'Água de coco', amount: '200', unit: 'ml' }
          ],
          instructions: ['Bata tudo no liquidificador']
        },
        dinner: {
          name: 'Peixe com Vegetais',
          calories: 320,
          protein: 28,
          carbs: 12,
          fat: 18,
          ingredients: [
            { name: 'Salmão', amount: '100', unit: 'g' },
            { name: 'Brócolis', amount: '150', unit: 'g' },
            { name: 'Aspargos', amount: '100', unit: 'g' },
            { name: 'Azeite', amount: '1', unit: 'colher de sopa' }
          ],
          instructions: ['Grelhe o peixe', 'Refogue os vegetais']
        },
        totalCalories: 1310,
        totalProtein: 107,
        totalCarbs: 78,
        totalFat: 64
      }
    } else {
      return {
        breakfast: {
          name: 'Panqueca de Aveia com Banana',
          calories: 420,
          protein: 25,
          carbs: 45,
          fat: 15,
          ingredients: [
            { name: 'Aveia', amount: '60', unit: 'g' },
            { name: 'Whey protein', amount: '1', unit: 'scoop' },
            { name: 'Banana', amount: '1', unit: 'unidade' },
            { name: 'Ovos', amount: '2', unit: 'unidades' },
            { name: 'Mel', amount: '1', unit: 'colher de sopa' }
          ],
          instructions: ['Misture os ingredientes', 'Faça as panquecas na frigideira']
        },
        snack1: {
          name: 'Mix de Castanhas e Frutas',
          calories: 280,
          protein: 8,
          carbs: 25,
          fat: 18,
          ingredients: [
            { name: 'Castanhas mistas', amount: '30', unit: 'g' },
            { name: 'Banana', amount: '1', unit: 'unidade' },
            { name: 'Tâmaras', amount: '3', unit: 'unidades' }
          ],
          instructions: ['Misture todos os ingredientes']
        },
        lunch: {
          name: 'Frango com Arroz Integral',
          calories: 520,
          protein: 40,
          carbs: 55,
          fat: 12,
          ingredients: [
            { name: 'Peito de frango', amount: '150', unit: 'g' },
            { name: 'Arroz integral', amount: '80', unit: 'g (cru)' },
            { name: 'Feijão', amount: '100', unit: 'g' },
            { name: 'Salada', amount: '100', unit: 'g' }
          ],
          instructions: ['Grelhe o frango', 'Cozinhe o arroz', 'Monte o prato']
        },
        snack2: {
          name: 'Shake Hipercalórico',
          calories: 380,
          protein: 30,
          carbs: 35,
          fat: 12,
          ingredients: [
            { name: 'Whey protein', amount: '1', unit: 'scoop' },
            { name: 'Aveia', amount: '40', unit: 'g' },
            { name: 'Banana', amount: '1', unit: 'unidade' },
            { name: 'Leite', amount: '200', unit: 'ml' },
            { name: 'Pasta de amendoim', amount: '1', unit: 'colher de sopa' }
          ],
          instructions: ['Bata tudo no liquidificador']
        },
        dinner: {
          name: 'Carne com Batata Doce',
          calories: 480,
          protein: 35,
          carbs: 40,
          fat: 18,
          ingredients: [
            { name: 'Carne magra', amount: '120', unit: 'g' },
            { name: 'Batata doce', amount: '200', unit: 'g' },
            { name: 'Vegetais', amount: '150', unit: 'g' },
            { name: 'Azeite', amount: '1', unit: 'colher de sopa' }
          ],
          instructions: ['Grelhe a carne', 'Asse a batata doce', 'Refogue os vegetais']
        },
        totalCalories: 2080,
        totalProtein: 138,
        totalCarbs: 200,
        totalFat: 75
      }
    }
  }

  // Desafio Calistênico de 30 dias
  const calisthenicChallenge: ChallengeDay[] = [
    {
      day: 1,
      exercises: [
        { name: 'Flexões', reps: '3x8', description: 'Flexões tradicionais no chão' },
        { name: 'Agachamentos', reps: '3x15', description: 'Agachamentos livres' },
        { name: 'Prancha', duration: '30s', reps: '3x', description: 'Prancha isométrica' },
        { name: 'Polichinelos', reps: '2x20', description: 'Jumping jacks' }
      ],
      focus: 'Adaptação',
      difficulty: 'Fácil',
      estimatedTime: '15 min'
    },
    {
      day: 2,
      exercises: [
        { name: 'Flexões inclinadas', reps: '3x10', description: 'Flexões com pés elevados' },
        { name: 'Afundos', reps: '3x12 cada perna', description: 'Afundos alternados' },
        { name: 'Prancha lateral', duration: '20s cada lado', reps: '2x', description: 'Prancha lateral' },
        { name: 'Mountain climbers', reps: '3x15', description: 'Escaladores' }
      ],
      focus: 'Força',
      difficulty: 'Fácil',
      estimatedTime: '18 min'
    },
    {
      day: 3,
      exercises: [
        { name: 'Burpees', reps: '3x5', description: 'Burpees completos' },
        { name: 'Agachamento com salto', reps: '3x10', description: 'Jump squats' },
        { name: 'Flexões diamante', reps: '2x6', description: 'Flexões com mãos em diamante' },
        { name: 'Prancha com elevação', duration: '45s', reps: '2x', description: 'Prancha com braços alternados' }
      ],
      focus: 'Explosão',
      difficulty: 'Médio',
      estimatedTime: '20 min'
    },
    {
      day: 7,
      exercises: [
        { name: 'Flexões archer', reps: '2x5 cada lado', description: 'Flexões unilaterais' },
        { name: 'Pistol squats assistidos', reps: '2x3 each perna', description: 'Agachamento unilateral assistido' },
        { name: 'Prancha com toque no ombro', reps: '3x10', description: 'Prancha tocando ombros alternados' },
        { name: 'Burpees com flexão', reps: '3x8', description: 'Burpees com flexão extra' }
      ],
      focus: 'Coordenação',
      difficulty: 'Médio',
      estimatedTime: '25 min'
    },
    {
      day: 15,
      exercises: [
        { name: 'Flexões uma mão assistida', reps: '2x3 cada mão', description: 'Flexões unilaterais com apoio' },
        { name: 'Pistol squats', reps: '2x5 cada perna', description: 'Agachamento unilateral completo' },
        { name: 'Prancha com perna elevada', duration: '60s', reps: '3x', description: 'Prancha com alternância de pernas' },
        { name: 'Muscle-up assistido', reps: '3x3', description: 'Muscle-up com banda elástica' }
      ],
      focus: 'Força Avançada',
      difficulty: 'Difícil',
      estimatedTime: '30 min'
    },
    {
      day: 30,
      exercises: [
        { name: 'Flexões uma mão', reps: '1x3 cada mão', description: 'Flexões unilaterais completas' },
        { name: 'Pistol squats com salto', reps: '3x5 cada perna', description: 'Agachamento unilateral explosivo' },
        { name: 'Prancha humana', duration: '90s', reps: '2x', description: 'Prancha avançada' },
        { name: 'Muscle-up', reps: '2x2', description: 'Muscle-up completo' },
        { name: 'Handstand push-up', reps: '1x3', description: 'Flexão em parada de mão' }
      ],
      focus: 'Maestria',
      difficulty: 'Difícil',
      estimatedTime: '35 min'
    }
  ]

  // Função para obter o treino do dia
  const getDayWorkout = (day: number): ChallengeDay => {
    if (day <= 3) return calisthenicChallenge[day - 1]
    if (day <= 7) return calisthenicChallenge[3]
    if (day <= 15) return calisthenicChallenge[4]
    return calisthenicChallenge[5]
  }

  const questions = [
    {
      id: 'height',
      title: 'Qual sua altura?',
      type: 'input',
      placeholder: 'Ex: 1.75',
      icon: User
    },
    {
      id: 'weight',
      title: 'Qual seu peso atual?',
      type: 'input',
      placeholder: 'Ex: 70',
      icon: Target
    },
    {
      id: 'age',
      title: 'Qual sua idade?',
      type: 'input',
      placeholder: 'Ex: 25',
      icon: User
    },
    {
      id: 'gender',
      title: 'Qual seu gênero?',
      type: 'select',
      options: ['Masculino', 'Feminino', 'Outro'],
      icon: User
    },
    {
      id: 'goal',
      title: 'Qual seu objetivo principal?',
      type: 'select',
      options: ['Perder peso', 'Ganhar massa muscular', 'Manter peso', 'Melhorar condicionamento'],
      icon: Target
    },
    {
      id: 'currentActivity',
      title: 'Com que frequência você se exercita?',
      type: 'select',
      options: ['Sedentário', '1-2x por semana', '3-4x por semana', '5-6x por semana', 'Todos os dias'],
      icon: Activity
    },
    {
      id: 'trainingLevel',
      title: 'Qual seu nível de treinamento?',
      type: 'select',
      options: ['Iniciante', 'Intermediário', 'Avançado', 'Atleta'],
      icon: Dumbbell
    },
    {
      id: 'sleepHours',
      title: 'Quantas horas você dorme por noite?',
      type: 'select',
      options: ['Menos de 5h', '5-6h', '7-8h', '9h ou mais'],
      icon: Moon
    },
    {
      id: 'workType',
      title: 'Qual tipo de trabalho você tem?',
      type: 'select',
      options: ['Sedentário (escritório)', 'Moderadamente ativo', 'Muito ativo (físico)', 'Trabalho em casa'],
      icon: Briefcase
    },
    {
      id: 'stressLevel',
      title: 'Como você avalia seu nível de estresse?',
      type: 'select',
      options: ['Baixo', 'Moderado', 'Alto', 'Muito alto'],
      icon: TrendingUp
    },
    {
      id: 'waterIntake',
      title: 'Quantos litros de água você bebe por dia?',
      type: 'select',
      options: ['Menos de 1L', '1-2L', '2-3L', 'Mais de 3L'],
      icon: Activity
    },
    {
      id: 'mealFrequency',
      title: 'Quantas refeições você faz por dia?',
      type: 'select',
      options: ['1-2 refeições', '3 refeições', '4-5 refeições', '6 ou mais refeições'],
      icon: Utensils
    },
    {
      id: 'dietRestrictions',
      title: 'Você tem alguma restrição alimentar?',
      type: 'textarea',
      placeholder: 'Ex: vegetariano, intolerância à lactose, etc.',
      icon: Utensils
    },
    {
      id: 'supplementUse',
      title: 'Você usa algum suplemento?',
      type: 'select',
      options: ['Não uso', 'Whey protein', 'Multivitamínico', 'Vários suplementos'],
      icon: Star
    },
    {
      id: 'medicalHistory',
      title: 'Você tem algum histórico médico relevante?',
      type: 'textarea',
      placeholder: 'Ex: cirurgias, problemas cardíacos, diabetes, etc.',
      icon: Heart
    },
    {
      id: 'chronicDiseases',
      title: 'Possui alguma doença crônica?',
      type: 'textarea',
      placeholder: 'Ex: hipertensão, diabetes, problemas na tireoide, etc.',
      icon: Heart
    },
    {
      id: 'medications',
      title: 'Faz uso de alguma medicação regularmente?',
      type: 'textarea',
      placeholder: 'Liste os medicamentos que usa regularmente',
      icon: Heart
    },
    {
      id: 'injuries',
      title: 'Tem alguma lesão ou limitação física?',
      type: 'textarea',
      placeholder: 'Ex: problemas no joelho, ombro, coluna, etc.',
      icon: Heart
    },
    {
      id: 'motivation',
      title: 'O que mais te motiva a emagrecer?',
      type: 'textarea',
      placeholder: 'Descreva sua principal motivação...',
      icon: Target
    }
  ]

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simular login
    const mockUser: User = {
      id: '1',
      name: 'João Silva',
      email: loginData.email,
      height: '1.75',
      weight: '80',
      age: '28',
      gender: 'Masculino',
      goal: 'Perder peso',
      currentActivity: '3-4x por semana',
      trainingLevel: 'Intermediário',
      sleepHours: '7-8h',
      workType: 'Sedentário (escritório)',
      stressLevel: 'Moderado',
      waterIntake: '2-3L',
      mealFrequency: '4-5 refeições',
      dietRestrictions: '',
      supplementUse: 'Whey protein',
      motivation: 'Melhorar saúde e autoestima',
      medicalHistory: '',
      chronicDiseases: '',
      medications: '',
      injuries: '',
      isPro: false,
      createdAt: new Date(),
      currentWeight: '78.5',
      targetWeight: '75',
      weeklyWeightLoss: 1.2,
      completedWorkouts: 15,
      totalCaloriesBurned: 2340,
      streakDays: 7
    }
    
    setCurrentUser(mockUser)
    setIsAuthenticated(true)
    setCurrentStep('dashboard')
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (registerData.password !== registerData.confirmPassword) {
      alert('Senhas não coincidem!')
      return
    }
    
    // Simular registro
    const newUser: User = {
      id: Date.now().toString(),
      name: registerData.name,
      email: registerData.email,
      height: '',
      weight: '',
      age: '',
      gender: '',
      goal: '',
      currentActivity: '',
      trainingLevel: '',
      sleepHours: '',
      workType: '',
      stressLevel: '',
      waterIntake: '',
      mealFrequency: '',
      dietRestrictions: '',
      supplementUse: '',
      motivation: '',
      medicalHistory: '',
      chronicDiseases: '',
      medications: '',
      injuries: '',
      isPro: false,
      createdAt: new Date(),
      currentWeight: '',
      targetWeight: '',
      weeklyWeightLoss: 0,
      completedWorkouts: 0,
      totalCaloriesBurned: 0,
      streakDays: 0
    }
    
    setCurrentUser(newUser)
    setIsAuthenticated(true)
    setCurrentStep('questionnaire')
  }

  const handleAnswerChange = (value: string) => {
    const currentQuestion = questions[questionIndex]
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }))
  }

  const nextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1)
    } else {
      generateAssessment()
    }
  }

  const prevQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1)
    }
  }

  const generateAssessment = () => {
    const height = parseFloat(answers.height)
    const weight = parseFloat(answers.weight)
    const bmi = weight / (height * height)
    
    let bmiCategory = ''
    if (bmi < 18.5) bmiCategory = 'Abaixo do peso'
    else if (bmi < 25) bmiCategory = 'Peso normal'
    else if (bmi < 30) bmiCategory = 'Sobrepeso'
    else bmiCategory = 'Obesidade'

    let score = 0
    const recommendations: string[] = []

    // Avaliação baseada nas respostas
    if (answers.currentActivity === 'Sedentário') {
      score += 1
      recommendations.push('Comece com exercícios leves 3x por semana')
    } else if (answers.currentActivity === '5-6x por semana' || answers.currentActivity === 'Todos os dias') {
      score += 4
    } else {
      score += 2
    }

    if (answers.sleepHours === '7-8h') {
      score += 3
    } else {
      recommendations.push('Melhore a qualidade do sono para otimizar resultados')
    }

    if (answers.waterIntake === '2-3L' || answers.waterIntake === 'Mais de 3L') {
      score += 2
    } else {
      recommendations.push('Aumente o consumo de água para pelo menos 2L por dia')
    }

    if (answers.stressLevel === 'Alto' || answers.stressLevel === 'Muito alto') {
      recommendations.push('Considere técnicas de relaxamento e meditação')
    }

    // Recomendações baseadas no histórico médico
    if (answers.medicalHistory || answers.chronicDiseases || answers.medications) {
      recommendations.push('Consulte seu médico antes de iniciar qualquer programa de exercícios')
    }

    if (answers.injuries) {
      recommendations.push('Adapte os exercícios considerando suas limitações físicas')
    }

    let level: 'Iniciante' | 'Intermediário' | 'Avançado' = 'Iniciante'
    if (score >= 8) level = 'Avançado'
    else if (score >= 5) level = 'Intermediário'

    if (recommendations.length === 0) {
      recommendations.push('Você está no caminho certo! Continue assim!')
    }

    // Atualizar dados do usuário
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        ...answers,
        targetWeight: answers.goal === 'Perder peso' ? (parseFloat(answers.weight) - 5).toString() : (parseFloat(answers.weight) + 3).toString()
      }
      setCurrentUser(updatedUser)
    }

    setAssessment({
      score,
      level,
      recommendations,
      bmi,
      bmiCategory
    })
    setCurrentStep('assessment')
  }

  const handlePurchase = (plan: string) => {
    setSelectedPlan(plan)
    if (currentUser) {
      setCurrentUser({ ...currentUser, isPro: true })
    }
    setCurrentStep('purchased')
  }

  const completeDay = (day: number) => {
    if (!completedDays.includes(day)) {
      setCompletedDays([...completedDays, day])
      if (currentUser) {
        setCurrentUser({
          ...currentUser,
          completedWorkouts: currentUser.completedWorkouts + 1,
          totalCaloriesBurned: currentUser.totalCaloriesBurned + Math.floor(Math.random() * 200) + 150
        })
      }
    }
  }

  const handleDietGoalSelect = (goal: 'emagrecimento' | 'ganho_massa') => {
    setDietGoal(goal)
    if (currentUser) {
      const dietPlan = generateDietPlan(goal, currentUser)
      setCurrentDietPlan(dietPlan)
    }
  }

  const currentQuestion = questions[questionIndex]
  const progress = ((questionIndex + 1) / questions.length) * 100

  // Navigation Component
  const Navigation = ({ showBackButton = false }: { showBackButton?: boolean }) => (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-xl">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              FitLife Pro
            </h1>
            {currentUser?.isPro && (
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                <Crown className="w-3 h-3 mr-1" />
                PRO
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {isAuthenticated && currentUser && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium">{currentUser.name}</span>
              </div>
            )}
            {showBackButton && (
              <Button
                onClick={() => setCurrentStep(isAuthenticated ? 'dashboard' : 'home')}
                variant="ghost"
                className="text-gray-600 hover:text-gray-800"
              >
                <Home className="w-4 h-4 mr-2" />
                {isAuthenticated ? 'Dashboard' : 'Início'}
              </Button>
            )}
          </div>
        </div>
        
        {isAuthenticated && (currentStep === 'free' || currentStep === 'dashboard' || currentStep === 'diet' || currentStep === 'workout' || currentStep === 'products' || currentStep === 'progress' || currentStep === 'purchased' || currentStep === 'challenge' || currentStep === 'recipes') && (
          <div className="flex gap-2 mt-4 overflow-x-auto">
            <Button
              variant={currentStep === 'dashboard' ? 'default' : 'ghost'}
              onClick={() => setCurrentStep('dashboard')}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </Button>
            <Button
              variant={currentStep === 'diet' ? 'default' : 'ghost'}
              onClick={() => setCurrentStep('diet')}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Utensils className="w-4 h-4" />
              Dieta
            </Button>
            <Button
              variant={currentStep === 'workout' ? 'default' : 'ghost'}
              onClick={() => setCurrentStep('workout')}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Dumbbell className="w-4 h-4" />
              Treinos
            </Button>
            {currentUser?.isPro && (
              <>
                <Button
                  variant={currentStep === 'challenge' ? 'default' : 'ghost'}
                  onClick={() => setCurrentStep('challenge')}
                  className="flex items-center gap-2 whitespace-nowrap bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
                >
                  <Flame className="w-4 h-4" />
                  Desafio 30 Dias
                </Button>
                <Button
                  variant={currentStep === 'recipes' ? 'default' : 'ghost'}
                  onClick={() => setCurrentStep('recipes')}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  <ChefHat className="w-4 h-4" />
                  Receitas Fit
                </Button>
              </>
            )}
            <Button
              variant={currentStep === 'products' ? 'default' : 'ghost'}
              onClick={() => setCurrentStep('products')}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <ShoppingCart className="w-4 h-4" />
              Produtos
            </Button>
            <Button
              variant={currentStep === 'progress' ? 'default' : 'ghost'}
              onClick={() => setCurrentStep('progress')}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <TrendingUp className="w-4 h-4" />
              Progresso
            </Button>
          </div>
        )}
      </div>
    </div>
  )

  if (currentStep === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-gradient-to-r from-emerald-400 to-teal-500 p-4 rounded-2xl shadow-2xl">
                <Target className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent mb-6 leading-tight">
              FitLife Pro
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
              Transforme seu corpo e sua vida com nosso programa personalizado de 
              <span className="text-emerald-400 font-semibold"> emagrecimento</span>,
              <span className="text-teal-400 font-semibold"> dieta</span> e
              <span className="text-cyan-400 font-semibold"> treino</span>
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-4 py-2 text-lg">
                <Users className="w-4 h-4 mr-2" />
                +50.000 usuários
              </Badge>
              <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30 px-4 py-2 text-lg">
                <Award className="w-4 h-4 mr-2" />
                95% de sucesso
              </Badge>
              <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-4 py-2 text-lg">
                <Zap className="w-4 h-4 mr-2" />
                Resultados em 30 dias
              </Badge>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <Card className="border-0 bg-white/5 backdrop-blur-xl shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 hover:scale-105 group">
              <CardHeader className="text-center pb-4">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-4 rounded-2xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Utensils className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-white mb-2">Dieta Inteligente</CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  IA personaliza seu cardápio baseado em seus objetivos e preferências
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Cardápio semanal automático</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Lista de compras inteligente</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Ajustes em tempo real</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/5 backdrop-blur-xl shadow-2xl hover:shadow-teal-500/20 transition-all duration-500 hover:scale-105 group">
              <CardHeader className="text-center pb-4">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-4 rounded-2xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Dumbbell className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-white mb-2">Treinos Adaptativos</CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  Exercícios que evoluem com você, com vídeos HD e acompanhamento
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-teal-400" />
                    <span>Vídeos em 4K com instruções</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-teal-400" />
                    <span>Progressão automática</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-teal-400" />
                    <span>Registro de performance</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/5 backdrop-blur-xl shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:scale-105 group">
              <CardHeader className="text-center pb-4">
                <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-4 rounded-2xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-white mb-2">Análise Avançada</CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  Métricas detalhadas e insights para acelerar seus resultados
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                    <span>Dashboard em tempo real</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                    <span>Relatórios semanais</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                    <span>Previsão de resultados</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/10">
              <h2 className="text-4xl font-bold text-white mb-6">
                Comece Sua Transformação Hoje
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Crie sua conta e descubra seu potencial com nossa avaliação completa
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => setCurrentStep('register')}
                  className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white px-12 py-6 text-xl rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 font-semibold"
                >
                  <UserPlus className="w-6 h-6 mr-3" />
                  Criar Conta Gratuita
                </Button>
                <Button 
                  onClick={() => setCurrentStep('login')}
                  className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 hover:from-teal-600 hover:via-cyan-600 hover:to-blue-600 text-white px-12 py-6 text-xl rounded-2xl shadow-2xl hover:shadow-teal-500/25 transition-all duration-300 transform hover:scale-105 font-semibold"
                >
                  <LogIn className="w-6 h-6 mr-3" />
                  Já tenho conta
                </Button>
              </div>
              <div className="flex justify-center items-center gap-8 mt-8 text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>3 minutos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>100% gratuito</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span>Resultado imediato</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 flex items-center justify-center py-8">
        <div className="container mx-auto px-4 max-w-md">
          <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
            <CardHeader className="text-center pb-6">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 rounded-2xl w-fit mx-auto mb-6">
                <LogIn className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl text-white font-bold">
                Entrar na sua conta
              </CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Acesse seu dashboard personalizado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Sua senha"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 py-3 text-lg font-semibold"
                >
                  Entrar
                </Button>
              </form>
              <div className="text-center mt-6">
                <p className="text-gray-300">
                  Não tem uma conta?{' '}
                  <Button
                    variant="link"
                    onClick={() => setCurrentStep('register')}
                    className="text-emerald-400 hover:text-emerald-300 p-0"
                  >
                    Criar conta
                  </Button>
                </p>
                <Button
                  variant="link"
                  onClick={() => setCurrentStep('home')}
                  className="text-gray-400 hover:text-gray-300 mt-2"
                >
                  Voltar ao início
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (currentStep === 'register') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 flex items-center justify-center py-8">
        <div className="container mx-auto px-4 max-w-md">
          <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
            <CardHeader className="text-center pb-6">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 rounded-2xl w-fit mx-auto mb-6">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl text-white font-bold">
                Criar sua conta
              </CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Comece sua jornada de transformação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Nome completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Seu nome completo"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Crie uma senha"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                      className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white">Confirmar senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirme sua senha"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 py-3 text-lg font-semibold"
                >
                  Criar Conta
                </Button>
              </form>
              <div className="text-center mt-6">
                <p className="text-gray-300">
                  Já tem uma conta?{' '}
                  <Button
                    variant="link"
                    onClick={() => setCurrentStep('login')}
                    className="text-emerald-400 hover:text-emerald-300 p-0"
                  >
                    Fazer login
                  </Button>
                </p>
                <Button
                  variant="link"
                  onClick={() => setCurrentStep('home')}
                  className="text-gray-400 hover:text-gray-300 mt-2"
                >
                  Voltar ao início
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (currentStep === 'questionnaire') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 py-8">
        <Navigation showBackButton />
        <div className="container mx-auto px-4 max-w-2xl pt-24">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-300 font-medium">
                Pergunta {questionIndex + 1} de {questions.length}
              </span>
              <span className="text-emerald-400 font-bold text-lg">
                {Math.round(progress)}% completo
              </span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
            <CardHeader className="text-center pb-6">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 rounded-2xl w-fit mx-auto mb-6 shadow-lg">
                <currentQuestion.icon className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl text-white font-bold leading-tight">
                {currentQuestion.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {currentQuestion.type === 'input' && (
                <div>
                  <Input
                    placeholder={currentQuestion.placeholder}
                    value={answers[currentQuestion.id as keyof QuestionnaireData]}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                    className="text-lg py-4 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
              )}

              {currentQuestion.type === 'select' && (
                <Select
                  value={answers[currentQuestion.id as keyof QuestionnaireData]}
                  onValueChange={handleAnswerChange}
                >
                  <SelectTrigger className="text-lg py-4 bg-white/10 border-white/20 text-white focus:border-emerald-500 focus:ring-emerald-500">
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    {currentQuestion.options?.map((option) => (
                      <SelectItem key={option} value={option} className="text-white hover:bg-slate-700">
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {currentQuestion.type === 'textarea' && (
                <Textarea
                  placeholder={currentQuestion.placeholder}
                  value={answers[currentQuestion.id as keyof QuestionnaireData]}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="text-lg min-h-[120px] bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                />
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-8">
                <Button
                  variant="outline"
                  onClick={prevQuestion}
                  disabled={questionIndex === 0}
                  className="px-8 py-3 border-white/20 text-white hover:bg-white/10 disabled:opacity-50"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Anterior
                </Button>
                <Button
                  onClick={nextQuestion}
                  disabled={!answers[currentQuestion.id as keyof QuestionnaireData]}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-8 py-3 font-semibold disabled:opacity-50"
                >
                  {questionIndex === questions.length - 1 ? 'Finalizar' : 'Próxima'}
                  {questionIndex !== questions.length - 1 && <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (currentStep === 'assessment' && assessment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 py-8">
        <Navigation showBackButton />
        <div className="container mx-auto px-4 max-w-4xl pt-24">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-6">
              Sua Avaliação Completa
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Baseada nas suas respostas, aqui está seu perfil personalizado
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Perfil Geral */}
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-emerald-400 text-2xl">
                  <User className="w-6 h-6" />
                  Seu Perfil
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-lg">IMC:</span>
                  <Badge variant={assessment.bmi > 25 ? "destructive" : "default"} className="text-lg px-4 py-2">
                    {assessment.bmi.toFixed(1)} - {assessment.bmiCategory}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-lg">Nível:</span>
                  <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-lg px-4 py-2">
                    {assessment.level}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-lg">Pontuação:</span>
                  <span className="font-bold text-emerald-400 text-2xl">
                    {assessment.score}/10
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Recomendações */}
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-teal-400 text-2xl">
                  <Target className="w-6 h-6" />
                  Recomendações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {assessment.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Upgrade para PRO */}
          <Card className="border-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 shadow-2xl">
            <CardHeader className="text-center pb-6">
              <div className="bg-white/20 p-4 rounded-2xl w-fit mx-auto mb-6">
                <Crown className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-4xl mb-4 text-white font-bold">
                Desbloqueie Todo Seu Potencial
              </CardTitle>
              <CardDescription className="text-white/90 text-xl max-w-2xl mx-auto">
                Acesse funcionalidades exclusivas e acelere seus resultados com nossa versão PRO
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <Button
                onClick={() => setCurrentStep('pro')}
                className="bg-white text-emerald-600 hover:bg-gray-100 px-12 py-4 text-xl font-bold rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Crown className="w-5 h-5 mr-3" />
                Ver Planos PRO
              </Button>
              
              {/* Opção de continuar com versão gratuita */}
              <div className="pt-6 border-t border-white/20">
                <Button
                  onClick={() => setCurrentStep('free')}
                  variant="ghost"
                  className="text-white/80 hover:text-white hover:bg-white/10 underline text-lg"
                >
                  Continuar com a versão gratuita
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (currentStep === 'dashboard' && currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900">
        <Navigation showBackButton />
        <div className="container mx-auto px-4 max-w-6xl pt-24 pb-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-6">
              Olá, {currentUser.name}! 👋
            </h1>
            <p className="text-xl text-gray-300">
              Aqui está seu progresso personalizado e dados atualizados
            </p>
          </div>

          {/* Estatísticas Principais */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  {currentUser.streakDays}
                </div>
                <div className="text-gray-300">Dias consecutivos</div>
                <div className="text-sm text-emerald-300 mt-1">
                  🔥 Em chamas!
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-teal-400 mb-2">
                  {currentUser.weeklyWeightLoss.toFixed(1)}kg
                </div>
                <div className="text-gray-300">Peso perdido</div>
                <div className="text-sm text-teal-300 mt-1">
                  Esta semana
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  {currentUser.completedWorkouts}
                </div>
                <div className="text-gray-300">Treinos feitos</div>
                <div className="text-sm text-cyan-300 mt-1">
                  Total
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {currentUser.totalCaloriesBurned.toLocaleString()}
                </div>
                <div className="text-gray-300">Calorias queimadas</div>
                <div className="text-sm text-purple-300 mt-1">
                  Total
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progresso de Peso */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-emerald-400 text-2xl flex items-center gap-2">
                  <Scale className="w-6 h-6" />
                  Progresso de Peso
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Peso inicial:</span>
                  <span className="text-white font-bold">{currentUser.weight}kg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Peso atual:</span>
                  <span className="text-emerald-400 font-bold">{currentUser.currentWeight}kg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Meta:</span>
                  <span className="text-teal-400 font-bold">{currentUser.targetWeight}kg</span>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-300 mb-2">
                    <span>Progresso</span>
                    <span>
                      {Math.round(((parseFloat(currentUser.weight) - parseFloat(currentUser.currentWeight)) / 
                        (parseFloat(currentUser.weight) - parseFloat(currentUser.targetWeight))) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={((parseFloat(currentUser.weight) - parseFloat(currentUser.currentWeight)) / 
                      (parseFloat(currentUser.weight) - parseFloat(currentUser.targetWeight))) * 100} 
                    className="h-3"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-teal-400 text-2xl flex items-center gap-2">
                  <Target className="w-6 h-6" />
                  Seu Perfil
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {assessment && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">IMC:</span>
                      <Badge variant={assessment.bmi > 25 ? "destructive" : "default"}>
                        {assessment.bmi.toFixed(1)} - {assessment.bmiCategory}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Nível:</span>
                      <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600">
                        {assessment.level}
                      </Badge>
                    </div>
                  </>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Objetivo:</span>
                  <span className="text-emerald-400 font-semibold">{currentUser.goal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Atividade:</span>
                  <span className="text-teal-400 font-semibold">{currentUser.currentActivity}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Próximas Ações */}
          <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl mb-8">
            <CardHeader>
              <CardTitle className="text-cyan-400 text-2xl">Próximas Ações Recomendadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button
                  onClick={() => setCurrentStep('diet')}
                  className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 p-6 h-auto flex flex-col gap-3"
                >
                  <Utensils className="w-8 h-8" />
                  <span className="font-semibold">Configurar Dieta</span>
                  <span className="text-sm opacity-80">Personalize seu plano alimentar</span>
                </Button>
                <Button
                  onClick={() => setCurrentStep('workout')}
                  className="bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30 p-6 h-auto flex flex-col gap-3"
                >
                  <Dumbbell className="w-8 h-8" />
                  <span className="font-semibold">Treinar Hoje</span>
                  <span className="text-sm opacity-80">Seu treino está esperando</span>
                </Button>
                {currentUser.isPro ? (
                  <Button
                    onClick={() => setCurrentStep('challenge')}
                    className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/30 p-6 h-auto flex flex-col gap-3"
                  >
                    <Flame className="w-8 h-8" />
                    <span className="font-semibold">Desafio 30 Dias</span>
                    <span className="text-sm opacity-80">Continue o desafio</span>
                  </Button>
                ) : (
                  <Button
                    onClick={() => setCurrentStep('pro')}
                    className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 p-6 h-auto flex flex-col gap-3"
                  >
                    <Crown className="w-8 h-8" />
                    <span className="font-semibold">Upgrade PRO</span>
                    <span className="text-sm opacity-80">Desbloqueie tudo</span>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {!currentUser.isPro && (
            <Card className="border-2 border-emerald-500/50 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 backdrop-blur-xl shadow-2xl">
              <CardContent className="text-center py-8">
                <Crown className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Desbloqueie Análises Avançadas
                </h3>
                <p className="text-gray-300 mb-6">
                  Tenha acesso a gráficos detalhados, relatórios semanais, desafio calistênico e insights personalizados
                </p>
                <Button
                  onClick={() => setCurrentStep('pro')}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                >
                  Upgrade para PRO
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    )
  }

  if (currentStep === 'diet') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900">
        <Navigation showBackButton />
        <div className="container mx-auto px-4 max-w-6xl pt-24 pb-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-6">Dieta Personalizada</h1>
            <p className="text-xl text-gray-300">
              {currentUser?.isPro ? 'Configure sua dieta baseada no seu objetivo' : 'Dicas e orientações para uma alimentação saudável'}
            </p>
          </div>

          {currentUser?.isPro ? (
            <>
              {!dietGoal ? (
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <Card 
                    className="border-2 border-red-500/50 bg-red-500/10 backdrop-blur-xl shadow-2xl cursor-pointer hover:scale-105 transition-all duration-300"
                    onClick={() => handleDietGoalSelect('emagrecimento')}
                  >
                    <CardHeader className="text-center">
                      <div className="bg-gradient-to-r from-red-500 to-pink-600 p-4 rounded-2xl w-fit mx-auto mb-6">
                        <TrendingDown className="w-12 h-12 text-white" />
                      </div>
                      <CardTitle className="text-3xl text-white mb-4">Emagrecimento</CardTitle>
                      <CardDescription className="text-gray-300 text-lg">
                        Plano focado na perda de peso saudável e sustentável
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-gray-300">
                          <CheckCircle className="w-4 h-4 text-red-400" />
                          <span>Déficit calórico controlado</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300">
                          <CheckCircle className="w-4 h-4 text-red-400" />
                          <span>Alta proteína para preservar músculos</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300">
                          <CheckCircle className="w-4 h-4 text-red-400" />
                          <span>Carboidratos estratégicos</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300">
                          <CheckCircle className="w-4 h-4 text-red-400" />
                          <span>Gorduras saudáveis</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card 
                    className="border-2 border-blue-500/50 bg-blue-500/10 backdrop-blur-xl shadow-2xl cursor-pointer hover:scale-105 transition-all duration-300"
                    onClick={() => handleDietGoalSelect('ganho_massa')}
                  >
                    <CardHeader className="text-center">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl w-fit mx-auto mb-6">
                        <Beef className="w-12 h-12 text-white" />
                      </div>
                      <CardTitle className="text-3xl text-white mb-4">Ganho de Massa</CardTitle>
                      <CardDescription className="text-gray-300 text-lg">
                        Plano para ganhar massa muscular magra de forma eficiente
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-gray-300">
                          <CheckCircle className="w-4 h-4 text-blue-400" />
                          <span>Superávit calórico calculado</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300">
                          <CheckCircle className="w-4 h-4 text-blue-400" />
                          <span>Proteína otimizada para crescimento</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300">
                          <CheckCircle className="w-4 h-4 text-blue-400" />
                          <span>Carboidratos para energia</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300">
                          <CheckCircle className="w-4 h-4 text-blue-400" />
                          <span>Timing nutricional</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                currentDietPlan && (
                  <div className="space-y-8">
                    {/* Resumo Nutricional */}
                    <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                      <CardHeader>
                        <CardTitle className="text-emerald-400 text-2xl flex items-center gap-2">
                          <Target className="w-6 h-6" />
                          Plano para {dietGoal === 'emagrecimento' ? 'Emagrecimento' : 'Ganho de Massa'}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-emerald-400">{currentDietPlan.totalCalories}</div>
                            <div className="text-gray-300">Calorias</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-teal-400">{currentDietPlan.totalProtein}g</div>
                            <div className="text-gray-300">Proteína</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-cyan-400">{currentDietPlan.totalCarbs}g</div>
                            <div className="text-gray-300">Carboidratos</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-400">{currentDietPlan.totalFat}g</div>
                            <div className="text-gray-300">Gorduras</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Refeições */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        { meal: currentDietPlan.breakfast, icon: Coffee, color: 'orange', time: 'Café da Manhã' },
                        { meal: currentDietPlan.snack1, icon: Apple, color: 'green', time: 'Lanche da Manhã' },
                        { meal: currentDietPlan.lunch, icon: Utensils, color: 'blue', time: 'Almoço' },
                        { meal: currentDietPlan.snack2, icon: Grape, color: 'purple', time: 'Lanche da Tarde' },
                        { meal: currentDietPlan.dinner, icon: Fish, color: 'teal', time: 'Jantar' }
                      ].map(({ meal, icon: Icon, color, time }, index) => (
                        <Card key={index} className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                          <CardHeader>
                            <CardTitle className={`text-${color}-400 text-lg flex items-center gap-2`}>
                              <Icon className="w-5 h-5" />
                              {time}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <h4 className="font-semibold text-white text-lg">{meal.name}</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="text-gray-300">
                                <span className="font-medium">Calorias:</span> {meal.calories}
                              </div>
                              <div className="text-gray-300">
                                <span className="font-medium">Proteína:</span> {meal.protein}g
                              </div>
                              <div className="text-gray-300">
                                <span className="font-medium">Carbs:</span> {meal.carbs}g
                              </div>
                              <div className="text-gray-300">
                                <span className="font-medium">Gordura:</span> {meal.fat}g
                              </div>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-300 mb-2">Ingredientes:</h5>
                              <ul className="text-sm text-gray-400 space-y-1">
                                {meal.ingredients.map((ingredient, i) => (
                                  <li key={i} className="flex justify-between">
                                    <span>• {ingredient.name}</span>
                                    <span className="text-emerald-400 font-medium">
                                      {ingredient.amount} {ingredient.unit}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                                  <BookOpen className="w-4 h-4 mr-2" />
                                  Ver Modo de Preparo
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle className="text-emerald-400 text-xl">
                                    {meal.name} - Modo de Preparo
                                  </DialogTitle>
                                  <DialogDescription className="text-gray-300">
                                    Instruções detalhadas para preparar sua refeição
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="font-semibold text-gray-300 mb-2">Ingredientes com Quantidades:</h4>
                                    <ul className="space-y-2">
                                      {meal.ingredients.map((ingredient, i) => (
                                        <li key={i} className="flex justify-between items-center p-2 bg-slate-700/50 rounded">
                                          <span>{ingredient.name}</span>
                                          <span className="text-emerald-400 font-bold">
                                            {ingredient.amount} {ingredient.unit}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-gray-300 mb-2">Modo de Preparo:</h4>
                                    <ol className="space-y-2">
                                      {meal.instructions.map((instruction, i) => (
                                        <li key={i} className="flex gap-3">
                                          <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                                            {i + 1}
                                          </span>
                                          <span className="text-gray-300">{instruction}</span>
                                        </li>
                                      ))}
                                    </ol>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="text-center">
                      <Button
                        onClick={() => {
                          setDietGoal('')
                          setCurrentDietPlan(null)
                        }}
                        variant="outline"
                        className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10"
                      >
                        Escolher Outro Objetivo
                      </Button>
                    </div>
                  </div>
                )
              )}
            </>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-emerald-400 text-2xl">
                      <CheckCircle className="w-6 h-6" />
                      Alimentos Recomendados
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-300">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span>Proteínas magras (frango, peixe, ovos)</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span>Vegetais e folhas verdes</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span>Frutas com moderação</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span>Carboidratos integrais</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span>Muita água (2-3L por dia)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-red-400 text-2xl">
                      <X className="w-6 h-6" />
                      Evitar
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-300">
                        <div className="w-4 h-4 bg-red-500 rounded-full" />
                        <span>Açúcar refinado e doces</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <div className="w-4 h-4 bg-red-500 rounded-full" />
                        <span>Frituras e fast food</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <div className="w-4 h-4 bg-red-500 rounded-full" />
                        <span>Refrigerantes e bebidas açucaradas</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <div className="w-4 h-4 bg-red-500 rounded-full" />
                        <span>Alimentos ultraprocessados</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <div className="w-4 h-4 bg-red-500 rounded-full" />
                        <span>Excesso de álcool</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl mb-8">
                <CardHeader>
                  <CardTitle className="text-teal-400 text-2xl">Exemplo de Cardápio Básico</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-emerald-500/20 p-4 rounded-lg">
                      <h4 className="font-semibold text-emerald-400 mb-3">Café da Manhã</h4>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Omelete com vegetais</li>
                        <li>• Aveia com frutas</li>
                        <li>• Chá verde</li>
                      </ul>
                    </div>
                    <div className="bg-teal-500/20 p-4 rounded-lg">
                      <h4 className="font-semibold text-teal-400 mb-3">Almoço</h4>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Frango grelhado</li>
                        <li>• Arroz integral</li>
                        <li>• Salada verde</li>
                      </ul>
                    </div>
                    <div className="bg-cyan-500/20 p-4 rounded-lg">
                      <h4 className="font-semibold text-cyan-400 mb-3">Jantar</h4>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Peixe assado</li>
                        <li>• Batata doce</li>
                        <li>• Brócolis no vapor</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-emerald-500/50 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 backdrop-blur-xl shadow-2xl">
                <CardContent className="text-center py-8">
                  <Crown className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Dieta Personalizada PRO
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Tenha acesso a planos personalizados para emagrecimento ou ganho de massa, cardápios detalhados e receitas exclusivas
                  </p>
                  <Button
                    onClick={() => setCurrentStep('pro')}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                  >
                    Upgrade para PRO
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    )
  }

  if (currentStep === 'recipes' && currentUser?.isPro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900">
        <Navigation showBackButton />
        <div className="container mx-auto px-4 max-w-6xl pt-24 pb-8">
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 rounded-2xl w-fit mx-auto mb-6">
              <ChefHat className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-6">Receitas Fit</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Receitas saudáveis e deliciosas para acelerar seus resultados
            </p>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            {['Todas', 'Café da Manhã', 'Almoço', 'Jantar', 'Lanche', 'Sobremesa'].map((category) => (
              <Button
                key={category}
                variant="outline"
                className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Grid de Receitas */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fitRecipes.map((recipe) => (
              <Card key={recipe.id} className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                      {recipe.category}
                    </Badge>
                    <Badge 
                      className={`
                        ${recipe.difficulty === 'Fácil' ? 'bg-green-500/20 text-green-300 border-green-500/30' : 
                          recipe.difficulty === 'Médio' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' : 
                          'bg-red-500/20 text-red-300 border-red-500/30'}
                      `}
                    >
                      {recipe.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-xl">{recipe.name}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4 text-orange-400" />
                      <span>{recipe.calories} cal</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Beef className="w-4 h-4 text-blue-400" />
                      <span>{recipe.protein}g prot</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-green-400" />
                      <span>{recipe.prepTime}min</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-300 mb-2">Ingredientes:</h4>
                    <ul className="text-sm text-gray-400 space-y-1 max-h-32 overflow-y-auto">
                      {recipe.ingredients.slice(0, 4).map((ingredient, i) => (
                        <li key={i} className="flex justify-between">
                          <span>• {ingredient.name}</span>
                          <span className="text-emerald-400 font-medium">
                            {ingredient.amount} {ingredient.unit}
                          </span>
                        </li>
                      ))}
                      {recipe.ingredients.length > 4 && (
                        <li className="text-emerald-400">+ {recipe.ingredients.length - 4} mais...</li>
                      )}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recipe.tags.map((tag, i) => (
                      <Badge key={i} variant="outline" className="text-xs border-gray-500 text-gray-400">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Ver Receita Completa
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-emerald-400 text-xl">
                          {recipe.name}
                        </DialogTitle>
                        <DialogDescription className="text-gray-300">
                          {recipe.difficulty} • {recipe.prepTime} minutos • {recipe.calories} calorias
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-300 mb-2">Ingredientes:</h4>
                          <ul className="space-y-2">
                            {recipe.ingredients.map((ingredient, i) => (
                              <li key={i} className="flex justify-between items-center p-2 bg-slate-700/50 rounded">
                                <span>{ingredient.name}</span>
                                <span className="text-emerald-400 font-bold">
                                  {ingredient.amount} {ingredient.unit}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-300 mb-2">Modo de Preparo:</h4>
                          <ol className="space-y-2">
                            {recipe.instructions.map((instruction, i) => (
                              <li key={i} className="flex gap-3">
                                <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                                  {i + 1}
                                </span>
                                <span className="text-gray-300">{instruction}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Adicionar mais receitas */}
          <div className="text-center mt-12">
            <Card className="border-2 border-emerald-500/50 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 backdrop-blur-xl shadow-2xl">
              <CardContent className="py-8">
                <ChefHat className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Mais Receitas em Breve!
                </h3>
                <p className="text-gray-300 mb-6">
                  Estamos constantemente adicionando novas receitas fit para diversificar seu cardápio
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-4 py-2">
                    <Star className="w-4 h-4 mr-2" />
                    +100 receitas
                  </Badge>
                  <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30 px-4 py-2">
                    <Heart className="w-4 h-4 mr-2" />
                    Favoritas
                  </Badge>
                  <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-4 py-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    Planejamento
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === 'workout') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900">
        <Navigation showBackButton />
        <div className="container mx-auto px-4 max-w-6xl pt-24 pb-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-6">Treinos</h1>
            <p className="text-xl text-gray-300">
              {currentUser?.isPro ? 'Treinos completos e personalizados' : 'Exercícios básicos para começar sua jornada'}
            </p>
          </div>

          {/* Seleção de Local de Treino */}
          {!workoutLocation && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white text-center mb-8">
                Onde você prefere treinar?
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card 
                  className="border-2 border-green-500/50 bg-green-500/10 backdrop-blur-xl shadow-2xl cursor-pointer hover:scale-105 transition-all duration-300"
                  onClick={() => setWorkoutLocation('outdoor')}
                >
                  <CardHeader className="text-center">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-2xl w-fit mx-auto mb-6">
                      <TreePine className="w-12 h-12 text-white" />
                    </div>
                    <CardTitle className="text-3xl text-white mb-4">Ao Ar Livre</CardTitle>
                    <CardDescription className="text-gray-300 text-lg">
                      Treinos em parques, praças e espaços abertos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>Corrida e caminhada</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>Exercícios funcionais</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>Calistenia</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>Ar puro e vitamina D</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card 
                  className="border-2 border-blue-500/50 bg-blue-500/10 backdrop-blur-xl shadow-2xl cursor-pointer hover:scale-105 transition-all duration-300"
                  onClick={() => setWorkoutLocation('home')}
                >
                  <CardHeader className="text-center">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-4 rounded-2xl w-fit mx-auto mb-6">
                      <Home className="w-12 h-12 text-white" />
                    </div>
                    <CardTitle className="text-3xl text-white mb-4">Em Casa</CardTitle>
                    <CardDescription className="text-gray-300 text-lg">
                      Treinos práticos no conforto do seu lar
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-300">
                        <CheckCircle className="w-4 h-4 text-blue-400" />
                        <span>Sem equipamentos</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <CheckCircle className="w-4 h-4 text-blue-400" />
                        <span>Flexibilidade de horário</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <CheckCircle className="w-4 h-4 text-blue-400" />
                        <span>Privacidade total</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <CheckCircle className="w-4 h-4 text-blue-400" />
                        <span>Economia de tempo</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card 
                  className="border-2 border-purple-500/50 bg-purple-500/10 backdrop-blur-xl shadow-2xl cursor-pointer hover:scale-105 transition-all duration-300"
                  onClick={() => setWorkoutLocation('gym')}
                >
                  <CardHeader className="text-center">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-4 rounded-2xl w-fit mx-auto mb-6">
                      <Building className="w-12 h-12 text-white" />
                    </div>
                    <CardTitle className="text-3xl text-white mb-4">Na Academia</CardTitle>
                    <CardDescription className="text-gray-300 text-lg">
                      Treinos com equipamentos profissionais
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-300">
                        <CheckCircle className="w-4 h-4 text-purple-400" />
                        <span>Equipamentos variados</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <CheckCircle className="w-4 h-4 text-purple-400" />
                        <span>Ambiente motivador</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <CheckCircle className="w-4 h-4 text-purple-400" />
                        <span>Treinos intensos</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <CheckCircle className="w-4 h-4 text-purple-400" />
                        <span>Suporte profissional</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Treinos baseados na localização escolhida */}
          {workoutLocation && (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white">
                  Treinos {workoutLocation === 'outdoor' ? 'Ao Ar Livre' : workoutLocation === 'home' ? 'Em Casa' : 'Na Academia'}
                </h2>
                <Button
                  onClick={() => setWorkoutLocation('')}
                  variant="outline"
                  className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10"
                >
                  Mudar Local
                </Button>
              </div>

              {/* Treinos de Academia com Sistema Completo */}
              {workoutLocation === 'gym' && (
                <div className="space-y-8">
                  {/* Seletor de Dia */}
                  <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                    <CardHeader>
                      <CardTitle className="text-purple-400 text-2xl">Cronograma Semanal</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                        {gymWorkouts.map((workout) => (
                          <Button
                            key={workout.day}
                            onClick={() => setSelectedDay(workout.day)}
                            variant={selectedDay === workout.day ? 'default' : 'outline'}
                            className={`
                              h-auto p-4 flex flex-col gap-2
                              ${selectedDay === workout.day 
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                                : 'border-white/20 text-white hover:bg-white/10'
                              }
                            `}
                          >
                            <span className="font-semibold capitalize">
                              {workout.day === 'segunda' ? 'SEG' :
                               workout.day === 'terca' ? 'TER' :
                               workout.day === 'quarta' ? 'QUA' :
                               workout.day === 'quinta' ? 'QUI' :
                               workout.day === 'sexta' ? 'SEX' : 'SAB'}
                            </span>
                            <span className="text-xs opacity-80">{workout.focus.split(',')[0]}</span>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Treino do Dia Selecionado */}
                  {(() => {
                    const selectedWorkout = gymWorkouts.find(w => w.day === selectedDay)
                    if (!selectedWorkout) return null

                    return (
                      <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                        <CardHeader>
                          <CardTitle className="text-purple-400 text-2xl">
                            {selectedWorkout.focus} - {selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}-feira
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            {selectedWorkout.exercises.map((exercise, index) => {
                              const log = getExerciseLog(exercise.id)
                              const adjustedReps = currentUser ? getRepsForGoal(exercise.reps, currentUser.goal) : exercise.reps

                              return (
                                <div key={exercise.id} className="bg-white/5 p-6 rounded-lg">
                                  <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                      <div className="flex items-center space-x-2">
                                        <Checkbox
                                          id={exercise.id}
                                          checked={log?.completed || false}
                                          onCheckedChange={() => toggleExerciseComplete(exercise.id)}
                                        />
                                        <label htmlFor={exercise.id} className="sr-only">
                                          Marcar {exercise.name} como completo
                                        </label>
                                      </div>
                                      <div>
                                        <h4 className="font-semibold text-white text-lg">{exercise.name}</h4>
                                        <p className="text-gray-400 text-sm">{exercise.muscleGroup}</p>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-purple-400 font-bold text-lg">
                                        {exercise.sets} x {adjustedReps}
                                      </div>
                                      <div className="text-gray-400 text-sm">séries x reps</div>
                                    </div>
                                  </div>

                                  <p className="text-gray-300 mb-4">{exercise.description}</p>
                                  
                                  <div className="bg-blue-500/10 p-3 rounded-lg mb-4">
                                    <p className="text-blue-300 text-sm">
                                      <strong>Dica:</strong> {exercise.tips}
                                    </p>
                                  </div>



                                  {/* Registro de Peso e Repetições */}
                                  <div className="grid md:grid-cols-3 gap-4">
                                    <div>
                                      <Label htmlFor={`weight-${exercise.id}`} className="text-gray-300">
                                        Peso (kg)
                                      </Label>
                                      <Input
                                        id={`weight-${exercise.id}`}
                                        type="number"
                                        placeholder="0"
                                        defaultValue={log?.weight || ''}
                                        className="bg-white/10 border-white/20 text-white"
                                        onBlur={(e) => {
                                          const weight = parseFloat(e.target.value) || 0
                                          const reps = log?.reps || 0
                                          if (weight > 0 || reps > 0) {
                                            logWorkout(exercise.id, weight, reps)
                                          }
                                        }}
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor={`reps-${exercise.id}`} className="text-gray-300">
                                        Repetições
                                      </Label>
                                      <Input
                                        id={`reps-${exercise.id}`}
                                        type="number"
                                        placeholder="0"
                                        defaultValue={log?.reps || ''}
                                        className="bg-white/10 border-white/20 text-white"
                                        onBlur={(e) => {
                                          const reps = parseInt(e.target.value) || 0
                                          const weight = log?.weight || 0
                                          if (weight > 0 || reps > 0) {
                                            logWorkout(exercise.id, weight, reps)
                                          }
                                        }}
                                      />
                                    </div>
                                    <div className="flex items-end">
                                      <Button
                                        onClick={() => {
                                          const weightInput = document.getElementById(`weight-${exercise.id}`) as HTMLInputElement
                                          const repsInput = document.getElementById(`reps-${exercise.id}`) as HTMLInputElement
                                          const weight = parseFloat(weightInput.value) || 0
                                          const reps = parseInt(repsInput.value) || 0
                                          logWorkout(exercise.id, weight, reps)
                                        }}
                                        className="w-full bg-purple-500 hover:bg-purple-600"
                                      >
                                        <Save className="w-4 h-4 mr-2" />
                                        Salvar
                                      </Button>
                                    </div>
                                  </div>

                                  {/* Histórico do Último Treino */}
                                  {log && log.weight > 0 && log.reps > 0 && (
                                    <div className="mt-4 p-3 bg-green-500/10 rounded-lg">
                                      <p className="text-green-300 text-sm">
                                        <strong>Último registro:</strong> {log.weight}kg x {log.reps} reps
                                      </p>
                                    </div>
                                  )}
                                </div>
                              )
                            })}
                          </div>

                          {/* Resumo do Treino */}
                          <div className="mt-8 p-6 bg-purple-500/10 rounded-lg">
                            <h4 className="font-semibold text-purple-300 mb-4">Resumo do Treino</h4>
                            <div className="grid md:grid-cols-3 gap-4 text-center">
                              <div>
                                <div className="text-2xl font-bold text-purple-400">
                                  {selectedWorkout.exercises.length}
                                </div>
                                <div className="text-gray-300">Exercícios</div>
                              </div>
                              <div>
                                <div className="text-2xl font-bold text-purple-400">
                                  {selectedWorkout.exercises.filter(ex => getExerciseLog(ex.id)?.completed).length}
                                </div>
                                <div className="text-gray-300">Completos</div>
                              </div>
                              <div>
                                <div className="text-2xl font-bold text-purple-400">
                                  {Math.round((selectedWorkout.exercises.filter(ex => getExerciseLog(ex.id)?.completed).length / selectedWorkout.exercises.length) * 100) || 0}%
                                </div>
                                <div className="text-gray-300">Progresso</div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })()}
                </div>
              )}

              {/* Outros tipos de treino (outdoor e home) */}
              {workoutLocation !== 'gym' && (
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {workoutLocation === 'outdoor' && (
                    <>
                      <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                        <CardHeader>
                          <CardTitle className="text-emerald-400 text-xl flex items-center gap-2">
                            <TreePine className="w-5 h-5" />
                            Cardio no Parque
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center justify-between text-gray-300">
                            <span>Corrida leve</span>
                            <span className="text-emerald-400">20min</span>
                          </div>
                          <div className="flex items-center justify-between text-gray-300">
                            <span>Polichinelos</span>
                            <span className="text-emerald-400">3x20</span>
                          </div>
                          <div className="flex items-center justify-between text-gray-300">
                            <span>Burpees</span>
                            <span className="text-emerald-400">3x8</span>
                          </div>
                          <Button className="w-full bg-emerald-500 hover:bg-emerald-600 mt-4">
                            Iniciar Treino
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                        <CardHeader>
                          <CardTitle className="text-teal-400 text-xl flex items-center gap-2">
                            <TreePine className="w-5 h-5" />
                            Força Funcional
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center justify-between text-gray-300">
                            <span>Flexões no banco</span>
                            <span className="text-teal-400">3x12</span>
                          </div>
                          <div className="flex items-center justify-between text-gray-300">
                            <span>Agachamentos</span>
                            <span className="text-teal-400">3x15</span>
                          </div>
                          <div className="flex items-center justify-between text-gray-300">
                            <span>Prancha</span>
                            <span className="text-teal-400">3x45s</span>
                          </div>
                          <Button className="w-full bg-teal-500 hover:bg-teal-600 mt-4">
                            Iniciar Treino
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                        <CardHeader>
                          <CardTitle className="text-cyan-400 text-xl flex items-center gap-2">
                            <TreePine className="w-5 h-5" />
                            Calistenia
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center justify-between text-gray-300">
                            <span>Barra fixa</span>
                            <span className="text-cyan-400">3x5</span>
                          </div>
                          <div className="flex items-center justify-between text-gray-300">
                            <span>Paralelas</span>
                            <span className="text-cyan-400">3x8</span>
                          </div>
                          <div className="flex items-center justify-between text-gray-300">
                            <span>Muscle-up</span>
                            <span className="text-cyan-400">2x3</span>
                          </div>
                          <Button className="w-full bg-cyan-500 hover:bg-cyan-600 mt-4">
                            Iniciar Treino
                          </Button>
                        </CardContent>
                      </Card>
                    </>
                  )}

                  {workoutLocation === 'home' && (
                    <>
                      <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                        <CardHeader>
                          <CardTitle className="text-emerald-400 text-xl flex items-center gap-2">
                            <Home className="w-5 h-5" />
                            HIIT Básico
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center justify-between text-gray-300">
                            <span>Flexões</span>
                            <span className="text-emerald-400">3x10</span>
                          </div>
                          <div className="flex items-center justify-between text-gray-300">
                            <span>Agachamentos</span>
                            <span className="text-emerald-400">3x15</span>
                          </div>
                          <div className="flex items-center justify-between text-gray-300">
                            <span>Mountain climbers</span>
                            <span className="text-emerald-400">3x20</span>
                          </div>
                          <Button className="w-full bg-emerald-500 hover:bg-emerald-600 mt-4">
                            Iniciar Treino
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                        <CardHeader>
                          <CardTitle className="text-teal-400 text-xl flex items-center gap-2">
                            <Home className="w-5 h-5" />
                            Core & Abs
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center justify-between text-gray-300">
                            <span>Prancha</span>
                            <span className="text-teal-400">3x60s</span>
                          </div>
                          <div className="flex items-center justify-between text-gray-300">
                            <span>Abdominais</span>
                            <span className="text-teal-400">3x20</span>
                          </div>
                          <div className="flex items-center justify-between text-gray-300">
                            <span>Russian twists</span>
                            <span className="text-teal-400">3x15</span>
                          </div>
                          <Button className="w-full bg-teal-500 hover:bg-teal-600 mt-4">
                            Iniciar Treino
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                        <CardHeader>
                          <CardTitle className="text-cyan-400 text-xl flex items-center gap-2">
                            <Home className="w-5 h-5" />
                            Yoga Flow
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center justify-between text-gray-300">
                            <span>Saudação ao sol</span>
                            <span className="text-cyan-400">5x</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-300">
                            <span>Guerreiro</span>
                            <span className="text-cyan-400">3x30s</span>
                          </div>
                          <div className="flex items-center justify-between text-gray-300">
                            <span>Relaxamento</span>
                            <span className="text-cyan-400">5min</span>
                          </div>
                          <Button className="w-full bg-cyan-500 hover:bg-cyan-600 mt-4">
                            Iniciar Treino
                          </Button>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
              )}
            </>
          )}

          {!currentUser?.isPro && (
            <Card className="border-2 border-emerald-500/50 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 backdrop-blur-xl shadow-2xl">
              <CardContent className="text-center py-8">
                <Crown className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Treinos Completos PRO
                </h3>
                <p className="text-gray-300 mb-6">
                  Acesse centenas de exercícios com vídeos HD, treinos personalizados, desafio calistênico de 30 dias e acompanhamento de progresso
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                  <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 px-4 py-2">
                    <Flame className="w-4 h-4 mr-2" />
                    Desafio 30 Dias
                  </Badge>
                  <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-4 py-2">
                    <Play className="w-4 h-4 mr-2" />
                    Vídeos HD
                  </Badge>
                  <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30 px-4 py-2">
                    <Target className="w-4 h-4 mr-2" />
                    Progressão
                  </Badge>
                </div>
                <Button
                  onClick={() => setCurrentStep('pro')}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                >
                  Upgrade para PRO
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    )
  }

  if (currentStep === 'challenge' && currentUser?.isPro) {
    const currentDayWorkout = getDayWorkout(challengeDay)
    const progressPercentage = (completedDays.length / 30) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-red-900">
        <Navigation showBackButton />
        <div className="container mx-auto px-4 max-w-6xl pt-24 pb-8">
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-orange-500 to-red-600 p-4 rounded-2xl w-fit mx-auto mb-6">
              <Flame className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-6">
              Desafio Calistênico 30 Dias
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Transforme seu corpo com exercícios funcionais que queimam gordura rapidamente
            </p>
            
            {/* Progress Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-300 font-medium">Progresso do Desafio</span>
                <span className="text-orange-400 font-bold text-lg">
                  {completedDays.length}/30 dias
                </span>
              </div>
              <div className="w-full bg-gray-700/50 rounded-full h-4 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Seletor de Dia */}
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-orange-400 text-2xl">Selecionar Dia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-6 gap-2">
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                    <Button
                      key={day}
                      onClick={() => setChallengeDay(day)}
                      variant={challengeDay === day ? 'default' : 'outline'}
                      className={`
                        w-full h-12 text-sm
                        ${completedDays.includes(day) 
                          ? 'bg-green-500 hover:bg-green-600 text-white border-green-500' 
                          : challengeDay === day 
                            ? 'bg-gradient-to-r from-orange-500 to-red-500' 
                            : 'border-white/20 text-white hover:bg-white/10'
                        }
                      `}
                    >
                      {completedDays.includes(day) ? <CheckCircle className="w-4 h-4" /> : day}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Treino do Dia */}
            <Card className="lg:col-span-2 border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-orange-400 text-2xl">
                    Dia {challengeDay} - {currentDayWorkout.focus}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge 
                      className={`
                        ${currentDayWorkout.difficulty === 'Fácil' ? 'bg-green-500' : 
                          currentDayWorkout.difficulty === 'Médio' ? 'bg-yellow-500' : 'bg-red-500'}
                      `}
                    >
                      {currentDayWorkout.difficulty}
                    </Badge>
                    <Badge className="bg-orange-500">
                      <Timer className="w-3 h-3 mr-1" />
                      {currentDayWorkout.estimatedTime}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {currentDayWorkout.exercises.map((exercise, index) => (
                    <div key={index} className="bg-white/5 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-white text-lg">{exercise.name}</h4>
                        <span className="text-orange-400 font-bold">
                          {exercise.reps} {exercise.duration && `(${exercise.duration})`}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{exercise.description}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 pt-6">
                  <Button
                    onClick={() => completeDay(challengeDay)}
                    disabled={completedDays.includes(challengeDay)}
                    className={`
                      flex-1 py-3 font-semibold
                      ${completedDays.includes(challengeDay)
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
                      }
                    `}
                  >
                    {completedDays.includes(challengeDay) ? (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Concluído
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 mr-2" />
                        Iniciar Treino
                      </>
                    )}
                  </Button>
                  
                  {challengeDay < 30 && (
                    <Button
                      onClick={() => setChallengeDay(challengeDay + 1)}
                      variant="outline"
                      className="border-orange-500 text-orange-400 hover:bg-orange-500/10"
                    >
                      Próximo Dia
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Estatísticas do Desafio */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">{completedDays.length}</div>
                <div className="text-gray-300">Dias Completos</div>
              </CardContent>
            </Card>
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-red-400 mb-2">{30 - completedDays.length}</div>
                <div className="text-gray-300">Dias Restantes</div>
              </CardContent>
            </Card>
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">{Math.round(progressPercentage)}%</div>
                <div className="text-gray-300">Progresso</div>
              </CardContent>
            </Card>
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {completedDays.length > 0 ? Math.round(completedDays.length / 30 * 100) : 0}
                </div>
                <div className="text-gray-300">Taxa de Sucesso</div>
              </CardContent>
            </Card>
          </div>

          {/* Motivação */}
          {completedDays.length > 0 && (
            <Card className="border-0 bg-gradient-to-r from-orange-600/20 to-red-600/20 backdrop-blur-xl shadow-2xl mt-8">
              <CardContent className="text-center py-8">
                <Award className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Parabéns! Você está no caminho certo!
                </h3>
                <p className="text-gray-300 mb-6">
                  {completedDays.length < 7 
                    ? "Continue assim! Os primeiros dias são os mais importantes."
                    : completedDays.length < 15
                      ? "Excelente! Você já está criando o hábito do exercício."
                      : completedDays.length < 25
                        ? "Incrível! Você está quase lá, mantenha o foco!"
                        : "Fantástico! Você é um verdadeiro guerreiro da calistenia!"
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    )
  }

  if (currentStep === 'products') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900">
        <Navigation showBackButton />
        <div className="container mx-auto px-4 max-w-6xl pt-24 pb-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-6">Produtos</h1>
            <p className="text-xl text-gray-300">Suplementos e produtos para acelerar seus resultados</p>
          </div>

          {!currentUser?.isPro ? (
            <Card className="border-2 border-emerald-500/50 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 backdrop-blur-xl shadow-2xl">
              <CardContent className="text-center py-16">
                <ShoppingCart className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-white mb-6">
                  Loja Exclusiva PRO
                </h3>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Acesse nossa loja exclusiva com suplementos premium, produtos de emagrecimento e combos especiais
                </p>
                <Button
                  onClick={() => setCurrentStep('pro')}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-8 py-4 text-lg"
                >
                  <Crown className="w-5 h-5 mr-2" />
                  Upgrade para PRO
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Produtos PRO aqui */}
            </div>
          )}
        </div>
      </div>
    )
  }

  if (currentStep === 'progress') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900">
        <Navigation showBackButton />
        <div className="container mx-auto px-4 max-w-6xl pt-24 pb-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-6">Progresso</h1>
            <p className="text-xl text-gray-300">Acompanhe sua evolução e conquistas</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-emerald-400 text-2xl">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentUser && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Dias consecutivos:</span>
                      <span className="text-emerald-400 font-bold text-xl">{currentUser.streakDays}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Treinos realizados:</span>
                      <span className="text-teal-400 font-bold text-xl">{currentUser.completedWorkouts}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Peso perdido:</span>
                      <span className="text-cyan-400 font-bold text-xl">{currentUser.weeklyWeightLoss.toFixed(1)}kg</span>
                    </div>
                    {currentUser.isPro && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Desafio 30 dias:</span>
                        <span className="text-orange-400 font-bold text-xl">{completedDays.length}/30</span>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-teal-400 text-2xl">Conquistas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-emerald-500" />
                  <span className="text-gray-300">Primeira semana completa</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-teal-500" />
                  <span className="text-gray-300">10 treinos realizados</span>
                </div>
                {currentUser?.isPro && completedDays.length >= 7 && (
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-orange-500" />
                    <span className="text-gray-300">Primeira semana do desafio</span>
                  </div>
                )}
                <div className="flex items-center gap-3 opacity-50">
                  <Award className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-500">Primeiro mês (bloqueado)</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {!currentUser?.isPro && (
            <Card className="border-2 border-emerald-500/50 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 backdrop-blur-xl shadow-2xl">
              <CardContent className="text-center py-8">
                <Crown className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Análise Completa PRO
                </h3>
                <p className="text-gray-300 mb-6">
                  Tenha acesso a gráficos detalhados, relatórios semanais, progresso do desafio calistênico e análise completa do seu progresso
                </p>
                <Button
                  onClick={() => setCurrentStep('pro')}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                >
                  Upgrade para PRO
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    )
  }

  if (currentStep === 'pro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 py-8">
        <Navigation showBackButton />
        <div className="container mx-auto px-4 max-w-6xl pt-24">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              FitLife Pro - Planos Premium
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Escolha o plano ideal para transformar seu corpo e alcançar seus objetivos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Plano Básico */}
            <Card className="border-2 border-gray-600 hover:border-emerald-400 transition-all duration-300 bg-white/10 backdrop-blur-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">Básico</CardTitle>
                <div className="text-4xl font-bold text-emerald-400 my-4">
                  R$ 29<span className="text-lg text-gray-400">/mês</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>Dieta personalizada básica</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>3 treinos por semana</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>Acompanhamento mensal</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-emerald-500 hover:bg-emerald-600"
                  onClick={() => handlePurchase('basic')}
                >
                  Escolher Plano
                </Button>
              </CardContent>
            </Card>

            {/* Plano Premium */}
            <Card className="border-2 border-emerald-500 shadow-2xl scale-105 relative bg-white/15 backdrop-blur-xl">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-1 text-white">
                  MAIS POPULAR
                </Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">Premium</CardTitle>
                <div className="text-4xl font-bold text-emerald-400 my-4">
                  R$ 59<span className="text-lg text-gray-400">/mês</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>Dieta personalizada completa</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>Treinos ilimitados com vídeos</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-orange-500" />
                    <span>Desafio Calistênico 30 Dias</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>Receitas Fit exclusivas</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>Acompanhamento semanal</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>Suporte via chat</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                  onClick={() => handlePurchase('premium')}
                >
                  Escolher Plano
                </Button>
              </CardContent>
            </Card>

            {/* Plano Elite */}
            <Card className="border-2 border-gray-600 hover:border-emerald-400 transition-all duration-300 bg-white/10 backdrop-blur-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">Elite</CardTitle>
                <div className="text-4xl font-bold text-emerald-400 my-4">
                  R$ 99<span className="text-lg text-gray-400">/mês</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>Tudo do Premium +</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>Consultoria 1:1 mensal</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>Suplementos inclusos</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>Acesso prioritário</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-emerald-500 hover:bg-emerald-600"
                  onClick={() => handlePurchase('elite')}
                >
                  Escolher Plano
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Destaque do Desafio Calistênico */}
          <Card className="border-2 border-orange-500/50 bg-gradient-to-r from-orange-600/20 to-red-600/20 backdrop-blur-xl shadow-2xl mb-8">
            <CardContent className="text-center py-8">
              <Flame className="w-16 h-16 text-orange-400 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">
                🔥 Desafio Calistênico de 30 Dias
              </h3>
              <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
                Exclusivo da versão PRO! Transforme seu corpo com exercícios funcionais progressivos que queimam gordura rapidamente. 
                Do iniciante ao avançado em apenas 30 dias.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 px-4 py-2">
                  <Target className="w-4 h-4 mr-2" />
                  Progressão Inteligente
                </Badge>
                <Badge className="bg-red-500/20 text-red-300 border-red-500/30 px-4 py-2">
                  <Zap className="w-4 h-4 mr-2" />
                  Queima Gordura Rápida
                </Badge>
                <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 px-4 py-2">
                  <Award className="w-4 h-4 mr-2" />
                  Resultados Garantidos
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Opção de continuar com versão gratuita */}
          <Card className="border-2 border-gray-600 bg-white/5 backdrop-blur-xl">
            <CardContent className="text-center py-8">
              <h3 className="text-xl font-semibold text-gray-300 mb-4">
                Não está pronto para o upgrade?
              </h3>
              <p className="text-gray-400 mb-6">
                Continue usando nossa versão gratuita com recursos básicos para começar sua jornada
              </p>
              <Button
                onClick={() => setCurrentStep('free')}
                variant="outline"
                className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10"
              >
                Continuar com Versão Gratuita
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (currentStep === 'purchased') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900">
        <Navigation showBackButton />
        <div className="container mx-auto px-4 max-w-4xl pt-24 pb-8">
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-full w-fit mx-auto mb-8">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-6">
              Bem-vindo ao FitLife Pro!
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Parabéns! Você agora tem acesso completo a todos os recursos premium do FitLife Pro
            </p>
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 text-lg">
              <Crown className="w-5 h-5 mr-2" />
              Plano {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Ativo
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-emerald-400 text-2xl">Recursos Desbloqueados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Dieta personalizada completa</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Treinos ilimitados com vídeos HD</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-orange-500" />
                    <span>Desafio Calistênico 30 Dias</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Receitas Fit exclusivas</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Análise avançada de progresso</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Loja de produtos premium</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Suporte especializado</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-teal-400 text-2xl">Próximos Passos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <span>Explore seu dashboard personalizado</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <span>Configure sua dieta personalizada</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <span>Inicie o Desafio Calistênico 30 Dias</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">4</span>
                    </div>
                    <span>Explore as receitas fit exclusivas</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">5</span>
                    </div>
                    <span>Acompanhe seu progresso diário</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Destaque do Desafio */}
          <Card className="border-2 border-orange-500/50 bg-gradient-to-r from-orange-600/20 to-red-600/20 backdrop-blur-xl shadow-2xl mb-8">
            <CardContent className="text-center py-8">
              <Flame className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">
                🔥 Desafio Calistênico Desbloqueado!
              </h3>
              <p className="text-gray-300 mb-6">
                Seu programa exclusivo de 30 dias para queima de gordura rápida está pronto. Comece hoje mesmo!
              </p>
              <Button
                onClick={() => setCurrentStep('challenge')}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-8 py-3 font-semibold"
              >
                <Flame className="w-5 h-5 mr-2" />
                Iniciar Desafio Agora
              </Button>
            </CardContent>
          </Card>

          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">Comece Agora Sua Transformação</h2>
            <div className="grid md:grid-cols-5 gap-4">
              <Button
                onClick={() => setCurrentStep('dashboard')}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 p-6 h-auto flex flex-col gap-3"
              >
                <BarChart3 className="w-8 h-8" />
                <span className="font-semibold">Dashboard</span>
              </Button>
              <Button
                onClick={() => setCurrentStep('diet')}
                className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 p-6 h-auto flex flex-col gap-3"
              >
                <Utensils className="w-8 h-8" />
                <span className="font-semibold">Dieta PRO</span>
              </Button>
              <Button
                onClick={() => setCurrentStep('workout')}
                className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 p-6 h-auto flex flex-col gap-3"
              >
                <Dumbbell className="w-8 h-8" />
                <span className="font-semibold">Treinos PRO</span>
              </Button>
              <Button
                onClick={() => setCurrentStep('challenge')}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 p-6 h-auto flex flex-col gap-3"
              >
                <Flame className="w-8 h-8" />
                <span className="font-semibold">Desafio 30D</span>
              </Button>
              <Button
                onClick={() => setCurrentStep('recipes')}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 p-6 h-auto flex flex-col gap-3"
              >
                <ChefHat className="w-8 h-8" />
                <span className="font-semibold">Receitas Fit</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}