'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Users, 
  BarChart3, 
  Settings, 
  Shield, 
  Crown, 
  TrendingUp, 
  Activity,
  UserCheck,
  UserX,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  Calendar,
  Target,
  Dumbbell,
  Utensils,
  Award,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Eye,
  FileText,
  Globe,
  Lock,
  Unlock,
  RefreshCw,
  Save,
  X
} from 'lucide-react'

interface AdminUser {
  id: string
  name: string
  email: string
  role: 'admin' | 'moderator' | 'user'
  isPro: boolean
  status: 'active' | 'inactive' | 'suspended'
  createdAt: Date
  lastLogin: Date
  totalWorkouts: number
  weightLoss: number
  subscriptionEnd?: Date
}

interface SystemStats {
  totalUsers: number
  activeUsers: number
  proUsers: number
  totalWorkouts: number
  totalRevenue: number
  avgWeightLoss: number
  userGrowth: number
  retentionRate: number
}

interface AdminSettings {
  maintenanceMode: boolean
  registrationEnabled: boolean
  proFeaturesEnabled: boolean
  emailNotifications: boolean
  dataBackup: boolean
  analyticsEnabled: boolean
  maxUsersPerDay: number
  sessionTimeout: number
}

export default function AdminPanel() {
  const [currentTab, setCurrentTab] = useState('dashboard')
  const [users, setUsers] = useState<AdminUser[]>([])
  const [filteredUsers, setFilteredUsers] = useState<AdminUser[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [systemStats, setSystemStats] = useState<SystemStats>({
    totalUsers: 0,
    activeUsers: 0,
    proUsers: 0,
    totalWorkouts: 0,
    totalRevenue: 0,
    avgWeightLoss: 0,
    userGrowth: 0,
    retentionRate: 0
  })
  const [adminSettings, setAdminSettings] = useState<AdminSettings>({
    maintenanceMode: false,
    registrationEnabled: true,
    proFeaturesEnabled: true,
    emailNotifications: true,
    dataBackup: true,
    analyticsEnabled: true,
    maxUsersPerDay: 1000,
    sessionTimeout: 30
  })

  // Simular dados de usuários
  useEffect(() => {
    const mockUsers: AdminUser[] = [
      {
        id: '1',
        name: 'João Silva',
        email: 'joao@email.com',
        role: 'user',
        isPro: true,
        status: 'active',
        createdAt: new Date('2024-01-15'),
        lastLogin: new Date('2024-10-18'),
        totalWorkouts: 45,
        weightLoss: 8.5,
        subscriptionEnd: new Date('2024-12-15')
      },
      {
        id: '2',
        name: 'Maria Santos',
        email: 'maria@email.com',
        role: 'user',
        isPro: false,
        status: 'active',
        createdAt: new Date('2024-02-20'),
        lastLogin: new Date('2024-10-17'),
        totalWorkouts: 23,
        weightLoss: 4.2
      },
      {
        id: '3',
        name: 'Pedro Costa',
        email: 'pedro@email.com',
        role: 'moderator',
        isPro: true,
        status: 'active',
        createdAt: new Date('2024-01-10'),
        lastLogin: new Date('2024-10-18'),
        totalWorkouts: 67,
        weightLoss: 12.3,
        subscriptionEnd: new Date('2025-01-10')
      },
      {
        id: '4',
        name: 'Ana Oliveira',
        email: 'ana@email.com',
        role: 'user',
        isPro: true,
        status: 'inactive',
        createdAt: new Date('2024-03-05'),
        lastLogin: new Date('2024-09-15'),
        totalWorkouts: 12,
        weightLoss: 2.1,
        subscriptionEnd: new Date('2024-11-05')
      },
      {
        id: '5',
        name: 'Carlos Ferreira',
        email: 'carlos@email.com',
        role: 'user',
        isPro: false,
        status: 'suspended',
        createdAt: new Date('2024-04-12'),
        lastLogin: new Date('2024-08-20'),
        totalWorkouts: 8,
        weightLoss: 1.5
      }
    ]
    
    setUsers(mockUsers)
    setFilteredUsers(mockUsers)
    
    // Calcular estatísticas
    const stats: SystemStats = {
      totalUsers: mockUsers.length,
      activeUsers: mockUsers.filter(u => u.status === 'active').length,
      proUsers: mockUsers.filter(u => u.isPro).length,
      totalWorkouts: mockUsers.reduce((sum, u) => sum + u.totalWorkouts, 0),
      totalRevenue: mockUsers.filter(u => u.isPro).length * 29.90,
      avgWeightLoss: mockUsers.reduce((sum, u) => sum + u.weightLoss, 0) / mockUsers.length,
      userGrowth: 15.2,
      retentionRate: 78.5
    }
    setSystemStats(stats)
  }, [])

  // Filtrar usuários
  useEffect(() => {
    let filtered = users

    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterRole !== 'all') {
      filtered = filtered.filter(user => user.role === filterRole)
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(user => user.status === filterStatus)
    }

    setFilteredUsers(filtered)
  }, [users, searchTerm, filterRole, filterStatus])

  const handleUserStatusChange = (userId: string, newStatus: 'active' | 'inactive' | 'suspended') => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ))
  }

  const handleUserRoleChange = (userId: string, newRole: 'admin' | 'moderator' | 'user') => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ))
  }

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId))
  }

  const handleSettingsChange = (setting: keyof AdminSettings, value: boolean | number) => {
    setAdminSettings(prev => ({
      ...prev,
      [setting]: value
    }))
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500'
      case 'moderator': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'inactive': return 'bg-yellow-500'
      case 'suspended': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 p-3 rounded-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Painel Administrativo</h1>
                <p className="text-gray-300">BetterLife Gyn - Sistema de Gerenciamento</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-red-500/20 text-red-300 border-red-500/30 px-4 py-2">
                <Crown className="w-4 h-4 mr-2" />
                Administrador
              </Badge>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-8">
          <TabsList className="bg-white/10 backdrop-blur-xl border border-white/20">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-white/20">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-white/20">
              <Users className="w-4 h-4 mr-2" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-white/20">
              <TrendingUp className="w-4 h-4 mr-2" />
              Análises
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-white/20">
              <Settings className="w-4 h-4 mr-2" />
              Sistema
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-8">
            {/* Estatísticas Principais */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm">Total de Usuários</p>
                      <p className="text-3xl font-bold text-white">{systemStats.totalUsers.toLocaleString()}</p>
                      <p className="text-emerald-400 text-sm">+{systemStats.userGrowth}% este mês</p>
                    </div>
                    <Users className="w-8 h-8 text-emerald-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm">Usuários Ativos</p>
                      <p className="text-3xl font-bold text-white">{systemStats.activeUsers.toLocaleString()}</p>
                      <p className="text-teal-400 text-sm">{systemStats.retentionRate}% retenção</p>
                    </div>
                    <UserCheck className="w-8 h-8 text-teal-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm">Usuários PRO</p>
                      <p className="text-3xl font-bold text-white">{systemStats.proUsers.toLocaleString()}</p>
                      <p className="text-purple-400 text-sm">{((systemStats.proUsers / systemStats.totalUsers) * 100).toFixed(1)}% conversão</p>
                    </div>
                    <Crown className="w-8 h-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm">Receita Mensal</p>
                      <p className="text-3xl font-bold text-white">R$ {systemStats.totalRevenue.toLocaleString()}</p>
                      <p className="text-green-400 text-sm">+12.5% este mês</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Métricas Adicionais */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-emerald-400 flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Atividade dos Usuários
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total de Treinos</span>
                    <span className="text-white font-bold">{systemStats.totalWorkouts.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Média de Perda de Peso</span>
                    <span className="text-emerald-400 font-bold">{systemStats.avgWeightLoss.toFixed(1)}kg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Taxa de Engajamento</span>
                    <span className="text-teal-400 font-bold">85.2%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-teal-400 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Alertas do Sistema
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                    <Clock className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-300 text-sm">3 usuários com assinaturas expirando em 7 dias</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-red-500/20 rounded-lg border border-red-500/30">
                    <UserX className="w-4 h-4 text-red-400" />
                    <span className="text-red-300 text-sm">1 usuário suspenso aguarda revisão</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-300 text-sm">Sistema funcionando normalmente</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            {/* Filtros e Busca */}
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Buscar usuários..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <Select value={filterRole} onValueChange={setFilterRole}>
                      <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Função" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="all" className="text-white">Todas</SelectItem>
                        <SelectItem value="admin" className="text-white">Admin</SelectItem>
                        <SelectItem value="moderator" className="text-white">Moderador</SelectItem>
                        <SelectItem value="user" className="text-white">Usuário</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="all" className="text-white">Todos</SelectItem>
                        <SelectItem value="active" className="text-white">Ativo</SelectItem>
                        <SelectItem value="inactive" className="text-white">Inativo</SelectItem>
                        <SelectItem value="suspended" className="text-white">Suspenso</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      <Download className="w-4 h-4 mr-2" />
                      Exportar
                    </Button>
                    <Button className="bg-emerald-500 hover:bg-emerald-600">
                      <Plus className="w-4 h-4 mr-2" />
                      Novo Usuário
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lista de Usuários */}
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-white/20">
                      <tr>
                        <th className="text-left p-4 text-gray-300 font-semibold">Usuário</th>
                        <th className="text-left p-4 text-gray-300 font-semibold">Função</th>
                        <th className="text-left p-4 text-gray-300 font-semibold">Status</th>
                        <th className="text-left p-4 text-gray-300 font-semibold">Plano</th>
                        <th className="text-left p-4 text-gray-300 font-semibold">Treinos</th>
                        <th className="text-left p-4 text-gray-300 font-semibold">Peso Perdido</th>
                        <th className="text-left p-4 text-gray-300 font-semibold">Último Login</th>
                        <th className="text-left p-4 text-gray-300 font-semibold">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-white/10 hover:bg-white/5">
                          <td className="p-4">
                            <div>
                              <div className="text-white font-medium">{user.name}</div>
                              <div className="text-gray-400 text-sm">{user.email}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge className={`${getRoleColor(user.role)} text-white`}>
                              {user.role}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Badge className={`${getStatusColor(user.status)} text-white`}>
                              {user.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            {user.isPro ? (
                              <Badge className="bg-purple-500 text-white">
                                <Crown className="w-3 h-3 mr-1" />
                                PRO
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="border-gray-500 text-gray-400">
                                Gratuito
                              </Badge>
                            )}
                          </td>
                          <td className="p-4 text-white">{user.totalWorkouts}</td>
                          <td className="p-4 text-emerald-400 font-semibold">{user.weightLoss}kg</td>
                          <td className="p-4 text-gray-300">{user.lastLogin.toLocaleDateString()}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  setSelectedUser(user)
                                  setIsEditDialogOpen(true)
                                }}
                                className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/20"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDeleteUser(user.id)}
                                className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-emerald-400">Crescimento de Usuários</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Janeiro</span>
                      <span className="text-white font-bold">1,234</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Fevereiro</span>
                      <span className="text-white font-bold">1,456</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Março</span>
                      <span className="text-white font-bold">1,678</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Abril</span>
                      <span className="text-white font-bold">1,890</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-teal-400">Receita por Mês</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Janeiro</span>
                      <span className="text-green-400 font-bold">R$ 12,450</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Fevereiro</span>
                      <span className="text-green-400 font-bold">R$ 15,230</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Março</span>
                      <span className="text-green-400 font-bold">R$ 18,670</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Abril</span>
                      <span className="text-green-400 font-bold">R$ 21,890</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-emerald-400">Configurações do Sistema</CardTitle>
                <CardDescription className="text-gray-300">
                  Gerencie as configurações globais da aplicação
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Modo de Manutenção</Label>
                        <p className="text-sm text-gray-400">Desabilita acesso para usuários</p>
                      </div>
                      <Button
                        variant={adminSettings.maintenanceMode ? "destructive" : "outline"}
                        onClick={() => handleSettingsChange('maintenanceMode', !adminSettings.maintenanceMode)}
                      >
                        {adminSettings.maintenanceMode ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Registro de Novos Usuários</Label>
                        <p className="text-sm text-gray-400">Permite novos cadastros</p>
                      </div>
                      <Button
                        variant={adminSettings.registrationEnabled ? "default" : "outline"}
                        onClick={() => handleSettingsChange('registrationEnabled', !adminSettings.registrationEnabled)}
                      >
                        {adminSettings.registrationEnabled ? <CheckCircle className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Recursos PRO</Label>
                        <p className="text-sm text-gray-400">Habilita funcionalidades premium</p>
                      </div>
                      <Button
                        variant={adminSettings.proFeaturesEnabled ? "default" : "outline"}
                        onClick={() => handleSettingsChange('proFeaturesEnabled', !adminSettings.proFeaturesEnabled)}
                      >
                        {adminSettings.proFeaturesEnabled ? <Crown className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Notificações por Email</Label>
                        <p className="text-sm text-gray-400">Envia emails automáticos</p>
                      </div>
                      <Button
                        variant={adminSettings.emailNotifications ? "default" : "outline"}
                        onClick={() => handleSettingsChange('emailNotifications', !adminSettings.emailNotifications)}
                      >
                        {adminSettings.emailNotifications ? <Mail className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Backup Automático</Label>
                        <p className="text-sm text-gray-400">Backup diário dos dados</p>
                      </div>
                      <Button
                        variant={adminSettings.dataBackup ? "default" : "outline"}
                        onClick={() => handleSettingsChange('dataBackup', !adminSettings.dataBackup)}
                      >
                        {adminSettings.dataBackup ? <Save className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Analytics</Label>
                        <p className="text-sm text-gray-400">Coleta dados de uso</p>
                      </div>
                      <Button
                        variant={adminSettings.analyticsEnabled ? "default" : "outline"}
                        onClick={() => handleSettingsChange('analyticsEnabled', !adminSettings.analyticsEnabled)}
                      >
                        {adminSettings.analyticsEnabled ? <BarChart3 className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-white/20">
                  <div className="space-y-2">
                    <Label className="text-white">Máximo de Usuários por Dia</Label>
                    <Input
                      type="number"
                      value={adminSettings.maxUsersPerDay}
                      onChange={(e) => handleSettingsChange('maxUsersPerDay', parseInt(e.target.value))}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Timeout de Sessão (minutos)</Label>
                    <Input
                      type="number"
                      value={adminSettings.sessionTimeout}
                      onChange={(e) => handleSettingsChange('sessionTimeout', parseInt(e.target.value))}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  <Button className="bg-emerald-500 hover:bg-emerald-600">
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Configurações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
            <DialogDescription className="text-gray-400">
              Modifique as informações e permissões do usuário
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome</Label>
                  <Input
                    value={selectedUser.name}
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    value={selectedUser.email}
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Função</Label>
                  <Select
                    value={selectedUser.role}
                    onValueChange={(value: 'admin' | 'moderator' | 'user') => 
                      handleUserRoleChange(selectedUser.id, value)
                    }
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="user">Usuário</SelectItem>
                      <SelectItem value="moderator">Moderador</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={selectedUser.status}
                    onValueChange={(value: 'active' | 'inactive' | 'suspended') => 
                      handleUserStatusChange(selectedUser.id, value)
                    }
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="active">Ativo</SelectItem>
                      <SelectItem value="inactive">Inativo</SelectItem>
                      <SelectItem value="suspended">Suspenso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button className="bg-emerald-500 hover:bg-emerald-600">
                  Salvar Alterações
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}