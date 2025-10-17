import { WorkoutPlan, WorkoutTemplate, User } from './types'

// Serviço de planos de treino personalizados
class WorkoutPlansService {
  private plans: WorkoutPlan[] = [
    {
      id: 'beginner-full-body',
      name: 'Corpo Inteiro - Iniciante',
      description: 'Plano completo para iniciantes focado em movimentos básicos e construção de base',
      duration_weeks: 8,
      difficulty: 'beginner',
      goal: 'Condicionamento geral e aprendizado de movimentos',
      workouts_per_week: 3,
      is_public: true,
      rating: 4.8,
      reviews: 156,
      created_at: new Date(),
      updated_at: new Date(),
      workout_templates: [
        {
          id: 'beginner-day-1',
          name: 'Dia 1 - Corpo Inteiro A',
          type: 'strength',
          estimated_duration: 45 * 60,
          difficulty: 'beginner',
          description: 'Treino focado em movimentos compostos básicos',
          target_muscle_groups: ['peito', 'costas', 'pernas', 'core'],
          equipment_needed: ['halteres', 'tapete'],
          calories_estimate: 250,
          exercises: [
            {
              name: 'Agachamento livre',
              sets: 3,
              reps: 12,
              weight: 0,
              distance: 0,
              duration_sec: 0,
              rpe: 6,
              rest_time: 60,
              muscle_groups: ['quadríceps', 'glúteos'],
              equipment: []
            },
            {
              name: 'Flexão de braço (joelhos)',
              sets: 3,
              reps: 8,
              weight: 0,
              distance: 0,
              duration_sec: 0,
              rpe: 6,
              rest_time: 60,
              muscle_groups: ['peito', 'tríceps'],
              equipment: []
            },
            {
              name: 'Prancha',
              sets: 3,
              reps: 1,
              weight: 0,
              distance: 0,
              duration_sec: 30,
              rpe: 5,
              rest_time: 45,
              muscle_groups: ['core'],
              equipment: ['tapete']
            }
          ]
        }
      ]
    },
    {
      id: 'intermediate-strength',
      name: 'Força Intermediária',
      description: 'Programa de força para praticantes intermediários com foco em progressão',
      duration_weeks: 12,
      difficulty: 'intermediate',
      goal: 'Aumento de força e massa muscular',
      workouts_per_week: 4,
      is_public: true,
      rating: 4.9,
      reviews: 89,
      created_at: new Date(),
      updated_at: new Date(),
      workout_templates: [
        {
          id: 'intermediate-upper',
          name: 'Membros Superiores',
          type: 'strength',
          estimated_duration: 60 * 60,
          difficulty: 'intermediate',
          description: 'Treino intenso para membros superiores',
          target_muscle_groups: ['peito', 'costas', 'ombros', 'braços'],
          equipment_needed: ['halteres', 'barra', 'banco'],
          calories_estimate: 350,
          exercises: [
            {
              name: 'Supino com halteres',
              sets: 4,
              reps: 8,
              weight: 20,
              distance: 0,
              duration_sec: 0,
              rpe: 7,
              rest_time: 90,
              muscle_groups: ['peito', 'tríceps'],
              equipment: ['halteres', 'banco']
            },
            {
              name: 'Remada curvada',
              sets: 4,
              reps: 10,
              weight: 15,
              distance: 0,
              duration_sec: 0,
              rpe: 7,
              rest_time: 90,
              muscle_groups: ['costas', 'bíceps'],
              equipment: ['halteres']
            }
          ]
        }
      ]
    },
    {
      id: 'cardio-hiit-advanced',
      name: 'HIIT Avançado',
      description: 'Treinos de alta intensidade para queima de gordura e condicionamento',
      duration_weeks: 6,
      difficulty: 'advanced',
      goal: 'Queima de gordura e condicionamento cardiovascular',
      workouts_per_week: 5,
      is_public: true,
      rating: 4.7,
      reviews: 234,
      created_at: new Date(),
      updated_at: new Date(),
      workout_templates: [
        {
          id: 'hiit-tabata',
          name: 'Tabata Explosivo',
          type: 'cardio',
          estimated_duration: 20 * 60,
          difficulty: 'advanced',
          description: 'Protocolo Tabata de alta intensidade',
          target_muscle_groups: ['corpo inteiro'],
          equipment_needed: [],
          calories_estimate: 300,
          exercises: [
            {
              name: 'Burpees',
              sets: 8,
              reps: 1,
              weight: 0,
              distance: 0,
              duration_sec: 20,
              rpe: 9,
              rest_time: 10,
              muscle_groups: ['corpo inteiro'],
              equipment: []
            },
            {
              name: 'Mountain Climbers',
              sets: 8,
              reps: 1,
              weight: 0,
              distance: 0,
              duration_sec: 20,
              rpe: 8,
              rest_time: 10,
              muscle_groups: ['core', 'pernas'],
              equipment: []
            }
          ]
        }
      ]
    }
  ]

