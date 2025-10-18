'use client'

import { useState } from 'react'
import { ArrowLeft, Apple, Utensils, Clock, Target, Plus, Minus } from 'lucide-react'
import Link from 'next/link'

export default function Dieta() {
  const [calorias, setCalorias] = useState(2000)
  const [objetivo, setObjetivo] = useState('manter')

  const planosDieta = [
    {
      nome: 'Café da Manhã',
      horario: '07:00',
      calorias: 400,
      alimentos: [
        { nome: 'Aveia com frutas', calorias: 250 },
        { nome: 'Iogurte grego', calorias: 100 },
        { nome: 'Banana', calorias: 50 }
      ]
    },
    {
      nome: 'Lanche da Manhã',
      horario: '10:00',
      calorias: 150,
      alimentos: [
        { nome: 'Mix de castanhas', calorias: 150 }
      ]
    },
    {
      nome: 'Almoço',
      horario: '12:30',
      calorias: 600,
      alimentos: [
        { nome: 'Peito de frango grelhado', calorias: 300 },
        { nome: 'Arroz integral', calorias: 150 },
        { nome: 'Brócolis refogado', calorias: 50 },
        { nome: 'Salada verde', calorias: 100 }
      ]
    },
    {
      nome: 'Lanche da Tarde',
      horario: '15:30',
      calorias: 200,
      alimentos: [
        { nome: 'Whey protein', calorias: 120 },
        { nome: 'Maçã', calorias: 80 }
      ]
    },
    {
      nome: 'Jantar',
      horario: '19:00',
      calorias: 500,
      alimentos: [
        { nome: 'Salmão grelhado', calorias: 250 },
        { nome: 'Batata doce', calorias: 150 },
        { nome: 'Aspargos', calorias: 100 }
      ]
    },
    {
      nome: 'Ceia',
      horario: '21:30',
      calorias: 150,
      alimentos: [
        { nome: 'Cottage cheese', calorias: 150 }
      ]
    }
  ]

  const totalCalorias = planosDieta.reduce((total, refeicao) => total + refeicao.calorias, 0)

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
          <h1 className="text-2xl font-bold text-white">Plano Alimentar</h1>
        </div>

        {/* Resumo Nutricional */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8 text-lime-400" />
              <div>
                <h3 className="text-white font-semibold">Meta Diária</h3>
                <p className="text-gray-300 text-sm">Calorias objetivo</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCalorias(Math.max(1200, calorias - 100))}
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Minus className="w-4 h-4 text-white" />
              </button>
              <span className="text-2xl font-bold text-white mx-4">{calorias}</span>
              <button 
                onClick={() => setCalorias(Math.min(3500, calorias + 100))}
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Plus className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <Utensils className="w-8 h-8 text-blue-400" />
              <div>
                <h3 className="text-white font-semibold">Consumido</h3>
                <p className="text-gray-300 text-sm">Calorias hoje</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{totalCalorias}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <Apple className="w-8 h-8 text-green-400" />
              <div>
                <h3 className="text-white font-semibold">Restante</h3>
                <p className="text-gray-300 text-sm">Para a meta</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{calorias - totalCalorias}</p>
          </div>
        </div>

        {/* Seletor de Objetivo */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
          <h3 className="text-white font-semibold mb-4">Objetivo Nutricional</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { id: 'emagrecer', nome: 'Emagrecer', desc: 'Déficit calórico' },
              { id: 'manter', nome: 'Manter Peso', desc: 'Equilíbrio calórico' },
              { id: 'ganhar', nome: 'Ganhar Massa', desc: 'Superávit calórico' }
            ].map((obj) => (
              <button
                key={obj.id}
                onClick={() => setObjetivo(obj.id)}
                className={`p-4 rounded-xl border transition-all ${
                  objetivo === obj.id
                    ? 'bg-lime-400/20 border-lime-400 text-lime-400'
                    : 'bg-white/5 border-white/20 text-white hover:bg-white/10'
                }`}
              >
                <h4 className="font-semibold">{obj.nome}</h4>
                <p className="text-sm opacity-80">{obj.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Plano de Refeições */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Plano de Refeições</h2>
          
          {planosDieta.map((refeicao, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-lime-400" />
                  <div>
                    <h3 className="text-white font-semibold text-lg">{refeicao.nome}</h3>
                    <p className="text-gray-300 text-sm">{refeicao.horario}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lime-400 font-bold text-lg">{refeicao.calorias} kcal</p>
                </div>
              </div>

              <div className="space-y-2">
                {refeicao.alimentos.map((alimento, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 px-4 bg-white/5 rounded-lg">
                    <span className="text-white">{alimento.nome}</span>
                    <span className="text-gray-300 text-sm">{alimento.calorias} kcal</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mt-4">
                <button className="flex-1 bg-lime-400/20 text-lime-400 py-2 px-4 rounded-lg hover:bg-lime-400/30 transition-colors">
                  Marcar como Consumido
                </button>
                <button className="bg-blue-500/20 text-blue-400 py-2 px-4 rounded-lg hover:bg-blue-500/30 transition-colors">
                  Substituir
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Botão Gerar Novo Plano */}
        <div className="mt-8 text-center">
          <button className="bg-gradient-to-r from-blue-500 to-lime-400 text-white font-semibold py-3 px-8 rounded-xl hover:from-blue-600 hover:to-lime-500 transform hover:scale-105 transition-all duration-200 shadow-lg">
            Gerar Novo Plano Alimentar
          </button>
        </div>
      </div>
    </div>
  )
}