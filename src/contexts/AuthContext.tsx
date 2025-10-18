'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface User {
  id: string
  name: string
  email: string
  dateOfBirth?: string
  gender?: 'male' | 'female' | 'other'
  height?: string
  weight?: string
  currentWeight?: string
  targetWeight?: string
  unit?: 'metric' | 'imperial'
  language?: 'pt' | 'en' | 'es'
  goal?: string
  currentActivity?: string
  trainingLevel?: string
  sleepHours?: string
  workType?: string
  stressLevel?: string
  waterIntake?: string
  mealFrequency?: string
  dietRestrictions?: string
  supplementUse?: string
  motivation?: string
  medicalHistory?: string
  chronicDiseases?: string
  medications?: string
  injuries?: string
  isPro?: boolean
  isAdmin?: boolean
  selectedPlan?: string
  streakDays: number
  weeklyWeightLoss: number
  completedWorkouts: number
  totalCaloriesBurned: number
  emailVerified?: boolean
  createdAt: string
  updatedAt: string
}

interface AuthContextType {
  currentUser: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  updateUserProgress: (progress: { completedWorkouts?: number; totalCaloriesBurned?: number; weeklyWeightLoss?: number; streakDays?: number }) => void
  sendEmailVerification: () => Promise<boolean>
  resetPassword: (email: string) => Promise<boolean>
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>
  deleteAccount: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Carregar usuário do localStorage na inicialização
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        setCurrentUser(user)
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Erro ao carregar usuário:', error)
        localStorage.removeItem('currentUser')
      }
    }
  }, [])

  // Salvar usuário no localStorage sempre que mudar
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser))
    } else {
      localStorage.removeItem('currentUser')
    }
  }, [currentUser])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simular autenticação - em produção, usar API real
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find((u: any) => u.email === email && u.password === password)
      
      if (user) {
        const { password: _, ...userWithoutPassword } = user
        setCurrentUser(userWithoutPassword)
        setIsAuthenticated(true)
        return true
      }
      return false
    } catch (error) {
      console.error('Erro no login:', error)
      return false
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Verificar se email já existe
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const existingUser = users.find((u: any) => u.email === email)
      
      if (existingUser) {
        return false
      }

      // Criar novo usuário
      const newUser: User & { password: string } = {
        id: Date.now().toString(),
        name,
        email,
        password,
        unit: 'metric',
        language: 'pt',
        isPro: false,
        isAdmin: email === 'admin@fitapp.com', // Admin padrão
        streakDays: 0,
        weeklyWeightLoss: 0,
        completedWorkouts: 0,
        totalCaloriesBurned: 0,
        emailVerified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      // Salvar usuário
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))

      // Fazer login automático
      const { password: _, ...userWithoutPassword } = newUser
      setCurrentUser(userWithoutPassword)
      setIsAuthenticated(true)
      return true
    } catch (error) {
      console.error('Erro no registro:', error)
      return false
    }
  }

  const logout = () => {
    setCurrentUser(null)
    setIsAuthenticated(false)
  }

  const updateUser = (userData: Partial<User>) => {
    if (!currentUser) return

    const updatedUser = {
      ...currentUser,
      ...userData,
      updatedAt: new Date().toISOString()
    }

    setCurrentUser(updatedUser)

    // Atualizar no localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const userIndex = users.findIndex((u: any) => u.id === currentUser.id)
    if (userIndex !== -1) {
      users[userIndex] = { ...updatedUser, password: users[userIndex].password }
      localStorage.setItem('users', JSON.stringify(users))
    }
  }

  const updateUserProgress = (progress: { completedWorkouts?: number; totalCaloriesBurned?: number; weeklyWeightLoss?: number; streakDays?: number }) => {
    if (!currentUser) return

    const updatedUser = {
      ...currentUser,
      ...progress,
      updatedAt: new Date().toISOString()
    }

    setCurrentUser(updatedUser)

    // Atualizar no localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const userIndex = users.findIndex((u: any) => u.id === currentUser.id)
    if (userIndex !== -1) {
      users[userIndex] = { ...updatedUser, password: users[userIndex].password }
      localStorage.setItem('users', JSON.stringify(users))
    }
  }

  const sendEmailVerification = async (): Promise<boolean> => {
    try {
      // Simular envio de email de verificação
      if (currentUser) {
        updateUser({ emailVerified: true })
        return true
      }
      return false
    } catch (error) {
      console.error('Erro ao enviar verificação:', error)
      return false
    }
  }

  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      // Simular reset de senha
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find((u: any) => u.email === email)
      
      if (user) {
        // Em produção, enviaria email com link de reset
        console.log('Email de reset enviado para:', email)
        return true
      }
      return false
    } catch (error) {
      console.error('Erro ao resetar senha:', error)
      return false
    }
  }

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    try {
      if (!currentUser) return false

      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const userIndex = users.findIndex((u: any) => u.id === currentUser.id)
      
      if (userIndex !== -1 && users[userIndex].password === currentPassword) {
        users[userIndex].password = newPassword
        localStorage.setItem('users', JSON.stringify(users))
        return true
      }
      return false
    } catch (error) {
      console.error('Erro ao alterar senha:', error)
      return false
    }
  }

  const deleteAccount = async (): Promise<boolean> => {
    try {
      if (!currentUser) return false

      // Remover usuário do localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const filteredUsers = users.filter((u: any) => u.id !== currentUser.id)
      localStorage.setItem('users', JSON.stringify(filteredUsers))

      // Fazer logout
      logout()
      return true
    } catch (error) {
      console.error('Erro ao deletar conta:', error)
      return false
    }
  }

  const value: AuthContextType = {
    currentUser,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    updateUserProgress,
    sendEmailVerification,
    resetPassword,
    changePassword,
    deleteAccount
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}