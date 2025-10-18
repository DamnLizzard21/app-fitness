'use client'

import { useState } from 'react'
import { ArrowLeft, Dumbbell, Clock, Target, Play, CheckCircle, RotateCcw, Zap, Fire, Trophy, MapPin, ChevronDown, Home, Building, Trees, Waves } from 'lucide-react'
import Link from 'next/link'

export default function Treinos() {
  const [treinoAtivo, setTreinoAtivo] = useState<number | null>(null)
  const [exerciciosConcluidos, setExerciciosConcluidos] = useState<{[key: string]: boolean}>({})
  const [localSelecionado, setLocalSelecionado] = useState('academia')
  const [menuLocalAberto, setMenuLocalAberto] = useState(false)

  const locaisTreino = [
    {
      id: 'academia',
      nome: 'Academia',
      icon: Dumbbell,
      cor: 'from-red-500 to-orange-500',
      corBg: 'bg-red-500/20',
      corBorder: 'border-red-500/40',
      corText: 'text-red-400',
      descricao: 'Equipamentos completos'
    },
    {
      id: 'casa',
      nome: 'Em Casa',
      icon: Home,
      cor: 'from-blue-500 to-cyan-500',
      corBg: 'bg-blue-500/20',
      corBorder: 'border-blue-500/40',
      corText: 'text-blue-400',
      descricao: 'Treino funcional'
    },
    {
      id: 'parque',
      nome: 'Parque',
      icon: Trees,
      cor: 'from-green-500 to-emerald-500',
      corBg: 'bg-green-500/20',
      corBorder: 'border-green-500/40',
      corText: 'text-green-400',
      descricao: 'Ar livre e natureza'
    },
    {
      id: 'praia',
      nome: 'Praia',
      icon: Waves,
      cor: 'from-cyan-500 to-teal-500',
      corBg: 'bg-cyan-500/20',
      corBorder: 'border-cyan-500/40',
      corText: 'text-cyan-400',
      descricao: 'Treino na areia'
    },
    {
      id: 'escritorio',
      nome: 'Escritório',
      icon: Building,
      cor: 'from-purple-500 to-pink-500',
      corBg: 'bg-purple-500/20',
      corBorder: 'border-purple-500/40',
      corText: 'text-purple-400',
      descricao: 'Exercícios rápidos'
    }
  ]

  const localAtual = locaisTreino.find(local => local.id === localSelecionado) || locaisTreino[0]

  const planoTreino = [
    {
      dia: 'Segunda-feira',
      foco: 'Peito e Tríceps',
      duracao: '60 min',
      cor: 'from-red-500 to-orange-500',
      corBg: 'bg-red-500/10',
      corBorder: 'border-red-500/30',
      corText: 'text-red-400',
      exercicios: [
        { nome: 'Supino Reto', series: '4x10', descanso: '90s', peso: '80kg' },
        { nome: 'Supino Inclinado', series: '3x12', descanso: '60s', peso: '70kg' },
        { nome: 'Crossover', series: '3x15', descanso: '45s', peso: '25kg' },
        { nome: 'Tríceps Corda', series: '3x12', descanso: '60s', peso: '30kg' },
        { nome: 'Tríceps Testa', series: '3x10', descanso: '60s', peso: '40kg' }
      ]
    },
    {
      dia: 'Terça-feira',
      foco: 'Costas e Bíceps',
      duracao: '65 min',
      cor: 'from-blue-500 to-cyan-500',
      corBg: 'bg-blue-500/10',
      corBorder: 'border-blue-500/30',
      corText: 'text-blue-400',
      exercicios: [
        { nome: 'Puxada Frontal', series: '4x10', descanso: '90s', peso: '70kg' },
        { nome: 'Remada Baixa', series: '3x12', descanso: '60s', peso: '60kg' },
        { nome: 'Remada Curvada', series: '3x10', descanso: '90s', peso: '80kg' },
        { nome: 'Rosca Direta', series: '3x12', descanso: '60s', peso: '30kg' },
        { nome: 'Rosca Martelo', series: '3x10', descanso: '60s', peso: '25kg' }
      ]
    },
    {
      dia: 'Quarta-feira',
      foco: 'Pernas e Glúteos',
      duracao: '70 min',
      cor: 'from-green-500 to-emerald-500',
      corBg: 'bg-green-500/10',
      corBorder: 'border-green-500/30',
      corText: 'text-green-400',
      exercicios: [
        { nome: 'Agachamento', series: '4x12', descanso: '120s', peso: '100kg' },
        { nome: 'Leg Press', series: '3x15', descanso: '90s', peso: '200kg' },
        { nome: 'Cadeira Extensora', series: '3x12', descanso: '60s', peso: '50kg' },
        { nome: 'Mesa Flexora', series: '3x12', descanso: '60s', peso: '40kg' },
        { nome: 'Panturrilha', series: '4x20', descanso: '45s', peso: '80kg' }
      ]
    },
    {
      dia: 'Quinta-feira',
      foco: 'Ombros e Abdômen',
      duracao: '55 min',
      cor: 'from-purple-500 to-pink-500',
      corBg: 'bg-purple-500/10',
      corBorder: 'border-purple-500/30',
      corText: 'text-purple-400',
      exercicios: [
        { nome: 'Desenvolvimento', series: '4x10', descanso: '90s', peso: '50kg' },
        { nome: 'Elevação Lateral', series: '3x15', descanso: '45s', peso: '15kg' },
        { nome: 'Elevação Frontal', series: '3x12', descanso: '45s', peso: '12kg' },
        { nome: 'Encolhimento', series: '3x15', descanso: '60s', peso: '40kg' },
        { nome: 'Prancha', series: '3x45s', descanso: '60s', peso: 'Corporal' }
      ]
    },
    {
      dia: 'Sexta-feira',
      foco: 'HIIT Funcional',
      duracao: '45 min',
      cor: 'from-yellow-500 to-orange-500',
      corBg: 'bg-yellow-500/10',
      corBorder: 'border-yellow-500/30',
      corText: 'text-yellow-400',
      exercicios: [
        { nome: 'Burpees', series: '4x15', descanso: '30s', peso: 'Corporal' },
        { nome: 'Jump Squat', series: '4x20', descanso: '30s', peso: 'Corporal' },
        { nome: 'Mountain Climber', series: '4x30s', descanso: '30s', peso: 'Corporal' },
        { nome: 'Polichinelo', series: '4x45s', descanso: '30s', peso: 'Corporal' },
        { nome: 'Prancha Dinâmica', series: '3x30s', descanso: '45s', peso: 'Corporal' }
      ]
    }
  ]

  const toggleExercicio = (dia: string, exercicio: string) => {
    const key = `${dia}-${exercicio}`
    setExerciciosConcluidos(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const calcularProgresso = (treino: any) => {
    const total = treino.exercicios.length
    const concluidos = treino.exercicios.filter((ex: any) => 
      exerciciosConcluidos[`${treino.dia}-${ex.nome}`]
    ).length
    return Math.round((concluidos / total) * 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-white hover:text-lime-400 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent">
            Meus Treinos
          </h1>
        </div>

        {/* Menu de Seleção do Local - MODERNIZADO */}
        <div className="mb-8">
          <div className="relative">
            <button
              onClick={() => setMenuLocalAberto(!menuLocalAberto)}
              className={`group w-full md:w-auto min-w-[300px] ${localAtual.corBg} backdrop-blur-sm rounded-2xl p-6 border ${localAtual.corBorder} hover:border-opacity-80 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 bg-gradient-to-r ${localAtual.cor} rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    <localAtual.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className={`w-4 h-4 ${localAtual.corText}`} />
                      <span className="text-white font-bold text-lg">Local de Treino</span>
                    </div>
                    <h3 className={`${localAtual.corText} font-bold text-xl`}>{localAtual.nome}</h3>
                    <p className="text-gray-300 text-sm">{localAtual.descricao}</p>
                  </div>
                </div>
                <ChevronDown className={`w-6 h-6 text-white transition-transform duration-300 ${menuLocalAberto ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {/* Dropdown Menu Modernizado */}
            {menuLocalAberto && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl z-50 overflow-hidden animate-in slide-in-from-top duration-300">
                <div className="p-2">
                  {locaisTreino.map((local) => {
                    const IconComponent = local.icon
                    const isSelected = local.id === localSelecionado
                    
                    return (
                      <button
                        key={local.id}
                        onClick={() => {
                          setLocalSelecionado(local.id)
                          setMenuLocalAberto(false)
                        }}
                        className={`group w-full p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                          isSelected 
                            ? `${local.corBg} ${local.corBorder} border shadow-lg` 
                            : 'hover:bg-white/10 border border-transparent hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 bg-gradient-to-r ${local.cor} rounded-xl flex items-center justify-center group-hover:rotate-6 transition-all duration-300 shadow-lg ${isSelected ? 'scale-110' : ''}`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-left flex-1">
                            <h4 className={`font-bold text-lg ${isSelected ? local.corText : 'text-white'} transition-colors`}>
                              {local.nome}
                            </h4>
                            <p className="text-gray-300 text-sm">{local.descricao}</p>
                          </div>
                          {isSelected && (
                            <div className={`w-8 h-8 bg-gradient-to-r ${local.cor} rounded-full flex items-center justify-center animate-in zoom-in duration-300`}>
                              <CheckCircle className="w-5 h-5 text-white" />
                            </div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Resumo da Semana - Cards Modernos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="group bg-gradient-to-br from-lime-500/20 to-green-500/20 backdrop-blur-sm rounded-2xl p-6 border border-lime-500/30 hover:border-lime-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-lime-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-lime-400 to-green-500 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Meta Semanal</h3>
                <p className="text-lime-300 text-sm">Treinos planejados</p>
              </div>
            </div>
            <p className="text-3xl font-bold bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent">5 treinos</p>
          </div>

          <div className="group bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Concluídos</h3>
                <p className="text-emerald-300 text-sm">Esta semana</p>
              </div>
            </div>
            <p className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">3 treinos</p>
          </div>

          <div className="group bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <Fire className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Tempo Total</h3>
                <p className="text-cyan-300 text-sm">Esta semana</p>
              </div>
            </div>
            <p className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">4h 30min</p>
          </div>
        </div>

        {/* Plano de Treinos - Menu Interativo Modernizado */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Plano Semanal
            </h2>
            <button className="group flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 py-3 px-6 rounded-xl border border-blue-500/30 hover:border-blue-400/50 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20">
              <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              Gerar Novo Plano
            </button>
          </div>
          
          {planoTreino.map((treino, index) => {
            const progresso = calcularProgresso(treino)
            const isAtivo = treinoAtivo === index
            
            return (
              <div key={index} className={`group ${treino.corBg} backdrop-blur-sm rounded-2xl border ${treino.corBorder} overflow-hidden hover:border-opacity-60 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}>
                <div 
                  className="p-6 cursor-pointer hover:bg-white/5 transition-all duration-300"
                  onClick={() => setTreinoAtivo(isAtivo ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 bg-gradient-to-r ${treino.cor} rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                        <Dumbbell className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-xl mb-1">{treino.dia}</h3>
                        <p className={`${treino.corText} font-semibold text-lg`}>{treino.foco}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`w-8 h-8 bg-gradient-to-r ${treino.cor} rounded-lg flex items-center justify-center`}>
                          <Clock className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-white font-semibold">{treino.duracao}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-white/20 rounded-full h-3 overflow-hidden">
                          <div 
                            className={`bg-gradient-to-r ${treino.cor} h-3 rounded-full transition-all duration-500 shadow-lg`}
                            style={{ width: `${progresso}%` }}
                          ></div>
                        </div>
                        <span className={`${treino.corText} text-lg font-bold`}>{progresso}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {isAtivo && (
                  <div className="px-6 pb-6 space-y-4 animate-in slide-in-from-top duration-300">
                    <div className="border-t border-white/20 pt-6">
                      <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                        <Zap className={`w-5 h-5 ${treino.corText}`} />
                        Exercícios
                      </h4>
                      <div className="space-y-3">
                        {treino.exercicios.map((exercicio, idx) => {
                          const key = `${treino.dia}-${exercicio.nome}`
                          const concluido = exerciciosConcluidos[key]
                          
                          return (
                            <div 
                              key={idx} 
                              className={`group flex items-center justify-between p-5 rounded-xl border transition-all duration-300 cursor-pointer hover:scale-[1.02] ${
                                concluido 
                                  ? `bg-gradient-to-r ${treino.cor}/20 ${treino.corBorder} shadow-lg` 
                                  : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30'
                              }`}
                              onClick={() => toggleExercicio(treino.dia, exercicio.nome)}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                  concluido 
                                    ? `bg-gradient-to-r ${treino.cor} border-transparent shadow-lg` 
                                    : 'border-white/40 group-hover:border-white/60'
                                }`}>
                                  {concluido && <CheckCircle className="w-5 h-5 text-white" />}
                                </div>
                                <div>
                                  <h5 className={`font-bold text-lg transition-colors ${concluido ? treino.corText : 'text-white'}`}>
                                    {exercicio.nome}
                                  </h5>
                                  <p className="text-gray-300 font-medium">
                                    {exercicio.series} • {exercicio.peso} • Descanso: {exercicio.descanso}
                                  </p>
                                </div>
                              </div>
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                concluido 
                                  ? `bg-gradient-to-r ${treino.cor}/30` 
                                  : 'bg-white/10 group-hover:bg-white/20'
                              }`}>
                                <Play className={`w-5 h-5 ${concluido ? treino.corText : 'text-gray-400 group-hover:text-white'}`} />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="flex gap-4 pt-6">
                      <button className={`flex-1 bg-gradient-to-r ${treino.cor} text-white font-bold py-4 px-8 rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-lg`}>
                        🚀 Iniciar Treino
                      </button>
                      <button className="bg-white/10 text-white font-semibold py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20 hover:border-white/30">
                        ⚙️ Personalizar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Botão IA Coach - Modernizado */}
        <div className="mt-12 text-center">
          <Link href="/" className="inline-block group">
            <button className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold py-4 px-10 rounded-2xl hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-purple-500/30 text-lg">
              <span className="flex items-center gap-3">
                🤖 Conversar com IA Coach
                <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}