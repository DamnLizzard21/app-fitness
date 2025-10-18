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
  User, 
  Settings, 
  Shield, 
  Crown, 
  Edit,
  Save,
  Camera,
  Mail,
  Phone,
  Calendar,
  Target,
  Dumbbell,
  Utensils,
  Award,
  Bell,
  Lock,
  Globe,
  Trash2,
  Download,
  Upload,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Info,
  X,
  Plus,
  Minus,
  RefreshCw,
  LogOut,
  Home
} from 'lucide-react'

interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  height: string
  weight: string
  targetWeight: string
  goal: string
  activityLevel: string
  trainingLevel: string
  dietRestrictions: string
  medicalConditions: string
  profileImage?: string
  isPro: boolean
  subscriptionEnd?: Date
  createdAt: Date
  lastLogin: Date
}

interface AccountSettings {
  emailNotifications: boolean
  pushNotifications: boolean
  weeklyReports: boolean
  marketingEmails: boolean
  dataSharing: boolean
  publicProfile: boolean
  language: string
  timezone: string
  units: 'metric' | 'imperial'
  theme: 'light' | 'dark' | 'auto'
}

interface SecuritySettings {
  twoFactorEnabled: boolean
  loginAlerts: boolean
  sessionTimeout: number
  passwordLastChanged: Date
  activeDevices: number
}