  private userPlans: Record<string, string[]> = {}

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fitlife_user_plans')
      if (saved) {
        this.userPlans = JSON.parse(saved)
      }
    }
  }

  private saveToStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('fitlife_user_plans', JSON.stringify(this.userPlans))
    }
  }

  getAllPlans(): WorkoutPlan[] {
    return this.plans.filter(p => p.is_public)
  }

  getPlan(id: string): WorkoutPlan | null {
    return this.plans.find(p => p.id === id) || null
  }

  getUserPlans(userId: string): string[] {
    return this.userPlans[userId] || []
  }

  async subscribeToPlan(userId: string, planId: string): Promise<boolean> {
    if (!this.userPlans[userId]) {
      this.userPlans[userId] = []
    }

    if (!this.userPlans[userId].includes(planId)) {
      this.userPlans[userId].push(planId)
      this.saveToStorage()
    }

    return true
  }

  async unsubscribeFromPlan(userId: string, planId: string): Promise<boolean> {
    if (this.userPlans[userId]) {
      this.userPlans[userId] = this.userPlans[userId].filter(id => id !== planId)
      this.saveToStorage()
    }

    return true
  }

  // Recomendações baseadas no perfil do usuário
  getRecommendedPlans(user: User): WorkoutPlan[] {
    const allPlans = this.getAllPlans()
    
    // Filtrar por nível de fitness
    let recommended = allPlans.filter(plan => {
      if (!user.fitness_level) return plan.difficulty === 'beginner'
      return plan.difficulty === user.fitness_level
    })

    // Se não houver planos para o nível, incluir nível anterior
    if (recommended.length === 0) {
      if (user.fitness_level === 'advanced') {
        recommended = allPlans.filter(p => p.difficulty === 'intermediate')
      } else if (user.fitness_level === 'intermediate') {
        recommended = allPlans.filter(p => p.difficulty === 'beginner')
      }
    }

    // Ordenar por rating
    return recommended.sort((a, b) => (b.rating || 0) - (a.rating || 0))
  }

  // Gerar plano personalizado baseado nas preferências
  async generatePersonalizedPlan(user: User, preferences: {
    goal: string
    duration_weeks: number
    workouts_per_week: number
    available_equipment: string[]
    time_per_workout: number
  }): Promise<WorkoutPlan> {
    const planId = `custom-${Date.now()}`
    
    const customPlan: WorkoutPlan = {
      id: planId,
      name: `Plano Personalizado - ${preferences.goal}`,
      description: `Plano criado especialmente para ${user.name} com foco em ${preferences.goal}`,
      duration_weeks: preferences.duration_weeks,
      difficulty: user.fitness_level || 'beginner',
      goal: preferences.goal,
      workouts_per_week: preferences.workouts_per_week,
      is_public: false,
      created_by: user.id,
      created_at: new Date(),
      updated_at: new Date(),
      workout_templates: []
    }

    // Gerar templates baseados nas preferências
    const exercisePool = this.getExercisePool(preferences.available_equipment, user.fitness_level || 'beginner')
    
    for (let i = 0; i < preferences.workouts_per_week; i++) {
      const template: WorkoutTemplate = {
        id: `${planId}-day-${i + 1}`,
        name: `Dia ${i + 1}`,
        type: this.getWorkoutType(preferences.goal, i),
        estimated_duration: preferences.time_per_workout * 60,
        difficulty: user.fitness_level || 'beginner',
        description: `Treino ${i + 1} do seu plano personalizado`,
        exercises: this.selectExercises(exercisePool, preferences.goal, preferences.time_per_workout)
      }
      
      customPlan.workout_templates.push(template)
    }

    // Adicionar à lista de planos
    this.plans.push(customPlan)
    
    return customPlan
  }

  private getExercisePool(equipment: string[], level: string) {
    // Pool simplificado de exercícios baseado no equipamento disponível
    const exercises = {
      bodyweight: [
        { name: 'Flexão de braço', muscle_groups: ['peito', 'tríceps'], difficulty: 'beginner' },
        { name: 'Agachamento', muscle_groups: ['pernas'], difficulty: 'beginner' },
        { name: 'Prancha', muscle_groups: ['core'], difficulty: 'beginner' },
        { name: 'Burpees', muscle_groups: ['corpo inteiro'], difficulty: 'intermediate' },
        { name: 'Mountain Climbers', muscle_groups: ['core', 'cardio'], difficulty: 'intermediate' }
      ],
      dumbbells: [
        { name: 'Supino com halteres', muscle_groups: ['peito'], difficulty: 'beginner' },
        { name: 'Remada curvada', muscle_groups: ['costas'], difficulty: 'beginner' },
        { name: 'Desenvolvimento', muscle_groups: ['ombros'], difficulty: 'beginner' },
        { name: 'Rosca bíceps', muscle_groups: ['bíceps'], difficulty: 'beginner' }
      ]
    }

    let pool = [...exercises.bodyweight]
    
    if (equipment.includes('halteres') || equipment.includes('dumbbells')) {
      pool = [...pool, ...exercises.dumbbells]
    }

    return pool.filter(ex => ex.difficulty === level || level === 'advanced')
  }

  private getWorkoutType(goal: string, dayIndex: number): string {
    if (goal.includes('força') || goal.includes('muscle')) return 'strength'
    if (goal.includes('cardio') || goal.includes('queima')) return 'cardio'
    if (goal.includes('flexibilidade')) return 'flexibility'
    
    // Alternar tipos para planos gerais
    const types = ['strength', 'cardio', 'flexibility']
    return types[dayIndex % types.length]
  }

  private selectExercises(pool: any[], goal: string, timeMinutes: number) {
    const exerciseCount = Math.floor(timeMinutes / 10) // ~10 min por exercício
    const selected = pool.slice(0, Math.min(exerciseCount, pool.length))
    
    return selected.map(ex => ({
      name: ex.name,
      sets: 3,
      reps: goal.includes('força') ? 8 : 12,
      weight: 0,
      distance: 0,
      duration_sec: ex.name.includes('Prancha') ? 30 : 0,
      rpe: 6,
      rest_time: 60,
      muscle_groups: ex.muscle_groups,
      equipment: []
    }))
  }
}

