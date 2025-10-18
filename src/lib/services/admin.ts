import { User, UserProfile, UserSettings, AdminUser, SystemStats, ActivityLog, SecurityEvent } from '@/lib/types/admin'

// Mock data for development
export class AdminService {
  private static users: AdminUser[] = [
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@email.com',
      role: 'user',
      status: 'active',
      isPro: true,
      createdAt: new Date('2024-01-15'),
      lastLogin: new Date('2024-10-18'),
      lastActivity: new Date('2024-10-18'),
      permissions: [],
      profile: {
        phone: '+55 11 99999-9999',
        dateOfBirth: '1995-05-15',
        gender: 'Masculino',
        height: '1.75',
        weight: '80',
        targetWeight: '75',
        goal: 'Perder peso',
        activityLevel: '3-4x por semana',
        trainingLevel: 'Intermediário',
        totalWorkouts: 45,
        weightLoss: 8.5,
        streakDays: 7,
        totalCaloriesBurned: 2340
      },
      settings: {
        emailNotifications: true,
        pushNotifications: true,
        weeklyReports: true,
        marketingEmails: false,
        dataSharing: false,
        publicProfile: false,
        language: 'pt-BR',
        timezone: 'America/Sao_Paulo',
        units: 'metric',
        theme: 'dark'
      }
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria@email.com',
      role: 'user',
      status: 'active',
      isPro: false,
      createdAt: new Date('2024-02-20'),
      lastLogin: new Date('2024-10-17'),
      lastActivity: new Date('2024-10-17'),
      permissions: [],
      profile: {
        totalWorkouts: 23,
        weightLoss: 4.2,
        streakDays: 3,
        totalCaloriesBurned: 1580
      },
      settings: {
        emailNotifications: true,
        pushNotifications: false,
        weeklyReports: false,
        marketingEmails: true,
        dataSharing: true,
        publicProfile: true,
        language: 'pt-BR',
        timezone: 'America/Sao_Paulo',
        units: 'metric',
        theme: 'light'
      }
    },
    {
      id: '3',
      name: 'Pedro Costa',
      email: 'pedro@email.com',
      role: 'moderator',
      status: 'active',
      isPro: true,
      createdAt: new Date('2024-01-10'),
      lastLogin: new Date('2024-10-18'),
      lastActivity: new Date('2024-10-18'),
      permissions: [
        {
          id: 'mod-1',
          name: 'Moderate Users',
          description: 'Can suspend and manage user accounts',
          resource: 'users',
          actions: ['read', 'update', 'suspend']
        }
      ],
      profile: {
        totalWorkouts: 67,
        weightLoss: 12.3,
        streakDays: 14,
        totalCaloriesBurned: 4200
      },
      settings: {
        emailNotifications: true,
        pushNotifications: true,
        weeklyReports: true,
        marketingEmails: false,
        dataSharing: false,
        publicProfile: false,
        language: 'pt-BR',
        timezone: 'America/Sao_Paulo',
        units: 'metric',
        theme: 'dark'
      }
    }
  ]

  private static activityLogs: ActivityLog[] = [
    {
      id: '1',
      userId: '1',
      action: 'login',
      resource: 'auth',
      details: { method: 'email' },
      timestamp: new Date('2024-10-18T10:30:00'),
      ipAddress: '192.168.1.1'
    },
    {
      id: '2',
      userId: '2',
      action: 'update_profile',
      resource: 'user',
      details: { fields: ['weight', 'goal'] },
      timestamp: new Date('2024-10-17T15:45:00'),
      ipAddress: '192.168.1.2'
    }
  ]

  private static securityEvents: SecurityEvent[] = [
    {
      id: '1',
      userId: '1',
      type: 'login',
      details: { success: true, method: 'email' },
      timestamp: new Date('2024-10-18T10:30:00'),
      ipAddress: '192.168.1.1',
      resolved: true
    },
    {
      id: '2',
      userId: '4',
      type: 'failed_login',
      details: { attempts: 3, reason: 'invalid_password' },
      timestamp: new Date('2024-10-17T20:15:00'),
      ipAddress: '192.168.1.100',
      resolved: false
    }
  ]

  // User Management
  static async getUsers(filters?: any): Promise<AdminUser[]> {
    let filteredUsers = [...this.users]

    if (filters?.search) {
      const search = filters.search.toLowerCase()
      filteredUsers = filteredUsers.filter(user => 
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
      )
    }

    if (filters?.role && filters.role !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.role === filters.role)
    }

    if (filters?.status && filters.status !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.status === filters.status)
    }

    if (filters?.isPro !== undefined) {
      filteredUsers = filteredUsers.filter(user => user.isPro === filters.isPro)
    }

    return filteredUsers
  }

  static async getUserById(id: string): Promise<AdminUser | null> {
    return this.users.find(user => user.id === id) || null
  }

  static async createUser(userData: Partial<AdminUser>): Promise<AdminUser> {
    const newUser: AdminUser = {
      id: Date.now().toString(),
      name: userData.name || '',
      email: userData.email || '',
      role: userData.role || 'user',
      status: 'active',
      isPro: userData.isPro || false,
      createdAt: new Date(),
      lastLogin: new Date(),
      lastActivity: new Date(),
      permissions: [],
      profile: {
        totalWorkouts: 0,
        weightLoss: 0,
        streakDays: 0,
        totalCaloriesBurned: 0,
        ...userData.profile
      },
      settings: {
        emailNotifications: true,
        pushNotifications: true,
        weeklyReports: true,
        marketingEmails: false,
        dataSharing: false,
        publicProfile: false,
        language: 'pt-BR',
        timezone: 'America/Sao_Paulo',
        units: 'metric',
        theme: 'dark',
        ...userData.settings
      }
    }

    this.users.push(newUser)
    return newUser
  }

  static async updateUser(id: string, updates: Partial<AdminUser>): Promise<AdminUser | null> {
    const userIndex = this.users.findIndex(user => user.id === id)
    if (userIndex === -1) return null

    this.users[userIndex] = { ...this.users[userIndex], ...updates }
    return this.users[userIndex]
  }

  static async deleteUser(id: string): Promise<boolean> {
    const userIndex = this.users.findIndex(user => user.id === id)
    if (userIndex === -1) return false

    this.users.splice(userIndex, 1)
    return true
  }

  static async updateUserStatus(id: string, status: 'active' | 'inactive' | 'suspended'): Promise<boolean> {
    const user = this.users.find(user => user.id === id)
    if (!user) return false

    user.status = status
    return true
  }

  static async updateUserRole(id: string, role: 'admin' | 'moderator' | 'user'): Promise<boolean> {
    const user = this.users.find(user => user.id === id)
    if (!user) return false

    user.role = role
    return true
  }

  // Statistics
  static async getSystemStats(): Promise<SystemStats> {
    const totalUsers = this.users.length
    const activeUsers = this.users.filter(u => u.status === 'active').length
    const proUsers = this.users.filter(u => u.isPro).length
    const totalWorkouts = this.users.reduce((sum, u) => sum + u.profile.totalWorkouts, 0)
    const totalRevenue = proUsers * 29.90
    const avgWeightLoss = this.users.reduce((sum, u) => sum + u.profile.weightLoss, 0) / totalUsers
    const userGrowth = 15.2 // Mock growth percentage
    const retentionRate = 78.5 // Mock retention rate
    const conversionRate = (proUsers / totalUsers) * 100

    return {
      totalUsers,
      activeUsers,
      proUsers,
      totalWorkouts,
      totalRevenue,
      avgWeightLoss,
      userGrowth,
      retentionRate,
      conversionRate
    }
  }

  // Activity Logs
  static async getActivityLogs(userId?: string): Promise<ActivityLog[]> {
    if (userId) {
      return this.activityLogs.filter(log => log.userId === userId)
    }
    return this.activityLogs
  }

  static async addActivityLog(log: Omit<ActivityLog, 'id' | 'timestamp'>): Promise<ActivityLog> {
    const newLog: ActivityLog = {
      ...log,
      id: Date.now().toString(),
      timestamp: new Date()
    }
    this.activityLogs.push(newLog)
    return newLog
  }

  // Security Events
  static async getSecurityEvents(): Promise<SecurityEvent[]> {
    return this.securityEvents
  }

  static async addSecurityEvent(event: Omit<SecurityEvent, 'id' | 'timestamp'>): Promise<SecurityEvent> {
    const newEvent: SecurityEvent = {
      ...event,
      id: Date.now().toString(),
      timestamp: new Date()
    }
    this.securityEvents.push(newEvent)
    return newEvent
  }

  static async resolveSecurityEvent(id: string): Promise<boolean> {
    const event = this.securityEvents.find(e => e.id === id)
    if (!event) return false

    event.resolved = true
    return true
  }

  // Bulk Operations
  static async bulkUpdateUsers(userIds: string[], updates: Partial<AdminUser>): Promise<number> {
    let updatedCount = 0
    
    for (const id of userIds) {
      const user = await this.updateUser(id, updates)
      if (user) updatedCount++
    }
    
    return updatedCount
  }

  static async bulkDeleteUsers(userIds: string[]): Promise<number> {
    let deletedCount = 0
    
    for (const id of userIds) {
      const success = await this.deleteUser(id)
      if (success) deletedCount++
    }
    
    return deletedCount
  }

  // Export
  static async exportUsers(format: 'csv' | 'json' = 'json'): Promise<string> {
    if (format === 'json') {
      return JSON.stringify(this.users, null, 2)
    }
    
    // CSV export
    const headers = ['ID', 'Name', 'Email', 'Role', 'Status', 'Pro', 'Created At', 'Last Login']
    const rows = this.users.map(user => [
      user.id,
      user.name,
      user.email,
      user.role,
      user.status,
      user.isPro ? 'Yes' : 'No',
      user.createdAt.toISOString(),
      user.lastLogin.toISOString()
    ])
    
    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n')
    
    return csvContent
  }

  // Search
  static async searchUsers(query: string): Promise<AdminUser[]> {
    const searchTerm = query.toLowerCase()
    return this.users.filter(user =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.id.includes(searchTerm)
    )
  }

  // Analytics
  static async getUserGrowthData(days: number = 30): Promise<{ date: string; count: number }[]> {
    // Mock data for user growth
    const data = []
    const now = new Date()
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      
      // Mock growth data
      const count = Math.floor(Math.random() * 50) + 10
      data.push({
        date: date.toISOString().split('T')[0],
        count
      })
    }
    
    return data
  }

  static async getRevenueData(days: number = 30): Promise<{ date: string; revenue: number }[]> {
    // Mock data for revenue
    const data = []
    const now = new Date()
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      
      // Mock revenue data
      const revenue = Math.floor(Math.random() * 1000) + 500
      data.push({
        date: date.toISOString().split('T')[0],
        revenue
      })
    }
    
    return data
  }
}

