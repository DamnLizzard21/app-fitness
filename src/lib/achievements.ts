import { Achievement, User, WorkoutLog } from './types'

// Sistema de conquistas e gamificação
class AchievementsService {
  private achievements: Achievement[] = [
    {
      id: 'first-workout',
      name: 'Primeiro Passo',
      description: 'Complete seu primeiro treino',
      icon: 'Trophy',
      category: 'milestone',
      points: 10,
      requirements: {
        type: 'workout_count',
        value: 1
      }
    },
    {
      id: 'week-streak',
      name: 'Semana Consistente',
      description: 'Treine por 7 dias consecutivos',
      icon: 'Flame',
      category: 'consistency',
      points: 50,
      requirements: {
        type: 'streak_days',
        value: 7
      }
    },
    {
      id: 'month-warrior',
      name: 'Guerreiro do Mês',
      description: 'Complete 20 treinos em um mês',
      icon: 'Crown',
      category: 'workout',
      points: 100,
      requirements: {
        type: 'monthly_workouts',
        value: 20,
        timeframe: 'month'
      }
    },
    {
      id: 'strength-master',
      name: 'Mestre da Força',
      description: 'Complete 50 treinos de força',
      icon: 'Dumbbell',
      category: 'workout',
      points: 150,
      requirements: {
        type: 'strength_workouts',
        value: 50
      }
    },
    {
      id: 'cardio-king',
      name: 'Rei do Cardio',
      description: 'Complete 30 treinos de cardio',
      icon: 'Heart',
      category: 'workout',
      points: 120,
      requirements: {
        type: 'cardio_workouts',
        value: 30
      }
    },
    {
      id: 'flexibility-guru',
      name: 'Guru da Flexibilidade',
      description: 'Complete 25 treinos de flexibilidade',
      icon: 'Sparkles',
      category: 'workout',
      points: 100,
      requirements: {
        type: 'flexibility_workouts',
        value: 25
      }
    },
    {
      id: 'early-bird',
      name: 'Madrugador',
      description: 'Complete 10 treinos antes das 7h',
      icon: 'Sun',
      category: 'milestone',
      points: 75,
      requirements: {
        type: 'early_workouts',
        value: 10
      }
    },
    {
      id: 'weekend-warrior',
      name: 'Guerreiro de Fim de Semana',
      description: 'Treine em 10 fins de semana',
      icon: 'Calendar',
      category: 'consistency',
      points: 60,
      requirements: {
        type: 'weekend_workouts',
        value: 10
      }
    },
    {
      id: 'goal-crusher',
      name: 'Destruidor de Metas',
      description: 'Complete 5 metas pessoais',
      icon: 'Target',
      category: 'progress',
      points: 200,
      requirements: {
        type: 'completed_goals',
        value: 5
      }
    },
    {
      id: 'marathon-runner',
      name: 'Maratonista',
      description: 'Corra um total de 42km',
      icon: 'MapPin',
      category: 'milestone',
      points: 250,
      requirements: {
        type: 'total_distance',
        value: 42000 // em metros
      }
    }
  ]

