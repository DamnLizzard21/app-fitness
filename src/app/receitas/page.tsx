'use client'

import { useState } from 'react'
import { ArrowLeft, Clock, Users, ChefHat, Heart, Search, Filter, Star } from 'lucide-react'
import Link from 'next/link'

export default function Receitas() {
  const [filtroAtivo, setFiltroAtivo] = useState('todos')
  const [busca, setBusca] = useState('')
  const [favoritos, setFavoritos] = useState<number[]>([1, 3, 5])

  const receitas = [
    {
      id: 1,
      nome: 'Salmão Grelhado com Aspargos',
      categoria: 'proteina',
      tempo: '25 min',
      porcoes: 2,
      calorias: 320,
      dificuldade: 'Fácil',
      ingredientes: [
        '2 filés de salmão (150g cada)',
        '300g de aspargos',
        '2 colheres de azeite',
        'Sal e pimenta a gosto',
        '1 limão',
        '2 dentes de alho'
      ],
      preparo: [
        'Tempere o salmão com sal, pimenta e suco de limão',
        'Aqueça uma frigideira antiaderente com azeite',
        'Grelhe o salmão por 4-5 min de cada lado',
        'Refogue os aspargos com alho por 3-4 min',
        'Sirva imediatamente'
      ],
      imagem: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      nome: 'Smoothie Verde Detox',
      categoria: 'bebida',
      tempo: '5 min',
      porcoes: 1,
      calorias: 180,
      dificuldade: 'Muito Fácil',
      ingredientes: [
        '1 banana',
        '1 xícara de espinafre',
        '1/2 abacate',
        '200ml de água de coco',
        '1 colher de chia',
        'Gelo a gosto'
      ],
      preparo: [
        'Adicione todos os ingredientes no liquidificador',
        'Bata até ficar homogêneo',
        'Adicione gelo se desejar',
        'Sirva imediatamente'
      ],
      imagem: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      nome: 'Salada de Quinoa com Grão-de-Bico',
      categoria: 'salada',
      tempo: '20 min',
      porcoes: 3,
      calorias: 280,
      dificuldade: 'Fácil',
      ingredientes: [
        '1 xícara de quinoa',
        '1 lata de grão-de-bico',
        '1 pepino picado',
        '2 tomates cereja',
        '1/4 de cebola roxa',
        'Azeite e limão para temperar'
      ],
      preparo: [
        'Cozinhe a quinoa conforme instruções da embalagem',
        'Escorra e lave o grão-de-bico',
        'Pique todos os vegetais',
        'Misture tudo em uma tigela',
        'Tempere com azeite, limão, sal e pimenta'
      ],
      imagem: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      nome: 'Peito de Frango com Batata Doce',
      categoria: 'proteina',
      tempo: '35 min',
      porcoes: 2,
      calorias: 420,
      dificuldade: 'Médio',
      ingredientes: [
        '2 peitos de frango',
        '2 batatas doces médias',
        'Temperos variados',
        '2 colheres de azeite',
        'Brócolis para acompanhar'
      ],
      preparo: [
        'Tempere o frango e deixe marinar por 15 min',
        'Corte as batatas em cubos e tempere',
        'Asse as batatas por 20 min a 200°C',
        'Grelhe o frango por 6-8 min de cada lado',
        'Refogue o brócolis rapidamente'
      ],
      imagem: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      nome: 'Overnight Oats com Frutas',
      categoria: 'cafe',
      tempo: '5 min + 8h',
      porcoes: 1,
      calorias: 250,
      dificuldade: 'Muito Fácil',
      ingredientes: [
        '1/2 xícara de aveia',
        '1/2 xícara de leite vegetal',
        '1 colher de chia',
        '1 banana',
        'Frutas vermelhas',
        '1 colher de mel'
      ],
      preparo: [
        'Misture aveia, leite e chia em um pote',
        'Adicione mel e misture bem',
        'Deixe na geladeira por 8 horas',
        'Pela manhã, adicione frutas por cima',
        'Está pronto para consumir'
      ],
      imagem: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      nome: 'Wrap de Atum com Vegetais',
      categoria: 'lanche',
      tempo: '10 min',
      porcoes: 1,
      calorias: 290,
      dificuldade: 'Fácil',
      ingredientes: [
        '1 tortilla integral',
        '1 lata de atum em água',
        'Folhas de alface',
        '1 tomate',
        '1/2 abacate',
        'Mostarda dijon'
      ],
      preparo: [
        'Escorra bem o atum',
        'Corte o tomate e abacate',
        'Espalhe mostarda na tortilla',
        'Adicione todos os ingredientes',
        'Enrole bem apertado e corte ao meio'
      ],
      imagem: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop'
    }
  ]

  const categorias = [
    { id: 'todos', nome: 'Todas', icon: '🍽️' },
    { id: 'cafe', nome: 'Café da Manhã', icon: '🌅' },
    { id: 'proteina', nome: 'Proteínas', icon: '🥩' },
    { id: 'salada', nome: 'Saladas', icon: '🥗' },
    { id: 'lanche', nome: 'Lanches', icon: '🥪' },
    { id: 'bebida', nome: 'Bebidas', icon: '🥤' }
  ]

  const receitasFiltradas = receitas.filter(receita => {
    const matchCategoria = filtroAtivo === 'todos' || receita.categoria === filtroAtivo
    const matchBusca = receita.nome.toLowerCase().includes(busca.toLowerCase())
    return matchCategoria && matchBusca
  })

  const toggleFavorito = (id: number) => {
    setFavoritos(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    )
  }

  const getDificuldadeColor = (dificuldade: string) => {
    switch (dificuldade) {
      case 'Muito Fácil': return 'text-green-400 bg-green-400/20'
      case 'Fácil': return 'text-lime-400 bg-lime-400/20'
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
          <h1 className="text-2xl font-bold text-white">Receitas Saudáveis</h1>
        </div>

        {/* Busca e Filtros */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
          {/* Barra de Busca */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all"
              placeholder="Buscar receitas..."
            />
          </div>

          {/* Filtros por Categoria */}
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-white font-semibold">Categorias:</span>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categorias.map(categoria => (
              <button
                key={categoria.id}
                onClick={() => setFiltroAtivo(categoria.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  filtroAtivo === categoria.id
                    ? 'bg-lime-400/20 text-lime-400 border border-lime-400/50'
                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/20'
                }`}
              >
                <span>{categoria.icon}</span>
                <span className="text-sm font-medium">{categoria.nome}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Receitas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {receitasFiltradas.map(receita => (
            <div key={receita.id} className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
              {/* Imagem */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={receita.imagem} 
                  alt={receita.nome}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => toggleFavorito(receita.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"
                >
                  <Heart 
                    className={`w-5 h-5 ${
                      favoritos.includes(receita.id) 
                        ? 'text-red-500 fill-red-500' 
                        : 'text-white'
                    }`} 
                  />
                </button>
                <div className="absolute bottom-3 left-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDificuldadeColor(receita.dificuldade)}`}>
                    {receita.dificuldade}
                  </span>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="p-6">
                <h3 className="text-white font-semibold text-lg mb-3">{receita.nome}</h3>
                
                {/* Informações */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-300">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{receita.tempo}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{receita.porcoes} porções</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ChefHat className="w-4 h-4" />
                    <span>{receita.calorias} kcal</span>
                  </div>
                </div>

                {/* Ingredientes Preview */}
                <div className="mb-4">
                  <h4 className="text-white font-semibold text-sm mb-2">Ingredientes principais:</h4>
                  <div className="text-gray-300 text-sm">
                    {receita.ingredientes.slice(0, 3).map((ingrediente, idx) => (
                      <span key={idx}>
                        {ingrediente}
                        {idx < 2 && idx < receita.ingredientes.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                    {receita.ingredientes.length > 3 && (
                      <span className="text-lime-400"> +{receita.ingredientes.length - 3} mais</span>
                    )}
                  </div>
                </div>

                {/* Botões */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-gradient-to-r from-blue-500 to-lime-400 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-600 hover:to-lime-500 transition-all text-sm">
                    Ver Receita
                  </button>
                  <button className="bg-white/10 text-white py-2 px-4 rounded-lg hover:bg-white/20 transition-colors">
                    <Star className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mensagem quando não há resultados */}
        {receitasFiltradas.length === 0 && (
          <div className="text-center py-12">
            <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-white text-xl font-semibold mb-2">Nenhuma receita encontrada</h3>
            <p className="text-gray-300">Tente ajustar os filtros ou buscar por outro termo</p>
          </div>
        )}

        {/* Botão Sugerir Receita */}
        <div className="mt-8 text-center">
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-8 rounded-xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg">
            🤖 IA: Sugerir Receita Personalizada
          </button>
        </div>
      </div>
    </div>
  )
}