export interface AdminUser {
  id: string
  name: string
  email: string
  plan: 'Free' | 'Basic' | 'Premium' | 'Elite'
  status: 'Active' | 'Inactive' | 'Suspended'
  joinDate: string
  lastLogin: string
  totalSpent: number
}

export interface AdminStats {
  totalUsers: number
  activeUsers: number
  newUsers: number
  revenue: number
  conversionRate: number
  avgSessionTime: string
}

export interface SystemSettings {
  appName: string
  description: string
  maintenanceMode: boolean
  maintenanceMessage: string
  enableRegistration: boolean
  enablePayments: boolean
  enableNotifications: boolean
}