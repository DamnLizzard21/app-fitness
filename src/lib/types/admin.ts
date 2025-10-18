export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'moderator' | 'user'
  status: 'active' | 'inactive' | 'suspended'
  isPro: boolean
  createdAt: Date
  lastLogin: Date
  profile: UserProfile
  settings: UserSettings
  subscription?: Subscription
}

export interface UserProfile {
  phone?: string
  dateOfBirth?: string
  gender?: string
  height?: string
  weight?: string
  targetWeight?: string
  goal?: string
  activityLevel?: string
  trainingLevel?: string
  dietRestrictions?: string
  medicalConditions?: string
  profileImage?: string
  // Fitness metrics
  totalWorkouts: number
  weightLoss: number
  streakDays: number
  totalCaloriesBurned: number
}

export interface UserSettings {
  // Notifications
  emailNotifications: boolean
  pushNotifications: boolean
  weeklyReports: boolean
  marketingEmails: boolean
  
  // Privacy
  dataSharing: boolean
  publicProfile: boolean
  
  // Preferences
  language: string
  timezone: string
  units: 'metric' | 'imperial'
  theme: 'light' | 'dark' | 'auto'
}

export interface Subscription {
  id: string
  plan: 'free' | 'pro' | 'premium'
  status: 'active' | 'cancelled' | 'expired'
  startDate: Date
  endDate?: Date
  price: number
  currency: string
  paymentMethod: string
  autoRenew: boolean
}

export interface AdminUser extends User {
  permissions: Permission[]
  lastActivity: Date
  managedUsers?: string[]
}

export interface Permission {
  id: string
  name: string
  description: string
  resource: string
  actions: string[]
}

export interface SystemStats {
  totalUsers: number
  activeUsers: number
  proUsers: number
  totalWorkouts: number
  totalRevenue: number
  avgWeightLoss: number
  userGrowth: number
  retentionRate: number
  conversionRate: number
}

export interface ActivityLog {
  id: string
  userId: string
  action: string
  resource: string
  details: Record<string, any>
  timestamp: Date
  ipAddress?: string
  userAgent?: string
}

export interface SecurityEvent {
  id: string
  userId: string
  type: 'login' | 'logout' | 'password_change' | 'failed_login' | 'suspicious_activity'
  details: Record<string, any>
  timestamp: Date
  ipAddress: string
  resolved: boolean
}

export interface NotificationTemplate {
  id: string
  name: string
  type: 'email' | 'push' | 'sms'
  subject: string
  content: string
  variables: string[]
  active: boolean
}

export interface SystemSettings {
  maintenanceMode: boolean
  registrationEnabled: boolean
  proFeaturesEnabled: boolean
  emailNotifications: boolean
  dataBackup: boolean
  analyticsEnabled: boolean
  maxUsersPerDay: number
  sessionTimeout: number
  passwordPolicy: PasswordPolicy
  rateLimits: RateLimit[]
}

export interface PasswordPolicy {
  minLength: number
  requireUppercase: boolean
  requireLowercase: boolean
  requireNumbers: boolean
  requireSpecialChars: boolean
  maxAge: number // days
  preventReuse: number // number of previous passwords to check
}

export interface RateLimit {
  endpoint: string
  maxRequests: number
  windowMs: number
  message: string
}

export interface BackupInfo {
  id: string
  type: 'full' | 'incremental'
  status: 'pending' | 'running' | 'completed' | 'failed'
  startTime: Date
  endTime?: Date
  size?: number
  location: string
  error?: string
}

export interface AuditLog {
  id: string
  userId: string
  adminId?: string
  action: string
  resource: string
  resourceId: string
  oldValues?: Record<string, any>
  newValues?: Record<string, any>
  timestamp: Date
  ipAddress: string
  userAgent: string
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface UserListResponse extends ApiResponse<User[]> {
  filters?: {
    role?: string
    status?: string
    isPro?: boolean
    search?: string
  }
}

export interface StatsResponse extends ApiResponse<SystemStats> {
  period?: {
    start: Date
    end: Date
  }
}

// Form types
export interface CreateUserForm {
  name: string
  email: string
  password: string
  role: 'admin' | 'moderator' | 'user'
  sendWelcomeEmail: boolean
}

export interface UpdateUserForm {
  name?: string
  email?: string
  role?: 'admin' | 'moderator' | 'user'
  status?: 'active' | 'inactive' | 'suspended'
  isPro?: boolean
}

export interface UpdateProfileForm {
  name?: string
  phone?: string
  dateOfBirth?: string
  gender?: string
  height?: string
  weight?: string
  targetWeight?: string
  goal?: string
  activityLevel?: string
  trainingLevel?: string
  dietRestrictions?: string
  medicalConditions?: string
}

export interface UpdateSettingsForm {
  emailNotifications?: boolean
  pushNotifications?: boolean
  weeklyReports?: boolean
  marketingEmails?: boolean
  dataSharing?: boolean
  publicProfile?: boolean
  language?: string
  timezone?: string
  units?: 'metric' | 'imperial'
  theme?: 'light' | 'dark' | 'auto'
}

export interface ChangePasswordForm {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

// Filter and sort types
export interface UserFilters {
  role?: string
  status?: string
  isPro?: boolean
  search?: string
  dateRange?: {
    start: Date
    end: Date
  }
}

export interface SortOptions {
  field: string
  direction: 'asc' | 'desc'
}

export interface PaginationOptions {
  page: number
  limit: number
}

// Chart data types
export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string
    borderColor?: string
    borderWidth?: number
  }[]
}

export interface TimeSeriesData {
  date: string
  value: number
  label?: string
}

// Export types
export interface ExportOptions {
  format: 'csv' | 'xlsx' | 'json'
  fields: string[]
  filters?: UserFilters
  dateRange?: {
    start: Date
    end: Date
  }
}

// Webhook types
export interface WebhookEvent {
  id: string
  type: string
  data: Record<string, any>
  timestamp: Date
  processed: boolean
  retries: number
  error?: string
}

// Integration types
export interface Integration {
  id: string
  name: string
  type: 'payment' | 'email' | 'analytics' | 'storage'
  status: 'active' | 'inactive' | 'error'
  config: Record<string, any>
  lastSync?: Date
  error?: string
}

// Notification types
export interface Notification {
  id: string
  userId?: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  read: boolean
  createdAt: Date
  expiresAt?: Date
  actions?: NotificationAction[]
}

export interface NotificationAction {
  label: string
  action: string
  style?: 'primary' | 'secondary' | 'danger'
}

// Feature flag types
export interface FeatureFlag {
  id: string
  name: string
  description: string
  enabled: boolean
  rolloutPercentage: number
  conditions?: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

// Health check types
export interface HealthCheck {
  service: string
  status: 'healthy' | 'degraded' | 'unhealthy'
  responseTime: number
  lastCheck: Date
  error?: string
  details?: Record<string, any>
}