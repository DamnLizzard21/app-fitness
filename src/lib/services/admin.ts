import { AdminUser, AdminStats, SystemSettings } from '@/lib/types/admin'

// Dados simulados para demonstração
export const mockAdminStats: AdminStats = {
  totalUsers: 52847,
  activeUsers: 38291,
  newUsers: 1247,
  revenue: 89450.00,
  conversionRate: 23.5,
  avgSessionTime: '24m 32s'
}

export const mockUsers: AdminUser[] = [
  {
    id: '1',
    name: 'Maria Silva',
    email: 'maria@email.com',
    plan: 'Premium',
    status: 'Active',
    joinDate: '2023-08-15',
    lastLogin: '2024-01-20',
    totalSpent: 354.00
  },
  {
    id: '2',
    name: 'João Santos',
    email: 'joao@email.com',
    plan: 'Basic',
    status: 'Active',
    joinDate: '2023-09-22',
    lastLogin: '2024-01-19',
    totalSpent: 87.00
  },
  {
    id: '3',
    name: 'Ana Costa',
    email: 'ana@email.com',
    plan: 'Elite',
    status: 'Active',
    joinDate: '2023-07-10',
    lastLogin: '2024-01-20',
    totalSpent: 792.00
  },
  {
    id: '4',
    name: 'Pedro Lima',
    email: 'pedro@email.com',
    plan: 'Free',
    status: 'Inactive',
    joinDate: '2023-12-05',
    lastLogin: '2024-01-10',
    totalSpent: 0.00
  },
  {
    id: '5',
    name: 'Carla Oliveira',
    email: 'carla@email.com',
    plan: 'Premium',
    status: 'Suspended',
    joinDate: '2023-06-18',
    lastLogin: '2024-01-15',
    totalSpent: 236.00
  }
]

export const mockSystemSettings: SystemSettings = {
  appName: 'BetterLife Gyn',
  description: 'Plataforma completa de saúde e bem-estar feminino',
  maintenanceMode: false,
  maintenanceMessage: 'Sistema em manutenção. Voltaremos em breve.',
  enableRegistration: true,
  enablePayments: true,
  enableNotifications: true
}

export class AdminService {
  static async getStats(): Promise<AdminStats> {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockAdminStats
  }

  static async getUsers(filter?: string): Promise<AdminUser[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    if (!filter || filter === 'all') {
      return mockUsers
    }
    
    return mockUsers.filter(user => 
      user.status.toLowerCase() === filter.toLowerCase() ||
      user.plan.toLowerCase() === filter.toLowerCase()
    )
  }

  static async getUserById(id: string): Promise<AdminUser | null> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return mockUsers.find(user => user.id === id) || null
  }

  static async updateUser(id: string, updates: Partial<AdminUser>): Promise<AdminUser> {
    await new Promise(resolve => setTimeout(resolve, 400))
    const userIndex = mockUsers.findIndex(user => user.id === id)
    if (userIndex === -1) {
      throw new Error('Usuário não encontrado')
    }
    
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates }
    return mockUsers[userIndex]
  }

  static async deleteUser(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300))
    const userIndex = mockUsers.findIndex(user => user.id === id)
    if (userIndex === -1) {
      throw new Error('Usuário não encontrado')
    }
    
    mockUsers.splice(userIndex, 1)
  }

  static async getSystemSettings(): Promise<SystemSettings> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return mockSystemSettings
  }

  static async updateSystemSettings(settings: Partial<SystemSettings>): Promise<SystemSettings> {
    await new Promise(resolve => setTimeout(resolve, 400))
    Object.assign(mockSystemSettings, settings)
    return mockSystemSettings
  }

  static async searchUsers(query: string): Promise<AdminUser[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    if (!query.trim()) {
      return mockUsers
    }
    
    const lowercaseQuery = query.toLowerCase()
    return mockUsers.filter(user =>
      user.name.toLowerCase().includes(lowercaseQuery) ||
      user.email.toLowerCase().includes(lowercaseQuery)
    )
  }
}