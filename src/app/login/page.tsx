'use client'

import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Lógica de login aqui
    console.log('Dados de login:', formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-white hover:text-lime-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </Link>
          <h1 className="text-2xl font-bold text-white">BetterLife</h1>
        </div>

        {/* Formulário de Login */}
        <div className="max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-lime-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Bem-vindo de volta!</h2>
              <p className="text-gray-300">Entre na sua conta</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              {/* Senha */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.senha}
                    onChange={(e) => setFormData({...formData, senha: e.target.value})}
                    className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all"
                    placeholder="Sua senha"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Esqueci a senha */}
              <div className="text-right">
                <Link href="#" className="text-sm text-lime-400 hover:text-lime-300 transition-colors">
                  Esqueci minha senha
                </Link>
              </div>

              {/* Botão Login */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-lime-400 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-lime-500 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Entrar
              </button>
            </form>

            {/* Divisor */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-white/20"></div>
              <span className="px-4 text-gray-400 text-sm">ou</span>
              <div className="flex-1 border-t border-white/20"></div>
            </div>

            {/* Login Social */}
            <div className="space-y-3">
              <button className="w-full bg-white/10 border border-white/20 text-white py-3 px-6 rounded-xl hover:bg-white/20 transition-all duration-200">
                Continuar com Google
              </button>
              <button className="w-full bg-white/10 border border-white/20 text-white py-3 px-6 rounded-xl hover:bg-white/20 transition-all duration-200">
                Continuar com Apple
              </button>
            </div>

            {/* Link para Criar Conta */}
            <div className="text-center mt-6">
              <p className="text-gray-300">
                Não tem uma conta?{' '}
                <Link href="/criar-conta" className="text-lime-400 hover:text-lime-300 font-semibold transition-colors">
                  Criar Conta
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}