// Account Management Service
export class AccountService {
  static async getCurrentUser(): Promise<AdminUser | null> {
    // Mock current user - in real app, this would come from auth context
    return AdminService.getUserById('1')
  }

  static async updateProfile(updates: Partial<UserProfile>): Promise<boolean> {
    const currentUser = await this.getCurrentUser()
    if (!currentUser) return false

    currentUser.profile = { ...currentUser.profile, ...updates }
    return true
  }

  static async updateSettings(updates: Partial<UserSettings>): Promise<boolean> {
    const currentUser = await this.getCurrentUser()
    if (!currentUser) return false

    currentUser.settings = { ...currentUser.settings, ...updates }
    return true
  }

  static async changePassword(currentPassword: string, newPassword: string): Promise<boolean> {
    // Mock password change - in real app, this would validate current password
    // and hash the new password
    return true
  }

  static async deleteAccount(): Promise<boolean> {
    const currentUser = await this.getCurrentUser()
    if (!currentUser) return false

    return AdminService.deleteUser(currentUser.id)
  }

  static async uploadProfileImage(file: File): Promise<string> {
    // Mock image upload - in real app, this would upload to cloud storage
    return URL.createObjectURL(file)
  }

  static async getActivityHistory(): Promise<ActivityLog[]> {
    const currentUser = await this.getCurrentUser()
    if (!currentUser) return []

    return AdminService.getActivityLogs(currentUser.id)
  }

