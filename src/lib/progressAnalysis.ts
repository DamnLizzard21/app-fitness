import { ProgressMetrics, User, WorkoutLog } from './types'

// Serviço de análise de progresso avançada
class ProgressAnalysisService {
  private progressData: Record<string, ProgressMetrics[]> = {}

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fitlife_progress_data')
      if (saved) {
        this.progressData = JSON.parse(saved)
      }
    }
  }

  private saveToStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('fitlife_progress_data', JSON.stringify(this.progressData))
    }
  }

  async addProgressEntry(userId: string, entry: Omit<ProgressMetrics, 'date'> & { date?: string }): Promise<ProgressMetrics> {
    if (!this.progressData[userId]) {
      this.progressData[userId] = []
    }

    const progressEntry: ProgressMetrics = {
      date: entry.date || new Date().toISOString().split('T')[0],
      ...entry
    }

    this.progressData[userId].push(progressEntry)
    this.progressData[userId].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    
    this.saveToStorage()
    return progressEntry
  }

  getUserProgress(userId: string): ProgressMetrics[] {
    return this.progressData[userId] || []
  }

  // Análise de tendências de peso
  analyzeWeightTrend(userId: string, days: number = 30): {
    trend: 'increasing' | 'decreasing' | 'stable'
    change: number
    changePercentage: number
    weeklyAverage: number
  } {
    const progress = this.getUserProgress(userId)
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)

    const recentEntries = progress
      .filter(p => p.weight && new Date(p.date) >= cutoffDate)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    if (recentEntries.length < 2) {
      return {
        trend: 'stable',
        change: 0,
        changePercentage: 0,
        weeklyAverage: 0
      }
    }

    const firstWeight = recentEntries[0].weight!
    const lastWeight = recentEntries[recentEntries.length - 1].weight!
    const change = lastWeight - firstWeight
    const changePercentage = (change / firstWeight) * 100

    let trend: 'increasing' | 'decreasing' | 'stable' = 'stable'
    if (Math.abs(changePercentage) > 1) { // Mudança significativa > 1%
      trend = change > 0 ? 'increasing' : 'decreasing'
    }

    const weeklyAverage = change / (days / 7)

    return {
      trend,
      change: Math.round(change * 10) / 10,
      changePercentage: Math.round(changePercentage * 10) / 10,
      weeklyAverage: Math.round(weeklyAverage * 10) / 10
    }
  }

  // Análise de composição corporal
  analyzeBodyComposition(userId: string): {
    latestBodyFat?: number
    latestMuscleMass?: number
    bodyFatTrend: 'improving' | 'declining' | 'stable'
    muscleMassTrend: 'improving' | 'declining' | 'stable'
  } {
    const progress = this.getUserProgress(userId)
    const recentEntries = progress
      .filter(p => p.body_fat || p.muscle_mass)
      .slice(-5) // Últimas 5 medições

    if (recentEntries.length === 0) {
      return {
        bodyFatTrend: 'stable',
        muscleMassTrend: 'stable'
      }
    }

    const latest = recentEntries[recentEntries.length - 1]
    
    let bodyFatTrend: 'improving' | 'declining' | 'stable' = 'stable'
    let muscleMassTrend: 'improving' | 'declining' | 'stable' = 'stable'

    if (recentEntries.length >= 2) {
      const first = recentEntries[0]
      
      if (latest.body_fat && first.body_fat) {
        const fatChange = latest.body_fat - first.body_fat
        bodyFatTrend = fatChange < -0.5 ? 'improving' : fatChange > 0.5 ? 'declining' : 'stable'
      }

      if (latest.muscle_mass && first.muscle_mass) {
        const muscleChange = latest.muscle_mass - first.muscle_mass
        muscleMassTrend = muscleChange > 0.5 ? 'improving' : muscleChange < -0.5 ? 'declining' : 'stable'
      }
    }

    return {
      latestBodyFat: latest.body_fat,
      latestMuscleMass: latest.muscle_mass,
      bodyFatTrend,
      muscleMassTrend
    }
  }

  // Análise de medidas corporais
  analyzeMeasurements(userId: string): {
    latest?: ProgressMetrics['measurements']
    trends: Record<string, 'increasing' | 'decreasing' | 'stable'>
  } {
    const progress = this.getUserProgress(userId)
    const entriesWithMeasurements = progress.filter(p => p.measurements)

    if (entriesWithMeasurements.length === 0) {
      return { trends: {} }
    }

    const latest = entriesWithMeasurements[entriesWithMeasurements.length - 1]
    const trends: Record<string, 'increasing' | 'decreasing' | 'stable'> = {}

    if (entriesWithMeasurements.length >= 2) {
      const first = entriesWithMeasurements[0]
      const measurements = ['chest', 'waist', 'hips', 'arms', 'thighs'] as const

      measurements.forEach(measurement => {
        if (latest.measurements?.[measurement] && first.measurements?.[measurement]) {
          const change = latest.measurements[measurement]! - first.measurements[measurement]!
          const changePercentage = Math.abs(change / first.measurements[measurement]!) * 100
          
          if (changePercentage > 2) { // Mudança significativa > 2%
            trends[measurement] = change > 0 ? 'increasing' : 'decreasing'
          } else {
            trends[measurement] = 'stable'
          }
        }
      })
    }

    return {
      latest: latest.measurements,
      trends
    }
  }

  // Análise de performance nos treinos
  analyzeWorkoutPerformance(workouts: WorkoutLog[]): {
    volumeTrend: 'increasing' | 'decreasing' | 'stable'
    intensityTrend: 'increasing' | 'decreasing' | 'stable'
    consistencyScore: number
    averageRPE: number
    strongestMuscleGroups: string[]
    improvementAreas: string[]
  } {
    if (workouts.length === 0) {
      return {
        volumeTrend: 'stable',
        intensityTrend: 'stable',
        consistencyScore: 0,
        averageRPE: 0,
        strongestMuscleGroups: [],
        improvementAreas: []
      }
    }

    // Análise de volume (peso x séries x reps)
    const recentWorkouts = workouts.slice(-10)
    const volumes = recentWorkouts.map(w => 
      w.exercises.reduce((sum, ex) => sum + (ex.weight * ex.sets * ex.reps), 0)
    )

    let volumeTrend: 'increasing' | 'decreasing' | 'stable' = 'stable'
    if (volumes.length >= 2) {
      const firstHalf = volumes.slice(0, Math.floor(volumes.length / 2))
      const secondHalf = volumes.slice(Math.floor(volumes.length / 2))
      
      const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length
      const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length
      
      const volumeChange = (secondAvg - firstAvg) / firstAvg * 100
      volumeTrend = volumeChange > 5 ? 'increasing' : volumeChange < -5 ? 'decreasing' : 'stable'
    }

    // Análise de intensidade (RPE médio)
    const allRPEs = workouts.flatMap(w => w.exercises.map(ex => ex.rpe)).filter(rpe => rpe > 0)
    const averageRPE = allRPEs.length > 0 ? allRPEs.reduce((a, b) => a + b, 0) / allRPEs.length : 0

    const recentRPEs = recentWorkouts.flatMap(w => w.exercises.map(ex => ex.rpe)).filter(rpe => rpe > 0)
    const oldRPEs = workouts.slice(0, -10).flatMap(w => w.exercises.map(ex => ex.rpe)).filter(rpe => rpe > 0)
    
    let intensityTrend: 'increasing' | 'decreasing' | 'stable' = 'stable'
    if (recentRPEs.length > 0 && oldRPEs.length > 0) {
      const recentAvgRPE = recentRPEs.reduce((a, b) => a + b, 0) / recentRPEs.length
      const oldAvgRPE = oldRPEs.reduce((a, b) => a + b, 0) / oldRPEs.length
      
      const rpeChange = recentAvgRPE - oldAvgRPE
      intensityTrend = rpeChange > 0.5 ? 'increasing' : rpeChange < -0.5 ? 'decreasing' : 'stable'
    }

    // Score de consistência (baseado na regularidade dos treinos)
    const last30Days = new Date()
    last30Days.setDate(last30Days.getDate() - 30)
    const recentWorkoutDates = workouts
      .filter(w => new Date(w.date) >= last30Days)
      .map(w => w.date)
    
    const consistencyScore = Math.min((recentWorkoutDates.length / 12) * 100, 100) // 12 treinos em 30 dias = 100%

    // Análise de grupos musculares (simplificada)
    const exerciseFrequency: Record<string, number> = {}
    workouts.forEach(w => {
      w.exercises.forEach(ex => {
        exerciseFrequency[ex.name] = (exerciseFrequency[ex.name] || 0) + 1
      })
    })

    const sortedExercises = Object.entries(exerciseFrequency)
      .sort(([,a], [,b]) => b - a)
    
    const strongestMuscleGroups = sortedExercises.slice(0, 3).map(([name]) => name)
    const improvementAreas = sortedExercises.slice(-3).map(([name]) => name)

    return {
      volumeTrend,
      intensityTrend,
      consistencyScore: Math.round(consistencyScore),
      averageRPE: Math.round(averageRPE * 10) / 10,
      strongestMuscleGroups,
      improvementAreas
    }
  }

  // Gerar relatório completo de progresso
  generateProgressReport(userId: string, workouts: WorkoutLog[]): {
    period: string
    weightAnalysis: ReturnType<typeof this.analyzeWeightTrend>
    bodyComposition: ReturnType<typeof this.analyzeBodyComposition>
    measurements: ReturnType<typeof this.analyzeMeasurements>
    workoutPerformance: ReturnType<typeof this.analyzeWorkoutPerformance>
    recommendations: string[]
  } {
    const weightAnalysis = this.analyzeWeightTrend(userId)
    const bodyComposition = this.analyzeBodyComposition(userId)
    const measurements = this.analyzeMeasurements(userId)
    const workoutPerformance = this.analyzeWorkoutPerformance(workouts)

    const recommendations: string[] = []

    // Gerar recomendações baseadas na análise
    if (weightAnalysis.trend === 'increasing' && weightAnalysis.changePercentage > 2) {
      recommendations.push('Considere ajustar sua dieta para controlar o ganho de peso')
    } else if (weightAnalysis.trend === 'decreasing' && weightAnalysis.changePercentage < -5) {
      recommendations.push('Monitore sua perda de peso para garantir que seja saudável')
    }

    if (workoutPerformance.consistencyScore < 60) {
      recommendations.push('Tente manter uma rotina mais consistente de treinos')
    }

    if (workoutPerformance.volumeTrend === 'decreasing') {
      recommendations.push('Considere aumentar gradualmente a intensidade dos treinos')
    }

    if (bodyComposition.bodyFatTrend === 'declining' && bodyComposition.muscleMassTrend === 'declining') {
      recommendations.push('Foque em exercícios de força para preservar massa muscular')
    }

    if (recommendations.length === 0) {
      recommendations.push('Continue com o excelente trabalho! Seus resultados estão consistentes.')
    }

    return {
      period: 'Últimos 30 dias',
      weightAnalysis,
      bodyComposition,
      measurements,
      workoutPerformance,
      recommendations
    }
  }
}

