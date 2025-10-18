'use client'

import { useState } from 'react'
import { ArrowLeft, TrendingUp, Target, Calendar, Award, Camera, Plus, Minus, Scale, Ruler, Activity } from 'lucide-react'
import Link from 'next/link'

export default function Progresso() {
  const [pesoAtual, setPesoAtual] = useState(75.2)
  const [metaPeso, setMetaPeso] = useState(70.0)
  const [periodoSelecionado, setPeriodoSelecionado] = useState('30dias')

  // Dados simulados de progresso
  const dadosProgresso = {
    peso: [
      { data: '01/01', valor: 78.5 },
      { data: '08/01', valor: 77.8 },
      { data: '15/01', valor: 77.2 },
      { data: '22/01', valor: 76.5 },
      { data: '29/01', valor: 75.8 },
      { data: '05/02', valor: 75.2 }
    ],
    medidas: {
      cintura: { atual: 85, anterior: 88, meta: 80 },
      quadril: { atual: 98, anterior: 102, meta: 95 },
      braço: { atual: 32, anterior: 30, meta: 35 },
      coxa: { atual: 58, anterior: 60, meta: 55 }
    },
    treinos: {
      semanaAtual: 4,
      meta: 5,
      totalMes: 18,
      sequencia: 7
    },
    conquistas: [
      { nome: 'Primeira Semana', descricao: 'Completou 7 dias consecutivos', data: '08/01', icon: '🎯' },
      { nome: 'Perda de 2kg', descricao: 'Perdeu os primeiros 2kg', data: '15/01', icon: '⚖️' },
      { nome: 'Mês Completo', descricao: '30 dias de dedicação', data: '01/02', icon: '📅' },
      { nome: 'Meta Intermediária', descricao: 'Atingiu 50% da meta', data: '05/02', icon: '🏆' }
    ]
  }

  const calcularProgresso = () => {
    const pesoInicial = dadosProgresso.peso[0].valor
    const progressoAtual = ((pesoInicial - pesoAtual) / (pesoInicial - metaPeso)) * 100
    return Math.min(Math.max(progressoAtual, 0), 100)
  }

  const adicionarPeso = () => {
    setPesoAtual(prev => Math.round((prev + 0.1) * 10) / 10)
  }

  const diminuirPeso = () => {
    setPesoAtual(prev => Math.round((prev - 0.1) * 10) / 10)
  }

  const periodos = [
    { id: '7dias', nome: '7 dias' },
    { id: '30dias', nome: '30 dias' },
    { id: '90dias', nome: '90 dias' },
    { id: '1ano', nome: '1 ano' }
  ]

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
          <h1 className="text-2xl font-bold text-white">Meu Progresso</h1>
        </div>

        {/* Resumo Principal */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-8 h-8 text-lime-400" />
              <div>
                <h3 className="text-white font-semibold">Peso Atual</h3>
                <p className="text-gray-300 text-sm">Última medição</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <button 
                onClick={diminuirPeso}
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Minus className="w-4 h-4 text-white" />
              </button>
              <span className="text-2xl font-bold text-white mx-4">{pesoAtual}kg</span>
              <button 
                onClick={adicionarPeso}
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Plus className="w-4 h-4 text-white" />
              </button>
            </div>
            <p className="text-lime-400 text-sm">-{(dadosProgresso.peso[0].valor - pesoAtual).toFixed(1)}kg desde o início</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8 text-blue-400" />
              <div>
                <h3 className="text-white font-semibold">Meta</h3>
                <p className="text-gray-300 text-sm">Objetivo final</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{metaPeso}kg</p>
            <p className="text-blue-400 text-sm">Faltam {(pesoAtual - metaPeso).toFixed(1)}kg</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <div>
                <h3 className="text-white font-semibold">Progresso</h3>
                <p className="text-gray-300 text-sm">Rumo à meta</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{calcularProgresso().toFixed(0)}%</p>
            <div className="w-full bg-white/20 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-lime-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${calcularProgresso()}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-8 h-8 text-purple-400" />
              <div>
                <h3 className="text-white font-semibold">Treinos</h3>
                <p className="text-gray-300 text-sm">Esta semana</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{dadosProgresso.treinos.semanaAtual}/{dadosProgresso.treinos.meta}</p>
            <p className="text-purple-400 text-sm">{dadosProgresso.treinos.sequencia} dias seguidos</p>
          </div>
        </div>

        {/* Seletor de Período */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
          <h3 className="text-white font-semibold mb-4">Período de Análise</h3>
          <div className="flex flex-wrap gap-3">
            {periodos.map(periodo => (
              <button
                key={periodo.id}
                onClick={() => setPeriodoSelecionado(periodo.id)}
                className={`px-4 py-2 rounded-xl transition-all ${
                  periodoSelecionado === periodo.id
                    ? 'bg-lime-400/20 text-lime-400 border border-lime-400/50'
                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/20'
                }`}
              >
                {periodo.nome}
              </button>
            ))}
          </div>
        </div>

        {/* Gráfico de Peso */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
          <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-lime-400" />
            Evolução do Peso
          </h3>
          
          <div className="relative h-64">
            {/* Simulação de gráfico simples */}
            <div className="absolute inset-0 flex items-end justify-between px-4">
              {dadosProgresso.peso.map((ponto, index) => {
                const altura = ((ponto.valor - 74) / (79 - 74)) * 100
                return (
                  <div key={index} className="flex flex-col items-center">
                    <div className="bg-lime-400 text-black text-xs px-2 py-1 rounded mb-2 font-semibold">
                      {ponto.valor}kg
                    </div>
                    <div 
                      className="w-8 bg-gradient-to-t from-blue-500 to-lime-400 rounded-t"
                      style={{ height: `${100 - altura}%` }}
                    ></div>
                    <div className="text-gray-300 text-xs mt-2 rotate-45 origin-left">
                      {ponto.data}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Medidas Corporais */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
          <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
            <Ruler className="w-6 h-6 text-blue-400" />
            Medidas Corporais
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(dadosProgresso.medidas).map(([parte, dados]) => (
              <div key={parte} className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white font-semibold capitalize mb-3">{parte}</h4>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300 text-sm">Atual:</span>
                    <span className="text-lime-400 font-semibold">{dados.atual}cm</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-300 text-sm">Anterior:</span>
                    <span className="text-gray-400">{dados.anterior}cm</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-300 text-sm">Meta:</span>
                    <span className="text-blue-400">{dados.meta}cm</span>
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Progresso</span>
                      <span className="text-lime-400">
                        {dados.atual < dados.anterior ? '-' : '+'}
                        {Math.abs(dados.atual - dados.anterior)}cm
                      </span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          dados.atual < dados.anterior 
                            ? 'bg-gradient-to-r from-green-500 to-lime-400' 
                            : 'bg-gradient-to-r from-yellow-500 to-orange-400'
                        }`}
                        style={{ 
                          width: `${Math.min(Math.abs((dados.anterior - dados.atual) / (dados.anterior - dados.meta)) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conquistas */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
          <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-400" />
            Conquistas Recentes
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dadosProgresso.conquistas.map((conquista, index) => (
              <div key={index} className="flex items-center gap-4 bg-white/5 rounded-xl p-4">
                <div className="text-3xl">{conquista.icon}</div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold">{conquista.nome}</h4>
                  <p className="text-gray-300 text-sm">{conquista.descricao}</p>
                  <p className="text-lime-400 text-xs mt-1">{conquista.data}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-gradient-to-r from-blue-500 to-lime-400 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-lime-500 transition-all flex items-center justify-center gap-2">
            <Camera className="w-5 h-5" />
            Adicionar Foto de Progresso
          </button>
          
          <button className="bg-white/10 border border-white/20 text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            Registrar Medidas
          </button>
          
          <button className="bg-purple-500/20 border border-purple-500/50 text-purple-400 font-semibold py-3 px-6 rounded-xl hover:bg-purple-500/30 transition-all flex items-center justify-center gap-2">
            <Calendar className="w-5 h-5" />
            Ver Relatório Completo
          </button>
        </div>
      </div>
    </div>
  )
}