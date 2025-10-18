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
  PlayCircle,
  Globe,
  UserCog,
  Plus,
  Minus,
  RotateCcw
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuth } from '@/contexts/AuthContext'
import { Language } from '@/lib/i18n'

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

interface DailyWorkoutEntry {
  date: string
  exercises: {
    [exerciseId: string]: {
      weight: number
      reps: number
      completed: boolean
    }
  }
  totalTime: number
  caloriesBurned: number
  notes: string
}

interface GymWorkout {
  day: string
  focus: string
  exercises: GymExercise[]
}

export default function FitApp() {
  const { language, setLanguage, t } = useLanguage()
  const { currentUser, isAuthenticated, login, register, logout, updateUser, updateUserProgress } = useAuth()
  const [currentStep, setCurrentStep] = useState<'home' | 'login' | 'register' | 'questionnaire' | 'assessment' | 'pro' | 'free' | 'dashboard' | 'diet' | 'workout' | 'products' | 'progress' | 'purchased' | 'challenge' | 'recipes' | 'account' | 'admin'>('home')
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
  const [dailyWorkouts, setDailyWorkouts] = useState<DailyWorkoutEntry[]>([])
  const [exerciseWeights, setExerciseWeights] = useState<{[key: string]: number}>({})
  const [exerciseReps, setExerciseReps] = useState<{[key: string]: number}>({})

  // Redirecionar usuário autenticado para dashboard
  useEffect(() => {
    if (isAuthenticated && currentUser && currentStep === 'home') {
      setCurrentStep('dashboard')
    }
  }, [isAuthenticated, currentUser, currentStep])

  // Carregar dados salvos
  useEffect(() => {
    if (currentUser) {
      const savedWorkouts = localStorage.getItem(`dailyWorkouts_${currentUser.id}`)
      if (savedWorkouts) {
        setDailyWorkouts(JSON.parse(savedWorkouts))
      }
      
      const savedWeights = localStorage.getItem(`exerciseWeights_${currentUser.id}`)
      if (savedWeights) {
        setExerciseWeights(JSON.parse(savedWeights))
      }
      
      const savedReps = localStorage.getItem(`exerciseReps_${currentUser.id}`)
      if (savedReps) {
        setExerciseReps(JSON.parse(savedReps))
      }
    }
  }, [currentUser])

  // Salvar dados quando mudarem
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`dailyWorkouts_${currentUser.id}`, JSON.stringify(dailyWorkouts))
    }
  }, [dailyWorkouts, currentUser])

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`exerciseWeights_${currentUser.id}`, JSON.stringify(exerciseWeights))
    }
  }, [exerciseWeights, currentUser])

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`exerciseReps_${currentUser.id}`, JSON.stringify(exerciseReps))
    }
  }, [exerciseReps, currentUser])

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
          id: 'triceps-pulley',
          name: 'Tríceps Pulley',
          muscleGroup: 'Tríceps',
          reps: '12-15',
          sets: 3,
          description: 'Isolamento do tríceps',
          tips: 'Mantenha os cotovelos fixos ao lado do corpo',
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
          id: 'rosca-direta',
          name: 'Rosca Direta',
          muscleGroup: 'Bíceps',
          reps: '10-12',
          sets: 4,
          description: 'Exercício básico para bíceps',
          tips: 'Controle a descida, não balance o corpo',
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
        }
      ]
    },
    {
      day: 'quinta',
      focus: 'Peito e Tríceps',
      exercises: [
        {
          id: 'supino-declinado',
          name: 'Supino Declinado',
          muscleGroup: 'Peito',
          reps: '8-10',
          sets: 4,
          description: 'Foca na parte inferior do peitoral',
          tips: 'Controle bem a descida e subida',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'crucifixo',
          name: 'Crucifixo',
          muscleGroup: 'Peito',
          reps: '10-12',
          sets: 3,
          description: 'Isolamento do peitoral',
          tips: 'Mantenha leve flexão nos cotovelos',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'triceps-frances',
          name: 'Tríceps Francês',
          muscleGroup: 'Tríceps',
          reps: '10-12',
          sets: 3,
          description: 'Isolamento do tríceps',
          tips: 'Mantenha os cotovelos fixos',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        }
      ]
    },
    {
      day: 'sexta',
      focus: 'Costas e Ombros',
      exercises: [
        {
          id: 'barra-fixa',
          name: 'Barra Fixa',
          muscleGroup: 'Costas',
          reps: '6-10',
          sets: 4,
          description: 'Exercício composto para costas',
          tips: 'Se necessário, use auxílio ou elástico',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'elevacao-lateral',
          name: 'Elevação Lateral',
          muscleGroup: 'Ombros',
          reps: '12-15',
          sets: 3,
          description: 'Isolamento do deltoide médio',
          tips: 'Controle o movimento, não balance',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'encolhimento',
          name: 'Encolhimento',
          muscleGroup: 'Trapézio',
          reps: '12-15',
          sets: 3,
          description: 'Fortalecimento do trapézio',
          tips: 'Movimento apenas dos ombros',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        }
      ]
    },
    {
      day: 'sabado',
      focus: 'Pernas e Core',
      exercises: [
        {
          id: 'agachamento-sumo',
          name: 'Agachamento Sumo',
          muscleGroup: 'Pernas',
          reps: '12-15',
          sets: 4,
          description: 'Variação que enfatiza glúteos',
          tips: 'Pés mais afastados, pontas para fora',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'panturrilha',
          name: 'Panturrilha em Pé',
          muscleGroup: 'Panturrilha',
          reps: '15-20',
          sets: 4,
          description: 'Fortalecimento das panturrilhas',
          tips: 'Amplitude completa de movimento',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        },
        {
          id: 'prancha',
          name: 'Prancha',
          muscleGroup: 'Core',
          reps: '30-60s',
          sets: 3,
          description: 'Fortalecimento do core',
          tips: 'Mantenha o corpo alinhado',
          animationUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
        }
      ]
    }
  ]

  // Função para obter repetições baseadas no objetivo
  const getRepsForGoal = (baseReps: string, goal: string): string => {
    if (goal === 'Perder peso') {
      return baseReps.replace(/(\\d+)-(\\d+)/, (match, min, max) => `${Math.max(10, parseInt(min))}-${Math.min(15, parseInt(max) + 2)}`)
    } else if (goal === 'Ganhar massa muscular') {
      return baseReps.replace(/(\\d+)-(\\d+)/, (match, min, max) => `${Math.max(6, parseInt(min) - 2)}-${Math.max(10, parseInt(max) - 2)}`)
    }
    return baseReps
  }

  // Função para registrar treino diário
  const saveDailyWorkout = () => {
    const today = new Date().toISOString().split('T')[0]
    const currentWorkout = gymWorkouts.find(w => w.day === selectedDay)
    
    if (!currentWorkout) return

    const workoutEntry: DailyWorkoutEntry = {
      date: today,
      exercises: {},
      totalTime: 60, // Tempo estimado
      caloriesBurned: Math.floor(Math.random() * 200) + 250,
      notes: ''
    }

    currentWorkout.exercises.forEach(exercise => {
      workoutEntry.exercises[exercise.id] = {
        weight: exerciseWeights[exercise.id] || 0,
        reps: exerciseReps[exercise.id] || 0,
        completed: getExerciseLog(exercise.id)?.completed || false
      }
    })

    const existingIndex = dailyWorkouts.findIndex(w => w.date === today)
    if (existingIndex >= 0) {
      const updatedWorkouts = [...dailyWorkouts]
      updatedWorkouts[existingIndex] = workoutEntry
      setDailyWorkouts(updatedWorkouts)
    } else {
      setDailyWorkouts([...dailyWorkouts, workoutEntry])
    }

    // Atualizar progresso do usuário
    if (currentUser) {
      updateUserProgress({
        completedWorkouts: currentUser.completedWorkouts + 1,
        totalCaloriesBurned: currentUser.totalCaloriesBurned + workoutEntry.caloriesBurned
      })
    }
  }

  // Função para atualizar peso do exercício
  const updateExerciseWeight = (exerciseId: string, weight: number) => {
    setExerciseWeights(prev => ({
      ...prev,
      [exerciseId]: weight
    }))
  }

  // Função para atualizar repetições do exercício
  const updateExerciseReps = (exerciseId: string, reps: number) => {
    setExerciseReps(prev => ({
      ...prev,
      [exerciseId]: reps
    }))
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
      setWorkoutLogs([...workoutLogs, { 
        exerciseId, 
        weight: exerciseWeights[exerciseId] || 0, 
        reps: exerciseReps[exerciseId] || 0, 
        completed: true, 
        date: today 
      }])
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
    }
  ]

  // Planos de dieta personalizados
  const generateDietPlan = (goal: 'emagrecimento' | 'ganho_massa', user: any): DietPlan => {
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
    }
  ]

  // Função para obter o treino do dia
  const getDayWorkout = (day: number): ChallengeDay => {
    if (day <= 3) return calisthenicChallenge[day - 1]
    return calisthenicChallenge[2] // Fallback para o último treino disponível
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await login(loginData.email, loginData.password)
    if (success) {
      setCurrentStep('dashboard')
    } else {
      alert('Email ou senha incorretos!')
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (registerData.password !== registerData.confirmPassword) {
      alert('Senhas não coincidem!')
      return
    }
    
    const success = await register(registerData.name, registerData.email, registerData.password)
    if (success) {
      setCurrentStep('questionnaire')
    } else {
      alert('Email já cadastrado!')
    }
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
      const updatedUserData = {
        ...answers,
        targetWeight: answers.goal === 'Perder peso' ? (parseFloat(answers.weight) - 5).toString() : (parseFloat(answers.weight) + 3).toString()
      }
      updateUser(updatedUserData)
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
      updateUser({ isPro: true, selectedPlan: plan })
    }
    // Redirecionar para a página PRO após compra
    window.location.href = '/pro-version'
  }

  const completeDay = (day: number) => {
    if (!completedDays.includes(day)) {
      setCompletedDays([...completedDays, day])
      if (currentUser) {
        updateUserProgress({
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

  // Seletor de Idioma
  const LanguageSelector = () => (
    <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
      <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
        <Globe className="w-4 h-4 mr-2" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-slate-800 border-slate-700">
        <SelectItem value="pt">🇧🇷 Português</SelectItem>
        <SelectItem value="en">🇺🇸 English</SelectItem>
        <SelectItem value="es">🇪🇸 Español</SelectItem>
      </SelectContent>
    </Select>
  )

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
              {t('home.title')}
            </h1>
            {currentUser?.isPro && (
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                <Crown className="w-3 h-3 mr-1" />
                PRO
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <LanguageSelector />
            {isAuthenticated && currentUser && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium">{currentUser.name}</span>
                <Button
                  onClick={() => setCurrentStep('account')}
                  variant="ghost"
                  className="text-gray-600 hover:text-gray-800"
                >
                  <UserCog className="w-4 h-4" />
                </Button>
                {currentUser.isAdmin && (
                  <Button
                    onClick={() => setCurrentStep('admin')}
                    variant="ghost"
                    className="text-purple-600 hover:text-purple-800"
                  >
                    <Shield className="w-4 h-4" />
                  </Button>
                )}
                <Button
                  onClick={logout}
                  variant="ghost"
                  className="text-red-600 hover:text-red-800"
                >
                  Sair
                </Button>
              </div>
            )}
            {showBackButton && (
              <Button
                onClick={() => setCurrentStep(isAuthenticated ? 'dashboard' : 'home')}
                variant="ghost"
                className="text-gray-600 hover:text-gray-800"
              >
                <Home className="w-4 h-4 mr-2" />
                {isAuthenticated ? t('nav.dashboard') : t('nav.home')}
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
              {t('nav.dashboard')}
            </Button>
            <Button
              variant={currentStep === 'diet' ? 'default' : 'ghost'}
              onClick={() => setCurrentStep('diet')}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Utensils className="w-4 h-4" />
              {t('nav.diet')}
            </Button>
            <Button
              variant={currentStep === 'workout' ? 'default' : 'ghost'}
              onClick={() => setCurrentStep('workout')}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Dumbbell className="w-4 h-4" />
              {t('nav.workouts')}
            </Button>
            {currentUser?.isPro && (
              <>
                <Button
                  variant={currentStep === 'challenge' ? 'default' : 'ghost'}
                  onClick={() => setCurrentStep('challenge')}
                  className="flex items-center gap-2 whitespace-nowrap bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
                >
                  <Flame className="w-4 h-4" />
                  {t('nav.challenge')}
                </Button>
                <Button
                  variant={currentStep === 'recipes' ? 'default' : 'ghost'}
                  onClick={() => setCurrentStep('recipes')}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  <ChefHat className="w-4 h-4" />
                  {t('nav.recipes')}
                </Button>
              </>
            )}
            <Button
              variant={currentStep === 'products' ? 'default' : 'ghost'}
              onClick={() => setCurrentStep('products')}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <ShoppingCart className="w-4 h-4" />
              {t('nav.products')}
            </Button>
            <Button
              variant={currentStep === 'progress' ? 'default' : 'ghost'}
              onClick={() => setCurrentStep('progress')}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <TrendingUp className="w-4 h-4" />
              {t('nav.progress')}
            </Button>
          </div>
        )}
      </div>
    </div>
  )

  // Redirecionar para páginas específicas
  if (currentStep === 'account') {
    window.location.href = '/account'
    return null
  }

  if (currentStep === 'admin' && currentUser?.isAdmin) {
    window.location.href = '/admin'
    return null
  }

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
          {/* Language Selector */}
          <div className="absolute top-4 right-4">
            <LanguageSelector />
          </div>

          {/* Header */}
          <div className="text-center mb-20">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-gradient-to-r from-emerald-400 to-teal-500 p-4 rounded-2xl shadow-2xl">
                <Target className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent mb-6 leading-tight">
              {t('home.title')}
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
              {t('home.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-4 py-2 text-lg">
                <Users className="w-4 h-4 mr-2" />
                {t('home.stats.users')}
              </Badge>
              <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30 px-4 py-2 text-lg">
                <Award className="w-4 h-4 mr-2" />
                {t('home.stats.success')}
              </Badge>
              <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-4 py-2 text-lg">
                <Zap className="w-4 h-4 mr-2" />
                {t('home.stats.results')}
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
                <CardTitle className="text-2xl text-white mb-2">{t('home.features.diet.title')}</CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  {t('home.features.diet.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {(t('home.features.diet.benefits') as string[]).map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/5 backdrop-blur-xl shadow-2xl hover:shadow-teal-500/20 transition-all duration-500 hover:scale-105 group">
              <CardHeader className="text-center pb-4">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-4 rounded-2xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Dumbbell className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-white mb-2">{t('home.features.workouts.title')}</CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  {t('home.features.workouts.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {(t('home.features.workouts.benefits') as string[]).map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-teal-400" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/5 backdrop-blur-xl shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:scale-105 group">
              <CardHeader className="text-center pb-4">
                <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-4 rounded-2xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-white mb-2">{t('home.features.analysis.title')}</CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  {t('home.features.analysis.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {(t('home.features.analysis.benefits') as string[]).map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-cyan-400" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/10">
              <h2 className="text-4xl font-bold text-white mb-6">
                {t('home.cta.title')}
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                {t('home.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => setCurrentStep('register')}
                  className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white px-12 py-6 text-xl rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 font-semibold"
                >
                  <UserPlus className="w-6 h-6 mr-3" />
                  {t('home.cta.createAccount')}
                </Button>
                <Button 
                  onClick={() => setCurrentStep('login')}
                  className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 hover:from-teal-600 hover:via-cyan-600 hover:to-blue-600 text-white px-12 py-6 text-xl rounded-2xl shadow-2xl hover:shadow-teal-500/25 transition-all duration-300 transform hover:scale-105 font-semibold"
                >
                  <LogIn className="w-6 h-6 mr-3" />
                  {t('home.cta.login')}
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
        <div className="absolute top-4 right-4">
          <LanguageSelector />
        </div>
        <div className="container mx-auto px-4 max-w-md">
          <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
            <CardHeader className="text-center pb-6">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 rounded-2xl w-fit mx-auto mb-6">
                <LogIn className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl text-white font-bold">
                {t('auth.login.title')}
              </CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                {t('auth.login.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">{t('auth.login.email')}</Label>
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
                  <Label htmlFor="password" className="text-white">{t('auth.login.password')}</Label>
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
                  {t('auth.login.loginButton')}
                </Button>
              </form>
              <div className="text-center mt-6">
                <p className="text-gray-300">
                  {t('auth.login.noAccount')}{' '}
                  <Button
                    variant="link"
                    onClick={() => setCurrentStep('register')}
                    className="text-emerald-400 hover:text-emerald-300 p-0"
                  >
                    {t('auth.login.createAccount')}
                  </Button>
                </p>
                <Button
                  variant="link"
                  onClick={() => setCurrentStep('home')}
                  className="text-gray-400 hover:text-gray-300 mt-2"
                >
                  {t('auth.login.backToHome')}
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
        <div className="absolute top-4 right-4">
          <LanguageSelector />
        </div>
        <div className="container mx-auto px-4 max-w-md">
          <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
            <CardHeader className="text-center pb-6">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 rounded-2xl w-fit mx-auto mb-6">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl text-white font-bold">
                {t('auth.register.title')}
              </CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                {t('auth.register.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">{t('auth.register.name')}</Label>
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
                  <Label htmlFor="email" className="text-white">{t('auth.register.email')}</Label>
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
                  <Label htmlFor="password" className="text-white">{t('auth.register.password')}</Label>
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
                  <Label htmlFor="confirmPassword" className="text-white">{t('auth.register.confirmPassword')}</Label>
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
                  {t('auth.register.registerButton')}
                </Button>
              </form>
              <div className="text-center mt-6">
                <p className="text-gray-300">
                  {t('auth.register.hasAccount')}{' '}
                  <Button
                    variant="link"
                    onClick={() => setCurrentStep('login')}
                    className="text-emerald-400 hover:text-emerald-300 p-0"
                  >
                    {t('auth.register.login')}
                  </Button>
                </p>
                <Button
                  variant="link"
                  onClick={() => setCurrentStep('home')}
                  className="text-gray-400 hover:text-gray-300 mt-2"
                >
                  {t('auth.register.backToHome')}
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
                  {t('common.previous')}
                </Button>
                <Button
                  onClick={nextQuestion}
                  disabled={!answers[currentQuestion.id as keyof QuestionnaireData]}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-8 py-3 font-semibold disabled:opacity-50"
                >
                  {questionIndex === questions.length - 1 ? 'Finalizar' : t('common.next')}
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
                  onClick={() => setCurrentStep('dashboard')}
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
              {t('dashboard.welcome', { name: currentUser.name })}
            </h1>
            <p className="text-xl text-gray-300">
              {t('dashboard.subtitle')}
            </p>
          </div>

          {/* Estatísticas Principais */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  {currentUser.streakDays}
                </div>
                <div className="text-gray-300">{t('dashboard.stats.consecutiveDays')}</div>
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
                <div className="text-gray-300">{t('dashboard.stats.weightLost')}</div>
                <div className="text-sm text-teal-300 mt-1">
                  {t('dashboard.stats.thisWeek')}
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  {currentUser.completedWorkouts}
                </div>
                <div className="text-gray-300">{t('dashboard.stats.workoutsCompleted')}</div>
                <div className="text-sm text-cyan-300 mt-1">
                  {t('dashboard.stats.total')}
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {currentUser.totalCaloriesBurned}
                </div>
                <div className="text-gray-300">{t('dashboard.stats.caloriesBurned')}</div>
                <div className="text-sm text-purple-300 mt-1">
                  {t('dashboard.stats.total')}
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
                  {t('dashboard.progress.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">{t('dashboard.progress.initialWeight')}:</span>
                  <span className="text-white font-bold">{currentUser.weight}kg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">{t('dashboard.progress.currentWeight')}:</span>
                  <span className="text-emerald-400 font-bold">{currentUser.currentWeight}kg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">{t('dashboard.progress.goal')}:</span>
                  <span className="text-teal-400 font-bold">{currentUser.targetWeight}kg</span>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-300 mb-2">
                    <span>{t('dashboard.progress.progress')}</span>
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
                  {t('dashboard.profile.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {assessment && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">{t('dashboard.profile.bmi')}:</span>
                      <Badge variant={assessment.bmi > 25 ? "destructive" : "default"}>
                        {assessment.bmi.toFixed(1)} - {assessment.bmiCategory}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">{t('dashboard.profile.level')}:</span>
                      <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600">
                        {assessment.level}
                      </Badge>
                    </div>
                  </>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">{t('dashboard.profile.objective')}:</span>
                  <span className="text-emerald-400 font-semibold">{currentUser.goal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">{t('dashboard.profile.activity')}:</span>
                  <span className="text-teal-400 font-semibold">{currentUser.currentActivity}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Próximas Ações */}
          <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl mb-8">
            <CardHeader>
              <CardTitle className="text-cyan-400 text-2xl">{t('dashboard.nextActions.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button
                  onClick={() => setCurrentStep('diet')}
                  className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 p-6 h-auto flex flex-col gap-3"
                >
                  <Utensils className="w-8 h-8" />
                  <span className="font-semibold">{t('dashboard.nextActions.configureDiet')}</span>
                  <span className="text-sm opacity-80">{t('dashboard.nextActions.configureDietDesc')}</span>
                </Button>
                <Button
                  onClick={() => setCurrentStep('workout')}
                  className="bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30 p-6 h-auto flex flex-col gap-3"
                >
                  <Dumbbell className="w-8 h-8" />
                  <span className="font-semibold">{t('dashboard.nextActions.trainToday')}</span>
                  <span className="text-sm opacity-80">{t('dashboard.nextActions.trainTodayDesc')}</span>
                </Button>
                {currentUser.isPro ? (
                  <Button
                    onClick={() => setCurrentStep('challenge')}
                    className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/30 p-6 h-auto flex flex-col gap-3"
                  >
                    <Flame className="w-8 h-8" />
                    <span className="font-semibold">{t('dashboard.nextActions.challenge30')}</span>
                    <span className="text-sm opacity-80">{t('dashboard.nextActions.challenge30Desc')}</span>
                  </Button>
                ) : (
                  <Button
                    onClick={() => setCurrentStep('pro')}
                    className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 p-6 h-auto flex flex-col gap-3"
                  >
                    <Crown className="w-8 h-8" />
                    <span className="font-semibold">{t('dashboard.nextActions.upgradePro')}</span>
                    <span className="text-sm opacity-80">{t('dashboard.nextActions.upgradeProDesc')}</span>
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

  if (currentStep === 'diet' && currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900">
        <Navigation showBackButton />
        <div className="container mx-auto px-4 max-w-6xl pt-24 pb-8">
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 rounded-2xl w-fit mx-auto mb-6">
              <Utensils className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-6">
              Dieta Personalizada
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Plano alimentar adaptado ao seu perfil e objetivos
            </p>
          </div>

          {/* Seleção de Objetivo - Apenas para usuários PRO */}
          {currentUser.isPro && !dietGoal && (
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl mb-8">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">Qual seu objetivo principal?</CardTitle>
                <CardDescription className="text-gray-300">
                  Escolha seu objetivo para receber um plano personalizado
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => handleDietGoalSelect('emagrecimento')}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-8 py-6 text-lg"
                >
                  <TrendingDown className="w-5 h-5 mr-2" />
                  Emagrecimento
                </Button>
                <Button
                  onClick={() => handleDietGoalSelect('ganho_massa')}
                  className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 px-8 py-6 text-lg"
                >
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Ganho de Massa
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Plano de Dieta */}
          {(currentDietPlan || !currentUser.isPro) && (
            <div className="space-y-8">
              {/* Resumo Nutricional */}
              {currentDietPlan && (
                <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-2xl text-emerald-400 flex items-center gap-2">
                      <BarChart3 className="w-6 h-6" />
                      Resumo Nutricional Diário
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-emerald-400 mb-2">
                          {currentDietPlan.totalCalories}
                        </div>
                        <div className="text-gray-300">Calorias</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-teal-400 mb-2">
                          {currentDietPlan.totalProtein}g
                        </div>
                        <div className="text-gray-300">Proteínas</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-cyan-400 mb-2">
                          {currentDietPlan.totalCarbs}g
                        </div>
                        <div className="text-gray-300">Carboidratos</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-400 mb-2">
                          {currentDietPlan.totalFat}g
                        </div>
                        <div className="text-gray-300">Gorduras</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Receitas Disponíveis */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fitRecipes.map((recipe) => (
                  <Card key={recipe.id} className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl hover:scale-105 transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-xl text-white">{recipe.name}</CardTitle>
                      <div className="flex gap-4 text-sm text-gray-300">
                        <span>{recipe.calories} kcal</span>
                        <span>{recipe.protein}g proteína</span>
                        <span>{recipe.prepTime} min</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {recipe.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-emerald-400 border-emerald-500/50">
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
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-slate-900 border-slate-700">
                          <DialogHeader>
                            <DialogTitle className="text-2xl text-white">{recipe.name}</DialogTitle>
                            <DialogDescription className="text-gray-300">
                              {recipe.category} • {recipe.prepTime} minutos • {recipe.difficulty}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid md:grid-cols-2 gap-6 mt-6">
                            <div>
                              <h3 className="text-lg font-semibold text-emerald-400 mb-4">Ingredientes:</h3>
                              <ul className="space-y-2">
                                {recipe.ingredients.map((ingredient, index) => (
                                  <li key={index} className="text-gray-300 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-teal-400 mb-4">Modo de Preparo:</h3>
                              <ol className="space-y-3">
                                {recipe.instructions.map((instruction, index) => (
                                  <li key={index} className="text-gray-300 flex items-start gap-3">
                                    <span className="bg-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">
                                      {index + 1}
                                    </span>
                                    {instruction}
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

              {/* Upgrade para PRO se não for usuário PRO */}
              {!currentUser.isPro && (
                <Card className="border-2 border-emerald-500/50 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 backdrop-blur-xl shadow-2xl">
                  <CardContent className="text-center py-8">
                    <Crown className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Desbloqueie Dietas Personalizadas
                    </h3>
                    <p className="text-gray-300 mb-6">
                      Tenha acesso a planos alimentares científicos, calculados especificamente para seu perfil e objetivos
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
          )}
        </div>
      </div>
    )
  }

  if (currentStep === 'workout' && currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900">
        <Navigation showBackButton />
        <div className="container mx-auto px-4 max-w-6xl pt-24 pb-8">
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-4 rounded-2xl w-fit mx-auto mb-6">
              <Dumbbell className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-6">
              Treinos Personalizados
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Escolha seu ambiente de treino e receba exercícios adaptados
            </p>
          </div>

          {/* Seleção de Local de Treino */}
          {!workoutLocation && (
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl mb-8">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">Onde você prefere treinar?</CardTitle>
                <CardDescription className="text-gray-300">
                  Escolha seu ambiente preferido para receber exercícios adequados
                </CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-4">
                <Button
                  onClick={() => setWorkoutLocation('outdoor')}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-6 py-8 text-lg flex flex-col gap-3"
                >
                  <TreePine className="w-8 h-8" />
                  <span className="font-semibold">Ao Ar Livre</span>
                  <span className="text-sm opacity-80">Parques, praças, rua</span>
                </Button>
                <Button
                  onClick={() => setWorkoutLocation('home')}
                  className="bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700 px-6 py-8 text-lg flex flex-col gap-3"
                >
                  <Home className="w-8 h-8" />
                  <span className="font-semibold">Em Casa</span>
                  <span className="text-sm opacity-80">Sem equipamentos</span>
                </Button>
                <Button
                  onClick={() => setWorkoutLocation('gym')}
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 px-6 py-8 text-lg flex flex-col gap-3"
                >
                  <Building className="w-8 h-8" />
                  <span className="font-semibold">Academia</span>
                  <span className="text-sm opacity-80">Equipamentos completos</span>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Treinos baseados na localização */}
          {workoutLocation === 'gym' && (
            <div className="space-y-8">
              {/* Seletor de Dia */}
              <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Treino de Academia - Sistema de Registro Diário</CardTitle>
                  <CardDescription className="text-gray-300">
                    Registre seus pesos e repetições para acompanhar seu progresso
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-6 overflow-x-auto">
                    {['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'].map((day) => (
                      <Button
                        key={day}
                        variant={selectedDay === day ? 'default' : 'outline'}
                        onClick={() => setSelectedDay(day)}
                        className="whitespace-nowrap"
                      >
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                      </Button>
                    ))}
                  </div>

                  {/* Treino do Dia Selecionado */}
                  {gymWorkouts.find(w => w.day === selectedDay) && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-emerald-400 mb-2">
                          {gymWorkouts.find(w => w.day === selectedDay)?.focus}
                        </h3>
                        <p className="text-gray-300">
                          Treino adaptado para {currentUser.goal?.toLowerCase()}
                        </p>
                      </div>

                      <div className="grid gap-4">
                        {gymWorkouts.find(w => w.day === selectedDay)?.exercises.map((exercise) => {
                          const log = getExerciseLog(exercise.id)
                          const currentWeight = exerciseWeights[exercise.id] || 0
                          const currentReps = exerciseReps[exercise.id] || 0
                          
                          return (
                            <Card key={exercise.id} className="border-0 bg-white/5 backdrop-blur-xl">
                              <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                  <div>
                                    <h4 className="text-xl font-bold text-white">{exercise.name}</h4>
                                    <p className="text-gray-300">{exercise.muscleGroup}</p>
                                  </div>
                                  <div className="text-right">
                                    <Badge variant="outline" className="text-emerald-400 border-emerald-500/50 mb-2">
                                      {getRepsForGoal(exercise.reps, currentUser.goal || '')}
                                    </Badge>
                                    <p className="text-sm text-gray-400">{exercise.sets} séries</p>
                                  </div>
                                </div>
                                
                                <p className="text-gray-300 mb-4">{exercise.description}</p>
                                <p className="text-sm text-gray-400 mb-4">{exercise.tips}</p>
                                
                                {/* Controles de Peso e Repetições */}
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                  <div className="space-y-2">
                                    <Label className="text-white">Peso (kg)</Label>
                                    <div className="flex items-center gap-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => updateExerciseWeight(exercise.id, Math.max(0, currentWeight - 2.5))}
                                        className="border-white/20 text-white hover:bg-white/10"
                                      >
                                        <Minus className="w-4 h-4" />
                                      </Button>
                                      <Input
                                        type="number"
                                        value={currentWeight}
                                        onChange={(e) => updateExerciseWeight(exercise.id, parseFloat(e.target.value) || 0)}
                                        className="text-center bg-white/10 border-white/20 text-white"
                                        step="0.5"
                                        min="0"
                                      />
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => updateExerciseWeight(exercise.id, currentWeight + 2.5)}
                                        className="border-white/20 text-white hover:bg-white/10"
                                      >
                                        <Plus className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <Label className="text-white">Repetições</Label>
                                    <div className="flex items-center gap-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => updateExerciseReps(exercise.id, Math.max(0, currentReps - 1))}
                                        className="border-white/20 text-white hover:bg-white/10"
                                      >
                                        <Minus className="w-4 h-4" />
                                      </Button>
                                      <Input
                                        type="number"
                                        value={currentReps}
                                        onChange={(e) => updateExerciseReps(exercise.id, parseInt(e.target.value) || 0)}
                                        className="text-center bg-white/10 border-white/20 text-white"
                                        min="0"
                                      />
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => updateExerciseReps(exercise.id, currentReps + 1)}
                                        className="border-white/20 text-white hover:bg-white/10"
                                      >
                                        <Plus className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20"
                                    >
                                      <PlayCircle className="w-4 h-4 mr-2" />
                                      Ver Execução
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        updateExerciseWeight(exercise.id, 0)
                                        updateExerciseReps(exercise.id, 0)
                                      }}
                                      className="border-gray-500/50 text-gray-400 hover:bg-gray-500/20"
                                    >
                                      <RotateCcw className="w-4 h-4 mr-2" />
                                      Reset
                                    </Button>
                                  </div>
                                  <Button
                                    onClick={() => {
                                      logWorkout(exercise.id, currentWeight, currentReps)
                                      toggleExerciseComplete(exercise.id)
                                    }}
                                    variant={log?.completed ? "default" : "outline"}
                                    size="sm"
                                    className={log?.completed ? "bg-green-600 hover:bg-green-700" : "border-white/20 text-white hover:bg-white/10"}
                                  >
                                    {log?.completed ? (
                                      <>
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Completo
                                      </>
                                    ) : (
                                      <>
                                        <Timer className="w-4 h-4 mr-2" />
                                        Marcar
                                      </>
                                    )}
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          )
                        })}
                      </div>
                      
                      {/* Botão para Salvar Treino do Dia */}
                      <div className="text-center">
                        <Button
                          onClick={saveDailyWorkout}
                          className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-8 py-3 text-lg font-semibold"
                        >
                          <Save className="w-5 h-5 mr-2" />
                          Salvar Treino do Dia
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {workoutLocation === 'home' && (
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">Treino em Casa</CardTitle>
                <CardDescription className="text-gray-300">
                  Exercícios funcionais sem equipamentos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-emerald-400">Exercícios de Força</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="font-semibold text-white">Flexões</h4>
                        <p className="text-gray-300 text-sm">3x10-15 repetições</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="font-semibold text-white">Agachamentos</h4>
                        <p className="text-gray-300 text-sm">3x15-20 repetições</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="font-semibold text-white">Prancha</h4>
                        <p className="text-gray-300 text-sm">3x30-60 segundos</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-teal-400">Exercícios Cardio</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="font-semibold text-white">Polichinelos</h4>
                        <p className="text-gray-300 text-sm">3x20-30 repetições</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="font-semibold text-white">Burpees</h4>
                        <p className="text-gray-300 text-sm">3x5-10 repetições</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="font-semibold text-white">Mountain Climbers</h4>
                        <p className="text-gray-300 text-sm">3x15-20 repetições</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {workoutLocation === 'outdoor' && (
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">Treino ao Ar Livre</CardTitle>
                <CardDescription className="text-gray-300">
                  Aproveite o ambiente natural para se exercitar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-green-400">Exercícios Funcionais</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="font-semibold text-white">Corrida/Caminhada</h4>
                        <p className="text-gray-300 text-sm">20-30 minutos</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="font-semibold text-white">Flexões no Banco</h4>
                        <p className="text-gray-300 text-sm">3x8-12 repetições</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="font-semibold text-white">Agachamentos com Salto</h4>
                        <p className="text-gray-300 text-sm">3x10-15 repetições</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-emerald-400">Exercícios com Equipamentos Urbanos</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="font-semibold text-white">Barra Fixa</h4>
                        <p className="text-gray-300 text-sm">3x5-10 repetições</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="font-semibold text-white">Paralelas</h4>
                        <p className="text-gray-300 text-sm">3x5-8 repetições</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="font-semibold text-white">Escadas</h4>
                        <p className="text-gray-300 text-sm">10-15 minutos subindo/descendo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Botão para trocar local */}
          {workoutLocation && (
            <div className="text-center">
              <Button
                onClick={() => setWorkoutLocation('')}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Edit className="w-4 h-4 mr-2" />
                Trocar Local de Treino
              </Button>
            </div>
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
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 rounded-2xl w-fit mx-auto mb-6">
              <Crown className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-6">
              Planos PRO
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Escolha o plano que melhor se adapta ao seu estilo de vida e objetivos
            </p>
          </div>

          {/* Planos */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Plano Mensal */}
            <Card className="border-2 border-emerald-500/50 bg-white/10 backdrop-blur-xl shadow-2xl hover:scale-105 transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-3 rounded-xl w-fit mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl text-white mb-2">Mensal</CardTitle>
                <div className="text-4xl font-bold text-emerald-400 mb-2">
                  R$ 29,90
                  <span className="text-lg text-gray-400 font-normal">/mês</span>
                </div>
                <CardDescription className="text-gray-300">
                  Perfeito para começar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Planos de dieta personalizados</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Treinos adaptativos</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Desafio 30 dias</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Receitas exclusivas</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Análises avançadas</span>
                  </div>
                </div>
                <Button
                  onClick={() => handlePurchase('mensal')}
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 py-3 font-semibold"
                >
                  Escolher Mensal
                </Button>
              </CardContent>
            </Card>

            {/* Plano Trimestral */}
            <Card className="border-2 border-teal-500/50 bg-white/10 backdrop-blur-xl shadow-2xl hover:scale-105 transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-3 rounded-xl w-fit mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl text-white mb-2">Trimestral</CardTitle>
                <div className="text-4xl font-bold text-teal-400 mb-2">
                  R$ 24,90
                  <span className="text-lg text-gray-400 font-normal">/mês</span>
                </div>
                <div className="text-sm text-teal-300 mb-2">
                  Economize 17%
                </div>
                <CardDescription className="text-gray-300">
                  Mais popular
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-teal-400" />
                    <span>Tudo do plano Mensal</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-teal-400" />
                    <span>Relatórios trimestrais</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-teal-400" />
                    <span>Suporte prioritário</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-teal-400" />
                    <span>Consultoria nutricional</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-teal-400" />
                    <span>Acesso antecipado</span>
                  </div>
                </div>
                <Button
                  onClick={() => handlePurchase('trimestral')}
                  className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 py-3 font-semibold"
                >
                  Escolher Trimestral
                </Button>
              </CardContent>
            </Card>

            {/* Plano Semestral */}
            <Card className="border-2 border-cyan-500/50 bg-white/10 backdrop-blur-xl shadow-2xl hover:scale-105 transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-3 rounded-xl w-fit mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl text-white mb-2">Semestral</CardTitle>
                <div className="text-4xl font-bold text-cyan-400 mb-2">
                  R$ 19,90
                  <span className="text-lg text-gray-400 font-normal">/mês</span>
                </div>
                <div className="text-sm text-cyan-300 mb-2">
                  Economize 33%
                </div>
                <CardDescription className="text-gray-300">
                  Melhor custo-benefício
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                    <span>Tudo do plano Trimestral</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                    <span>Planos personalizados</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                    <span>Acompanhamento mensal</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                    <span>Grupo VIP no WhatsApp</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                    <span>E-books exclusivos</span>
                  </div>
                </div>
                <Button
                  onClick={() => handlePurchase('semestral')}
                  className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 py-3 font-semibold"
                >
                  Escolher Semestral
                </Button>
              </CardContent>
            </Card>

            {/* Plano Anual */}
            <Card className="border-2 border-purple-500/50 bg-white/10 backdrop-blur-xl shadow-2xl hover:scale-105 transition-all duration-300 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1">
                  <Star className="w-3 h-3 mr-1" />
                  MELHOR OFERTA
                </Badge>
              </div>
              <CardHeader className="text-center pb-4 pt-6">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-xl w-fit mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl text-white mb-2">Anual</CardTitle>
                <div className="text-4xl font-bold text-purple-400 mb-2">
                  R$ 14,90
                  <span className="text-lg text-gray-400 font-normal">/mês</span>
                </div>
                <div className="text-sm text-purple-300 mb-2">
                  Economize 50%
                </div>
                <CardDescription className="text-gray-300">
                  Máximo valor
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-purple-400" />
                    <span>Tudo do plano Semestral</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-purple-400" />
                    <span>Consultoria 1:1 mensal</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-purple-400" />
                    <span>Acesso vitalício</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-purple-400" />
                    <span>Certificado de conclusão</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-purple-400" />
                    <span>Garantia de 30 dias</span>
                  </div>
                </div>
                <Button
                  onClick={() => handlePurchase('anual')}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 py-3 font-semibold"
                >
                  Escolher Anual
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Garantia e Benefícios */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="border-0 bg-white/5 backdrop-blur-xl shadow-xl">
              <CardContent className="text-center p-6">
                <Shield className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Garantia de 30 dias</h3>
                <p className="text-gray-300">
                  Não ficou satisfeita? Devolvemos 100% do seu dinheiro
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 bg-white/5 backdrop-blur-xl shadow-xl">
              <CardContent className="text-center p-6">
                <Sparkles className="w-12 h-12 text-teal-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Resultados comprovados</h3>
                <p className="text-gray-300">
                  95% das usuárias alcançam seus objetivos em 30 dias
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 bg-white/5 backdrop-blur-xl shadow-xl">
              <CardContent className="text-center p-6">
                <Heart className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Suporte especializado</h3>
                <p className="text-gray-300">
                  Equipe de nutricionistas e personal trainers à sua disposição
                </p>
              </CardContent>
            </Card>
          </div>

          {/* FAQ */}
          <Card className="border-0 bg-white/5 backdrop-blur-xl shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-white text-center">Perguntas Frequentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-emerald-400 mb-2">
                  Posso cancelar a qualquer momento?
                </h4>
                <p className="text-gray-300">
                  Sim! Você pode cancelar sua assinatura a qualquer momento sem taxas adicionais.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-teal-400 mb-2">
                  Como funciona a garantia?
                </h4>
                <p className="text-gray-300">
                  Se não ficar satisfeita nos primeiros 30 dias, devolvemos 100% do valor pago.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-cyan-400 mb-2">
                  Posso mudar de plano depois?
                </h4>
                <p className="text-gray-300">
                  Claro! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Resto das páginas permanecem iguais...
  return null
}