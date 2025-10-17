import { Goal, User } from './types'

// Simulação de serviço de metas
class GoalsService {
  private goals: Goal[] = []

  constructor() {
    if (typeof window !== 'undefined') {
      const savedGoals = localStorage.getItem('fitlife_goals')
      if (savedGoals) {
        this.goals = JSON.parse(savedGoals)
      }
    }
  }

  private saveToStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('fitlife_goals', JSON.stringify(this.goals))
    }
  }

  async getUserGoals(userId: string): Promise<Goal[]> {
    return this.goals.filter(g => g.user_id === userId)
  }

  async createGoal(goal: Omit<Goal, 'id' | 'created_at' | 'updated_at'>): Promise<Goal> {
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString(),
      progress_percentage: 0,
      created_at: new Date(),
      updated_at: new Date()
    }

    this.goals.push(newGoal)
    this.saveToStorage()
    return newGoal
  }

  async updateGoal(id: string, updates: Partial<Goal>): Promise<Goal | null> {
    const index = this.goals.findIndex(g => g.id === id)
    if (index === -1) return null

    const updatedGoal = {
      ...this.goals[index],
      ...updates,
      updated_at: new Date()
    }

    // Calcular progresso automaticamente
    if (updatedGoal.current_value && updatedGoal.target_value) {
      updatedGoal.progress_percentage = Math.min(
        Math.round((updatedGoal.current_value / updatedGoal.target_value) * 100),
        100
      )
      
      // Marcar como completa se atingiu 100%
      if (updatedGoal.progress_percentage >= 100 && updatedGoal.status === 'active') {
        updatedGoal.status = 'completed'
      }
    }

    this.goals[index] = updatedGoal
    this.saveToStorage()
    return updatedGoal
  }

  async deleteGoal(id: string): Promise<boolean> {
    const index = this.goals.findIndex(g => g.id === id)
    if (index === -1) return false

    this.goals.splice(index, 1)
    this.saveToStorage()
    return true
  }

  // Metas pré-definidas baseadas no perfil do usuário
  async getSuggestedGoals(user: User): Promise<Partial<Goal>[]> {
    const suggestions: Partial<Goal>[] = []

    // Baseado no nível de fitness
    if (user.fitness_level === 'beginner') {
      suggestions.push({
        type: 'custom',
        title: 'Treinar 3x por semana',
        description: 'Estabelecer uma rotina consistente de exercícios',
        target_value: 12,
        unit: 'treinos',
        target_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dias
      })
    }

    // Baseado no IMC
    if (user.weight_kg && user.height_cm) {
      const bmi = user.weight_kg / ((user.height_cm / 100) ** 2)
      
      if (bmi > 25) {
        suggestions.push({
          type: 'weight_loss',
          title: 'Perder peso gradualmente',
          description: 'Meta saudável de perda de peso',
          target_value: Math.max(user.weight_kg * 0.1, 2), // 10% do peso ou 2kg
          unit: 'kg',
          target_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 dias
        })
      } else if (bmi < 18.5) {
        suggestions.push({
          type: 'weight_gain',
          title: 'Ganhar peso saudável',
          description: 'Meta de ganho de peso com foco em massa muscular',
          target_value: Math.min(user.weight_kg * 0.1, 5), // 10% do peso ou 5kg
          unit: 'kg',
          target_date: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000) // 120 dias
        })
      }
    }

    // Metas gerais
    suggestions.push(
      {
        type: 'endurance',
        title: 'Correr 5km sem parar',
        description: 'Desenvolver resistência cardiovascular',
        target_value: 5,
        unit: 'km',
        target_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
      },
      {
        type: 'strength',
        title: 'Aumentar força em 20%',
        description: 'Melhorar força nos exercícios principais',
        target_value: 20,
        unit: '%',
        target_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
      },
      {
        type: 'flexibility',
        title: 'Praticar yoga 2x por semana',
        description: 'Melhorar flexibilidade e bem-estar',
        target_value: 8,
        unit: 'sessões',
        target_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      }
    )

    return suggestions
  }

  // Atualizar progresso baseado em treinos
  async updateProgressFromWorkouts(userId: string, workouts: any[]): Promise<void> {
    const userGoals = await this.getUserGoals(userId)
    
    for (const goal of userGoals) {
      if (goal.status !== 'active') continue

      let newValue = goal.current_value || 0

      switch (goal.type) {
        case 'custom':
          if (goal.title.includes('treinar') || goal.title.includes('treino')) {
            newValue = workouts.length
          }
          break
        
        case 'endurance':
          const cardioWorkouts = workouts.filter(w => w.type === 'cardio')
          const totalDistance = cardioWorkouts.reduce((sum, w) => {
            return sum + w.exercises.reduce((exSum: number, ex: any) => exSum + (ex.distance || 0), 0)
          }, 0)
          newValue = Math.max(newValue, totalDistance / 1000) // converter para km
          break

        case 'strength':
          const strengthWorkouts = workouts.filter(w => w.type === 'strength')
          if (strengthWorkouts.length > 0) {
            // Calcular aumento médio de peso nos exercícios
            // Simplificado para demo
            newValue = Math.min(strengthWorkouts.length * 2, goal.target_value || 0)
          }
          break

        case 'flexibility':
          const flexWorkouts = workouts.filter(w => w.type === 'flexibility')
          newValue = flexWorkouts.length
          break
      }

      if (newValue !== goal.current_value) {
        await this.updateGoal(goal.id, { current_value: newValue })
      }
    }
  }
}

export const goalsService = new GoalsService()

// Hook para usar metas
export function useGoals(userId: string) {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)

  const loadGoals = async () => {
    setLoading(true)
    try {
      const data = await goalsService.getUserGoals(userId)
      setGoals(data)
    } catch (error) {
      console.error('Error loading goals:', error)
    } finally {
      setLoading(false)
    }
  }

  const createGoal = async (goal: Omit<Goal, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newGoal = await goalsService.createGoal(goal)
      setGoals(prev => [newGoal, ...prev])
      return newGoal
    } catch (error) {
      console.error('Error creating goal:', error)
      throw error
    }
  }

  const updateGoal = async (id: string, updates: Partial<Goal>) => {
    try {
      const updatedGoal = await goalsService.updateGoal(id, updates)
      if (updatedGoal) {
        setGoals(prev => prev.map(g => g.id === id ? updatedGoal : g))
      }
      return updatedGoal
    } catch (error) {
      console.error('Error updating goal:', error)
      throw error
    }
  }

  const deleteGoal = async (id: string) => {
    try {
      const success = await goalsService.deleteGoal(id)
      if (success) {
        setGoals(prev => prev.filter(g => g.id !== id))
      }
      return success
    } catch (error) {
      console.error('Error deleting goal:', error)
      throw error
    }
  }

  useEffect(() => {
    if (userId) {
      loadGoals()
    }
  }, [userId])

  return {
    goals,
    loading,
    loadGoals,
    createGoal,
    updateGoal,
    deleteGoal
  }
}

import { useState, useEffect } from 'react'