export const progressAnalysisService = new ProgressAnalysisService()

// Hook para usar análise de progresso
export function useProgressAnalysis(userId: string) {
  const [progressData, setProgressData] = useState<ProgressMetrics[]>([])
  const [loading, setLoading] = useState(true)

  const loadProgress = () => {
    setLoading(true)
    try {
      const data = progressAnalysisService.getUserProgress(userId)
      setProgressData(data)
    } catch (error) {
      console.error('Error loading progress:', error)
    } finally {
      setLoading(false)
    }
  }

  const addProgressEntry = async (entry: Omit<ProgressMetrics, 'date'> & { date?: string }) => {
    try {
      const newEntry = await progressAnalysisService.addProgressEntry(userId, entry)
      setProgressData(prev => [...prev, newEntry].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      ))
      return newEntry
    } catch (error) {
      console.error('Error adding progress entry:', error)
      throw error
    }
  }

  const generateReport = (workouts: WorkoutLog[]) => {
    return progressAnalysisService.generateProgressReport(userId, workouts)
  }

  useEffect(() => {
    if (userId) {
      loadProgress()
    }
  }, [userId])

  return {
    progressData,
    loading,
    loadProgress,
    addProgressEntry,
    generateReport,
    analyzeWeightTrend: (days?: number) => progressAnalysisService.analyzeWeightTrend(userId, days),
    analyzeBodyComposition: () => progressAnalysisService.analyzeBodyComposition(userId),
    analyzeMeasurements: () => progressAnalysisService.analyzeMeasurements(userId)
  }
}

import { useState, useEffect } from 'react'