import { WorkoutLog, Exercise, WorkoutTemplate } from './types'

// Validações para treinos
export function validateWorkoutLog(workoutLog: Partial<WorkoutLog>): string[] {
  const errors: string[] = []

  if (!workoutLog.date) {
    errors.push('Data é obrigatória')
  } else {
    const date = new Date(workoutLog.date)
    if (isNaN(date.getTime())) {
      errors.push('Data inválida')
    }
  }

  if (!workoutLog.type || workoutLog.type.trim().length === 0) {
    errors.push('Tipo de treino é obrigatório')
  }

  if (!workoutLog.exercises || workoutLog.exercises.length === 0) {
    errors.push('Pelo menos um exercício é obrigatório')
  } else {
    workoutLog.exercises.forEach((exercise, index) => {
      const exerciseErrors = validateExercise(exercise)
      exerciseErrors.forEach(error => {
        errors.push(`Exercício ${index + 1}: ${error}`)
      })
    })
  }

  return errors
}

export function validateExercise(exercise: Partial<Exercise>): string[] {
  const errors: string[] = []

  if (!exercise.name || exercise.name.trim().length === 0) {
    errors.push('Nome do exercício é obrigatório')
  }

  if (exercise.sets !== undefined && exercise.sets < 0) {
    errors.push('Número de séries deve ser positivo')
  }

  if (exercise.reps !== undefined && exercise.reps < 0) {
    errors.push('Número de repetições deve ser positivo')
  }

  if (exercise.weight !== undefined && exercise.weight < 0) {
    errors.push('Peso deve ser positivo')
  }

  if (exercise.distance !== undefined && exercise.distance < 0) {
    errors.push('Distância deve ser positiva')
  }

  if (exercise.duration_sec !== undefined && exercise.duration_sec < 0) {
    errors.push('Duração deve ser positiva')
  }

  if (exercise.rpe !== undefined && (exercise.rpe < 1 || exercise.rpe > 10)) {
    errors.push('RPE deve estar entre 1 e 10')
  }

  return errors
}

// Cálculos de métricas de treino
export function calculateWorkoutMetrics(workoutLogs: WorkoutLog[]) {
  const totalWorkouts = workoutLogs.length
  const totalCalories = workoutLogs.reduce((sum, log) => sum + (log.calories || 0), 0)
  
  // Volume total (peso x séries x reps)
  const totalVolume = workoutLogs.reduce((sum, log) => {
    return sum + log.exercises.reduce((exerciseSum, exercise) => {
      return exerciseSum + (exercise.weight * exercise.sets * exercise.reps)
    }, 0)
  }, 0)

  // Tempo total de treino
  const totalDuration = workoutLogs.reduce((sum, log) => {
    return sum + log.exercises.reduce((exerciseSum, exercise) => {
      return exerciseSum + exercise.duration_sec
    }, 0)
  }, 0)

  // Frequência por tipo de treino
  const workoutTypes = workoutLogs.reduce((acc, log) => {
    acc[log.type] = (acc[log.type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Exercícios mais frequentes
  const exerciseFrequency = workoutLogs.reduce((acc, log) => {
    log.exercises.forEach(exercise => {
      acc[exercise.name] = (acc[exercise.name] || 0) + 1
    })
    return acc
  }, {} as Record<string, number>)

  return {
    totalWorkouts,
    totalCalories,
    totalVolume,
    totalDuration,
    workoutTypes,
    exerciseFrequency,
    averageCaloriesPerWorkout: totalWorkouts > 0 ? Math.round(totalCalories / totalWorkouts) : 0,
    averageDurationPerWorkout: totalWorkouts > 0 ? Math.round(totalDuration / totalWorkouts) : 0
  }
}

// Geração de relatórios
export function generateWeeklyReport(workoutLogs: WorkoutLog[], startDate: Date) {
  const endDate = new Date(startDate)
  endDate.setDate(endDate.getDate() + 6)

  const weekLogs = workoutLogs.filter(log => {
    const logDate = new Date(log.date)
    return logDate >= startDate && logDate <= endDate
  })

  const metrics = calculateWorkoutMetrics(weekLogs)

  return {
    period: {
      start: startDate.toISOString().split('T')[0],
      end: endDate.toISOString().split('T')[0]
    },
    ...metrics,
    workoutsPerDay: weekLogs.reduce((acc, log) => {
      acc[log.date] = (acc[log.date] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  }
}

// Templates de treino
export const workoutTemplates: WorkoutTemplate[] = [
  {
    id: 'upper-body-beginner',
    name: 'Treino de Membros Superiores - Iniciante',
    type: 'strength',
    estimated_duration: 45 * 60, // 45 minutos em segundos
    difficulty: 'beginner',
    exercises: [
      {
        name: 'Flexão de braço (joelhos)',
        sets: 3,
        reps: 8,
        weight: 0,
        distance: 0,
        duration_sec: 0,
        rpe: 6
      },
      {
        name: 'Remada com elástico',
        sets: 3,
        reps: 12,
        weight: 0,
        distance: 0,
        duration_sec: 0,
        rpe: 6
      },
      {
        name: 'Desenvolvimento com halteres',
        sets: 3,
        reps: 10,
        weight: 5,
        distance: 0,
        duration_sec: 0,
        rpe: 7
      }
    ]
  },
  {
    id: 'cardio-hiit',
    name: 'HIIT Cardio',
    type: 'cardio',
    estimated_duration: 20 * 60,
    difficulty: 'intermediate',
    exercises: [
      {
        name: 'Burpees',
        sets: 4,
        reps: 10,
        weight: 0,
        distance: 0,
        duration_sec: 30,
        rpe: 8
      },
      {
        name: 'Mountain Climbers',
        sets: 4,
        reps: 20,
        weight: 0,
        distance: 0,
        duration_sec: 30,
        rpe: 8
      },
      {
        name: 'Jumping Jacks',
        sets: 4,
        reps: 30,
        weight: 0,
        distance: 0,
        duration_sec: 30,
        rpe: 7
      }
    ]
  }
]

// Função para duplicar treino
export function duplicateWorkout(workoutLog: WorkoutLog): Omit<WorkoutLog, 'id' | 'created_at' | 'updated_at'> {
  return {
    user_id: workoutLog.user_id,
    date: new Date().toISOString().split('T')[0], // Data atual
    type: workoutLog.type,
    exercises: workoutLog.exercises.map(exercise => ({ ...exercise })),
    notes: workoutLog.notes,
    calories: workoutLog.calories,
    tags: [...workoutLog.tags]
  }
}

// Função para exportar dados para CSV
export function exportWorkoutsToCSV(workoutLogs: WorkoutLog[]): string {
  const headers = [
    'Data',
    'Tipo',
    'Exercício',
    'Séries',
    'Repetições',
    'Peso (kg)',
    'Distância (m)',
    'Duração (s)',
    'RPE',
    'Calorias',
    'Observações'
  ]

  const rows = workoutLogs.flatMap(log => 
    log.exercises.map(exercise => [
      log.date,
      log.type,
      exercise.name,
      exercise.sets.toString(),
      exercise.reps.toString(),
      exercise.weight.toString(),
      exercise.distance.toString(),
      exercise.duration_sec.toString(),
      exercise.rpe.toString(),
      (log.calories || 0).toString(),
      log.notes || ''
    ])
  )

  const csvContent = [headers, ...rows]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n')

  return csvContent
}