  static async getSecurityHistory(): Promise<SecurityEvent[]> {
    const currentUser = await this.getCurrentUser()
    if (!currentUser) return []

    const allEvents = await AdminService.getSecurityEvents()
    return allEvents.filter(event => event.userId === currentUser.id)
  }

  static async enable2FA(): Promise<{ secret: string; qrCode: string }> {
    // Mock 2FA setup - in real app, this would generate actual TOTP secret
    return {
      secret: 'JBSWY3DPEHPK3PXP',
      qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
    }
  }

  static async disable2FA(): Promise<boolean> {
    // Mock 2FA disable
    return true
  }

  static async getActiveDevices(): Promise<{ id: string; name: string; lastActive: Date; current: boolean }[]> {
    // Mock active devices
    return [
      {
        id: '1',
        name: 'Chrome on Windows',
        lastActive: new Date(),
        current: true
      },
      {
        id: '2',
        name: 'Safari on iPhone',
        lastActive: new Date(Date.now() - 3600000),
        current: false
      },
      {
        id: '3',
        name: 'Chrome on Android',
        lastActive: new Date(Date.now() - 86400000),
        current: false
      }
    ]
  }

  static async revokeDevice(deviceId: string): Promise<boolean> {
    // Mock device revocation
    return true
  }

  static async revokeAllDevices(): Promise<boolean> {
    // Mock revoke all devices except current
    return true
  }
}