'use client'

import { useState } from 'react'
import { ArrowLeft, Calendar, Trophy, Target, CheckCircle, Lock, Star, Flame } from 'lucide-react'
import Link from 'next/link'

export default function Desafio30Dias() {
  const [diaAtual, setDiaAtual] = useState(7) // Simulando que estamos no dia 7
  const [diasConcluidos, setDiasConcluidos] = useState([1, 2, 3, 4, 5, 6, 7])

  const desafios = [
    { dia: 1, titulo: 'Primeiro Passo', atividade: '20 min caminhada', dificuldade: 'Fácil', pontos: 10 },
    { dia: 2, titulo: 'Aquecendo', atividade: '15 flexões + 30 abdominais', dificuldade: 'Fácil', pontos: 15 },
    { dia: 3, titulo: 'Resistência', atividade: '25 min cardio', dificuldade: 'Fácil', pontos: 20 },
    { dia: 4, titulo: 'Força Básica', atividade: '20 agachamentos + prancha 30s', dificuldade: 'Médio', pontos: 25 },
    { dia: 5, titulo: 'Descanso Ativo', atividade: 'Alongamento 15 min', dificuldade: 'Fácil', pontos: 10 },
    { dia: 6, titulo: 'Intensidade', atividade: 'HIIT 20 min', dificuldade: 'Médio', pontos: 30 },
    { dia: 7, titulo: 'Semana Completa!', atividade: 'Treino completo 45 min', dificuldade: 'Médio', pontos: 35 },
    { dia: 8, titulo: 'Nova Fase', atividade: '30 flexões + 50 abdominais', dificuldade: 'Médio', pontos: 25 },
    { dia: 9, titulo: 'Cardio Plus', atividade: '35 min corrida/bike', dificuldade: 'Médio', pontos: 30 },
    { dia: 10, titulo: 'Força Avançada', atividade: '40 agachamentos + prancha 60s', dificuldade: 'Difícil', pontos: 40 },
    // ... continuando até o dia 30
  ]

  // Gerar dias restantes
  for (let i = 11; i <= 30; i++) {
    const atividades = [
      'HIIT avançado 30 min',
      'Treino funcional completo',
      'Corrida intervalada 40 min',
      'Circuito de força',
      'Yoga power 45 min',
      'Treino militar',
      'Desafio burpees',
      'Maratona fitness'
    ]
    
    desafios.push({
      dia: i,
      titulo: i === 15 ? 'Meio Caminho!' : i === 30 ? 'CAMPEÃO!' : `Dia ${i}`,
      atividade: atividades[Math.floor(Math.random() * atividades.length)],
      dificuldade: i < 15 ? 'Médio' : 'Difícil',
      pontos: i < 15 ? Math.floor(Math.random() * 20) + 25 : Math.floor(Math.random() * 30) + 40
    })
  }

  const totalPontos = diasConcluidos.reduce((total, dia) => {
    const desafio = desafios.find(d => d.dia === dia)
    return total + (desafio?.pontos || 0)
  }, 0)

  const marcarConcluido = (dia: number) => {
    if (dia <= diaAtual && !diasConcluidos.includes(dia)) {
      setDiasConcluidos([...diasConcluidos, dia])
    }
  }

  const getDificuldadeColor = (dificuldade: string) => {
    switch (dificuldade) {
      case 'Fácil': return 'text-green-400 bg-green-400/20'
      case 'Médio': return 'text-yellow-400 bg-yellow-400/20'
      case 'Difícil': return 'text-red-400 bg-red-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
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
          <h1 className="text-2xl font-bold text-white">Desafio 30 Dias</h1>
        </div>

        {/* Progresso Geral */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-lime-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-semibold">Dia Atual</h3>
              <p className="text-2xl font-bold text-lime-400">{diaAtual}/30</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-semibold">Concluídos</h3>
              <p className="text-2xl font-bold text-green-400">{diasConcluidos.length}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-semibold">Pontos</h3>
              <p className="text-2xl font-bold text-yellow-400">{totalPontos}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <Flame className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-semibold">Sequência</h3>
              <p className="text-2xl font-bold text-purple-400">{diasConcluidos.length} dias</p>
            </div>
          </div>

          {/* Barra de Progresso */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-semibold">Progresso Geral</span>
              <span className="text-lime-400 font-semibold">{Math.round((diasConcluidos.length / 30) * 100)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-lime-400 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(diasConcluidos.length / 30) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Desafios por Semana */}
        <div className="space-y-8">
          {[1, 2, 3, 4].map(semana => (
            <div key={semana} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-400" />
                Semana {semana}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {desafios
                  .filter(d => d.dia > (semana - 1) * 7 && d.dia <= semana * 7)
                  .map(desafio => {
                    const concluido = diasConcluidos.includes(desafio.dia)
                    const disponivel = desafio.dia <= diaAtual
                    const bloqueado = desafio.dia > diaAtual
                    
                    return (
                      <div 
                        key={desafio.dia}
                        className={`relative p-4 rounded-xl border transition-all cursor-pointer ${
                          concluido 
                            ? 'bg-lime-400/20 border-lime-400/50 transform scale-105' 
                            : disponivel
                            ? 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-lime-400/30'
                            : 'bg-gray-800/50 border-gray-600/50 opacity-60'
                        }`}
                        onClick={() => disponivel && marcarConcluido(desafio.dia)}
                      >
                        {/* Badge do Dia */}
                        <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          concluido 
                            ? 'bg-lime-400 text-black' 
                            : disponivel
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-600 text-gray-300'
                        }`}>
                          {desafio.dia}
                        </div>

                        {/* Ícone de Status */}
                        <div className="flex items-center justify-between mb-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            concluido 
                              ? 'bg-lime-400/30' 
                              : disponivel
                              ? 'bg-blue-500/30'
                              : 'bg-gray-600/30'
                          }`}>
                            {concluido ? (
                              <CheckCircle className="w-5 h-5 text-lime-400" />
                            ) : bloqueado ? (
                              <Lock className="w-5 h-5 text-gray-400" />
                            ) : (
                              <Target className="w-5 h-5 text-blue-400" />
                            )}
                          </div>
                          
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDificuldadeColor(desafio.dificuldade)}`}>
                            {desafio.dificuldade}
                          </span>
                        </div>

                        {/* Conteúdo */}
                        <h3 className={`font-semibold mb-2 ${
                          concluido ? 'text-lime-400' : 'text-white'
                        }`}>
                          {desafio.titulo}
                        </h3>
                        
                        <p className="text-gray-300 text-sm mb-3">
                          {desafio.atividade}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-yellow-400 text-sm font-semibold">
                            +{desafio.pontos} pts
                          </span>
                          
                          {disponivel && !concluido && (
                            <button className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded hover:bg-blue-500/30 transition-colors">
                              Iniciar
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* Motivação */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30">
            <h3 className="text-2xl font-bold text-white mb-2">
              {diasConcluidos.length < 7 ? '🔥 Você está começando forte!' :
               diasConcluidos.length < 15 ? '💪 Meio caminho andado!' :
               diasConcluidos.length < 25 ? '🚀 Quase lá, campeão!' :
               '🏆 Você é imparável!'}
            </h3>
            <p className="text-gray-300">
              {30 - diasConcluidos.length} dias restantes para completar o desafio!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}