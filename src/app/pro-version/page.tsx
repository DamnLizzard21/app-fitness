'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Crown, Flame, Target, Utensils, Dumbbell, ChefHat } from 'lucide-react'

interface Ingredient {
  name: string
  amount: string
  unit: string
}

interface Meal {
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  ingredients: Ingredient[]
  instructions: string[]
}

export default function ProVersionPage() {
  const [selectedPlan, setSelectedPlan] = useState<string>('')

  // Exemplo de dados de refeição para demonstrar a tipagem correta
  const sampleMeal: Meal = {
    name: 'Omelete Proteica',
    calories: 280,
    protein: 24,
    carbs: 8,
    fat: 18,
    ingredients: [
      { name: 'Ovos', amount: '3', unit: 'unidades' },
      { name: 'Espinafre', amount: '50', unit: 'g' },
      { name: 'Tomate', amount: '1', unit: 'unidade' },
      { name: 'Queijo cottage', amount: '30', unit: 'g' }
    ],
    instructions: ['Bata os ovos', 'Refogue os vegetais', 'Faça a omelete']
  }

  const handlePurchase = (plan: string) => {
    setSelectedPlan(plan)
    // Lógica de compra aqui
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl pt-24">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            FitLife Pro - Planos Premium
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Escolha o plano ideal para transformar seu corpo e alcançar seus objetivos
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Plano Básico */}
          <Card className="border-2 border-gray-600 hover:border-emerald-400 transition-all duration-300 bg-white/10 backdrop-blur-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Básico</CardTitle>
              <div className="text-4xl font-bold text-emerald-400 my-4">
                R$ 29<span className="text-lg text-gray-400">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Dieta personalizada básica</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>3 treinos por semana</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Acompanhamento mensal</span>
                </div>
              </div>
              <Button 
                className="w-full bg-emerald-500 hover:bg-emerald-600"
                onClick={() => handlePurchase('basic')}
              >
                Escolher Plano
              </Button>
            </CardContent>
          </Card>

          {/* Plano Premium */}
          <Card className="border-2 border-emerald-500 shadow-2xl scale-105 relative bg-white/15 backdrop-blur-xl">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-1 text-white">
                MAIS POPULAR
              </Badge>
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Premium</CardTitle>
              <div className="text-4xl font-bold text-emerald-400 my-4">
                R$ 59<span className="text-lg text-gray-400">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Dieta personalizada completa</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Treinos ilimitados com vídeos</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-orange-500" />
                  <span>Desafio Calistênico 30 Dias</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Receitas Fit exclusivas</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Acompanhamento semanal</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Suporte via chat</span>
                </div>
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                onClick={() => handlePurchase('premium')}
              >
                Escolher Plano
              </Button>
            </CardContent>
          </Card>

          {/* Plano Elite */}
          <Card className="border-2 border-gray-600 hover:border-emerald-400 transition-all duration-300 bg-white/10 backdrop-blur-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Elite</CardTitle>
              <div className="text-4xl font-bold text-emerald-400 my-4">
                R$ 99<span className="text-lg text-gray-400">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Tudo do Premium +</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Consultoria 1:1 mensal</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Suplementos inclusos</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Acesso prioritário</span>
                </div>
              </div>
              <Button 
                className="w-full bg-emerald-500 hover:bg-emerald-600"
                onClick={() => handlePurchase('elite')}
              >
                Escolher Plano
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Exemplo de uso da tipagem correta para ingredientes */}
        <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl mb-8">
          <CardHeader>
            <CardTitle className="text-emerald-400 text-2xl flex items-center gap-2">
              <Utensils className="w-6 h-6" />
              Exemplo de Refeição PRO
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h4 className="font-semibold text-white text-lg mb-4">{sampleMeal.name}</h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-gray-300">
                <span className="font-medium">Calorias:</span> {sampleMeal.calories}
              </div>
              <div className="text-gray-300">
                <span className="font-medium">Proteína:</span> {sampleMeal.protein}g
              </div>
            </div>
            <div>
              <h5 className="font-medium text-gray-300 mb-2">Ingredientes:</h5>
              <ul className="space-y-2">
                {sampleMeal.ingredients.map((ingredient: Ingredient, index: number) => (
                  <li key={index} className="text-gray-400">
                    <CheckCircle className="w-4 h-4 text-emerald-400 inline mr-2" />
                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Destaque do Desafio Calistênico */}
        <Card className="border-2 border-orange-500/50 bg-gradient-to-r from-orange-600/20 to-red-600/20 backdrop-blur-xl shadow-2xl">
          <CardContent className="text-center py-8">
            <Flame className="w-16 h-16 text-orange-400 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-white mb-4">
              🔥 Desafio Calistênico de 30 Dias
            </h3>
            <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
              Exclusivo da versão PRO! Transforme seu corpo com exercícios funcionais progressivos que queimam gordura rapidamente. 
              Do iniciante ao avançado em apenas 30 dias.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 px-4 py-2">
                <Target className="w-4 h-4 mr-2" />
                Progressão Inteligente
              </Badge>
              <Badge className="bg-red-500/20 text-red-300 border-red-500/30 px-4 py-2">
                <Flame className="w-4 h-4 mr-2" />
                Queima Gordura Rápida
              </Badge>
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 px-4 py-2">
                <Crown className="w-4 h-4 mr-2" />
                Resultados Garantidos
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}