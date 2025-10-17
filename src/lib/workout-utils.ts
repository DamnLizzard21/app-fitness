import { WorkoutLog, Exercise } from './types'

// Função para validar dados do treino
export function validateWorkoutLog(workoutLog: Partial<WorkoutLog>): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!workoutLog.date) {
    errors.push('Data é obrigatória')
  }

  if (!workoutLog.type) {
    errors.push('Tipo de treino é obrigatório')
  }

  if (!workoutLog.exercises || workoutLog.exercises.length === 0) {
    errors.push('Pelo menos um exercício é obrigatório')
  }

  // Validar exercícios
  if (workoutLog.exercises) {
    workoutLog.exercises.forEach((exercise, index) => {
      if (!exercise.name || exercise.name.trim() === '') {
        errors.push(`Nome do exercício ${index + 1} é obrigatório`)
      }

      // Validar RPE se fornecido
      if (exercise.rpe !== undefined && (exercise.rpe < 1 || exercise.rpe > 10)) {
        errors.push(`RPE do exercício ${index + 1} deve estar entre 1 e 10`)
      }

      // Validar valores numéricos
      if (exercise.sets !== undefined && exercise.sets < 0) {
        errors.push(`Número de séries do exercício ${index + 1} deve ser positivo`)
      }

      if (exercise.reps !== undefined && exercise.reps < 0) {
        errors.push(`Número de repetições do exercício ${index + 1} deve ser positivo`)
      }

      if (exercise.weight !== undefined && exercise.weight < 0) {
        errors.push(`Peso do exercício ${index + 1} deve ser positivo`)
      }

      if (exercise.distance !== undefined && exercise.distance < 0) {
        errors.push(`Distância do exercício ${index + 1} deve ser positiva`)
      }

      if (exercise.duration_sec !== undefined && exercise.duration_sec < 0) {
        errors.push(`Duração do exercício ${index + 1} deve ser positiva`)
      }
    })
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Função para calcular volume total do treino
export function calculateWorkoutVolume(exercises: Exercise[]): number {
  return exercises.reduce((total, exercise) => {
    if (exercise.sets && exercise.reps && exercise.weight) {
      return total + (exercise.sets * exercise.reps * exercise.weight)
    }
    return total
  }, 0)
}

// Função para calcular duração total do treino
export function calculateWorkoutDuration(exercises: Exercise[]): number {
  return exercises.reduce((total, exercise) => {
    if (exercise.duration_sec) {
      return total + exercise.duration_sec
    }
    return total
  }, 0)
}

// Função para estimar calorias queimadas (estimativa básica)
export function estimateCaloriesBurned(
  workoutType: WorkoutLog['type'],
  durationMinutes: number,
  userWeight: number = 70 // peso padrão em kg
): number {
  // MET values (Metabolic Equivalent of Task)
  const metValues = {
    strength: 6.0,
    cardio: 8.0,
    mobility: 3.0,
    mixed: 6.5
  }

  const met = metValues[workoutType]
  // Fórmula: Calorias = MET × peso(kg) × tempo(horas)
  const calories = met * userWeight * (durationMinutes / 60)
  
  return Math.round(calories)
}

// Função para obter exercícios mais populares
export function getPopularExercises(workoutLogs: WorkoutLog[]): Array<{ name: string; count: number }> {
  const exerciseCount: { [key: string]: number } = {}

  workoutLogs.forEach(log => {
    log.exercises.forEach(exercise => {
      const name = exercise.name.toLowerCase().trim()
      exerciseCount[name] = (exerciseCount[name] || 0) + 1
    })
  })

  return Object.entries(exerciseCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10) // Top 10
}

// Função para calcular estatísticas semanais
export function calculateWeeklyStats(workoutLogs: WorkoutLog[]): {
  totalWorkouts: number
  totalVolume: number
  totalDuration: number
  averageRPE: number
  workoutsByType: { [key: string]: number }
} {
  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  const weeklyLogs = workoutLogs.filter(log => {
    const logDate = new Date(log.date)
    return logDate >= weekAgo && logDate <= now
  })

  const totalWorkouts = weeklyLogs.length
  const totalVolume = weeklyLogs.reduce((sum, log) => sum + calculateWorkoutVolume(log.exercises), 0)
  const totalDuration = weeklyLogs.reduce((sum, log) => sum + calculateWorkoutDuration(log.exercises), 0)

  // Calcular RPE médio
  let totalRPE = 0
  let rpeCount = 0
  weeklyLogs.forEach(log => {
    log.exercises.forEach(exercise => {
      if (exercise.rpe) {
        totalRPE += exercise.rpe
        rpeCount++
      }
    })
  })
  const averageRPE = rpeCount > 0 ? totalRPE / rpeCount : 0

  // Contar treinos por tipo
  const workoutsByType: { [key: string]: number } = {}
  weeklyLogs.forEach(log => {
    workoutsByType[log.type] = (workoutsByType[log.type] || 0) + 1
  })

  return {
    totalWorkouts,
    totalVolume,
    totalDuration,
    averageRPE: Math.round(averageRPE * 10) / 10,
    workoutsByType
  }
}

// Função para calcular estatísticas mensais
export function calculateMonthlyStats(workoutLogs: WorkoutLog[]): {
  totalWorkouts: number
  totalVolume: number
  totalDuration: number
  averageWorkoutsPerWeek: number
  progressionTrend: 'increasing' | 'decreasing' | 'stable'
} {
  const now = new Date()
  const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())

  const monthlyLogs = workoutLogs.filter(log => {
    const logDate = new Date(log.date)
    return logDate >= monthAgo && logDate <= now
  })

  const totalWorkouts = monthlyLogs.length
  const totalVolume = monthlyLogs.reduce((sum, log) => sum + calculateWorkoutVolume(log.exercises), 0)
  const totalDuration = monthlyLogs.reduce((sum, log) => sum + calculateWorkoutDuration(log.exercises), 0)
  const averageWorkoutsPerWeek = totalWorkouts / 4

  // Calcular tendência de progressão (comparar primeira e segunda metade do mês)
  const midPoint = new Date(monthAgo.getTime() + (now.getTime() - monthAgo.getTime()) / 2)
  const firstHalf = monthlyLogs.filter(log => new Date(log.date) < midPoint)
  const secondHalf = monthlyLogs.filter(log => new Date(log.date) >= midPoint)

  const firstHalfVolume = firstHalf.reduce((sum, log) => sum + calculateWorkoutVolume(log.exercises), 0)
  const secondHalfVolume = secondHalf.reduce((sum, log) => sum + calculateWorkoutVolume(log.exercises), 0)

  let progressionTrend: 'increasing' | 'decreasing' | 'stable' = 'stable'
  if (secondHalfVolume > firstHalfVolume * 1.1) {
    progressionTrend = 'increasing'
  } else if (secondHalfVolume < firstHalfVolume * 0.9) {
    progressionTrend = 'decreasing'
  }

  return {
    totalWorkouts,
    totalVolume,
    totalDuration,
    averageWorkoutsPerWeek: Math.round(averageWorkoutsPerWeek * 10) / 10,
    progressionTrend
  }
}

