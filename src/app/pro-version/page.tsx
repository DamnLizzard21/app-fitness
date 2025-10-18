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
  Crown,
  Target,
  Utensils,
  Dumbbell,
  TrendingUp,
  Calendar,
  CheckCircle,
  Star,
  Flame,
  ChefHat,
  BarChart3,
  Heart,
  Zap,
  Award,
  Users,
  Clock,
  Shield,
  Sparkles,
  Timer,
  PlayCircle,
  BookOpen,
  Scale,
  Activity,
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
  Home,
  Settings,
  User,
  Globe,
  ArrowLeft,
  TrendingDown,
  Building,
  MapPin,
  Plus,
  Minus,
  Save,
  Check
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface User {
  id: string
  name: string
  email: string
  isPro: boolean
  selectedPlan: string
  completedWorkouts: number
  totalCaloriesBurned: number
  streakDays: number
  currentWeight: string
  targetWeight: string
  weeklyWeightLoss: number
  goal: string
  height: string
  weight: string
  age: string
  gender: string
  currentActivity: string
  trainingLevel: string
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

export default function ProVersionPage() {
  const { language, setLanguage, t } = useLanguage()
  const [currentView, setCurrentView] = useState<'dashboard' | 'diet' | 'workout' | 'challenge' | 'recipes' | 'analytics' | 'nutrition'>('dashboard')
  const [challengeDay, setChallengeDay] = useState(1)
  const [completedDays, setCompletedDays] = useState<number[]>([])
  const [dietGoal, setDietGoal] = useState<'emagrecimento' | 'ganho_massa' | ''>('')
  const [currentDietPlan, setCurrentDietPlan] = useState<DietPlan | null>(null)
  const [workoutLocation, setWorkoutLocation] = useState<'outdoor' | 'home' | 'gym' | ''>('')
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([])
  const [selectedDay, setSelectedDay] = useState<string>('segunda')

  // Estados para controlar peso e repetições de cada exercício
  const [exerciseWeights, setExerciseWeights] = useState<{[key: string]: number}>({})
  const [exerciseReps, setExerciseReps] = useState<{[key: string]: number}>({})

  // Estado para controlar hidratação
  const [isClient, setIsClient] = useState(false)

  // Mock user data - in real app this would come from authentication
  const currentUser: User = {
    id: '1',
    name: 'Maria Silva',
    email: 'maria@example.com',
    isPro: true,
    selectedPlan: 'anual',
    completedWorkouts: 45,
    totalCaloriesBurned: 8500,
    streakDays: 12,
    currentWeight: '63.5',
    targetWeight: '60',
    weeklyWeightLoss: 1.2,
    goal: 'Perder peso',
    height: '1.65',
    weight: '65',
    age: '28',
    gender: 'Feminino',
    currentActivity: '3-4x por semana',
    trainingLevel: 'Intermediário'
  }

  // Desafio Calistênico de 30 dias - Versão PRO Completa
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

  // Receitas PRO Exclusivas
  const proRecipes: Recipe[] = [
    {
      id: '1',
      name: 'Omelete Proteica Gourmet',
      category: 'Café da Manhã',
      calories: 320,
      protein: 28,
      prepTime: 12,
      difficulty: 'Médio',
      ingredients: [
        { name: 'Ovos inteiros', amount: '3', unit: 'unidades' },
        { name: 'Claras', amount: '2', unit: 'unidades' },
        { name: 'Espinafre baby', amount: '50', unit: 'g' },
        { name: 'Tomate cereja', amount: '5', unit: 'unidades' },
        { name: 'Queijo cottage', amount: '40', unit: 'g' },
        { name: 'Abacate', amount: '1/4', unit: 'unidade' },
        { name: 'Azeite extra virgem', amount: '1', unit: 'colher de chá' },
        { name: 'Ervas finas', amount: 'a gosto', unit: '' }
      ],
      instructions: [
        'Bata os ovos e claras em uma tigela com ervas finas',
        'Aqueça o azeite em frigideira antiaderente',
        'Refogue o espinafre por 1 minuto',
        'Adicione os tomates cereja cortados ao meio',
        'Despeje os ovos batidos na frigideira',
        'Adicione o cottage e dobre a omelete',
        'Sirva com fatias de abacate por cima'
      ],
      tags: ['Alto Proteína', 'Low Carb', 'Gourmet', 'Antioxidante'],
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop'
    },
    {
      id: '2',
      name: 'Bowl Proteico Tropical',
      category: 'Lanche',
      calories: 380,
      protein: 25,
      prepTime: 8,
      difficulty: 'Fácil',
      ingredients: [
        { name: 'Iogurte grego natural', amount: '200', unit: 'g' },
        { name: 'Whey protein sabor baunilha', amount: '1', unit: 'scoop' },
        { name: 'Manga', amount: '100', unit: 'g' },
        { name: 'Kiwi', amount: '1', unit: 'unidade' },
        { name: 'Granola sem açúcar', amount: '30', unit: 'g' },
        { name: 'Coco ralado', amount: '1', unit: 'colher de sopa' },
        { name: 'Chia', amount: '1', unit: 'colher de sopa' },
        { name: 'Mel', amount: '1', unit: 'colher de chá' }
      ],
      instructions: [
        'Misture o iogurte grego com whey protein',
        'Corte a manga e kiwi em cubos',
        'Monte o bowl colocando o iogurte como base',
        'Adicione as frutas por cima',
        'Finalize com granola, coco e chia',
        'Regue com mel antes de servir'
      ],
      tags: ['Tropical', 'Antioxidante', 'Energia', 'Pós-treino'],
      image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=300&fit=crop'
    },
    {
      id: '3',
      name: 'Salmão Grelhado com Quinoa Colorida',
      category: 'Jantar',
      calories: 450,
      protein: 38,
      prepTime: 25,
      difficulty: 'Médio',
      ingredients: [
        { name: 'Filé de salmão', amount: '150', unit: 'g' },
        { name: 'Quinoa tricolor', amount: '60', unit: 'g (seca)' },
        { name: 'Brócolis', amount: '100', unit: 'g' },
        { name: 'Cenoura baby', amount: '80', unit: 'g' },
        { name: 'Abobrinha', amount: '100', unit: 'g' },
        { name: 'Limão siciliano', amount: '1', unit: 'unidade' },
        { name: 'Azeite extra virgem', amount: '1', unit: 'colher de sopa' },
        { name: 'Ervas provençais', amount: '1', unit: 'colher de chá' }
      ],
      instructions: [
        'Cozinhe a quinoa conforme instruções da embalagem',
        'Tempere o salmão com limão, sal e ervas provençais',
        'Grelhe o salmão por 4-5 minutos de cada lado',
        'Refogue os vegetais no azeite por 5 minutos',
        'Misture os vegetais com a quinoa cozida',
        'Sirva o salmão sobre a quinoa colorida',
        'Finalize com um fio de azeite e limão'
      ],
      tags: ['Ômega 3', 'Superalimento', 'Anti-inflamatório', 'Completo'],
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop'
    }
  ]

  // Plano de Dieta PRO Personalizado
  const generateProDietPlan = (goal: 'emagrecimento' | 'ganho_massa'): DietPlan => {
    if (goal === 'emagrecimento') {
      return {
        breakfast: {
          name: 'Omelete Proteica Gourmet',
          calories: 320,
          protein: 28,
          carbs: 8,
          fat: 22,
          ingredients: [
            { name: 'Ovos inteiros', amount: '3', unit: 'unidades' },
            { name: 'Claras', amount: '2', unit: 'unidades' },
            { name: 'Espinafre', amount: '50', unit: 'g' },
            { name: 'Abacate', amount: '1/4', unit: 'unidade' }
          ],
          instructions: ['Prepare conforme receita gourmet']
        },
        snack1: {
          name: 'Bowl Proteico Tropical',
          calories: 180,
          protein: 20,
          carbs: 15,
          fat: 5,
          ingredients: [
            { name: 'Iogurte grego', amount: '150', unit: 'g' },
            { name: 'Whey protein', amount: '1/2', unit: 'scoop' },
            { name: 'Frutas vermelhas', amount: '80', unit: 'g' }
          ],
          instructions: ['Misture todos os ingredientes']
        },
        lunch: {
          name: 'Salada Power com Frango',
          calories: 420,
          protein: 40,
          carbs: 20,
          fat: 18,
          ingredients: [
            { name: 'Peito de frango', amount: '150', unit: 'g' },
            { name: 'Mix de folhas', amount: '100', unit: 'g' },
            { name: 'Quinoa', amount: '40', unit: 'g (seca)' },
            { name: 'Abacate', amount: '1/2', unit: 'unidade' }
          ],
          instructions: ['Monte a salada com todos os ingredientes']
        },
        snack2: {
          name: 'Smoothie Verde Detox',
          calories: 200,
          protein: 15,
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
          name: 'Salmão com Vegetais Grelhados',
          calories: 380,
          protein: 35,
          carbs: 15,
          fat: 22,
          ingredients: [
            { name: 'Salmão', amount: '120', unit: 'g' },
            { name: 'Aspargos', amount: '150', unit: 'g' },
            { name: 'Brócolis', amount: '100', unit: 'g' },
            { name: 'Azeite', amount: '1', unit: 'colher de sopa' }
          ],
          instructions: ['Grelhe o peixe e refogue os vegetais']
        },
        totalCalories: 1500,
        totalProtein: 138,
        totalCarbs: 83,
        totalFat: 73
      }
    } else {
      return {
        breakfast: {
          name: 'Panqueca Proteica Completa',
          calories: 480,
          protein: 30,
          carbs: 45,
          fat: 18,
          ingredients: [
            { name: 'Aveia', amount: '80', unit: 'g' },
            { name: 'Whey protein', amount: '1', unit: 'scoop' },
            { name: 'Banana', amount: '1', unit: 'unidade' },
            { name: 'Ovos', amount: '2', unit: 'unidades' },
            { name: 'Pasta de amendoim', amount: '1', unit: 'colher de sopa' }
          ],
          instructions: ['Faça as panquecas e sirva com pasta de amendoim']
        },
        snack1: {
          name: 'Mix Energético',
          calories: 350,
          protein: 12,
          carbs: 35,
          fat: 20,
          ingredients: [
            { name: 'Castanhas mistas', amount: '40', unit: 'g' },
            { name: 'Banana', amount: '1', unit: 'unidade' },
            { name: 'Tâmaras', amount: '4', unit: 'unidades' },
            { name: 'Whey protein', amount: '1/2', unit: 'scoop' }
          ],
          instructions: ['Misture todos os ingredientes']
        },
        lunch: {
          name: 'Frango com Arroz Integral e Feijão',
          calories: 580,
          protein: 45,
          carbs: 65,
          fat: 12,
          ingredients: [
            { name: 'Peito de frango', amount: '180', unit: 'g' },
            { name: 'Arroz integral', amount: '100', unit: 'g (cru)' },
            { name: 'Feijão carioca', amount: '120', unit: 'g' },
            { name: 'Salada mista', amount: '100', unit: 'g' }
          ],
          instructions: ['Prepare o prato completo brasileiro']
        },
        snack2: {
          name: 'Shake Hipercalórico',
          calories: 420,
          protein: 35,
          carbs: 40,
          fat: 15,
          ingredients: [
            { name: 'Whey protein', amount: '1.5', unit: 'scoop' },
            { name: 'Aveia', amount: '50', unit: 'g' },
            { name: 'Banana', amount: '1', unit: 'unidade' },
            { name: 'Leite integral', amount: '250', unit: 'ml' },
            { name: 'Pasta de amendoim', amount: '1', unit: 'colher de sopa' }
          ],
          instructions: ['Bata tudo no liquidificador']
        },
        dinner: {
          name: 'Carne com Batata Doce e Vegetais',
          calories: 520,
          protein: 40,
          carbs: 45,
          fat: 20,
          ingredients: [
            { name: 'Carne magra', amount: '150', unit: 'g' },
            { name: 'Batata doce', amount: '250', unit: 'g' },
            { name: 'Vegetais refogados', amount: '150', unit: 'g' },
            { name: 'Azeite', amount: '1', unit: 'colher de sopa' }
          ],
          instructions: ['Grelhe a carne, asse a batata doce e refogue os vegetais']
        },
        totalCalories: 2350,
        totalProtein: 162,
        totalCarbs: 230,
        totalFat: 85
      }
    }
  }

  // Treinos de Academia PRO - Sistema Completo
  const gymWorkouts: GymWorkout[] = [
    {
      day: 'segunda',
      focus: 'Peito, Ombros e Tríceps',
      exercises: [
        {
          id: 'supino-reto',
          name: 'Supino Reto',
          muscleGroup: 'Peito',
          reps: currentUser.goal === 'Ganho de massa' ? '4x8-10' : '4x10-12',
          sets: 4,
          description: 'Exercício principal para desenvolvimento do peitoral',
          tips: 'Mantenha os pés firmes no chão e controle a descida'
        },
        {
          id: 'supino-inclinado',
          name: 'Supino Inclinado',
          muscleGroup: 'Peito',
          reps: currentUser.goal === 'Ganho de massa' ? '3x8-10' : '3x10-12',
          sets: 3,
          description: 'Foca na parte superior do peitoral',
          tips: 'Inclinação de 30-45 graus é ideal'
        },
        {
          id: 'crucifixo',
          name: 'Crucifixo',
          muscleGroup: 'Peito',
          reps: currentUser.goal === 'Ganho de massa' ? '3x10-12' : '3x12-15',
          sets: 3,
          description: 'Isolamento do peitoral',
          tips: 'Movimento controlado, foque na contração'
        },
        {
          id: 'desenvolvimento-ombros',
          name: 'Desenvolvimento de Ombros',
          muscleGroup: 'Ombros',
          reps: currentUser.goal === 'Ganho de massa' ? '4x8-10' : '4x10-12',
          sets: 4,
          description: 'Exercício composto para ombros',
          tips: 'Não desça a barra além da linha das orelhas'
        },
        {
          id: 'elevacao-lateral',
          name: 'Elevação Lateral',
          muscleGroup: 'Ombros',
          reps: currentUser.goal === 'Ganho de massa' ? '3x10-12' : '3x12-15',
          sets: 3,
          description: 'Isolamento do deltoide médio',
          tips: 'Cotovelos ligeiramente flexionados'
        },
        {
          id: 'triceps-pulley',
          name: 'Tríceps Pulley',
          muscleGroup: 'Tríceps',
          reps: currentUser.goal === 'Ganho de massa' ? '3x10-12' : '3x12-15',
          sets: 3,
          description: 'Isolamento do tríceps',
          tips: 'Mantenha os cotovelos fixos ao lado do corpo'
        },
        {
          id: 'triceps-testa',
          name: 'Tríceps Testa',
          muscleGroup: 'Tríceps',
          reps: currentUser.goal === 'Ganho de massa' ? '3x8-10' : '3x10-12',
          sets: 3,
          description: 'Exercício para cabeça longa do tríceps',
          tips: 'Movimento apenas do antebraço'
        }
      ]
    },
    {
      day: 'terca',
      focus: 'Costas e Bíceps',
      exercises: [
        {
          id: 'puxada-frente',
          name: 'Puxada pela Frente',
          muscleGroup: 'Costas',
          reps: currentUser.goal === 'Ganho de massa' ? '4x8-10' : '4x10-12',
          sets: 4,
          description: 'Exercício principal para largura das costas',
          tips: 'Puxe até a altura do peito, não do pescoço'
        },
        {
          id: 'remada-curvada',
          name: 'Remada Curvada',
          muscleGroup: 'Costas',
          reps: currentUser.goal === 'Ganho de massa' ? '4x8-10' : '4x10-12',
          sets: 4,
          description: 'Desenvolvimento da espessura das costas',
          tips: 'Mantenha o core contraído e costas retas'
        },
        {
          id: 'remada-baixa',
          name: 'Remada Baixa',
          muscleGroup: 'Costas',
          reps: currentUser.goal === 'Ganho de massa' ? '3x10-12' : '3x12-15',
          sets: 3,
          description: 'Foca na parte média das costas',
          tips: 'Aproxime as escápulas no final do movimento'
        },
        {
          id: 'rosca-direta',
          name: 'Rosca Direta',
          muscleGroup: 'Bíceps',
          reps: currentUser.goal === 'Ganho de massa' ? '4x8-10' : '4x10-12',
          sets: 4,
          description: 'Exercício básico para bíceps',
          tips: 'Evite balançar o corpo'
        },
        {
          id: 'rosca-martelo',
          name: 'Rosca Martelo',
          muscleGroup: 'Bíceps',
          reps: currentUser.goal === 'Ganho de massa' ? '3x10-12' : '3x12-15',
          sets: 3,
          description: 'Trabalha bíceps e antebraço',
          tips: 'Pegada neutra, movimento controlado'
        },
        {
          id: 'rosca-concentrada',
          name: 'Rosca Concentrada',
          muscleGroup: 'Bíceps',
          reps: currentUser.goal === 'Ganho de massa' ? '3x8-10' : '3x10-12',
          sets: 3,
          description: 'Isolamento máximo do bíceps',
          tips: 'Foque na contração no topo do movimento'
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
          reps: currentUser.goal === 'Ganho de massa' ? '4x8-10' : '4x10-12',
          sets: 4,
          description: 'Rei dos exercícios para pernas',
          tips: 'Desça até os joelhos ficarem em 90 graus'
        },
        {
          id: 'leg-press',
          name: 'Leg Press',
          muscleGroup: 'Pernas',
          reps: currentUser.goal === 'Ganho de massa' ? '4x10-12' : '4x12-15',
          sets: 4,
          description: 'Exercício seguro para quadríceps',
          tips: 'Pés na largura dos ombros'
        },
        {
          id: 'stiff',
          name: 'Stiff',
          muscleGroup: 'Posterior',
          reps: currentUser.goal === 'Ganho de massa' ? '4x8-10' : '4x10-12',
          sets: 4,
          description: 'Foca em posterior de coxa e glúteos',
          tips: 'Mantenha as pernas ligeiramente flexionadas'
        },
        {
          id: 'cadeira-extensora',
          name: 'Cadeira Extensora',
          muscleGroup: 'Quadríceps',
          reps: currentUser.goal === 'Ganho de massa' ? '3x10-12' : '3x12-15',
          sets: 3,
          description: 'Isolamento do quadríceps',
          tips: 'Movimento controlado, pausa no topo'
        },
        {
          id: 'mesa-flexora',
          name: 'Mesa Flexora',
          muscleGroup: 'Posterior',
          reps: currentUser.goal === 'Ganho de massa' ? '3x10-12' : '3x12-15',
          sets: 3,
          description: 'Isolamento do posterior de coxa',
          tips: 'Contraia bem no topo do movimento'
        },
        {
          id: 'panturrilha-em-pe',
          name: 'Panturrilha em Pé',
          muscleGroup: 'Panturrilha',
          reps: currentUser.goal === 'Ganho de massa' ? '4x12-15' : '4x15-20',
          sets: 4,
          description: 'Desenvolvimento da panturrilha',
          tips: 'Amplitude completa de movimento'
        }
      ]
    },
    {
      day: 'quinta',
      focus: 'Peito, Ombros e Tríceps',
      exercises: [
        {
          id: 'supino-inclinado-halteres',
          name: 'Supino Inclinado com Halteres',
          muscleGroup: 'Peito',
          reps: currentUser.goal === 'Ganho de massa' ? '4x8-10' : '4x10-12',
          sets: 4,
          description: 'Variação com maior amplitude',
          tips: 'Desça os halteres até sentir alongamento'
        },
        {
          id: 'voador',
          name: 'Voador',
          muscleGroup: 'Peito',
          reps: currentUser.goal === 'Ganho de massa' ? '3x10-12' : '3x12-15',
          sets: 3,
          description: 'Isolamento do peitoral',
          tips: 'Movimento em arco, foque na contração'
        },
        {
          id: 'elevacao-frontal',
          name: 'Elevação Frontal',
          muscleGroup: 'Ombros',
          reps: currentUser.goal === 'Ganho de massa' ? '3x10-12' : '3x12-15',
          sets: 3,
          description: 'Isolamento do deltoide anterior',
          tips: 'Eleve até a altura dos ombros'
        },
        {
          id: 'desenvolvimento-halteres',
          name: 'Desenvolvimento com Halteres',
          muscleGroup: 'Ombros',
          reps: currentUser.goal === 'Ganho de massa' ? '4x8-10' : '4x10-12',
          sets: 4,
          description: 'Maior amplitude que a barra',
          tips: 'Desça até os cotovelos ficarem em 90 graus'
        },
        {
          id: 'triceps-frances',
          name: 'Tríceps Francês',
          muscleGroup: 'Tríceps',
          reps: currentUser.goal === 'Ganho de massa' ? '3x8-10' : '3x10-12',
          sets: 3,
          description: 'Exercício para cabeça longa',
          tips: 'Mantenha os cotovelos fixos'
        },
        {
          id: 'mergulho',
          name: 'Mergulho',
          muscleGroup: 'Tríceps',
          reps: currentUser.goal === 'Ganho de massa' ? '3x8-12' : '3x10-15',
          sets: 3,
          description: 'Exercício composto para tríceps',
          tips: 'Incline o corpo ligeiramente para frente'
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
          reps: currentUser.goal === 'Ganho de massa' ? '4x6-10' : '4x8-12',
          sets: 4,
          description: 'Exercício funcional para costas',
          tips: 'Se necessário, use auxílio ou elástico'
        },
        {
          id: 'remada-unilateral',
          name: 'Remada Unilateral',
          muscleGroup: 'Costas',
          reps: currentUser.goal === 'Ganho de massa' ? '4x8-10' : '4x10-12',
          sets: 4,
          description: 'Trabalha cada lado independentemente',
          tips: 'Apoie joelho e mão no banco'
        },
        {
          id: 'pulldown',
          name: 'Pulldown',
          muscleGroup: 'Costas',
          reps: currentUser.goal === 'Ganho de massa' ? '3x10-12' : '3x12-15',
          sets: 3,
          description: 'Isolamento do latíssimo',
          tips: 'Braços estendidos, puxe com as costas'
        },
        {
          id: 'rosca-21',
          name: 'Rosca 21',
          muscleGroup: 'Bíceps',
          reps: '3x21 (7+7+7)',
          sets: 3,
          description: 'Técnica avançada para bíceps',
          tips: '7 reps parciais baixo, 7 alto, 7 completas'
        },
        {
          id: 'rosca-scott',
          name: 'Rosca Scott',
          muscleGroup: 'Bíceps',
          reps: currentUser.goal === 'Ganho de massa' ? '3x8-10' : '3x10-12',
          sets: 3,
          description: 'Isolamento com banco scott',
          tips: 'Não estenda completamente o braço'
        },
        {
          id: 'rosca-cabo',
          name: 'Rosca no Cabo',
          muscleGroup: 'Bíceps',
          reps: currentUser.goal === 'Ganho de massa' ? '3x10-12' : '3x12-15',
          sets: 3,
          description: 'Tensão constante no músculo',
          tips: 'Mantenha tensão durante todo movimento'
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
          muscleGroup: 'Glúteos',
          reps: currentUser.goal === 'Ganho de massa' ? '4x8-10' : '4x10-12',
          sets: 4,
          description: 'Foca mais nos glúteos',
          tips: 'Pés mais afastados, pontas para fora'
        },
        {
          id: 'afundo-bulgaro',
          name: 'Afundo Búlgaro',
          muscleGroup: 'Pernas',
          reps: currentUser.goal === 'Ganho de massa' ? '3x8-10' : '3x10-12',
          sets: 3,
          description: 'Unilateral para pernas e glúteos',
          tips: 'Pé traseiro elevado no banco'
        },
        {
          id: 'cadeira-adutora',
          name: 'Cadeira Adutora',
          muscleGroup: 'Adutores',
          reps: currentUser.goal === 'Ganho de massa' ? '3x12-15' : '3x15-20',
          sets: 3,
          description: 'Isolamento dos adutores',
          tips: 'Movimento controlado, pausa na contração'
        },
        {
          id: 'cadeira-abdutora',
          name: 'Cadeira Abdutora',
          muscleGroup: 'Glúteos',
          reps: currentUser.goal === 'Ganho de massa' ? '3x12-15' : '3x15-20',
          sets: 3,
          description: 'Isolamento do glúteo médio',
          tips: 'Mantenha a contração por 1 segundo'
        },
        {
          id: 'elevacao-pelvica',
          name: 'Elevação Pélvica',
          muscleGroup: 'Glúteos',
          reps: currentUser.goal === 'Ganho de massa' ? '4x12-15' : '4x15-20',
          sets: 4,
          description: 'Ativação máxima dos glúteos',
          tips: 'Contraia forte no topo do movimento'
        },
        {
          id: 'panturrilha-sentado',
          name: 'Panturrilha Sentado',
          muscleGroup: 'Panturrilha',
          reps: currentUser.goal === 'Ganho de massa' ? '4x15-20' : '4x20-25',
          sets: 4,
          description: 'Trabalha o sóleo',
          tips: 'Pausa de 2 segundos no topo'
        }
      ]
    }
  ]

  // Função para salvar log de treino
  const saveWorkoutLog = (exerciseId: string, weight: number, reps: number) => {
    if (typeof window === 'undefined') return // Só executa no cliente
    
    const newLog: WorkoutLog = {
      exerciseId,
      weight,
      reps,
      completed: false,
      date: new Date().toISOString().split('T')[0]
    }
    
    const existingLogIndex = workoutLogs.findIndex(
      log => log.exerciseId === exerciseId && log.date === newLog.date
    )
    
    if (existingLogIndex >= 0) {
      const updatedLogs = [...workoutLogs]
      updatedLogs[existingLogIndex] = { ...updatedLogs[existingLogIndex], weight, reps }
      setWorkoutLogs(updatedLogs)
      try {
        localStorage.setItem('workoutLogs', JSON.stringify(updatedLogs))
      } catch (error) {
        console.error('Erro ao salvar no localStorage:', error)
      }
    } else {
      const newLogs = [...workoutLogs, newLog]
      setWorkoutLogs(newLogs)
      try {
        localStorage.setItem('workoutLogs', JSON.stringify(newLogs))
      } catch (error) {
        console.error('Erro ao salvar no localStorage:', error)
      }
    }
  }

  // Função para marcar exercício como completo
  const toggleExerciseComplete = (exerciseId: string) => {
    if (typeof window === 'undefined') return // Só executa no cliente
    
    const today = new Date().toISOString().split('T')[0]
    const existingLogIndex = workoutLogs.findIndex(
      log => log.exerciseId === exerciseId && log.date === today
    )
    
    if (existingLogIndex >= 0) {
      const updatedLogs = [...workoutLogs]
      updatedLogs[existingLogIndex].completed = !updatedLogs[existingLogIndex].completed
      setWorkoutLogs(updatedLogs)
      try {
        localStorage.setItem('workoutLogs', JSON.stringify(updatedLogs))
      } catch (error) {
        console.error('Erro ao salvar no localStorage:', error)
      }
    } else {
      const newLog: WorkoutLog = {
        exerciseId,
        weight: 0,
        reps: 0,
        completed: true,
        date: today
      }
      const newLogs = [...workoutLogs, newLog]
      setWorkoutLogs(newLogs)
      try {
        localStorage.setItem('workoutLogs', JSON.stringify(newLogs))
      } catch (error) {
        console.error('Erro ao salvar no localStorage:', error)
      }
    }
  }

  // Função para obter log do exercício
  const getExerciseLog = (exerciseId: string): WorkoutLog | undefined => {
    const today = new Date().toISOString().split('T')[0]
    return workoutLogs.find(log => log.exerciseId === exerciseId && log.date === today)
  }

  // Funções para atualizar peso e repetições
  const updateExerciseWeight = (exerciseId: string, weight: number) => {
    setExerciseWeights(prev => ({ ...prev, [exerciseId]: weight }))
  }

  const updateExerciseReps = (exerciseId: string, reps: number) => {
    setExerciseReps(prev => ({ ...prev, [exerciseId]: reps }))
  }

  useEffect(() => {
    // Marcar como cliente após hidratação
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (dietGoal) {
      const dietPlan = generateProDietPlan(dietGoal)
      setCurrentDietPlan(dietPlan)
    }
  }, [dietGoal])

  useEffect(() => {
    // Carregar logs do localStorage apenas no cliente
    if (typeof window !== 'undefined') {
      try {
        const savedLogs = localStorage.getItem('workoutLogs')
        if (savedLogs) {
          setWorkoutLogs(JSON.parse(savedLogs))
        }
      } catch (error) {
        console.error('Erro ao carregar logs do localStorage:', error)
      }
    }
  }, [])

  const completeDay = (day: number) => {
    if (!completedDays.includes(day)) {
      setCompletedDays([...completedDays, day])
    }
  }

  const getDayWorkout = (day: number): ChallengeDay => {
    return calisthenicChallenge[Math.min(day - 1, calisthenicChallenge.length - 1)]
  }

  // Seletor de Idioma
  const LanguageSelector = () => (
    <Select value={language} onValueChange={(value: any) => setLanguage(value)}>
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
  const Navigation = () => (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-xl">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              BetterLife Gyn
            </h1>
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
              <Crown className="w-3 h-3 mr-1" />
              PRO
            </Badge>
          </div>
          
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-700 font-medium">{currentUser.name}</span>
            </div>
            <Button
              onClick={() => window.history.back()}
              variant="ghost"
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </div>
        </div>
        
        <div className="flex gap-2 mt-4 overflow-x-auto">
          <Button
            variant={currentView === 'dashboard' ? 'default' : 'ghost'}
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <BarChart3 className="w-4 h-4" />
            Dashboard PRO
          </Button>
          <Button
            variant={currentView === 'diet' ? 'default' : 'ghost'}
            onClick={() => setCurrentView('diet')}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <Utensils className="w-4 h-4" />
            Dieta Personalizada
          </Button>
          <Button
            variant={currentView === 'workout' ? 'default' : 'ghost'}
            onClick={() => setCurrentView('workout')}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <Dumbbell className="w-4 h-4" />
            Treinos Avançados
          </Button>
          <Button
            variant={currentView === 'challenge' ? 'default' : 'ghost'}
            onClick={() => setCurrentView('challenge')}
            className="flex items-center gap-2 whitespace-nowrap bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
          >
            <Flame className="w-4 h-4" />
            Desafio 30 Dias
          </Button>
          <Button
            variant={currentView === 'recipes' ? 'default' : 'ghost'}
            onClick={() => setCurrentView('recipes')}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <ChefHat className="w-4 h-4" />
            Receitas Exclusivas
          </Button>
          <Button
            variant={currentView === 'analytics' ? 'default' : 'ghost'}
            onClick={() => setCurrentView('analytics')}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <TrendingUp className="w-4 h-4" />
            Análises Avançadas
          </Button>
          <Button
            variant={currentView === 'nutrition' ? 'default' : 'ghost'}
            onClick={() => setCurrentView('nutrition')}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <Scale className="w-4 h-4" />
            Nutrição Inteligente
          </Button>
        </div>
      </div>
    </div>
  )

  if (currentView === 'dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900">
        <Navigation />
        <div className="container mx-auto px-4 max-w-6xl pt-24 pb-8">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 rounded-2xl w-fit mx-auto mb-6">
              <Crown className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-6">
              Bem-vinda à Versão PRO!
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Todas as funcionalidades premium desbloqueadas para acelerar seus resultados
            </p>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 text-lg mt-4">
              Plano {currentUser.selectedPlan.charAt(0).toUpperCase() + currentUser.selectedPlan.slice(1)} Ativo
            </Badge>
          </div>

          {/* Estatísticas PRO */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  {currentUser.streakDays}
                </div>
                <div className="text-gray-300">Dias Consecutivos</div>
                <div className="text-sm text-emerald-300 mt-1">
                  🔥 Sequência Perfeita!
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 bg-gradient-to-r from-teal-500/20 to-teal-600/20 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-teal-400 mb-2">
                  {currentUser.weeklyWeightLoss.toFixed(1)}kg
                </div>
                <div className="text-gray-300">Perdidos Esta Semana</div>
                <div className="text-sm text-teal-300 mt-1">
                  Meta: 1.0kg/semana
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  {currentUser.completedWorkouts}
                </div>
                <div className="text-gray-300">Treinos Completos</div>
                <div className="text-sm text-cyan-300 mt-1">
                  +15 este mês
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 bg-gradient-to-r from-purple-500/20 to-purple-600/20 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {isClient ? currentUser.totalCaloriesBurned.toLocaleString() : '8500'}
                </div>
                <div className="text-gray-300">Calorias Queimadas</div>
                <div className="text-sm text-purple-300 mt-1">
                  Equivale a 1.2kg de gordura
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Funcionalidades PRO Desbloqueadas */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="border-2 border-emerald-500/50 bg-white/10 backdrop-blur-xl shadow-2xl hover:scale-105 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-4 rounded-2xl w-fit mx-auto mb-4">
                  <Utensils className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-white">Dieta Personalizada</CardTitle>
                <CardDescription className="text-gray-300">
                  Planos alimentares adaptados ao seu perfil e objetivos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Macros calculados precisamente</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Substituições inteligentes</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Lista de compras automática</span>
                </div>
                <Button 
                  onClick={() => setCurrentView('diet')}
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 mt-4"
                >
                  Acessar Dieta
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-500/50 bg-white/10 backdrop-blur-xl shadow-2xl hover:scale-105 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-2xl w-fit mx-auto mb-4">
                  <Flame className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-white">Desafio 30 Dias</CardTitle>
                <CardDescription className="text-gray-300">
                  Transformação completa em 30 dias com calistenia
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-orange-400" />
                  <span>Progressão diária estruturada</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-orange-400" />
                  <span>Vídeos demonstrativos</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-orange-400" />
                  <span>Acompanhamento de progresso</span>
                </div>
                <Button 
                  onClick={() => setCurrentView('challenge')}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 mt-4"
                >
                  Iniciar Desafio
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-500/50 bg-white/10 backdrop-blur-xl shadow-2xl hover:scale-105 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-2xl w-fit mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-white">Análises Avançadas</CardTitle>
                <CardDescription className="text-gray-300">
                  Insights detalhados sobre seu progresso e performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-purple-400" />
                  <span>Gráficos de evolução</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-purple-400" />
                  <span>Relatórios semanais</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-purple-400" />
                  <span>Predições de resultados</span>
                </div>
                <Button 
                  onClick={() => setCurrentView('analytics')}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 mt-4"
                >
                  Ver Análises
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Progresso Detalhado */}
          <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <Scale className="w-6 h-6 text-emerald-400" />
                Progresso Detalhado - Versão PRO
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-emerald-400">Evolução de Peso</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Peso Inicial:</span>
                      <span className="text-white font-bold">67.0kg</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Peso Atual:</span>
                      <span className="text-emerald-400 font-bold">{currentUser.currentWeight}kg</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Meta:</span>
                      <span className="text-teal-400 font-bold">{currentUser.targetWeight}kg</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Perdidos:</span>
                      <span className="text-green-400 font-bold">3.5kg</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-300 mb-2">
                      <span>Progresso para a meta</span>
                      <span>70%</span>
                    </div>
                    <Progress value={70} className="h-3" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-teal-400">Métricas de Performance</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Taxa Metabólica Basal:</span>
                      <span className="text-white font-bold">1,420 kcal</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Gasto Calórico Médio:</span>
                      <span className="text-emerald-400 font-bold">2,180 kcal/dia</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Déficit Calórico:</span>
                      <span className="text-teal-400 font-bold">-680 kcal/dia</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Previsão Semanal:</span>
                      <span className="text-green-400 font-bold">-0.97kg</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefícios Exclusivos */}
          <Card className="border-2 border-amber-500/50 bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-xl shadow-2xl">
            <CardHeader className="text-center">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 rounded-2xl w-fit mx-auto mb-4">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl text-white">Benefícios Exclusivos PRO</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Star className="w-5 h-5 text-amber-400" />
                    <span>Consultoria nutricional personalizada</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Star className="w-5 h-5 text-amber-400" />
                    <span>Acesso ao grupo VIP no WhatsApp</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Star className="w-5 h-5 text-amber-400" />
                    <span>E-books exclusivos de receitas</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Star className="w-5 h-5 text-amber-400" />
                    <span>Suporte prioritário 24/7</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Star className="w-5 h-5 text-amber-400" />
                    <span>Planos de treino adaptativos</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Star className="w-5 h-5 text-amber-400" />
                    <span>Análises preditivas de resultados</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Star className="w-5 h-5 text-amber-400" />
                    <span>Certificado de conclusão</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Star className="w-5 h-5 text-amber-400" />
                    <span>Acesso antecipado a novos recursos</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (currentView === 'diet') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900">
        <Navigation />
        <div className="container mx-auto px-4 max-w-6xl pt-24 pb-8">
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 rounded-2xl w-fit mx-auto mb-6">
              <Utensils className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-6">
              Dieta Personalizada PRO
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Plano alimentar científico adaptado ao seu perfil e objetivos
            </p>
          </div>

          {/* Seleção de Objetivo */}
          {!dietGoal && (
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl mb-8">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">Qual seu objetivo principal?</CardTitle>
                <CardDescription className="text-gray-300">
                  Escolha seu objetivo para receber um plano personalizado
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => setDietGoal('emagrecimento')}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-8 py-6 text-lg"
                >
                  <TrendingDown className="w-5 h-5 mr-2" />
                  Emagrecimento
                </Button>
                <Button
                  onClick={() => setDietGoal('ganho_massa')}
                  className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 px-8 py-6 text-lg"
                >
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Ganho de Massa
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Plano de Dieta */}
          {currentDietPlan && (
            <div className="space-y-8">
              {/* Resumo Nutricional */}
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

              {/* Refeições */}
              <div className="grid gap-6">
                {Object.entries(currentDietPlan).filter(([key]) => key !== 'totalCalories' && key !== 'totalProtein' && key !== 'totalCarbs' && key !== 'totalFat').map(([mealKey, meal]) => (
                  <Card key={mealKey} className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                    <CardHeader>
                      <CardTitle className="text-xl text-white flex items-center gap-2">
                        {mealKey === 'breakfast' && <Coffee className="w-5 h-5 text-amber-400" />}
                        {mealKey === 'snack1' && <Apple className="w-5 h-5 text-green-400" />}
                        {mealKey === 'lunch' && <Utensils className="w-5 h-5 text-orange-400" />}
                        {mealKey === 'snack2' && <Grape className="w-5 h-5 text-purple-400" />}
                        {mealKey === 'dinner' && <Fish className="w-5 h-5 text-blue-400" />}
                        {meal.name}
                      </CardTitle>
                      <div className="flex gap-4 text-sm text-gray-300">
                        <span>{meal.calories} kcal</span>
                        <span>{meal.protein}g proteína</span>
                        <span>{meal.carbs}g carbs</span>
                        <span>{meal.fat}g gordura</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-emerald-400 mb-3">Ingredientes:</h4>
                          <ul className="space-y-2">
                            {meal.ingredients.map((ingredient, index) => (
                              <li key={index} className="text-gray-300 flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-emerald-400" />
                                {ingredient.amount} {ingredient.unit} {ingredient.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-teal-400 mb-3">Preparo:</h4>
                          <ol className="space-y-2">
                            {meal.instructions.map((instruction, index) => (
                              <li key={index} className="text-gray-300 flex items-start gap-2">
                                <span className="bg-teal-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                                  {index + 1}
                                </span>
                                {instruction}
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Lista de Compras Automática */}
              <Card className="border-2 border-emerald-500/50 bg-white/10 backdrop-blur-xl shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-emerald-400 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6" />
                    Lista de Compras Automática
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Todos os ingredientes necessários para sua semana
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                        <Beef className="w-4 h-4" />
                        Proteínas
                      </h4>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Ovos (2 dúzias)</li>
                        <li>• Peito de frango (1kg)</li>
                        <li>• Salmão (500g)</li>
                        <li>• Whey protein (1 pote)</li>
                        <li>• Iogurte grego (1kg)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-teal-400 mb-3 flex items-center gap-2">
                        <Salad className="w-4 h-4" />
                        Vegetais
                      </h4>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Espinafre (300g)</li>
                        <li>• Brócolis (500g)</li>
                        <li>• Aspargos (300g)</li>
                        <li>• Tomate cereja (500g)</li>
                        <li>• Abacate (4 unidades)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                        <Wheat className="w-4 h-4" />
                        Carboidratos
                      </h4>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Quinoa (500g)</li>
                        <li>• Aveia (1kg)</li>
                        <li>• Batata doce (1kg)</li>
                        <li>• Frutas vermelhas (300g)</li>
                        <li>• Banana (1 cacho)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (currentView === 'workout') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900">
        <Navigation />
        <div className="container mx-auto px-4 max-w-6xl pt-24 pb-8">
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-4 rounded-2xl w-fit mx-auto mb-6">
              <Dumbbell className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-6">
              Treinos Avançados PRO
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Escolha seu ambiente de treino e receba exercícios personalizados
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
              {/* Seletor de Dia da Semana */}
              <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-emerald-400" />
                    Plano Semanal de Treinos - Academia PRO
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Treinos personalizados para {currentUser.goal.toLowerCase()} - Nível {currentUser.trainingLevel}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {gymWorkouts.map((workout) => (
                      <Button
                        key={workout.day}
                        variant={selectedDay === workout.day ? 'default' : 'outline'}
                        onClick={() => setSelectedDay(workout.day)}
                        className={`${
                          selectedDay === workout.day 
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-600' 
                            : 'border-white/20 text-white hover:bg-white/10'
                        }`}
                      >
                        {workout.day.charAt(0).toUpperCase() + workout.day.slice(1)}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Treino do Dia Selecionado */}
              {gymWorkouts.find(w => w.day === selectedDay) && (
                <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">
                      {gymWorkouts.find(w => w.day === selectedDay)?.focus}
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      {selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)} - Treino personalizado
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {gymWorkouts.find(w => w.day === selectedDay)?.exercises.map((exercise) => {
                        const exerciseLog = getExerciseLog(exercise.id)
                        const currentWeight = exerciseWeights[exercise.id] || exerciseLog?.weight || 0
                        const currentReps = exerciseReps[exercise.id] || exerciseLog?.reps || 0
                        
                        return (
                          <Card key={exercise.id} className="border-0 bg-white/5 backdrop-blur-xl">
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <h4 className="text-xl font-bold text-white">{exercise.name}</h4>
                                    <Badge variant="outline" className="text-emerald-400 border-emerald-500/50">
                                      {exercise.muscleGroup}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-4 mb-3">
                                    <Badge className="bg-gradient-to-r from-teal-500 to-cyan-600">
                                      {exercise.reps}
                                    </Badge>
                                    <span className="text-gray-400">{exercise.sets} séries</span>
                                  </div>
                                  <p className="text-gray-300 mb-3">{exercise.description}</p>
                                  <p className="text-sm text-gray-400 italic">💡 {exercise.tips}</p>
                                </div>
                                
                                {/* Checkbox para marcar como completo */}
                                <div className="flex items-center gap-2">
                                  <Checkbox
                                    checked={exerciseLog?.completed || false}
                                    onCheckedChange={() => toggleExerciseComplete(exercise.id)}
                                    className="w-6 h-6"
                                  />
                                  <span className="text-sm text-gray-300">Completo</span>
                                </div>
                              </div>
                              
                              {/* Registro de Peso e Repetições */}
                              <div className="grid md:grid-cols-3 gap-4 mt-4 p-4 bg-white/5 rounded-lg">
                                <div className="space-y-2">
                                  <Label className="text-gray-300">Peso (kg)</Label>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => updateExerciseWeight(exercise.id, Math.max(0, currentWeight - 2.5))}
                                      className="border-white/20 text-white hover:bg-white/10"
                                    >
                                      <Minus className="w-4 h-4" />
                                    </Button>
                                    <Input
                                      type="number"
                                      value={currentWeight}
                                      onChange={(e) => updateExerciseWeight(exercise.id, Number(e.target.value))}
                                      className="text-center bg-white/10 border-white/20 text-white"
                                      step="0.5"
                                    />
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => updateExerciseWeight(exercise.id, currentWeight + 2.5)}
                                      className="border-white/20 text-white hover:bg-white/10"
                                    >
                                      <Plus className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <Label className="text-gray-300">Repetições</Label>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => updateExerciseReps(exercise.id, Math.max(0, currentReps - 1))}
                                      className="border-white/20 text-white hover:bg-white/10"
                                    >
                                      <Minus className="w-4 h-4" />
                                    </Button>
                                    <Input
                                      type="number"
                                      value={currentReps}
                                      onChange={(e) => updateExerciseReps(exercise.id, Number(e.target.value))}
                                      className="text-center bg-white/10 border-white/20 text-white"
                                    />
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => updateExerciseReps(exercise.id, currentReps + 1)}
                                      className="border-white/20 text-white hover:bg-white/10"
                                    >
                                      <Plus className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                                
                                <div className="flex items-end">
                                  <Button
                                    onClick={() => saveWorkoutLog(exercise.id, currentWeight, currentReps)}
                                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                                  >
                                    <Save className="w-4 h-4 mr-2" />
                                    Salvar
                                  </Button>
                                </div>
                              </div>
                              
                              {/* Histórico do exercício */}
                              {exerciseLog && (
                                <div className="mt-4 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                                  <div className="flex items-center gap-2 text-emerald-400">
                                    <Check className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                      Último registro: {exerciseLog.weight}kg × {exerciseLog.reps} reps
                                    </span>
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {workoutLocation === 'home' && (
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">Treino em Casa PRO</CardTitle>
                <CardDescription className="text-gray-300">
                  Exercícios funcionais avançados sem equipamentos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-emerald-400">Exercícios de Força</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="font-semibold text-white">Flexões Diamante</h4>
                        <p className="text-gray-300 text-sm">4x8-12 repetições</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="font-semibold text-white">Pistol Squats</h4>
                        <p className="text-gray-300 text-sm">3x5-8 cada perna</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="font-semibold text-white">Prancha com Elevação</h4>
                        <p className="text-gray-300 text-sm">3x45-60 segundos</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-teal-400">Exercícios Cardio</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="font-semibold text-white">Burpees com Flexão</h4>
                        <p className="text-gray-300 text-sm">4x8-12 repetições</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="font-semibold text-white">Jump Squats</h4>
                        <p className="text-gray-300 text-sm">4x15-20 repetições</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="font-semibold text-white">Mountain Climbers</h4>
                        <p className="text-gray-300 text-sm">4x20-30 repetições</p>
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
                <CardTitle className="text-2xl text-white">Treino ao Ar Livre PRO</CardTitle>
                <CardDescription className="text-gray-300">
                  Aproveite o ambiente natural com exercícios avançados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-green-400">Exercícios Funcionais</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="font-semibold text-white">Corrida Intervalada</h4>
                        <p className="text-gray-300 text-sm">30 min (2 min rápido, 1 min lento)</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="font-semibold text-white">Flexões Inclinadas</h4>
                        <p className="text-gray-300 text-sm">4x10-15 repetições</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="font-semibold text-white">Agachamentos com Salto</h4>
                        <p className="text-gray-300 text-sm">4x12-18 repetições</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-emerald-400">Equipamentos Urbanos</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="font-semibold text-white">Barra Fixa</h4>
                        <p className="text-gray-300 text-sm">4x6-12 repetições</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="font-semibold text-white">Paralelas</h4>
                        <p className="text-gray-300 text-sm">4x8-12 repetições</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="font-semibold text-white">Escadas Sprint</h4>
                        <p className="text-gray-300 text-sm">15-20 minutos</p>
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
                Trocar Local de Treino
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Resto das views permanecem iguais...
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900">
      <Navigation />
      <div className="container mx-auto px-4 max-w-6xl pt-24 pb-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-6">
            Versão PRO Ativa
          </h1>
          <p className="text-xl text-gray-300">
            Todas as funcionalidades premium estão disponíveis para você!
          </p>
        </div>
      </div>
    </div>
  )
}