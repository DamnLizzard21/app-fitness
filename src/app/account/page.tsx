'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  User, 
  Mail, 
  Calendar, 
  Scale, 
  Ruler, 
  Globe, 
  Shield, 
  Trash2, 
  Eye, 
  EyeOff, 
  Save,
  Edit,
  CheckCircle,
  AlertTriangle,
  Settings,
  Lock,
  Bell,
  Download,
  FileText,
  UserCog
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AccountPage() {
  const { currentUser, updateUser, changePassword, deleteAccount, sendEmailVerification } = useAuth()
  const { language, setLanguage, t } = useLanguage()
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'privacy' | 'preferences'>('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  // Estados para formulários
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    dateOfBirth: currentUser?.dateOfBirth || '',
    gender: currentUser?.gender || '',
    height: currentUser?.height || '',
    weight: currentUser?.weight || '',
    unit: currentUser?.unit || 'metric',
    language: currentUser?.language || 'pt'
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleSaveProfile = async () => {
    setIsSaving(true)
    try {
      updateUser(profileData)
      setIsEditing(false)
      // Mostrar sucesso
    } catch (error) {
      console.error('Erro ao salvar perfil:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Senhas não coincidem!')
      return
    }

    try {
      const success = await changePassword(passwordData.currentPassword, passwordData.newPassword)
      if (success) {
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
        alert('Senha alterada com sucesso!')
      } else {
        alert('Senha atual incorreta!')
      }
    } catch (error) {
      console.error('Erro ao alterar senha:', error)
    }
  }

  const handleDeleteAccount = async () => {
    try {
      const success = await deleteAccount()
      if (success) {
        window.location.href = '/'
      }
    } catch (error) {
      console.error('Erro ao deletar conta:', error)
    }
  }

  const handleSendVerification = async () => {
    try {
      const success = await sendEmailVerification()
      if (success) {
        alert('Email de verificação enviado!')
      }
    } catch (error) {
      console.error('Erro ao enviar verificação:', error)
    }
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 flex items-center justify-center">
        <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Acesso Negado</h2>
            <p className="text-gray-300 mb-6">Você precisa estar logado para acessar esta página.</p>
            <Button onClick={() => window.location.href = '/'} className="bg-gradient-to-r from-emerald-500 to-teal-600">
              Voltar ao Início
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 rounded-2xl w-fit mx-auto mb-6">
            <UserCog className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">Minha Conta</h1>
          <p className="text-xl text-gray-300">Gerencie suas informações pessoais e configurações</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button
            variant={activeTab === 'profile' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            Perfil
          </Button>
          <Button
            variant={activeTab === 'security' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('security')}
            className="flex items-center gap-2"
          >
            <Lock className="w-4 h-4" />
            Segurança
          </Button>
          <Button
            variant={activeTab === 'preferences' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('preferences')}
            className="flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Preferências
          </Button>
          <Button
            variant={activeTab === 'privacy' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('privacy')}
            className="flex items-center gap-2"
          >
            <Shield className="w-4 h-4" />
            Privacidade
          </Button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Informações Pessoais */}
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-emerald-400 flex items-center gap-2">
                    <User className="w-6 h-6" />
                    Informações Pessoais
                  </CardTitle>
                  <Button
                    variant="ghost"
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-emerald-400 hover:text-emerald-300"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? 'Cancelar' : 'Editar'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Nome Completo</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    disabled={!isEditing}
                    className="bg-white/10 border-white/20 text-white disabled:opacity-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">E-mail</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      disabled={!isEditing}
                      className="bg-white/10 border-white/20 text-white disabled:opacity-50 pr-10"
                    />
                    {currentUser.emailVerified ? (
                      <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-400" />
                    ) : (
                      <AlertTriangle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-yellow-400" />
                    )}
                  </div>
                  {!currentUser.emailVerified && (
                    <Button
                      variant="link"
                      onClick={handleSendVerification}
                      className="text-emerald-400 hover:text-emerald-300 p-0 h-auto"
                    >
                      Verificar e-mail
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="text-white">Data de Nascimento</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                    disabled={!isEditing}
                    className="bg-white/10 border-white/20 text-white disabled:opacity-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-white">Sexo (Opcional)</Label>
                  <Select
                    value={profileData.gender}
                    onValueChange={(value) => setProfileData({...profileData, gender: value})}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white disabled:opacity-50">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="female">Feminino</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height" className="text-white">Altura</Label>
                    <Input
                      id="height"
                      placeholder={profileData.unit === 'metric' ? 'cm' : 'ft'}
                      value={profileData.height}
                      onChange={(e) => setProfileData({...profileData, height: e.target.value})}
                      disabled={!isEditing}
                      className="bg-white/10 border-white/20 text-white disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="text-white">Peso</Label>
                    <Input
                      id="weight"
                      placeholder={profileData.unit === 'metric' ? 'kg' : 'lbs'}
                      value={profileData.weight}
                      onChange={(e) => setProfileData({...profileData, weight: e.target.value})}
                      disabled={!isEditing}
                      className="bg-white/10 border-white/20 text-white disabled:opacity-50"
                    />
                  </div>
                </div>

                {isEditing && (
                  <Button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Status da Conta */}
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-teal-400 flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  Status da Conta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Tipo de Conta:</span>
                  <Badge className={currentUser.isPro ? "bg-gradient-to-r from-amber-500 to-orange-500" : "bg-gray-600"}>
                    {currentUser.isPro ? 'PRO' : 'Gratuita'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">E-mail Verificado:</span>
                  <Badge variant={currentUser.emailVerified ? "default" : "destructive"}>
                    {currentUser.emailVerified ? 'Verificado' : 'Não Verificado'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Papel:</span>
                  <Badge variant={currentUser.isAdmin ? "secondary" : "outline"}>
                    {currentUser.isAdmin ? 'Admin' : 'Usuário'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Membro desde:</span>
                  <span className="text-white">
                    {new Date(currentUser.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Última atualização:</span>
                  <span className="text-white">
                    {new Date(currentUser.updatedAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>

                {!currentUser.isPro && (
                  <Button
                    onClick={() => window.location.href = '/pro-version'}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                  >
                    Upgrade para PRO
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="max-w-2xl mx-auto">
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-emerald-400 flex items-center gap-2">
                  <Lock className="w-6 h-6" />
                  Segurança da Conta
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Gerencie sua senha e configurações de segurança
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-white">Senha Atual</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      className="bg-white/10 border-white/20 text-white pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-white">Nova Senha</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      className="bg-white/10 border-white/20 text-white pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white">Confirmar Nova Senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>

                <Button
                  onClick={handleChangePassword}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                >
                  Alterar Senha
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <div className="max-w-2xl mx-auto">
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-emerald-400 flex items-center gap-2">
                  <Settings className="w-6 h-6" />
                  Preferências
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Configure suas preferências de idioma e unidades
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-white">Idioma Preferido</Label>
                  <Select
                    value={language}
                    onValueChange={(value) => {
                      setLanguage(value as any)
                      updateUser({ language: value as any })
                    }}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <Globe className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="pt">🇧🇷 Português</SelectItem>
                      <SelectItem value="en">🇺🇸 English</SelectItem>
                      <SelectItem value="es">🇪🇸 Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit" className="text-white">Unidade Preferida</Label>
                  <Select
                    value={profileData.unit}
                    onValueChange={(value) => {
                      setProfileData({...profileData, unit: value})
                      updateUser({ unit: value as any })
                    }}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <Scale className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="metric">Métrico (kg, cm)</SelectItem>
                      <SelectItem value="imperial">Imperial (lbs, ft)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Notificações</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Lembretes de treino</span>
                      <Button variant="outline" size="sm">
                        <Bell className="w-4 h-4 mr-2" />
                        Configurar
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Relatórios semanais</span>
                      <Button variant="outline" size="sm">
                        <Bell className="w-4 h-4 mr-2" />
                        Configurar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Privacy Tab */}
        {activeTab === 'privacy' && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Política de Privacidade */}
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-emerald-400 flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  Política de Privacidade
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-gray-300 space-y-4">
                  <p>
                    <strong className="text-white">1. Coleta de Dados:</strong> Coletamos apenas os dados necessários para fornecer nossos serviços, incluindo informações de perfil, métricas de saúde e progresso.
                  </p>
                  <p>
                    <strong className="text-white">2. Uso dos Dados:</strong> Seus dados são usados exclusivamente para personalizar sua experiência, gerar relatórios de progresso e melhorar nossos serviços.
                  </p>
                  <p>
                    <strong className="text-white">3. Compartilhamento:</strong> Nunca compartilhamos seus dados pessoais com terceiros sem seu consentimento explícito.
                  </p>
                  <p>
                    <strong className="text-white">4. Segurança:</strong> Utilizamos criptografia e medidas de segurança avançadas para proteger suas informações.
                  </p>
                </div>
                <Button variant="outline" className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20">
                  <FileText className="w-4 h-4 mr-2" />
                  Ler Política Completa
                </Button>
              </CardContent>
            </Card>

            {/* Termos de Uso */}
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-teal-400 flex items-center gap-2">
                  <FileText className="w-6 h-6" />
                  Termos de Uso
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-gray-300 space-y-4">
                  <p>
                    <strong className="text-white">1. Aceitação:</strong> Ao usar nossos serviços, você concorda com estes termos e nossa política de privacidade.
                  </p>
                  <p>
                    <strong className="text-white">2. Responsabilidade:</strong> Você é responsável por manter suas credenciais seguras e por todas as atividades em sua conta.
                  </p>
                  <p>
                    <strong className="text-white">3. Uso Adequado:</strong> Nossos serviços devem ser usados apenas para fins legais e de acordo com nossas diretrizes.
                  </p>
                  <p>
                    <strong className="text-white">4. Modificações:</strong> Reservamos o direito de modificar estes termos a qualquer momento, com notificação prévia.
                  </p>
                </div>
                <Button variant="outline" className="border-teal-500/50 text-teal-400 hover:bg-teal-500/20">
                  <FileText className="w-4 h-4 mr-2" />
                  Ler Termos Completos
                </Button>
              </CardContent>
            </Card>

            {/* Exportar Dados */}
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-cyan-400 flex items-center gap-2">
                  <Download className="w-6 h-6" />
                  Exportar Dados
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Baixe uma cópia de todos os seus dados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  Solicitar Exportação
                </Button>
              </CardContent>
            </Card>

            {/* Excluir Conta */}
            <Card className="border-2 border-red-500/50 bg-red-900/20 backdrop-blur-xl shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-red-400 flex items-center gap-2">
                  <Trash2 className="w-6 h-6" />
                  Zona de Perigo
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Ações irreversíveis que afetam permanentemente sua conta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-red-900/30 rounded-lg border border-red-500/30">
                    <h4 className="text-lg font-semibold text-red-400 mb-2">Excluir Conta</h4>
                    <p className="text-gray-300 mb-4">
                      Esta ação é irreversível. Todos os seus dados, progresso e configurações serão permanentemente removidos.
                    </p>
                    <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                      <DialogTrigger asChild>
                        <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete My Account
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-slate-900 border-slate-700">
                        <DialogHeader>
                          <DialogTitle className="text-red-400">Confirmar Exclusão da Conta</DialogTitle>
                          <DialogDescription className="text-gray-300">
                            Esta ação não pode ser desfeita. Todos os seus dados serão permanentemente removidos.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <p className="text-white">
                            Digite <strong>"DELETE MY ACCOUNT"</strong> para confirmar:
                          </p>
                          <Input
                            placeholder="DELETE MY ACCOUNT"
                            className="bg-white/10 border-white/20 text-white"
                          />
                          <div className="flex gap-4">
                            <Button
                              variant="outline"
                              onClick={() => setShowDeleteDialog(false)}
                              className="flex-1"
                            >
                              Cancelar
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={handleDeleteAccount}
                              className="flex-1 bg-red-600 hover:bg-red-700"
                            >
                              Excluir Permanentemente
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
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