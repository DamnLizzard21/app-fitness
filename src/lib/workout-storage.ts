import { WorkoutLog } from './types'

// Simulação de banco de dados em memória para treinos
let workoutLogs: WorkoutLog[] = []

// Função para criar um novo treino
export async function createWorkoutLog(
  workoutLog: Omit<WorkoutLog, 'id' | 'created_at' | 'updated_at'>
): Promise<{ success: boolean; workoutLog?: WorkoutLog; error?: string }> {
  try {
    const newWorkoutLog: WorkoutLog = {
      ...workoutLog,
      id: Date.now().toString(),
      created_at: new Date(),
      updated_at: new Date()
    }

    workoutLogs.push(newWorkoutLog)
    
    return { success: true, workoutLog: newWorkoutLog }
  } catch (error) {
    return { success: false, error: 'Erro ao criar treino' }
  }
}

// Função para obter treinos de um usuário
export async function getUserWorkoutLogs(
  userId: string,
  fromDate?: string,
  toDate?: string
): Promise<{ success: boolean; workoutLogs?: WorkoutLog[]; error?: string }> {
  try {
    let userWorkouts = workoutLogs.filter(log => log.user_id === userId)

    // Filtrar por data se fornecido
    if (fromDate) {
      userWorkouts = userWorkouts.filter(log => log.date >= fromDate)
    }
    if (toDate) {
      userWorkouts = userWorkouts.filter(log => log.date <= toDate)
    }

    // Ordenar por data (mais recente primeiro)
    userWorkouts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return { success: true, workoutLogs: userWorkouts }
  } catch (error) {
    return { success: false, error: 'Erro ao buscar treinos' }
  }
}

// Função para obter um treino específico
export async function getWorkoutLog(
  workoutId: string
): Promise<{ success: boolean; workoutLog?: WorkoutLog; error?: string }> {
  try {
    const workoutLog = workoutLogs.find(log => log.id === workoutId)
    
    if (!workoutLog) {
      return { success: false, error: 'Treino não encontrado' }
    }

    return { success: true, workoutLog }
  } catch (error) {
    return { success: false, error: 'Erro ao buscar treino' }
  }
}

// Função para atualizar um treino
export async function updateWorkoutLog(
  workoutId: string,
  updates: Partial<WorkoutLog>
): Promise<{ success: boolean; workoutLog?: WorkoutLog; error?: string }> {
  try {
    const workoutIndex = workoutLogs.findIndex(log => log.id === workoutId)
    
    if (workoutIndex === -1) {
      return { success: false, error: 'Treino não encontrado' }
    }

    workoutLogs[workoutIndex] = {
      ...workoutLogs[workoutIndex],
      ...updates,
      updated_at: new Date()
    }

    return { success: true, workoutLog: workoutLogs[workoutIndex] }
  } catch (error) {
    return { success: false, error: 'Erro ao atualizar treino' }
  }
}

// Função para excluir um treino
export async function deleteWorkoutLog(
  workoutId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const workoutIndex = workoutLogs.findIndex(log => log.id === workoutId)
    
    if (workoutIndex === -1) {
      return { success: false, error: 'Treino não encontrado' }
    }

    workoutLogs.splice(workoutIndex, 1)
    
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Erro ao excluir treino' }
  }
}

// Função para duplicar um treino
export async function duplicateWorkoutLog(
  workoutId: string,
  newDate: string
): Promise<{ success: boolean; workoutLog?: WorkoutLog; error?: string }> {
  try {
    const originalWorkout = workoutLogs.find(log => log.id === workoutId)
    
    if (!originalWorkout) {
      return { success: false, error: 'Treino não encontrado' }
    }

    const duplicatedWorkout: WorkoutLog = {
      ...originalWorkout,
      id: Date.now().toString(),
      date: newDate,
      created_at: new Date(),
      updated_at: new Date()
    }

    workoutLogs.push(duplicatedWorkout)
    
    return { success: true, workoutLog: duplicatedWorkout }
  } catch (error) {
    return { success: false, error: 'Erro ao duplicar treino' }
  }
}

// Função para obter treinos por período (para relatórios)
export async function getWorkoutsByPeriod(
  userId: string,
  period: 'week' | 'month' | 'year'
): Promise<{ success: boolean; workoutLogs?: WorkoutLog[]; error?: string }> {
  try {
    const now = new Date()
    let startDate: Date

    switch (period) {
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
        break
      case 'year':
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
        break
    }

    const userWorkouts = workoutLogs.filter(log => 
      log.user_id === userId && 
      new Date(log.date) >= startDate && 
      new Date(log.date) <= now
    )

    return { success: true, workoutLogs: userWorkouts }
  } catch (error) {
    return { success: false, error: 'Erro ao buscar treinos por período' }
  }
}

