'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Users, 
  TrendingUp, 
  Activity, 
  Crown, 
  BarChart3, 
  Calendar, 
  Target, 
  Award,
  Shield,
  Settings,
  FileText,
  Download,
  UserCheck,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface AdminStats {
  totalUsers: number
  proUsers: number
  activeUsers: number
  totalWorkouts: number
  totalCaloriesBurned: number
  averageWeightLoss: number
  conversionRate: number
  monthlyRevenue: number
}

interface UserMetrics {
  id: string
  name: string
  email: string
  isPro: boolean
  isAdmin: boolean
  streakDays: number
  completedWorkouts: number
  totalCaloriesBurned: number
  weeklyWeightLoss: number
  createdAt: string
  lastActive: string
}

export default function AdminPage() {
  const { currentUser } = useAuth()
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'metrics' | 'reports'>('overview')
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    proUsers: 0,
    activeUsers: 0,
    totalWorkouts: 0,
    totalCaloriesBurned: 0,
    averageWeightLoss: 0,
    conversionRate: 0,
    monthlyRevenue: 0
  })
  const [users, setUsers] = useState<UserMetrics[]>([])

  // Verificar se é admin
  useEffect(() => {
    if (!currentUser?.isAdmin) {
      window.location.href = '/'
      return
    }

    // Carregar dados dos usuários
    loadUsersData()
  }, [currentUser])

  const loadUsersData = () => {
    try {
      const usersData = JSON.parse(localStorage.getItem('users') || '[]')
      
      // Calcular estatísticas
      const totalUsers = usersData.length
      const proUsers = usersData.filter((u: any) => u.isPro).length
      const activeUsers = usersData.filter((u: any) => {
        const lastActive = new Date(u.updatedAt || u.createdAt)
        const daysSinceActive = (Date.now() - lastActive.getTime()) / (1000 * 60 * 60 * 24)
        return daysSinceActive <= 7
      }).length

      const totalWorkouts = usersData.reduce((sum: number, u: any) => sum + (u.completedWorkouts || 0), 0)
      const totalCaloriesBurned = usersData.reduce((sum: number, u: any) => sum + (u.totalCaloriesBurned || 0), 0)
      const averageWeightLoss = usersData.reduce((sum: number, u: any) => sum + (u.weeklyWeightLoss || 0), 0) / totalUsers
      const conversionRate = totalUsers > 0 ? (proUsers / totalUsers) * 100 : 0
      const monthlyRevenue = proUsers * 29.90 // Assumindo plano mensal médio

      setStats({
        totalUsers,
        proUsers,
        activeUsers,
        totalWorkouts,
        totalCaloriesBurned,
        averageWeightLoss,
        conversionRate,
        monthlyRevenue
      })

      // Preparar dados dos usuários para exibição
      const userMetrics: UserMetrics[] = usersData.map((u: any) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        isPro: u.isPro || false,
        isAdmin: u.isAdmin || false,
        streakDays: u.streakDays || 0,
        completedWorkouts: u.completedWorkouts || 0,
        totalCaloriesBurned: u.totalCaloriesBurned || 0,
        weeklyWeightLoss: u.weeklyWeightLoss || 0,
        createdAt: u.createdAt,
        lastActive: u.updatedAt || u.createdAt
      }))

      setUsers(userMetrics)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    }
  }

  const exportData = () => {
    const data = {
      stats,
      users,
      exportDate: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `admin-report-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!currentUser?.isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 flex items-center justify-center">
        <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Acesso Negado</h2>
            <p className="text-gray-300 mb-6">Você não tem permissão para acessar o painel administrativo.</p>
            <Button onClick={() => window.location.href = '/'} className="bg-gradient-to-r from-emerald-500 to-teal-600">
              Voltar ao Início
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 rounded-2xl w-fit mx-auto mb-6">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">Painel Administrativo</h1>
          <p className="text-xl text-gray-300">Métricas e relatórios do sistema</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-2"
          >
            <BarChart3 className="w-4 h-4" />
            Visão Geral
          </Button>
          <Button
            variant={activeTab === 'users' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('users')}
            className="flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            Usuários
          </Button>
          <Button
            variant={activeTab === 'metrics' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('metrics')}
            className="flex items-center gap-2"
          >
            <TrendingUp className="w-4 h-4" />
            Métricas
          </Button>
          <Button
            variant={activeTab === 'reports' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('reports')}
            className="flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Relatórios
          </Button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Estatísticas Principais */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-2">{stats.totalUsers}</div>
                  <div className="text-gray-300">Total de Usuários</div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                <CardContent className="p-6 text-center">
                  <Crown className="w-8 h-8 text-amber-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-2">{stats.proUsers}</div>
                  <div className="text-gray-300">Usuários PRO</div>
                  <div className="text-sm text-amber-300 mt-1">
                    {stats.conversionRate.toFixed(1)}% conversão
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                <CardContent className="p-6 text-center">
                  <Activity className="w-8 h-8 text-green-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-2">{stats.activeUsers}</div>
                  <div className="text-gray-300">Usuários Ativos</div>
                  <div className="text-sm text-green-300 mt-1">Últimos 7 dias</div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                <CardContent className="p-6 text-center">
                  <Target className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-2">
                    R$ {stats.monthlyRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-gray-300">Receita Mensal</div>
                  <div className="text-sm text-emerald-300 mt-1">Estimada</div>
                </CardContent>
              </Card>
            </div>

            {/* Métricas de Engajamento */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-purple-400 flex items-center gap-2">
                    <BarChart3 className="w-6 h-6" />
                    Métricas de Engajamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total de Treinos:</span>
                    <span className="text-white font-bold">{stats.totalWorkouts.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Calorias Queimadas:</span>
                    <span className="text-white font-bold">{stats.totalCaloriesBurned.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Perda de Peso Média:</span>
                    <span className="text-white font-bold">{stats.averageWeightLoss.toFixed(1)}kg</span>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-300 mb-2">
                      <span>Taxa de Conversão PRO</span>
                      <span>{stats.conversionRate.toFixed(1)}%</span>
                    </div>
                    <Progress value={stats.conversionRate} className="h-3" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-indigo-400 flex items-center gap-2">
                    <Calendar className="w-6 h-6" />
                    Crescimento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-indigo-400 mb-2">
                      +{Math.floor(stats.totalUsers * 0.15)}
                    </div>
                    <div className="text-gray-300">Novos usuários este mês</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-400 mb-2">
                      +{Math.floor(stats.proUsers * 0.25)}
                    </div>
                    <div className="text-gray-300">Upgrades PRO este mês</div>
                  </div>
                  <div className="text-center">
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-lg px-4 py-2">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      +23% crescimento
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-400 flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  Usuários Registrados ({users.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left py-3 px-4 text-gray-300">Nome</th>
                        <th className="text-left py-3 px-4 text-gray-300">Email</th>
                        <th className="text-left py-3 px-4 text-gray-300">Tipo</th>
                        <th className="text-left py-3 px-4 text-gray-300">Sequência</th>
                        <th className="text-left py-3 px-4 text-gray-300">Treinos</th>
                        <th className="text-left py-3 px-4 text-gray-300">Cadastro</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b border-white/10 hover:bg-white/5">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <span className="text-white font-medium">{user.name}</span>
                              {user.isAdmin && (
                                <Badge variant="secondary" className="text-xs">
                                  <Shield className="w-3 h-3 mr-1" />
                                  Admin
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-300">{user.email}</td>
                          <td className="py-3 px-4">
                            <Badge className={user.isPro ? "bg-gradient-to-r from-amber-500 to-orange-500" : "bg-gray-600"}>
                              {user.isPro ? 'PRO' : 'Free'}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <span className="text-white">{user.streakDays}</span>
                              {user.streakDays > 7 && <span className="text-orange-400">🔥</span>}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-white">{user.completedWorkouts}</td>
                          <td className="py-3 px-4 text-gray-300">
                            {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Metrics Tab */}
        {activeTab === 'metrics' && (
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-400">Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users
                    .sort((a, b) => b.completedWorkouts - a.completedWorkouts)
                    .slice(0, 5)
                    .map((user, index) => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <div className="text-white font-medium">{user.name}</div>
                            <div className="text-gray-400 text-sm">{user.completedWorkouts} treinos</div>
                          </div>
                        </div>
                        <Award className="w-5 h-5 text-amber-400" />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-indigo-400">Usuários Mais Ativos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users
                    .sort((a, b) => b.streakDays - a.streakDays)
                    .slice(0, 5)
                    .map((user, index) => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <div className="text-white font-medium">{user.name}</div>
                            <div className="text-gray-400 text-sm">{user.streakDays} dias consecutivos</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-orange-400">🔥</span>
                          <span className="text-white font-bold">{user.streakDays}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-8">
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-400 flex items-center gap-2">
                  <FileText className="w-6 h-6" />
                  Relatórios e Exportações
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Gere e baixe relatórios detalhados do sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-white/5 rounded-lg border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-2">Relatório Completo</h3>
                    <p className="text-gray-300 mb-4">
                      Exporta todos os dados de usuários, métricas e estatísticas
                    </p>
                    <Button
                      onClick={exportData}
                      className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Exportar JSON
                    </Button>
                  </div>

                  <div className="p-6 bg-white/5 rounded-lg border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-2">Relatório de Usuários</h3>
                    <p className="text-gray-300 mb-4">
                      Lista detalhada de todos os usuários registrados
                    </p>
                    <Button
                      variant="outline"
                      className="border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/20"
                    >
                      <UserCheck className="w-4 h-4 mr-2" />
                      Gerar CSV
                    </Button>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-lg border border-purple-500/30">
                  <h3 className="text-xl font-semibold text-white mb-4">Resumo Executivo</h3>
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold text-purple-400 mb-2">{stats.totalUsers}</div>
                      <div className="text-gray-300">Total de Usuários</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-indigo-400 mb-2">
                        {stats.conversionRate.toFixed(1)}%
                      </div>
                      <div className="text-gray-300">Taxa de Conversão</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-emerald-400 mb-2">
                        R$ {stats.monthlyRevenue.toLocaleString('pt-BR')}
                      </div>
                      <div className="text-gray-300">Receita Mensal</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Back Button */}
        <div className="text-center mt-12">
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}