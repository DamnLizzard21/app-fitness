import { WorkoutLog } from './types'

// Simulação de banco de dados para treinos
class WorkoutService {
  private workouts: WorkoutLog[] = []

  constructor() {
    // Carregar dados do localStorage se disponível
    if (typeof window !== 'undefined') {
      const savedWorkouts = localStorage.getItem('fitlife_workouts')
      if (savedWorkouts) {
        this.workouts = JSON.parse(savedWorkouts)
      }
    }
  }

  private saveToStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('fitlife_workouts', JSON.stringify(this.workouts))
    }
  }

  async getWorkouts(userId: string, fromDate?: string, toDate?: string): Promise<WorkoutLog[]> {
    let userWorkouts = this.workouts.filter(w => w.user_id === userId)

    if (fromDate) {
      userWorkouts = userWorkouts.filter(w => w.date >= fromDate)
    }

    if (toDate) {
      userWorkouts = userWorkouts.filter(w => w.date <= toDate)
    }

    return userWorkouts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  async getWorkout(id: string): Promise<WorkoutLog | null> {
    return this.workouts.find(w => w.id === id) || null
  }

  async createWorkout(workout: Omit<WorkoutLog, 'id' | 'created_at' | 'updated_at'>): Promise<WorkoutLog> {
    const newWorkout: WorkoutLog = {
      ...workout,
      id: Date.now().toString(),
      created_at: new Date(),
      updated_at: new Date()
    }

    this.workouts.push(newWorkout)
    this.saveToStorage()

    return newWorkout
  }

  async updateWorkout(id: string, updates: Partial<WorkoutLog>): Promise<WorkoutLog | null> {
    const index = this.workouts.findIndex(w => w.id === id)
    
    if (index === -1) {
      return null
    }

    const updatedWorkout = {
      ...this.workouts[index],
      ...updates,
      updated_at: new Date()
    }

    this.workouts[index] = updatedWorkout
    this.saveToStorage()

    return updatedWorkout
  }

  async deleteWorkout(id: string): Promise<boolean> {
    const index = this.workouts.findIndex(w => w.id === id)
    
    if (index === -1) {
      return false
    }

    this.workouts.splice(index, 1)
    this.saveToStorage()

    return true
  }

  async duplicateWorkout(id: string): Promise<WorkoutLog | null> {
    const original = await this.getWorkout(id)
    
    if (!original) {
      return null
    }

    const duplicate = await this.createWorkout({
      user_id: original.user_id,
      date: new Date().toISOString().split('T')[0],
      type: original.type,
      exercises: original.exercises.map(ex => ({ ...ex })),
      notes: original.notes,
      calories: original.calories,
      tags: [...original.tags]
    })

    return duplicate
  }

  // Método para criar dados de exemplo
  async createSampleData(userId: string): Promise<void> {
    const sampleWorkouts = [
      {
        user_id: userId,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 dia atrás
        type: 'strength',
        exercises: [
          {
            name: 'Supino reto',
            sets: 3,
            reps: 10,
            weight: 60,
            distance: 0,
            duration_sec: 0,
            rpe: 7
          },
          {
            name: 'Agachamento',
            sets: 3,
            reps: 12,
            weight: 80,
            distance: 0,
            duration_sec: 0,
            rpe: 8
          }
        ],
        notes: 'Treino de força - membros superiores e inferiores',
        calories: 350,
        tags: ['força', 'hipertrofia']
      },
      {
        user_id: userId,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 dias atrás
        type: 'cardio',
        exercises: [
          {
            name: 'Corrida',
            sets: 1,
            reps: 1,
            weight: 0,
            distance: 5000,
            duration_sec: 1800, // 30 minutos
            rpe: 6
          }
        ],
        notes: 'Corrida matinal no parque',
        calories: 400,
        tags: ['cardio', 'resistência']
      },
      {
        user_id: userId,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 dias atrás
        type: 'flexibility',
        exercises: [
          {
            name: 'Yoga flow',
            sets: 1,
            reps: 1,
            weight: 0,
            distance: 0,
            duration_sec: 2700, // 45 minutos
            rpe: 4
          }
        ],
        notes: 'Sessão de yoga para flexibilidade',
        calories: 200,
        tags: ['flexibilidade', 'relaxamento']
      }
    ]

    for (const workout of sampleWorkouts) {
      await this.createWorkout(workout)
    }
  }
}

// Instância singleton
export const workoutService = new WorkoutService()

// Hook para usar workouts
export function useWorkouts(userId: string) {
  const [workouts, setWorkouts] = useState<WorkoutLog[]>([])
  const [loading, setLoading] = useState(true)

  const loadWorkouts = async (fromDate?: string, toDate?: string) => {
    setLoading(true)
    try {
      const data = await workoutService.getWorkouts(userId, fromDate, toDate)
      setWorkouts(data)
    } catch (error) {
      console.error('Error loading workouts:', error)
    } finally {
      setLoading(false)
    }
  }

  const createWorkout = async (workout: Omit<WorkoutLog, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newWorkout = await workoutService.createWorkout(workout)
      setWorkouts(prev => [newWorkout, ...prev])
      return newWorkout
    } catch (error) {
      console.error('Error creating workout:', error)
      throw error
    }
  }

  const updateWorkout = async (id: string, updates: Partial<WorkoutLog>) => {
    try {
      const updatedWorkout = await workoutService.updateWorkout(id, updates)
      if (updatedWorkout) {
        setWorkouts(prev => prev.map(w => w.id === id ? updatedWorkout : w))
      }
      return updatedWorkout
    } catch (error) {
      console.error('Error updating workout:', error)
      throw error
    }
  }

  const deleteWorkout = async (id: string) => {
    try {
      const success = await workoutService.deleteWorkout(id)
      if (success) {
        setWorkouts(prev => prev.filter(w => w.id !== id))
      }
      return success
    } catch (error) {
      console.error('Error deleting workout:', error)
      throw error
    }
  }

  const duplicateWorkout = async (id: string) => {
    try {
      const duplicated = await workoutService.duplicateWorkout(id)
      if (duplicated) {
        setWorkouts(prev => [duplicated, ...prev])
      }
      return duplicated
    } catch (error) {
      console.error('Error duplicating workout:', error)
      throw error
    }
  }

  useEffect(() => {
    if (userId) {
      loadWorkouts()
    }
  }, [userId])

  return {
    workouts,
    loading,
    loadWorkouts,
    createWorkout,
    updateWorkout,
    deleteWorkout,
    duplicateWorkout
  }
}

// Importar React hooks
import { useState, useEffect } from 'react'