export const workoutPlansService = new WorkoutPlansService()

// Hook para usar planos de treino
export function useWorkoutPlans(userId: string) {
  const [allPlans, setAllPlans] = useState<WorkoutPlan[]>([])
  const [userPlans, setUserPlans] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  const loadPlans = () => {
    setLoading(true)
    try {
      const plans = workoutPlansService.getAllPlans()
      const userPlanIds = workoutPlansService.getUserPlans(userId)
      
      setAllPlans(plans)
      setUserPlans(userPlanIds)
    } catch (error) {
      console.error('Error loading plans:', error)
    } finally {
      setLoading(false)
    }
  }

  const subscribeToPlan = async (planId: string) => {
    try {
      await workoutPlansService.subscribeToPlan(userId, planId)
      setUserPlans(prev => [...prev, planId])
    } catch (error) {
      console.error('Error subscribing to plan:', error)
      throw error
    }
  }

  const unsubscribeFromPlan = async (planId: string) => {
    try {
      await workoutPlansService.unsubscribeFromPlan(userId, planId)
      setUserPlans(prev => prev.filter(id => id !== planId))
    } catch (error) {
      console.error('Error unsubscribing from plan:', error)
      throw error
    }
  }

  useEffect(() => {
    if (userId) {
      loadPlans()
    }
  }, [userId])

  return {
    allPlans,
    userPlans,
    loading,
    loadPlans,
    subscribeToPlan,
    unsubscribeFromPlan,
    getRecommendedPlans: (user: User) => workoutPlansService.getRecommendedPlans(user),
    generatePersonalizedPlan: (user: User, preferences: any) => 
      workoutPlansService.generatePersonalizedPlan(user, preferences)
  }
}

import { useState, useEffect } from 'react'