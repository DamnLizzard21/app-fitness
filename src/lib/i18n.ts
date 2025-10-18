export type Language = 'pt' | 'en' | 'es'

export interface Translations {
  // Navigation & General
  home: string
  dashboard: string
  diet: string
  workouts: string
  products: string
  progress: string
  recipes: string
  challenge: string
  settings: string
  login: string
  register: string
  logout: string
  back: string
  next: string
  previous: string
  save: string
  cancel: string
  complete: string
  start: string
  continue: string
  
  // App Name & Branding
  appName: string
  appTagline: string
  
  // Home Page
  homeTitle: string
  homeSubtitle: string
  homeDescription: string
  createAccount: string
  alreadyHaveAccount: string
  
  // Features
  smartDiet: string
  smartDietDesc: string
  adaptiveWorkouts: string
  adaptiveWorkoutsDesc: string
  advancedAnalysis: string
  advancedAnalysisDesc: string
  
  // Authentication
  email: string
  password: string
  confirmPassword: string
  fullName: string
  enterAccount: string
  createNewAccount: string
  
  // Questionnaire
  questionOf: string
  complete: string
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
  
  // Goals & Options
  loseWeight: string
  gainMuscle: string
  maintainWeight: string
  improveConditioning: string
  sedentary: string
  beginner: string
  intermediate: string
  advanced: string
  athlete: string
  
  // Dashboard
  welcomeUser: string
  personalizedProgress: string
  consecutiveDays: string
  weightLost: string
  workoutsCompleted: string
  caloriesBurned: string
  
  // Diet
  personalizedDiet: string
  weightLoss: string
  massGain: string
  breakfast: string
  lunch: string
  dinner: string
  snack: string
  calories: string
  protein: string
  carbs: string
  fats: string
  
  // Workouts
  workoutLocation: string
  outdoor: string
  home: string
  gym: string
  startWorkout: string
  
  // Challenge
  calisthenicChallenge: string
  challengeProgress: string
  daysCompleted: string
  daysRemaining: string
  
  // Pro Features
  upgradeToPro: string
  proFeatures: string
  unlockPotential: string
  exclusiveFeatures: string
  
  // Language Selector
  language: string
  portuguese: string
  english: string
  spanish: string
}

