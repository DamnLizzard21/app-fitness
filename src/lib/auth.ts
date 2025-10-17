import { User, AuthState } from './types'

// Simulação de autenticação (em produção, usar um serviço real)
class AuthService {
  private users: User[] = []
  private currentUser: User | null = null

  constructor() {
    // Carregar dados do localStorage se disponível
    if (typeof window !== 'undefined') {
      const savedUsers = localStorage.getItem('fitlife_users')
      const savedCurrentUser = localStorage.getItem('fitlife_current_user')
      
      if (savedUsers) {
        this.users = JSON.parse(savedUsers)
      }
      
      if (savedCurrentUser) {
        this.currentUser = JSON.parse(savedCurrentUser)
      }
    }
  }

  private saveToStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('fitlife_users', JSON.stringify(this.users))
      localStorage.setItem('fitlife_current_user', JSON.stringify(this.currentUser))
    }
  }

  async register(email: string, password: string, name: string): Promise<{ user: User; error?: string }> {
    // Verificar se usuário já existe
    const existingUser = this.users.find(u => u.email === email)
    if (existingUser) {
      return { user: existingUser, error: 'E-mail já cadastrado' }
    }

    // Criar novo usuário
    const newUser: User = {
      id: Date.now().toString(),
      email,
      password_hash: this.hashPassword(password),
      email_verified: false,
      name,
      units: 'metric',
      locale: this.detectBrowserLanguage(),
      role: 'user',
      created_at: new Date(),
      updated_at: new Date()
    }

    this.users.push(newUser)
    this.currentUser = newUser
    this.saveToStorage()

    return { user: newUser }
  }

  async login(email: string, password: string): Promise<{ user: User; error?: string }> {
    const user = this.users.find(u => u.email === email)
    
    if (!user) {
      return { user: user as any, error: 'Usuário não encontrado' }
    }

    if (!this.verifyPassword(password, user.password_hash!)) {
      return { user: user as any, error: 'Senha incorreta' }
    }

    this.currentUser = user
    this.saveToStorage()

    return { user }
  }

  async logout(): Promise<void> {
    this.currentUser = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('fitlife_current_user')
    }
  }

  async getCurrentUser(): Promise<User | null> {
    return this.currentUser
  }

  async updateProfile(updates: Partial<User>): Promise<{ user: User; error?: string }> {
    if (!this.currentUser) {
      return { user: null as any, error: 'Usuário não autenticado' }
    }

    const updatedUser = {
      ...this.currentUser,
      ...updates,
      updated_at: new Date()
    }

    // Atualizar na lista de usuários
    const userIndex = this.users.findIndex(u => u.id === this.currentUser!.id)
    if (userIndex >= 0) {
      this.users[userIndex] = updatedUser
    }

    this.currentUser = updatedUser
    this.saveToStorage()

    return { user: updatedUser }
  }

  async forgotPassword(email: string): Promise<{ success: boolean; error?: string }> {
    const user = this.users.find(u => u.email === email)
    
    if (!user) {
      return { success: false, error: 'E-mail não encontrado' }
    }

    // Em produção, enviar e-mail de recuperação
    console.log(`Password reset email sent to ${email}`)
    
    return { success: true }
  }

  async resetPassword(token: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
    // Em produção, validar token
    // Por simplicidade, assumindo que o token é válido
    
    if (!this.currentUser) {
      return { success: false, error: 'Token inválido' }
    }

    const updatedUser = {
      ...this.currentUser,
      password_hash: this.hashPassword(newPassword),
      updated_at: new Date()
    }

    const userIndex = this.users.findIndex(u => u.id === this.currentUser!.id)
    if (userIndex >= 0) {
      this.users[userIndex] = updatedUser
    }

    this.currentUser = updatedUser
    this.saveToStorage()

    return { success: true }
  }

  async deleteAccount(): Promise<{ success: boolean; error?: string }> {
    if (!this.currentUser) {
      return { success: false, error: 'Usuário não autenticado' }
    }

    // Remover usuário da lista
    this.users = this.users.filter(u => u.id !== this.currentUser!.id)
    this.currentUser = null

    this.saveToStorage()

    return { success: true }
  }

  private hashPassword(password: string): string {
    // Em produção, usar bcrypt ou similar
    return btoa(password) // Base64 para simulação
  }

  private verifyPassword(password: string, hash: string): boolean {
    return btoa(password) === hash
  }

  private detectBrowserLanguage(): 'pt-BR' | 'en' | 'es' {
    if (typeof window === 'undefined') return 'pt-BR'
    
    const lang = navigator.language || 'pt-BR'
    
    if (lang.startsWith('pt')) return 'pt-BR'
    if (lang.startsWith('es')) return 'es'
    return 'en'
  }
}

// Instância singleton
export const authService = new AuthService()

// Hook para usar autenticação
export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true
  })

  useEffect(() => {
    const initAuth = async () => {
      const user = await authService.getCurrentUser()
      setAuthState({
        user,
        isAuthenticated: !!user,
        loading: false
      })
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, loading: true }))
    
    const result = await authService.login(email, password)
    
    if (result.error) {
      setAuthState(prev => ({ ...prev, loading: false }))
      throw new Error(result.error)
    }

    setAuthState({
      user: result.user,
      isAuthenticated: true,
      loading: false
    })

    return result.user
  }

  const register = async (email: string, password: string, name: string) => {
    setAuthState(prev => ({ ...prev, loading: true }))
    
    const result = await authService.register(email, password, name)
    
    if (result.error) {
      setAuthState(prev => ({ ...prev, loading: false }))
      throw new Error(result.error)
    }

    setAuthState({
      user: result.user,
      isAuthenticated: true,
      loading: false
    })

    return result.user
  }

  const logout = async () => {
    await authService.logout()
    setAuthState({
      user: null,
      isAuthenticated: false,
      loading: false
    })
  }

  const updateProfile = async (updates: Partial<User>) => {
    const result = await authService.updateProfile(updates)
    
    if (result.error) {
      throw new Error(result.error)
    }

    setAuthState(prev => ({
      ...prev,
      user: result.user
    }))

    return result.user
  }

  return {
    ...authState,
    login,
    register,
    logout,
    updateProfile
  }
}

// Importar React hooks
import { useState, useEffect } from 'react'