'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Language = 'pt' | 'en' | 'es'

interface Translations {
  [key: string]: {
    [key: string]: string | string[] | { [key: string]: string | string[] }
  }
}

const translations: Translations = {
  pt: {
    home: {
      title: 'FitApp',
      subtitle: 'Transforme seu corpo e mente com planos personalizados de alimentação e exercícios',
      stats: {
        users: '+50.000 usuárias',
        success: '95% de sucesso',
        results: 'Resultados em 30 dias'
      },
      features: {
        diet: {
          title: 'Dieta Personalizada',
          description: 'Planos alimentares científicos adaptados ao seu perfil',
          benefits: [
            'Cardápios semanais personalizados',
            'Receitas práticas e saborosas',
            'Lista de compras automática',
            'Acompanhamento nutricional'
          ]
        },
        workouts: {
          title: 'Treinos Adaptativos',
          description: 'Exercícios que se adaptam ao seu nível e disponibilidade',
          benefits: [
            'Treinos para casa, academia ou rua',
            'Progressão automática',
            'Vídeos explicativos',
            'Acompanhamento de performance'
          ]
        },
        analysis: {
          title: 'Análise Inteligente',
          description: 'Insights baseados em dados para otimizar seus resultados',
          benefits: [
            'Relatórios de progresso',
            'Análise de composição corporal',
            'Recomendações personalizadas',
            'Metas inteligentes'
          ]
        }
      },
      cta: {
        title: 'Comece Sua Transformação Hoje',
        description: 'Junte-se a milhares de pessoas que já transformaram suas vidas',
        createAccount: 'Criar Conta Gratuita',
        login: 'Já Tenho Conta'
      }
    },
    auth: {
      login: {
        title: 'Bem-vinda de volta!',
        subtitle: 'Entre na sua conta para continuar sua jornada',
        email: 'E-mail',
        password: 'Senha',
        loginButton: 'Entrar',
        noAccount: 'Não tem uma conta?',
        createAccount: 'Criar conta',
        backToHome: 'Voltar ao início',
        forgotPassword: 'Esqueci minha senha'
      },
      register: {
        title: 'Crie sua conta',
        subtitle: 'Comece sua transformação hoje mesmo',
        name: 'Nome completo',
        email: 'E-mail',
        password: 'Senha',
        confirmPassword: 'Confirmar senha',
        registerButton: 'Criar Conta',
        hasAccount: 'Já tem uma conta?',
        login: 'Fazer login',
        backToHome: 'Voltar ao início'
      }
    },
    nav: {
      home: 'Início',
      dashboard: 'Dashboard',
      diet: 'Dieta',
      workouts: 'Treinos',
      challenge: 'Desafio 30 Dias',
      recipes: 'Receitas',
      products: 'Produtos',
      progress: 'Progresso',
      account: 'Conta',
      admin: 'Admin'
    },
    dashboard: {
      welcome: 'Olá, {{name}}!',
      subtitle: 'Vamos continuar sua jornada de transformação',
      stats: {
        consecutiveDays: 'Dias consecutivos',
        weightLost: 'Peso perdido',
        workoutsCompleted: 'Treinos completos',
        caloriesBurned: 'Calorias queimadas',
        thisWeek: 'Esta semana',
        total: 'Total'
      },
      progress: {
        title: 'Progresso de Peso',
        initialWeight: 'Peso inicial',
        currentWeight: 'Peso atual',
        goal: 'Meta',
        progress: 'Progresso'
      },
      profile: {
        title: 'Seu Perfil',
        bmi: 'IMC',
        level: 'Nível',
        objective: 'Objetivo',
        activity: 'Atividade'
      },
      nextActions: {
        title: 'Próximas Ações',
        configureDiet: 'Configurar Dieta',
        configureDietDesc: 'Personalize seu plano alimentar',
        trainToday: 'Treinar Hoje',
        trainTodayDesc: 'Complete seu treino diário',
        challenge30: 'Desafio 30 Dias',
        challenge30Desc: 'Participe do desafio calistênico',
        upgradePro: 'Upgrade PRO',
        upgradeProDesc: 'Desbloqueie recursos avançados'
      }
    },
    common: {
      previous: 'Anterior',
      next: 'Próximo',
      save: 'Salvar',
      cancel: 'Cancelar',
      delete: 'Excluir',
      edit: 'Editar',
      loading: 'Carregando...',
      error: 'Erro',
      success: 'Sucesso'
    }
  },
  en: {
    home: {
      title: 'FitApp',
      subtitle: 'Transform your body and mind with personalized nutrition and exercise plans',
      stats: {
        users: '+50,000 users',
        success: '95% success rate',
        results: 'Results in 30 days'
      },
      features: {
        diet: {
          title: 'Personalized Diet',
          description: 'Scientific meal plans adapted to your profile',
          benefits: [
            'Personalized weekly menus',
            'Practical and tasty recipes',
            'Automatic shopping list',
            'Nutritional tracking'
          ]
        },
        workouts: {
          title: 'Adaptive Workouts',
          description: 'Exercises that adapt to your level and availability',
          benefits: [
            'Home, gym or outdoor workouts',
            'Automatic progression',
            'Explanatory videos',
            'Performance tracking'
          ]
        },
        analysis: {
          title: 'Smart Analysis',
          description: 'Data-driven insights to optimize your results',
          benefits: [
            'Progress reports',
            'Body composition analysis',
            'Personalized recommendations',
            'Smart goals'
          ]
        }
      },
      cta: {
        title: 'Start Your Transformation Today',
        description: 'Join thousands of people who have already transformed their lives',
        createAccount: 'Create Free Account',
        login: 'I Already Have an Account'
      }
    },
    auth: {
      login: {
        title: 'Welcome back!',
        subtitle: 'Sign in to your account to continue your journey',
        email: 'Email',
        password: 'Password',
        loginButton: 'Sign In',
        noAccount: "Don't have an account?",
        createAccount: 'Create account',
        backToHome: 'Back to home',
        forgotPassword: 'Forgot my password'
      },
      register: {
        title: 'Create your account',
        subtitle: 'Start your transformation today',
        name: 'Full name',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm password',
        registerButton: 'Create Account',
        hasAccount: 'Already have an account?',
        login: 'Sign in',
        backToHome: 'Back to home'
      }
    },
    nav: {
      home: 'Home',
      dashboard: 'Dashboard',
      diet: 'Diet',
      workouts: 'Workouts',
      challenge: '30-Day Challenge',
      recipes: 'Recipes',
      products: 'Products',
      progress: 'Progress',
      account: 'Account',
      admin: 'Admin'
    },
    dashboard: {
      welcome: 'Hello, {{name}}!',
      subtitle: "Let's continue your transformation journey",
      stats: {
        consecutiveDays: 'Consecutive days',
        weightLost: 'Weight lost',
        workoutsCompleted: 'Workouts completed',
        caloriesBurned: 'Calories burned',
        thisWeek: 'This week',
        total: 'Total'
      },
      progress: {
        title: 'Weight Progress',
        initialWeight: 'Initial weight',
        currentWeight: 'Current weight',
        goal: 'Goal',
        progress: 'Progress'
      },
      profile: {
        title: 'Your Profile',
        bmi: 'BMI',
        level: 'Level',
        objective: 'Objective',
        activity: 'Activity'
      },
      nextActions: {
        title: 'Next Actions',
        configureDiet: 'Configure Diet',
        configureDietDesc: 'Customize your meal plan',
        trainToday: 'Train Today',
        trainTodayDesc: 'Complete your daily workout',
        challenge30: '30-Day Challenge',
        challenge30Desc: 'Join the calisthenic challenge',
        upgradePro: 'Upgrade PRO',
        upgradeProDesc: 'Unlock advanced features'
      }
    },
    common: {
      previous: 'Previous',
      next: 'Next',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success'
    }
  },
  es: {
    home: {
      title: 'FitApp',
      subtitle: 'Transforma tu cuerpo y mente con planes personalizados de alimentación y ejercicios',
      stats: {
        users: '+50.000 usuarios',
        success: '95% de éxito',
        results: 'Resultados en 30 días'
      },
      features: {
        diet: {
          title: 'Dieta Personalizada',
          description: 'Planes alimentarios científicos adaptados a tu perfil',
          benefits: [
            'Menús semanales personalizados',
            'Recetas prácticas y sabrosas',
            'Lista de compras automática',
            'Seguimiento nutricional'
          ]
        },
        workouts: {
          title: 'Entrenamientos Adaptativos',
          description: 'Ejercicios que se adaptan a tu nivel y disponibilidad',
          benefits: [
            'Entrenamientos en casa, gimnasio o calle',
            'Progresión automática',
            'Videos explicativos',
            'Seguimiento de rendimiento'
          ]
        },
        analysis: {
          title: 'Análisis Inteligente',
          description: 'Insights basados en datos para optimizar tus resultados',
          benefits: [
            'Informes de progreso',
            'Análisis de composición corporal',
            'Recomendaciones personalizadas',
            'Metas inteligentes'
          ]
        }
      },
      cta: {
        title: 'Comienza Tu Transformación Hoy',
        description: 'Únete a miles de personas que ya han transformado sus vidas',
        createAccount: 'Crear Cuenta Gratuita',
        login: 'Ya Tengo Cuenta'
      }
    },
    auth: {
      login: {
        title: '¡Bienvenida de vuelta!',
        subtitle: 'Inicia sesión en tu cuenta para continuar tu viaje',
        email: 'Email',
        password: 'Contraseña',
        loginButton: 'Iniciar Sesión',
        noAccount: '¿No tienes una cuenta?',
        createAccount: 'Crear cuenta',
        backToHome: 'Volver al inicio',
        forgotPassword: 'Olvidé mi contraseña'
      },
      register: {
        title: 'Crea tu cuenta',
        subtitle: 'Comienza tu transformación hoy mismo',
        name: 'Nombre completo',
        email: 'Email',
        password: 'Contraseña',
        confirmPassword: 'Confirmar contraseña',
        registerButton: 'Crear Cuenta',
        hasAccount: '¿Ya tienes una cuenta?',
        login: 'Iniciar sesión',
        backToHome: 'Volver al inicio'
      }
    },
    nav: {
      home: 'Inicio',
      dashboard: 'Panel',
      diet: 'Dieta',
      workouts: 'Entrenamientos',
      challenge: 'Desafío 30 Días',
      recipes: 'Recetas',
      products: 'Productos',
      progress: 'Progreso',
      account: 'Cuenta',
      admin: 'Admin'
    },
    dashboard: {
      welcome: '¡Hola, {{name}}!',
      subtitle: 'Continuemos tu viaje de transformación',
      stats: {
        consecutiveDays: 'Días consecutivos',
        weightLost: 'Peso perdido',
        workoutsCompleted: 'Entrenamientos completos',
        caloriesBurned: 'Calorías quemadas',
        thisWeek: 'Esta semana',
        total: 'Total'
      },
      progress: {
        title: 'Progreso de Peso',
        initialWeight: 'Peso inicial',
        currentWeight: 'Peso actual',
        goal: 'Meta',
        progress: 'Progreso'
      },
      profile: {
        title: 'Tu Perfil',
        bmi: 'IMC',
        level: 'Nivel',
        objective: 'Objetivo',
        activity: 'Actividad'
      },
      nextActions: {
        title: 'Próximas Acciones',
        configureDiet: 'Configurar Dieta',
        configureDietDesc: 'Personaliza tu plan alimentario',
        trainToday: 'Entrenar Hoy',
        trainTodayDesc: 'Completa tu entrenamiento diario',
        challenge30: 'Desafío 30 Días',
        challenge30Desc: 'Participa en el desafío calisténico',
        upgradePro: 'Upgrade PRO',
        upgradeProDesc: 'Desbloquea funciones avanzadas'
      }
    },
    common: {
      previous: 'Anterior',
      next: 'Siguiente',
      save: 'Guardar',
      cancel: 'Cancelar',
      delete: 'Eliminar',
      edit: 'Editar',
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito'
    }
  }
}

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string, params?: { [key: string]: string }) => string | string[]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt')

  // Carregar idioma do localStorage na inicialização
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && ['pt', 'en', 'es'].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Salvar idioma no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const t = (key: string, params?: { [key: string]: string }): string | string[] => {
    const keys = key.split('.')
    let value: any = translations[language]

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        // Fallback para português se a chave não existir
        value = translations.pt
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey]
          } else {
            return key // Retorna a chave se não encontrar tradução
          }
        }
        break
      }
    }

    if (typeof value === 'string' && params) {
      // Substituir parâmetros na string
      return Object.keys(params).reduce((str, param) => {
        return str.replace(new RegExp(`{{${param}}}`, 'g'), params[param])
      }, value)
    }

    return value || key
  }

  const value: LanguageContextType = {
    language,
    setLanguage,
    t
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}