  private userAchievements: Record<string, string[]> = {}

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fitlife_user_achievements')
      if (saved) {
        this.userAchievements = JSON.parse(saved)
      }
    }
  }

  private saveToStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('fitlife_user_achievements', JSON.stringify(this.userAchievements))
    }
  }

  getAllAchievements(): Achievement[] {
    return this.achievements
  }

  getUserAchievements(userId: string): string[] {
    return this.userAchievements[userId] || []
  }

  async checkAndUnlockAchievements(
    userId: string, 
    workouts: WorkoutLog[], 
    user: User,
    completedGoals: number = 0
  ): Promise<Achievement[]> {
    const userAchievements = this.getUserAchievements(userId)
    const newAchievements: Achievement[] = []

    for (const achievement of this.achievements) {
      if (userAchievements.includes(achievement.id)) continue

      let unlocked = false

      switch (achievement.requirements.type) {
        case 'workout_count':
          unlocked = workouts.length >= achievement.requirements.value
          break

        case 'streak_days':
          unlocked = (user.streak_days || 0) >= achievement.requirements.value
          break

        case 'monthly_workouts':
          const thisMonth = new Date()
          const monthStart = new Date(thisMonth.getFullYear(), thisMonth.getMonth(), 1)
          const monthWorkouts = workouts.filter(w => new Date(w.date) >= monthStart)
          unlocked = monthWorkouts.length >= achievement.requirements.value
          break

        case 'strength_workouts':
          const strengthCount = workouts.filter(w => w.type === 'strength').length
          unlocked = strengthCount >= achievement.requirements.value
          break

        case 'cardio_workouts':
          const cardioCount = workouts.filter(w => w.type === 'cardio').length
          unlocked = cardioCount >= achievement.requirements.value
          break

        case 'flexibility_workouts':
          const flexCount = workouts.filter(w => w.type === 'flexibility').length
          unlocked = flexCount >= achievement.requirements.value
          break

        case 'early_workouts':
          // Simulação - em produção, verificaria horário real dos treinos
          const earlyCount = Math.floor(workouts.length * 0.2) // 20% dos treinos
          unlocked = earlyCount >= achievement.requirements.value
          break

        case 'weekend_workouts':
          const weekendCount = workouts.filter(w => {
            const date = new Date(w.date)
            const day = date.getDay()
            return day === 0 || day === 6 // domingo ou sábado
          }).length
          unlocked = weekendCount >= achievement.requirements.value
          break

        case 'completed_goals':
          unlocked = completedGoals >= achievement.requirements.value
          break

        case 'total_distance':
          const totalDistance = workouts.reduce((sum, w) => {
            return sum + w.exercises.reduce((exSum, ex) => exSum + (ex.distance || 0), 0)
          }, 0)
          unlocked = totalDistance >= achievement.requirements.value
          break
      }

      if (unlocked) {
        newAchievements.push(achievement)
        if (!this.userAchievements[userId]) {
          this.userAchievements[userId] = []
        }
        this.userAchievements[userId].push(achievement.id)
      }
    }

    if (newAchievements.length > 0) {
      this.saveToStorage()
    }

    return newAchievements
  }

  calculateUserLevel(totalPoints: number): { level: number; pointsToNext: number; title: string } {
    const levels = [
      { level: 1, points: 0, title: 'Iniciante' },
      { level: 2, points: 100, title: 'Novato' },
      { level: 3, points: 250, title: 'Aprendiz' },
      { level: 4, points: 500, title: 'Praticante' },
      { level: 5, points: 800, title: 'Experiente' },
      { level: 6, points: 1200, title: 'Veterano' },
      { level: 7, points: 1700, title: 'Expert' },
      { level: 8, points: 2300, title: 'Mestre' },
      { level: 9, points: 3000, title: 'Lenda' },
      { level: 10, points: 4000, title: 'Imortal' }
    ]

    let currentLevel = levels[0]
    let nextLevel = levels[1]

    for (let i = 0; i < levels.length - 1; i++) {
      if (totalPoints >= levels[i].points && totalPoints < levels[i + 1].points) {
        currentLevel = levels[i]
        nextLevel = levels[i + 1]
        break
      }
    }

    if (totalPoints >= levels[levels.length - 1].points) {
      currentLevel = levels[levels.length - 1]
      nextLevel = currentLevel
    }

    return {
      level: currentLevel.level,
      pointsToNext: nextLevel.points - totalPoints,
      title: currentLevel.title
    }
  }

  getTotalPoints(userId: string): number {
    const userAchievements = this.getUserAchievements(userId)
    return userAchievements.reduce((total, achievementId) => {
      const achievement = this.achievements.find(a => a.id === achievementId)
      return total + (achievement?.points || 0)
    }, 0)
  }
}

export const achievementsService = new AchievementsService()

// Hook para usar conquistas
export function useAchievements(userId: string) {
  const [userAchievements, setUserAchievements] = useState<string[]>([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [userLevel, setUserLevel] = useState({ level: 1, pointsToNext: 100, title: 'Iniciante' })

  const loadAchievements = () => {
    const achievements = achievementsService.getUserAchievements(userId)
    const points = achievementsService.getTotalPoints(userId)
    const level = achievementsService.calculateUserLevel(points)

    setUserAchievements(achievements)
    setTotalPoints(points)
    setUserLevel(level)
  }

  const checkAchievements = async (workouts: WorkoutLog[], user: User, completedGoals: number = 0) => {
    const newAchievements = await achievementsService.checkAndUnlockAchievements(
      userId, 
      workouts, 
      user, 
      completedGoals
    )
    
    if (newAchievements.length > 0) {
      loadAchievements()
      return newAchievements
    }
    
    return []
  }

  useEffect(() => {
    if (userId) {
      loadAchievements()
    }
  }, [userId])

  return {
    userAchievements,
    totalPoints,
    userLevel,
    allAchievements: achievementsService.getAllAchievements(),
    loadAchievements,
    checkAchievements
  }
}

import { useState, useEffect } from 'react'