export default function AccountManagement() {
  const [currentTab, setCurrentTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: '1',
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '+55 11 99999-9999',
    dateOfBirth: '1995-05-15',
    gender: 'Masculino',
    height: '1.75',
    weight: '80',
    targetWeight: '75',
    goal: 'Perder peso',
    activityLevel: '3-4x por semana',
    trainingLevel: 'Intermediário',
    dietRestrictions: 'Nenhuma',
    medicalConditions: 'Nenhuma',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    isPro: true,
    subscriptionEnd: new Date('2024-12-15'),
    createdAt: new Date('2024-01-15'),
    lastLogin: new Date('2024-10-18')
  })

  const [accountSettings, setAccountSettings] = useState<AccountSettings>({
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
  })

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    loginAlerts: true,
    sessionTimeout: 30,
    passwordLastChanged: new Date('2024-08-15'),
    activeDevices: 3
  })

  const handleProfileUpdate = (field: keyof UserProfile, value: string) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSettingsUpdate = (field: keyof AccountSettings, value: boolean | string) => {
    setAccountSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSecurityUpdate = (field: keyof SecuritySettings, value: boolean | number) => {
    setSecuritySettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert('As senhas não coincidem!')
      return
    }
    if (newPassword.length < 8) {
      alert('A senha deve ter pelo menos 8 caracteres!')
      return
    }
    
    // Simular mudança de senha
    setSecuritySettings(prev => ({
      ...prev,
      passwordLastChanged: new Date()
    }))
    setShowPasswordDialog(false)
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    alert('Senha alterada com sucesso!')
  }

  const handleAccountDeletion = () => {
    // Simular exclusão de conta
    alert('Conta excluída com sucesso!')
    setShowDeleteDialog(false)
  }

  const calculateAge = (dateOfBirth: string): number => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    return age
  }

  const calculateBMI = (weight: string, height: string): number => {
    const weightNum = parseFloat(weight)
    const heightNum = parseFloat(height)
    return weightNum / (heightNum * heightNum)
  }

  const getBMICategory = (bmi: number): string => {
    if (bmi < 18.5) return 'Abaixo do peso'
    if (bmi < 25) return 'Peso normal'
    if (bmi < 30) return 'Sobrepeso'
    return 'Obesidade'
  }

  const bmi = calculateBMI(userProfile.weight, userProfile.height)
  const bmiCategory = getBMICategory(bmi)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-3 rounded-xl">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Gerenciamento de Conta</h1>
                <p className="text-gray-300">Configure seu perfil e preferências</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {userProfile.isPro && (
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2">
                  <Crown className="w-4 h-4 mr-2" />
                  PRO
                </Badge>
              )}
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Home className="w-4 h-4 mr-2" />
                Voltar ao App
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-8">
          <TabsList className="bg-white/10 backdrop-blur-xl border border-white/20">
            <TabsTrigger value="profile" className="data-[state=active]:bg-white/20">
              <User className="w-4 h-4 mr-2" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-white/20">
              <Settings className="w-4 h-4 mr-2" />
              Configurações
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-white/20">
              <Shield className="w-4 h-4 mr-2" />
              Segurança
            </TabsTrigger>
            <TabsTrigger value="subscription" className="data-[state=active]:bg-white/20">
              <Crown className="w-4 h-4 mr-2" />
              Assinatura
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Profile Picture & Basic Info */}
              <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600">
                      {userProfile.profileImage ? (
                        <img 
                          src={userProfile.profileImage} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User className="w-16 h-16 text-white" />
                        </div>
                      )}
                    </div>
                    <Button
                      size="sm"
                      className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2 bg-emerald-500 hover:bg-emerald-600 rounded-full p-2"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{userProfile.name}</h3>
                  <p className="text-gray-300 mb-4">{userProfile.email}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Idade:</span>
                      <span className="text-white">{calculateAge(userProfile.dateOfBirth)} anos</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">IMC:</span>
                      <span className="text-emerald-400">{bmi.toFixed(1)} - {bmiCategory}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Membro desde:</span>
                      <span className="text-white">{userProfile.createdAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personal Information */}
              <Card className="md:col-span-2 border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-emerald-400">Informações Pessoais</CardTitle>
                    <CardDescription className="text-gray-300">
                      Mantenha seus dados atualizados para melhor experiência
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                    {isEditing ? 'Salvar' : 'Editar'}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white">Nome Completo</Label>
                      <Input
                        value={userProfile.name}
                        onChange={(e) => handleProfileUpdate('name', e.target.value)}
                        disabled={!isEditing}
                        className="bg-white/10 border-white/20 text-white disabled:opacity-60"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Email</Label>
                      <Input
                        value={userProfile.email}
                        onChange={(e) => handleProfileUpdate('email', e.target.value)}
                        disabled={!isEditing}
                        className="bg-white/10 border-white/20 text-white disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white">Telefone</Label>
                      <Input
                        value={userProfile.phone}
                        onChange={(e) => handleProfileUpdate('phone', e.target.value)}
                        disabled={!isEditing}
                        className="bg-white/10 border-white/20 text-white disabled:opacity-60"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Data de Nascimento</Label>
                      <Input
                        type="date"
                        value={userProfile.dateOfBirth}
                        onChange={(e) => handleProfileUpdate('dateOfBirth', e.target.value)}
                        disabled={!isEditing}
                        className="bg-white/10 border-white/20 text-white disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white">Gênero</Label>
                      <Select
                        value={userProfile.gender}
                        onValueChange={(value) => handleProfileUpdate('gender', value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger className="bg-white/10 border-white/20 text-white disabled:opacity-60">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="Masculino" className="text-white">Masculino</SelectItem>
                          <SelectItem value="Feminino" className="text-white">Feminino</SelectItem>
                          <SelectItem value="Outro" className="text-white">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Altura (m)</Label>
                      <Input
                        value={userProfile.height}
                        onChange={(e) => handleProfileUpdate('height', e.target.value)}
                        disabled={!isEditing}
                        placeholder="1.75"
                        className="bg-white/10 border-white/20 text-white disabled:opacity-60"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Peso (kg)</Label>
                      <Input
                        value={userProfile.weight}
                        onChange={(e) => handleProfileUpdate('weight', e.target.value)}
                        disabled={!isEditing}
                        placeholder="70"
                        className="bg-white/10 border-white/20 text-white disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white">Peso Meta (kg)</Label>
                      <Input
                        value={userProfile.targetWeight}
                        onChange={(e) => handleProfileUpdate('targetWeight', e.target.value)}
                        disabled={!isEditing}
                        placeholder="65"
                        className="bg-white/10 border-white/20 text-white disabled:opacity-60"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Objetivo Principal</Label>
                      <Select
                        value={userProfile.goal}
                        onValueChange={(value) => handleProfileUpdate('goal', value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger className="bg-white/10 border-white/20 text-white disabled:opacity-60">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="Perder peso" className="text-white">Perder peso</SelectItem>
                          <SelectItem value="Ganhar massa muscular" className="text-white">Ganhar massa muscular</SelectItem>
                          <SelectItem value="Manter peso" className="text-white">Manter peso</SelectItem>
                          <SelectItem value="Melhorar condicionamento" className="text-white">Melhorar condicionamento</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Restrições Alimentares</Label>
                    <Textarea
                      value={userProfile.dietRestrictions}
                      onChange={(e) => handleProfileUpdate('dietRestrictions', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Ex: vegetariano, intolerância à lactose..."
                      className="bg-white/10 border-white/20 text-white disabled:opacity-60"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Condições Médicas</Label>
                    <Textarea
                      value={userProfile.medicalConditions}
                      onChange={(e) => handleProfileUpdate('medicalConditions', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Ex: diabetes, hipertensão, lesões..."
                      className="bg-white/10 border-white/20 text-white disabled:opacity-60"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Notifications */}
              <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-emerald-400 flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notificações
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Configure como você quer receber notificações
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Notificações por Email</Label>
                      <p className="text-sm text-gray-400">Receba atualizações importantes</p>
                    </div>
                    <Button
                      variant={accountSettings.emailNotifications ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSettingsUpdate('emailNotifications', !accountSettings.emailNotifications)}
                    >
                      {accountSettings.emailNotifications ? <CheckCircle className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Notificações Push</Label>
                      <p className="text-sm text-gray-400">Lembretes de treino e dieta</p>
                    </div>
                    <Button
                      variant={accountSettings.pushNotifications ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSettingsUpdate('pushNotifications', !accountSettings.pushNotifications)}
                    >
                      {accountSettings.pushNotifications ? <CheckCircle className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Relatórios Semanais</Label>
                      <p className="text-sm text-gray-400">Resumo do seu progresso</p>
                    </div>
                    <Button
                      variant={accountSettings.weeklyReports ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSettingsUpdate('weeklyReports', !accountSettings.weeklyReports)}
                    >
                      {accountSettings.weeklyReports ? <CheckCircle className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Emails de Marketing</Label>
                      <p className="text-sm text-gray-400">Novidades e promoções</p>
                    </div>
                    <Button
                      variant={accountSettings.marketingEmails ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSettingsUpdate('marketingEmails', !accountSettings.marketingEmails)}
                    >
                      {accountSettings.marketingEmails ? <CheckCircle className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Privacy */}
              <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-teal-400 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Privacidade
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Controle como seus dados são utilizados
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Compartilhamento de Dados</Label>
                      <p className="text-sm text-gray-400">Para melhorar o serviço</p>
                    </div>
                    <Button
                      variant={accountSettings.dataSharing ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSettingsUpdate('dataSharing', !accountSettings.dataSharing)}
                    >
                      {accountSettings.dataSharing ? <CheckCircle className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Perfil Público</Label>
                      <p className="text-sm text-gray-400">Outros usuários podem ver seu progresso</p>
                    </div>
                    <Button
                      variant={accountSettings.publicProfile ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSettingsUpdate('publicProfile', !accountSettings.publicProfile)}
                    >
                      {accountSettings.publicProfile ? <CheckCircle className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Idioma</Label>
                    <Select
                      value={accountSettings.language}
                      onValueChange={(value) => handleSettingsUpdate('language', value)}
                    >
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="pt-BR" className="text-white">Português (Brasil)</SelectItem>
                        <SelectItem value="en-US" className="text-white">English (US)</SelectItem>
                        <SelectItem value="es-ES" className="text-white">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Unidades</Label>
                    <Select
                      value={accountSettings.units}
                      onValueChange={(value: 'metric' | 'imperial') => handleSettingsUpdate('units', value)}
                    >
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="metric" className="text-white">Métrico (kg, cm)</SelectItem>
                        <SelectItem value="imperial" className="text-white">Imperial (lbs, ft)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end">
              <Button className="bg-emerald-500 hover:bg-emerald-600">
                <Save className="w-4 h-4 mr-2" />
                Salvar Configurações
              </Button>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Password & Authentication */}
              <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Senha e Autenticação
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Mantenha sua conta segura
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Última alteração de senha</Label>
                      <p className="text-sm text-gray-400">{securitySettings.passwordLastChanged.toLocaleDateString()}</p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setShowPasswordDialog(true)}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Alterar Senha
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Autenticação de Dois Fatores</Label>
                      <p className="text-sm text-gray-400">Camada extra de segurança</p>
                    </div>
                    <Button
                      variant={securitySettings.twoFactorEnabled ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSecurityUpdate('twoFactorEnabled', !securitySettings.twoFactorEnabled)}
                    >
                      {securitySettings.twoFactorEnabled ? <CheckCircle className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Alertas de Login</Label>
                      <p className="text-sm text-gray-400">Notificação de novos acessos</p>
                    </div>
                    <Button
                      variant={securitySettings.loginAlerts ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSecurityUpdate('loginAlerts', !securitySettings.loginAlerts)}
                    >
                      {securitySettings.loginAlerts ? <CheckCircle className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Timeout de Sessão (minutos)</Label>
                    <Input
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => handleSecurityUpdate('sessionTimeout', parseInt(e.target.value))}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Account Activity */}
              <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-blue-400 flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Atividade da Conta
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Monitore o acesso à sua conta
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Último Login</Label>
                      <p className="text-sm text-gray-400">{userProfile.lastLogin.toLocaleString()}</p>
                    </div>
                    <Badge className="bg-green-500 text-white">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Ativo
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Dispositivos Ativos</Label>
                      <p className="text-sm text-gray-400">{securitySettings.activeDevices} dispositivos conectados</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                      <Eye className="w-4 h-4 mr-1" />
                      Ver Todos
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Ações Rápidas</Label>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                        <Download className="w-4 h-4 mr-1" />
                        Baixar Dados
                      </Button>
                      <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                        <LogOut className="w-4 h-4 mr-1" />
                        Sair de Todos
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Danger Zone */}
            <Card className="border-2 border-red-500/50 bg-red-500/10 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Zona de Perigo
                </CardTitle>
                <CardDescription className="text-red-300">
                  Ações irreversíveis - proceda com cuidado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Excluir Conta</Label>
                    <p className="text-sm text-red-300">Esta ação não pode ser desfeita</p>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Excluir Conta
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Current Plan */}
              <Card className="border-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl shadow-2xl border border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-400 flex items-center gap-2">
                    <Crown className="w-5 h-5" />
                    Plano Atual
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg px-4 py-2 mb-4">
                      <Crown className="w-4 h-4 mr-2" />
                      BetterLife PRO
                    </Badge>
                    <div className="text-3xl font-bold text-white mb-2">R$ 29,90/mês</div>
                    <p className="text-gray-300">Acesso completo a todas as funcionalidades</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Dietas personalizadas ilimitadas</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Treinos com vídeos HD</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Desafio calistênico 30 dias</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Análises avançadas</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Suporte prioritário</span>
                    </div>
                  </div>

                  {userProfile.subscriptionEnd && (
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Próxima cobrança:</span>
                        <span className="text-white font-semibold">
                          {userProfile.subscriptionEnd.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Billing History */}
              <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-emerald-400 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Histórico de Pagamentos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <div className="text-white font-medium">R$ 29,90</div>
                        <div className="text-sm text-gray-400">15/10/2024</div>
                      </div>
                      <Badge className="bg-green-500 text-white">
                        Pago
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <div className="text-white font-medium">R$ 29,90</div>
                        <div className="text-sm text-gray-400">15/09/2024</div>
                      </div>
                      <Badge className="bg-green-500 text-white">
                        Pago
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <div className="text-white font-medium">R$ 29,90</div>
                        <div className="text-sm text-gray-400">15/08/2024</div>
                      </div>
                      <Badge className="bg-green-500 text-white">
                        Pago
                      </Badge>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
                      <Download className="w-4 h-4 mr-2" />
                      Baixar Faturas
                    </Button>
                    <Button variant="destructive" className="flex-1">
                      Cancelar Assinatura
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Change Password Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Alterar Senha</DialogTitle>
            <DialogDescription className="text-gray-400">
              Digite sua senha atual e escolha uma nova senha segura
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Senha Atual</Label>
              <div className="relative">
                <Input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="bg-slate-700 border-slate-600 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Nova Senha</Label>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-slate-700 border-slate-600 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Confirmar Nova Senha</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-slate-700 border-slate-600"
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handlePasswordChange} className="bg-emerald-500 hover:bg-emerald-600">
                Alterar Senha
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-red-400">Excluir Conta</DialogTitle>
            <DialogDescription className="text-gray-400">
              Esta ação é irreversível. Todos os seus dados serão permanentemente excluídos.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-center gap-3 text-red-300">
                <AlertTriangle className="w-5 h-5" />
                <div>
                  <div className="font-semibold">Você perderá:</div>
                  <ul className="text-sm mt-2 space-y-1">
                    <li>• Todos os dados de progresso</li>
                    <li>• Histórico de treinos e dietas</li>
                    <li>• Configurações personalizadas</li>
                    <li>• Assinatura PRO ativa</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleAccountDeletion}>
                <Trash2 className="w-4 h-4 mr-2" />
                Excluir Permanentemente
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}