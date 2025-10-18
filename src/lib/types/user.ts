export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  birthDate?: string;
  gender?: string;
  avatar?: string;
  plan: 'free' | 'basic' | 'premium' | 'elite';
  status: 'active' | 'inactive' | 'suspended';
  emailVerified: boolean;
  phoneVerified: boolean;
  twoFactorEnabled: boolean;
  createdAt: Date;
  lastLogin?: Date;
  subscription?: {
    planId: string;
    status: 'active' | 'canceled' | 'past_due';
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
    cancelAtPeriodEnd: boolean;
  };
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  monthlyRevenue: number;
  growthRate: number;
  newUsersThisMonth: number;
  churnRate: number;
}

export interface SystemSettings {
  siteName: string;
  maintenanceMode: boolean;
  allowRegistrations: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  maxUsersPerPlan: {
    free: number;
    basic: number;
    premium: number;
    elite: number;
  };
}