// Função para gerar dados para CSV
export function generateWorkoutCSV(workoutLogs: WorkoutLog[]): string {
  const headers = [
    'Data',
    'Tipo',
    'Exercício',
    'Séries',
    'Repetições',
    'Peso (kg)',
    'Distância (km)',
    'Duração (min)',
    'RPE',
    'Calorias',
    'Observações',
    'Tags'
  ]

  const rows = workoutLogs.flatMap(log => 
    log.exercises.map(exercise => [
      log.date,
      log.type,
      exercise.name,
      exercise.sets || '',
      exercise.reps || '',
      exercise.weight || '',
      exercise.distance || '',
      exercise.duration_sec ? Math.round(exercise.duration_sec / 60) : '',
      exercise.rpe || '',
      log.calories || '',
      log.notes || '',
      log.tags.join('; ')
    ])
  )

  const csvContent = [headers, ...rows]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n')

  return csvContent
}

// Função para detectar Personal Records (PRs)
export function detectPersonalRecords(
  workoutLogs: WorkoutLog[],
  exerciseName: string
): {
  maxWeight: { weight: number; date: string } | null
  maxVolume: { volume: number; date: string } | null
  maxReps: { reps: number; date: string } | null
} {
  let maxWeight: { weight: number; date: string } | null = null
  let maxVolume: { volume: number; date: string } | null = null
  let maxReps: { reps: number; date: string } | null = null

  workoutLogs.forEach(log => {
    log.exercises.forEach(exercise => {
      if (exercise.name.toLowerCase() === exerciseName.toLowerCase()) {
        // Verificar peso máximo
        if (exercise.weight && (!maxWeight || exercise.weight > maxWeight.weight)) {
          maxWeight = { weight: exercise.weight, date: log.date }
        }

        // Verificar volume máximo (peso × séries × reps)
        if (exercise.weight && exercise.sets && exercise.reps) {
          const volume = exercise.weight * exercise.sets * exercise.reps
          if (!maxVolume || volume > maxVolume.volume) {
            maxVolume = { volume, date: log.date }
          }
        }

        // Verificar repetições máximas
        if (exercise.reps && (!maxReps || exercise.reps > maxReps.reps)) {
          maxReps = { reps: exercise.reps, date: log.date }
        }
      }
    })
  })

  return { maxWeight, maxVolume, maxReps }
}

