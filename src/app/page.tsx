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
  Languages
} from 'lucide-react'

import { Language, useTranslation } from '@/lib/i18n'

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

export default function BetterLifeGyn() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('pt')
  const { t } = useTranslation(currentLanguage)
  
  const [currentStep, setCurrentStep] = useState<'home' | 'login' | 'register' | 'questionnaire' | 'assessment' | 'pro' | 'free' | 'dashboard' | 'diet' | 'workout' | 'products' | 'progress' | 'purchased' | 'challenge' | 'recipes' | 'admin' | 'account'>('home')
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

  // Language Selector Component
  const LanguageSelector = () => (
    <div className="relative">
      <Select value={currentLanguage} onValueChange={(value: Language) => setCurrentLanguage(value)}>
        <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4" />
            <SelectValue />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-slate-800 border-slate-700">
          <SelectItem value="pt" className="text-white hover:bg-slate-700">
            🇧🇷 {t('portuguese')}
          </SelectItem>
          <SelectItem value="en" className="text-white hover:bg-slate-700">
            🇺🇸 {t('english')}
          </SelectItem>
          <SelectItem value="es" className="text-white hover:bg-slate-700">
            🇪🇸 {t('spanish')}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )

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

  const questions = [
    {
      id: 'height',
      title: t('height'),
      type: 'input',
      placeholder: 'Ex: 1.75',
      icon: User
    },
    {
      id: 'weight',
      title: t('weight'),
      type: 'input',
      placeholder: 'Ex: 70',
      icon: Target
    },
    {
      id: 'age',
      title: t('age'),
      type: 'input',
      placeholder: 'Ex: 25',
      icon: User
    },
    {
      id: 'gender',
      title: t('gender'),
      type: 'select',
      options: ['Masculino', 'Feminino', 'Outro'],
      icon: User
    },
    {
      id: 'goal',
      title: t('goal'),
      type: 'select',
      options: [t('loseWeight'), t('gainMuscle'), t('maintainWeight'), t('improveConditioning')],
      icon: Target
    },
    {
      id: 'currentActivity',
      title: t('currentActivity'),
      type: 'select',
      options: [t('sedentary'), '1-2x por semana', '3-4x por semana', '5-6x por semana', 'Todos os dias'],
      icon: Activity
    },
    {
      id: 'trainingLevel',
      title: t('trainingLevel'),
      type: 'select',
      options: [t('beginner'), t('intermediate'), t('advanced'), t('athlete')],
      icon: Dumbbell
    },
    {
      id: 'sleepHours',
      title: t('sleepHours'),
      type: 'select',
      options: ['Menos de 5h', '5-6h', '7-8h', '9h ou mais'],
      icon: Moon
    },
    {
      id: 'workType',
      title: t('workType'),
      type: 'select',
      options: ['Sedentário (escritório)', 'Moderadamente ativo', 'Muito ativo (físico)', 'Trabalho em casa'],
      icon: Briefcase
    },
    {
      id: 'stressLevel',
      title: t('stressLevel'),
      type: 'select',
      options: ['Baixo', 'Moderado', 'Alto', 'Muito alto'],
      icon: TrendingUp
    },
    {
      id: 'waterIntake',
      title: t('waterIntake'),
      type: 'select',
      options: ['Menos de 1L', '1-2L', '2-3L', 'Mais de 3L'],
      icon: Activity
    },
    {
      id: 'mealFrequency',
      title: t('mealFrequency'),
      type: 'select',
      options: ['1-2 refeições', '3 refeições', '4-5 refeições', '6 ou mais refeições'],
      icon: Utensils
    },
    {
      id: 'dietRestrictions',
      title: t('dietRestrictions'),
      type: 'textarea',
      placeholder: 'Ex: vegetariano, intolerância à lactose, etc.',
      icon: Utensils
    },
    {
      id: 'supplementUse',
      title: t('supplementUse'),
      type: 'select',
      options: ['Não uso', 'Whey protein', 'Multivitamínico', 'Vários suplementos'],
      icon: Star
    },
    {
      id: 'medicalHistory',
      title: t('medicalHistory'),
      type: 'textarea',
      placeholder: 'Ex: cirurgias, problemas cardíacos, diabetes, etc.',
      icon: Heart
    },
    {
      id: 'chronicDiseases',
      title: t('chronicDiseases'),
      type: 'textarea',
      placeholder: 'Ex: hipertensão, diabetes, problemas na tireoide, etc.',
      icon: Heart
    },
    {
      id: 'medications',
      title: t('medications'),
      type: 'textarea',
      placeholder: 'Liste os medicamentos que usa regularmente',
      icon: Heart
    },
    {
      id: 'injuries',
      title: t('injuries'),
      type: 'textarea',
      placeholder: 'Ex: problemas no joelho, ombro, coluna, etc.',
      icon: Heart
    },
    {
      id: 'motivation',
      title: t('motivation'),
      type: 'textarea',
      placeholder: 'Descreva sua principal motivação...',
      icon: Target
    }
  ]

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Verificar se é admin
    if (loginData.email === 'admin@betterlifegyn.com' && loginData.password === 'admin123') {
      setCurrentStep('admin')
      return
    }
    
    // Simular login normal
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
              {t('appName')}
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
                  <Settings className="w-4 h-4" />
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
                {isAuthenticated ? t('dashboard') : t('home')}
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
              {t('dashboard')}
            </Button>
            <Button
              variant={currentStep === 'diet' ? 'default' : 'ghost'}
              onClick={() => setCurrentStep('diet')}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Utensils className="w-4 h-4" />
              {t('diet')}
            </Button>
            <Button
              variant={currentStep === 'workout' ? 'default' : 'ghost'}
              onClick={() => setCurrentStep('workout')}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Dumbbell className="w-4 h-4" />
              {t('workouts')}
            </Button>
            {currentUser?.isPro && (
              <>
                <Button
                  variant={currentStep === 'challenge' ? 'default' : 'ghost'}
                  onClick={() => setCurrentStep('challenge')}
                  className="flex items-center gap-2 whitespace-nowrap bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
                >
                  <Flame className="w-4 h-4" />
                  {t('challenge')}
                </Button>
                <Button
                  variant={currentStep === 'recipes' ? 'default' : 'ghost'}
                  onClick={() => setCurrentStep('recipes')}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  <ChefHat className="w-4 h-4" />
                  {t('recipes')}
                </Button>
              </>
            )}
            <Button
              variant={currentStep === 'products' ? 'default' : 'ghost'}
              onClick={() => setCurrentStep('products')}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <ShoppingCart className="w-4 h-4" />
              {t('products')}
            </Button>
            <Button
              variant={currentStep === 'progress' ? 'default' : 'ghost'}
              onClick={() => setCurrentStep('progress')}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <TrendingUp className="w-4 h-4" />
              {t('progress')}
            </Button>
          </div>
        )}
      </div>
    </div>
  )

  // Redirect to admin or account pages
  if (currentStep === 'admin') {
    window.location.href = '/admin'
    return null
  }

  if (currentStep === 'account') {
    window.location.href = '/account'
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
          {/* Language Selector - Top Right */}
          <div className="absolute top-8 right-8">
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
              {t('appName')}
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
              {t('homeDescription')}
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
                <CardTitle className="text-2xl text-white mb-2">{t('smartDiet')}</CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  {t('smartDietDesc')}
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
                <CardTitle className="text-2xl text-white mb-2">{t('adaptiveWorkouts')}</CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  {t('adaptiveWorkoutsDesc')}
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
                <CardTitle className="text-2xl text-white mb-2">{t('advancedAnalysis')}</CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  {t('advancedAnalysisDesc')}
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
                  {t('createAccount')}
                </Button>
                <Button 
                  onClick={() => setCurrentStep('login')}
                  className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 hover:from-teal-600 hover:via-cyan-600 hover:to-blue-600 text-white px-12 py-6 text-xl rounded-2xl shadow-2xl hover:shadow-teal-500/25 transition-all duration-300 transform hover:scale-105 font-semibold"
                >
                  <LogIn className="w-6 h-6 mr-3" />
                  {t('alreadyHaveAccount')}
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
                {t('enterAccount')}
              </CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Acesse seu dashboard personalizado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">{t('email')}</Label>
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
                  <Label htmlFor="password" className="text-white">{t('password')}</Label>
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
                  {t('login')}
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
              <div className="mt-6 p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
                <p className="text-blue-300 text-sm text-center">
                  <Shield className="w-4 h-4 inline mr-2" />
                  Para acessar o painel administrativo, use:
                  <br />
                  <strong>admin@betterlifegyn.com</strong> / <strong>admin123</strong>
                </p>
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
                {t('createNewAccount')}
              </CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Comece sua jornada de transformação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">{t('fullName')}</Label>
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
                  <Label htmlFor="email" className="text-white">{t('email')}</Label>
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
                  <Label htmlFor="password" className="text-white">{t('password')}</Label>
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
                  <Label htmlFor="confirmPassword" className="text-white">{t('confirmPassword')}</Label>
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
                  {t('register')}
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
                {t('questionOf', { current: questionIndex + 1, total: questions.length })}
              </span>
              <span className="text-emerald-400 font-bold text-lg">
                {t('complete', { percent: Math.round(progress) })}
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
                  {t('previous')}
                </Button>
                <Button
                  onClick={nextQuestion}
                  disabled={!answers[currentQuestion.id as keyof QuestionnaireData]}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-8 py-3 font-semibold disabled:opacity-50"
                >
                  {questionIndex === questions.length - 1 ? 'Finalizar' : t('next')}
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
                {t('unlockPotential')}
              </CardTitle>
              <CardDescription className="text-white/90 text-xl max-w-2xl mx-auto">
                {t('exclusiveFeatures')}
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
              {t('welcomeUser', { name: currentUser.name })}
            </h1>
            <p className="text-xl text-gray-300">
              {t('personalizedProgress')}
            </p>
          </div>

          {/* Estatísticas Principais */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  {currentUser.streakDays}
                </div>
                <div className="text-gray-300">{t('consecutiveDays')}</div>
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
                <div className="text-gray-300">{t('weightLost')}</div>
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
                <div className="text-gray-300">{t('workoutsCompleted')}</div>
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
                <div className="text-gray-300">{t('caloriesBurned')}</div>
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
                  {t('upgradeToPro')}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    )
  }

  // Placeholder for other steps
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Em Desenvolvimento</h1>
        <p className="text-gray-300 mb-8">Esta funcionalidade está sendo desenvolvida.</p>
        <Button
          onClick={() => setCurrentStep('dashboard')}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
        >
          Voltar ao Dashboard
        </Button>
      </div>
    </div>
  )
}