export const translations: Record<Language, Translations> = {
  pt: {
    // Navigation & General
    home: 'Início',
    dashboard: 'Dashboard',
    diet: 'Dieta',
    workouts: 'Treinos',
    products: 'Produtos',
    progress: 'Progresso',
    recipes: 'Receitas',
    challenge: 'Desafio',
    settings: 'Configurações',
    login: 'Entrar',
    register: 'Cadastrar',
    logout: 'Sair',
    back: 'Voltar',
    next: 'Próximo',
    previous: 'Anterior',
    save: 'Salvar',
    cancel: 'Cancelar',
    complete: 'Completo',
    start: 'Iniciar',
    continue: 'Continuar',
    
    // App Name & Branding
    appName: 'BetterLife Gyn',
    appTagline: 'Sua jornada para uma vida melhor',
    
    // Home Page
    homeTitle: 'BetterLife Gyn',
    homeSubtitle: 'Transforme seu corpo e sua vida',
    homeDescription: 'Transforme seu corpo e sua vida com nosso programa personalizado de emagrecimento, dieta e treino',
    createAccount: 'Criar Conta Gratuita',
    alreadyHaveAccount: 'Já tenho conta',
    
    // Features
    smartDiet: 'Dieta Inteligente',
    smartDietDesc: 'IA personaliza seu cardápio baseado em seus objetivos e preferências',
    adaptiveWorkouts: 'Treinos Adaptativos',
    adaptiveWorkoutsDesc: 'Exercícios que evoluem com você, com vídeos HD e acompanhamento',
    advancedAnalysis: 'Análise Avançada',
    advancedAnalysisDesc: 'Métricas detalhadas e insights para acelerar seus resultados',
    
    // Authentication
    email: 'Email',
    password: 'Senha',
    confirmPassword: 'Confirmar Senha',
    fullName: 'Nome Completo',
    enterAccount: 'Entrar na sua conta',
    createNewAccount: 'Criar sua conta',
    
    // Questionnaire
    questionOf: 'Pergunta {current} de {total}',
    complete: '{percent}% completo',
    height: 'Qual sua altura?',
    weight: 'Qual seu peso atual?',
    age: 'Qual sua idade?',
    gender: 'Qual seu gênero?',
    goal: 'Qual seu objetivo principal?',
    currentActivity: 'Com que frequência você se exercita?',
    trainingLevel: 'Qual seu nível de treinamento?',
    sleepHours: 'Quantas horas você dorme por noite?',
    workType: 'Qual tipo de trabalho você tem?',
    stressLevel: 'Como você avalia seu nível de estresse?',
    waterIntake: 'Quantos litros de água você bebe por dia?',
    mealFrequency: 'Quantas refeições você faz por dia?',
    dietRestrictions: 'Você tem alguma restrição alimentar?',
    supplementUse: 'Você usa algum suplemento?',
    motivation: 'O que mais te motiva a emagrecer?',
    medicalHistory: 'Você tem algum histórico médico relevante?',
    chronicDiseases: 'Possui alguma doença crônica?',
    medications: 'Faz uso de alguma medicação regularmente?',
    injuries: 'Tem alguma lesão ou limitação física?',
    
    // Goals & Options
    loseWeight: 'Perder peso',
    gainMuscle: 'Ganhar massa muscular',
    maintainWeight: 'Manter peso',
    improveConditioning: 'Melhorar condicionamento',
    sedentary: 'Sedentário',
    beginner: 'Iniciante',
    intermediate: 'Intermediário',
    advanced: 'Avançado',
    athlete: 'Atleta',
    
    // Dashboard
    welcomeUser: 'Olá, {name}! 👋',
    personalizedProgress: 'Aqui está seu progresso personalizado e dados atualizados',
    consecutiveDays: 'Dias consecutivos',
    weightLost: 'Peso perdido',
    workoutsCompleted: 'Treinos feitos',
    caloriesBurned: 'Calorias queimadas',
    
    // Diet
    personalizedDiet: 'Dieta Personalizada',
    weightLoss: 'Emagrecimento',
    massGain: 'Ganho de Massa',
    breakfast: 'Café da Manhã',
    lunch: 'Almoço',
    dinner: 'Jantar',
    snack: 'Lanche',
    calories: 'Calorias',
    protein: 'Proteína',
    carbs: 'Carboidratos',
    fats: 'Gorduras',
    
    // Workouts
    workoutLocation: 'Onde você prefere treinar?',
    outdoor: 'Ao Ar Livre',
    home: 'Em Casa',
    gym: 'Na Academia',
    startWorkout: 'Iniciar Treino',
    
    // Challenge
    calisthenicChallenge: 'Desafio Calistênico 30 Dias',
    challengeProgress: 'Progresso do Desafio',
    daysCompleted: 'Dias Completos',
    daysRemaining: 'Dias Restantes',
    
    // Pro Features
    upgradeToPro: 'Upgrade para PRO',
    proFeatures: 'Recursos PRO',
    unlockPotential: 'Desbloqueie Todo Seu Potencial',
    exclusiveFeatures: 'Acesse funcionalidades exclusivas e acelere seus resultados',
    
    // Language Selector
    language: 'Idioma',
    portuguese: 'Português',
    english: 'Inglês',
    spanish: 'Espanhol'
  },
  
  en: {
    // Navigation & General
    home: 'Home',
    dashboard: 'Dashboard',
    diet: 'Diet',
    workouts: 'Workouts',
    products: 'Products',
    progress: 'Progress',
    recipes: 'Recipes',
    challenge: 'Challenge',
    settings: 'Settings',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    save: 'Save',
    cancel: 'Cancel',
    complete: 'Complete',
    start: 'Start',
    continue: 'Continue',
    
    // App Name & Branding
    appName: 'BetterLife Gyn',
    appTagline: 'Your journey to a better life',
    
    // Home Page
    homeTitle: 'BetterLife Gyn',
    homeSubtitle: 'Transform your body and your life',
    homeDescription: 'Transform your body and your life with our personalized weight loss, diet and workout program',
    createAccount: 'Create Free Account',
    alreadyHaveAccount: 'Already have an account',
    
    // Features
    smartDiet: 'Smart Diet',
    smartDietDesc: 'AI personalizes your menu based on your goals and preferences',
    adaptiveWorkouts: 'Adaptive Workouts',
    adaptiveWorkoutsDesc: 'Exercises that evolve with you, with HD videos and tracking',
    advancedAnalysis: 'Advanced Analysis',
    advancedAnalysisDesc: 'Detailed metrics and insights to accelerate your results',
    
    // Authentication
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    fullName: 'Full Name',
    enterAccount: 'Enter your account',
    createNewAccount: 'Create your account',
    
    // Questionnaire
    questionOf: 'Question {current} of {total}',
    complete: '{percent}% complete',
    height: 'What is your height?',
    weight: 'What is your current weight?',
    age: 'What is your age?',
    gender: 'What is your gender?',
    goal: 'What is your main goal?',
    currentActivity: 'How often do you exercise?',
    trainingLevel: 'What is your training level?',
    sleepHours: 'How many hours do you sleep per night?',
    workType: 'What type of work do you have?',
    stressLevel: 'How do you rate your stress level?',
    waterIntake: 'How many liters of water do you drink per day?',
    mealFrequency: 'How many meals do you have per day?',
    dietRestrictions: 'Do you have any dietary restrictions?',
    supplementUse: 'Do you use any supplements?',
    motivation: 'What motivates you most to lose weight?',
    medicalHistory: 'Do you have any relevant medical history?',
    chronicDiseases: 'Do you have any chronic diseases?',
    medications: 'Do you take any medication regularly?',
    injuries: 'Do you have any injuries or physical limitations?',
    
    // Goals & Options
    loseWeight: 'Lose weight',
    gainMuscle: 'Gain muscle mass',
    maintainWeight: 'Maintain weight',
    improveConditioning: 'Improve conditioning',
    sedentary: 'Sedentary',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    athlete: 'Athlete',
    
    // Dashboard
    welcomeUser: 'Hello, {name}! 👋',
    personalizedProgress: 'Here is your personalized progress and updated data',
    consecutiveDays: 'Consecutive days',
    weightLost: 'Weight lost',
    workoutsCompleted: 'Workouts completed',
    caloriesBurned: 'Calories burned',
    
    // Diet
    personalizedDiet: 'Personalized Diet',
    weightLoss: 'Weight Loss',
    massGain: 'Mass Gain',
    breakfast: 'Breakfast',
    lunch: 'Lunch',
    dinner: 'Dinner',
    snack: 'Snack',
    calories: 'Calories',
    protein: 'Protein',
    carbs: 'Carbs',
    fats: 'Fats',
    
    // Workouts
    workoutLocation: 'Where do you prefer to workout?',
    outdoor: 'Outdoor',
    home: 'At Home',
    gym: 'At Gym',
    startWorkout: 'Start Workout',
    
    // Challenge
    calisthenicChallenge: '30-Day Calisthenic Challenge',
    challengeProgress: 'Challenge Progress',
    daysCompleted: 'Days Completed',
    daysRemaining: 'Days Remaining',
    
    // Pro Features
    upgradeToPro: 'Upgrade to PRO',
    proFeatures: 'PRO Features',
    unlockPotential: 'Unlock Your Full Potential',
    exclusiveFeatures: 'Access exclusive features and accelerate your results',
    
    // Language Selector
    language: 'Language',
    portuguese: 'Portuguese',
    english: 'English',
    spanish: 'Spanish'
  },
  
  es: {
    // Navigation & General
    home: 'Inicio',
    dashboard: 'Panel',
    diet: 'Dieta',
    workouts: 'Entrenamientos',
    products: 'Productos',
    progress: 'Progreso',
    recipes: 'Recetas',
    challenge: 'Desafío',
    settings: 'Configuración',
    login: 'Iniciar Sesión',
    register: 'Registrarse',
    logout: 'Cerrar Sesión',
    back: 'Volver',
    next: 'Siguiente',
    previous: 'Anterior',
    save: 'Guardar',
    cancel: 'Cancelar',
    complete: 'Completo',
    start: 'Iniciar',
    continue: 'Continuar',
    
    // App Name & Branding
    appName: 'BetterLife Gyn',
    appTagline: 'Tu viaje hacia una vida mejor',
    
    // Home Page
    homeTitle: 'BetterLife Gyn',
    homeSubtitle: 'Transforma tu cuerpo y tu vida',
    homeDescription: 'Transforma tu cuerpo y tu vida con nuestro programa personalizado de pérdida de peso, dieta y entrenamiento',
    createAccount: 'Crear Cuenta Gratuita',
    alreadyHaveAccount: 'Ya tengo una cuenta',
    
    // Features
    smartDiet: 'Dieta Inteligente',
    smartDietDesc: 'La IA personaliza tu menú basado en tus objetivos y preferencias',
    adaptiveWorkouts: 'Entrenamientos Adaptativos',
    adaptiveWorkoutsDesc: 'Ejercicios que evolucionan contigo, con videos HD y seguimiento',
    advancedAnalysis: 'Análisis Avanzado',
    advancedAnalysisDesc: 'Métricas detalladas e insights para acelerar tus resultados',
    
    // Authentication
    email: 'Email',
    password: 'Contraseña',
    confirmPassword: 'Confirmar Contraseña',
    fullName: 'Nombre Completo',
    enterAccount: 'Entra a tu cuenta',
    createNewAccount: 'Crea tu cuenta',
    
    // Questionnaire
    questionOf: 'Pregunta {current} de {total}',
    complete: '{percent}% completo',
    height: '¿Cuál es tu altura?',
    weight: '¿Cuál es tu peso actual?',
    age: '¿Cuál es tu edad?',
    gender: '¿Cuál es tu género?',
    goal: '¿Cuál es tu objetivo principal?',
    currentActivity: '¿Con qué frecuencia haces ejercicio?',
    trainingLevel: '¿Cuál es tu nivel de entrenamiento?',
    sleepHours: '¿Cuántas horas duermes por noche?',
    workType: '¿Qué tipo de trabajo tienes?',
    stressLevel: '¿Cómo evalúas tu nivel de estrés?',
    waterIntake: '¿Cuántos litros de agua bebes por día?',
    mealFrequency: '¿Cuántas comidas haces por día?',
    dietRestrictions: '¿Tienes alguna restricción alimentaria?',
    supplementUse: '¿Usas algún suplemento?',
    motivation: '¿Qué te motiva más a perder peso?',
    medicalHistory: '¿Tienes algún historial médico relevante?',
    chronicDiseases: '¿Tienes alguna enfermedad crónica?',
    medications: '¿Tomas alguna medicación regularmente?',
    injuries: '¿Tienes alguna lesión o limitación física?',
    
    // Goals & Options
    loseWeight: 'Perder peso',
    gainMuscle: 'Ganar masa muscular',
    maintainWeight: 'Mantener peso',
    improveConditioning: 'Mejorar acondicionamiento',
    sedentary: 'Sedentario',
    beginner: 'Principiante',
    intermediate: 'Intermedio',
    advanced: 'Avanzado',
    athlete: 'Atleta',
    
    // Dashboard
    welcomeUser: '¡Hola, {name}! 👋',
    personalizedProgress: 'Aquí está tu progreso personalizado y datos actualizados',
    consecutiveDays: 'Días consecutivos',
    weightLost: 'Peso perdido',
    workoutsCompleted: 'Entrenamientos completados',
    caloriesBurned: 'Calorías quemadas',
    
    // Diet
    personalizedDiet: 'Dieta Personalizada',
    weightLoss: 'Pérdida de Peso',
    massGain: 'Ganancia de Masa',
    breakfast: 'Desayuno',
    lunch: 'Almuerzo',
    dinner: 'Cena',
    snack: 'Merienda',
    calories: 'Calorías',
    protein: 'Proteína',
    carbs: 'Carbohidratos',
    fats: 'Grasas',
    
    // Workouts
    workoutLocation: '¿Dónde prefieres entrenar?',
    outdoor: 'Al Aire Libre',
    home: 'En Casa',
    gym: 'En el Gimnasio',
    startWorkout: 'Iniciar Entrenamiento',
    
    // Challenge
    calisthenicChallenge: 'Desafío Calisténico de 30 Días',
    challengeProgress: 'Progreso del Desafío',
    daysCompleted: 'Días Completados',
    daysRemaining: 'Días Restantes',
    
    // Pro Features
    upgradeToPro: 'Actualizar a PRO',
    proFeatures: 'Características PRO',
    unlockPotential: 'Desbloquea Todo Tu Potencial',
    exclusiveFeatures: 'Accede a características exclusivas y acelera tus resultados',
    
    // Language Selector
    language: 'Idioma',
    portuguese: 'Portugués',
    english: 'Inglés',
    spanish: 'Español'
  }
}

export const useTranslation = (language: Language) => {
  const t = (key: keyof Translations, params?: Record<string, string | number>): string => {
    let text = translations[language][key] || translations['pt'][key] || key
    
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(`{${param}}`, String(value))
      })
    }
    
    return text
  }
  
  return { t }
}