// Função para sugerir próximo treino baseado no histórico
export function suggestNextWorkout(workoutLogs: WorkoutLog[]): {
  suggestedType: WorkoutLog['type']
  reason: string
  restDaysRecommended: number
} {
  if (workoutLogs.length === 0) {
    return {
      suggestedType: 'strength',
      reason: 'Primeiro treino - começar com exercícios de força básicos',
      restDaysRecommended: 1
    }
  }

  const recentLogs = workoutLogs
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 7) // Últimos 7 treinos

  const lastWorkout = recentLogs[0]
  const daysSinceLastWorkout = Math.floor(
    (new Date().getTime() - new Date(lastWorkout.date).getTime()) / (1000 * 60 * 60 * 24)
  )

  // Contar tipos de treino recentes
  const typeCounts = recentLogs.reduce((acc, log) => {
    acc[log.type] = (acc[log.type] || 0) + 1
    return acc
  }, {} as { [key: string]: number })

  // Determinar tipo menos praticado
  const leastPracticedType = Object.entries(typeCounts)
    .sort(([,a], [,b]) => a - b)[0]?.[0] as WorkoutLog['type'] || 'strength'

  // Lógica de sugestão
  if (daysSinceLastWorkout >= 3) {
    return {
      suggestedType: 'cardio',
      reason: 'Retomar atividade após período de descanso',
      restDaysRecommended: 1
    }
  }

  if (lastWorkout.type === 'strength' && daysSinceLastWorkout >= 1) {
    return {
      suggestedType: 'cardio',
      reason: 'Alternar entre força e cardio para recuperação ativa',
      restDaysRecommended: 1
    }
  }

  if (lastWorkout.type === 'cardio' && daysSinceLastWorkout >= 1) {
    return {
      suggestedType: leastPracticedType,
      reason: `Focar no tipo de treino menos praticado recentemente: ${leastPracticedType}`,
      restDaysRecommended: 1
    }
  }

  return {
    suggestedType: 'mobility',
    reason: 'Treino de mobilidade para recuperação e flexibilidade',
    restDaysRecommended: 0
  }
}