// Função para obter estatísticas de treinos
export async function getWorkoutStats(
  userId: string
): Promise<{ 
  success: boolean
  stats?: {
    totalWorkouts: number
    totalVolume: number
    totalDuration: number
    averageWorkoutsPerWeek: number
    favoriteExercises: Array<{ name: string; count: number }>
    workoutsByType: { [key: string]: number }
  }
  error?: string 
}> {
  try {
    const userWorkouts = workoutLogs.filter(log => log.user_id === userId)
    
    const totalWorkouts = userWorkouts.length
    
    // Calcular volume total
    const totalVolume = userWorkouts.reduce((sum, log) => {
      return sum + log.exercises.reduce((exerciseSum, exercise) => {
        if (exercise.sets && exercise.reps && exercise.weight) {
          return exerciseSum + (exercise.sets * exercise.reps * exercise.weight)
        }
        return exerciseSum
      }, 0)
    }, 0)

    // Calcular duração total
    const totalDuration = userWorkouts.reduce((sum, log) => {
      return sum + log.exercises.reduce((exerciseSum, exercise) => {
        return exerciseSum + (exercise.duration_sec || 0)
      }, 0)
    }, 0)

    // Calcular média de treinos por semana (últimos 30 dias)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const recentWorkouts = userWorkouts.filter(log => new Date(log.date) >= thirtyDaysAgo)
    const averageWorkoutsPerWeek = (recentWorkouts.length / 30) * 7

    // Exercícios favoritos
    const exerciseCount: { [key: string]: number } = {}
    userWorkouts.forEach(log => {
      log.exercises.forEach(exercise => {
        exerciseCount[exercise.name] = (exerciseCount[exercise.name] || 0) + 1
      })
    })
    const favoriteExercises = Object.entries(exerciseCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // Treinos por tipo
    const workoutsByType: { [key: string]: number } = {}
    userWorkouts.forEach(log => {
      workoutsByType[log.type] = (workoutsByType[log.type] || 0) + 1
    })

    return {
      success: true,
      stats: {
        totalWorkouts,
        totalVolume,
        totalDuration,
        averageWorkoutsPerWeek: Math.round(averageWorkoutsPerWeek * 10) / 10,
        favoriteExercises,
        workoutsByType
      }
    }
  } catch (error) {
    return { success: false, error: 'Erro ao calcular estatísticas' }
  }
}

// Função para criar dados de exemplo (seed)
export function seedWorkoutData(userId: string): void {
  const sampleWorkouts: Omit<WorkoutLog, 'id' | 'created_at' | 'updated_at'>[] = [
    {
      user_id: userId,
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      type: 'strength',
      exercises: [
        { name: 'Supino reto', sets: 4, reps: 10, weight: 80, rpe: 8 },
        { name: 'Agachamento', sets: 4, reps: 12, weight: 100, rpe: 7 },
        { name: 'Remada curvada', sets: 3, reps: 10, weight: 70, rpe: 8 }
      ],
      notes: 'Treino focado em força',
      calories: 350,
      tags: ['força', 'hipertrofia']
    },
    {
      user_id: userId,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      type: 'cardio',
      exercises: [
        { name: 'Corrida', distance: 5, duration_sec: 1800, rpe: 6 },
        { name: 'Burpees', sets: 3, reps: 15, rpe: 9 }
      ],
      notes: 'Cardio matinal',
      calories: 450,
      tags: ['cardio', 'queima de gordura']
    },
    {
      user_id: userId,
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      type: 'strength',
      exercises: [
        { name: 'Deadlift', sets: 5, reps: 5, weight: 120, rpe: 9 },
        { name: 'Pull-ups', sets: 4, reps: 8, rpe: 8 },
        { name: 'Dips', sets: 3, reps: 12, rpe: 7 }
      ],
      notes: 'Treino de força máxima',
      calories: 320,
      tags: ['força', 'powerlifting']
    },
    {
      user_id: userId,
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      type: 'mobility',
      exercises: [
        { name: 'Yoga flow', duration_sec: 2400, rpe: 4 },
        { name: 'Alongamento dinâmico', duration_sec: 600, rpe: 3 }
      ],
      notes: 'Dia de recuperação ativa',
      calories: 150,
      tags: ['mobilidade', 'recuperação']
    },
    {
      user_id: userId,
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      type: 'mixed',
      exercises: [
        { name: 'Kettlebell swings', sets: 4, reps: 20, weight: 16, rpe: 8 },
        { name: 'Mountain climbers', sets: 3, reps: 30, rpe: 7 },
        { name: 'Plank', sets: 3, duration_sec: 60, rpe: 6 }
      ],
      notes: 'Treino funcional',
      calories: 280,
      tags: ['funcional', 'HIIT']
    },
    {
      user_id: userId,
      date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      type: 'strength',
      exercises: [
        { name: 'Leg press', sets: 4, reps: 15, weight: 200, rpe: 8 },
        { name: 'Leg curl', sets: 3, reps: 12, weight: 50, rpe: 7 },
        { name: 'Panturrilha', sets: 4, reps: 20, weight: 80, rpe: 6 }
      ],
      notes: 'Treino de pernas',
      calories: 300,
      tags: ['pernas', 'hipertrofia']
    },
    {
      user_id: userId,
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      type: 'cardio',
      exercises: [
        { name: 'Bicicleta', distance: 15, duration_sec: 2700, rpe: 5 },
        { name: 'Jumping jacks', sets: 3, reps: 50, rpe: 6 }
      ],
      notes: 'Cardio de baixa intensidade',
      calories: 400,
      tags: ['cardio', 'resistência']
    }
  ]

  // Adicionar treinos de exemplo
  sampleWorkouts.forEach(workout => {
    createWorkoutLog(workout)
  })
}