'use client'

import { useState } from 'react'
import { ArrowLeft, ShoppingCart, Star, Filter, Search, Heart, Zap, Award, Package } from 'lucide-react'
import Link from 'next/link'

export default function Produtos() {
  const [filtroAtivo, setFiltroAtivo] = useState('todos')
  const [busca, setBusca] = useState('')
  const [carrinho, setCarrinho] = useState<{[key: number]: number}>({})
  const [favoritos, setFavoritos] = useState<number[]>([1, 3, 7])

  const produtos = [
    {
      id: 1,
      nome: 'Whey Protein Premium',
      categoria: 'suplementos',
      preco: 89.90,
      precoOriginal: 119.90,
      avaliacao: 4.8,
      avaliacoes: 1247,
      descricao: 'Proteína isolada de alta qualidade para ganho de massa muscular',
      beneficios: ['25g de proteína por dose', 'Absorção rápida', 'Sem lactose'],
      imagem: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=400&fit=crop',
      selo: 'Mais Vendido'
    },
    {
      id: 2,
      nome: 'Creatina Monohidratada',
      categoria: 'suplementos',
      preco: 45.90,
      precoOriginal: 59.90,
      avaliacao: 4.9,
      avaliacoes: 892,
      descricao: 'Creatina pura para aumento de força e performance',
      beneficios: ['Aumenta força', 'Melhora performance', '100% pura'],
      imagem: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      selo: 'Premium'
    },
    {
      id: 3,
      nome: 'Kit Elásticos de Resistência',
      categoria: 'equipamentos',
      preco: 79.90,
      precoOriginal: 99.90,
      avaliacao: 4.7,
      avaliacoes: 634,
      descricao: 'Set completo com 5 elásticos de diferentes resistências',
      beneficios: ['5 níveis de resistência', 'Portátil', 'Treino completo'],
      imagem: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      selo: 'Oferta'
    },
    {
      id: 4,
      nome: 'Óleo de Coco Extra Virgem',
      categoria: 'alimentacao',
      preco: 24.90,
      precoOriginal: 32.90,
      avaliacao: 4.6,
      avaliacoes: 423,
      descricao: 'Óleo de coco puro, ideal para cozinhar e suplementação',
      beneficios: ['100% natural', 'Rico em MCT', 'Multipropósito'],
      imagem: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop',
      selo: null
    },
    {
      id: 5,
      nome: 'Multivitamínico Completo',
      categoria: 'suplementos',
      preco: 67.90,
      precoOriginal: 89.90,
      avaliacao: 4.5,
      avaliacoes: 756,
      descricao: 'Complexo vitamínico com 26 nutrientes essenciais',
      beneficios: ['26 vitaminas e minerais', 'Imunidade', 'Energia'],
      imagem: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop',
      selo: 'Recomendado'
    },
    {
      id: 6,
      nome: 'Tapete de Yoga Premium',
      categoria: 'equipamentos',
      preco: 129.90,
      precoOriginal: 159.90,
      avaliacao: 4.8,
      avaliacoes: 312,
      descricao: 'Tapete antiderrapante de alta qualidade para yoga e pilates',
      beneficios: ['Antiderrapante', 'Eco-friendly', 'Extra espesso'],
      imagem: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
      selo: 'Eco-Friendly'
    },
    {
      id: 7,
      nome: 'Castanha do Pará Premium',
      categoria: 'alimentacao',
      preco: 34.90,
      precoOriginal: 42.90,
      avaliacao: 4.9,
      avaliacoes: 189,
      descricao: 'Castanhas selecionadas, ricas em selênio e gorduras boas',
      beneficios: ['Rica em selênio', 'Antioxidante', 'Fonte de energia'],
      imagem: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=400&h=400&fit=crop',
      selo: 'Orgânico'
    },
    {
      id: 8,
      nome: 'Garrafa Térmica Inteligente',
      categoria: 'acessorios',
      preco: 149.90,
      precoOriginal: 199.90,
      avaliacao: 4.7,
      avaliacoes: 445,
      descricao: 'Garrafa com sensor de hidratação e app conectado',
      beneficios: ['Sensor inteligente', 'App conectado', 'Mantém temperatura'],
      imagem: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=400&fit=crop',
      selo: 'Tecnologia'
    }
  ]

  const categorias = [
    { id: 'todos', nome: 'Todos', icon: '🛍️' },
    { id: 'suplementos', nome: 'Suplementos', icon: '💊' },
    { id: 'equipamentos', nome: 'Equipamentos', icon: '🏋️' },
    { id: 'alimentacao', nome: 'Alimentação', icon: '🥗' },
    { id: 'acessorios', nome: 'Acessórios', icon: '⌚' }
  ]

  const produtosFiltrados = produtos.filter(produto => {
    const matchCategoria = filtroAtivo === 'todos' || produto.categoria === filtroAtivo
    const matchBusca = produto.nome.toLowerCase().includes(busca.toLowerCase())
    return matchCategoria && matchBusca
  })

  const adicionarCarrinho = (id: number) => {
    setCarrinho(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }))
  }

  const toggleFavorito = (id: number) => {
    setFavoritos(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    )
  }

  const totalCarrinho = Object.entries(carrinho).reduce((total, [id, quantidade]) => {
    const produto = produtos.find(p => p.id === parseInt(id))
    return total + (produto ? produto.preco * quantidade : 0)
  }, 0)

  const itensCarrinho = Object.values(carrinho).reduce((total, quantidade) => total + quantidade, 0)

  const getSeloColor = (selo: string | null) => {
    switch (selo) {
      case 'Mais Vendido': return 'bg-yellow-500 text-black'
      case 'Premium': return 'bg-purple-500 text-white'
      case 'Oferta': return 'bg-red-500 text-white'
      case 'Recomendado': return 'bg-blue-500 text-white'
      case 'Eco-Friendly': return 'bg-green-500 text-white'
      case 'Orgânico': return 'bg-lime-500 text-black'
      case 'Tecnologia': return 'bg-cyan-500 text-black'
      default: return 'bg-gray-500 text-white'
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
          <h1 className="text-2xl font-bold text-white">Loja BetterLife</h1>
          
          {/* Carrinho */}
          <div className="relative">
            <button className="flex items-center gap-2 bg-lime-400/20 text-lime-400 py-2 px-4 rounded-lg hover:bg-lime-400/30 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <span className="font-semibold">R$ {totalCarrinho.toFixed(2)}</span>
            </button>
            {itensCarrinho > 0 && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{itensCarrinho}</span>
              </div>
            )}
          </div>
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
              placeholder="Buscar produtos..."
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

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {produtosFiltrados.map(produto => (
            <div key={produto.id} className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
              {/* Imagem e Selo */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={produto.imagem} 
                  alt={produto.nome}
                  className="w-full h-full object-cover"
                />
                
                {/* Botão Favorito */}
                <button
                  onClick={() => toggleFavorito(produto.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"
                >
                  <Heart 
                    className={`w-4 h-4 ${
                      favoritos.includes(produto.id) 
                        ? 'text-red-500 fill-red-500' 
                        : 'text-white'
                    }`} 
                  />
                </button>

                {/* Selo */}
                {produto.selo && (
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${getSeloColor(produto.selo)}`}>
                      {produto.selo}
                    </span>
                  </div>
                )}

                {/* Desconto */}
                {produto.precoOriginal > produto.preco && (
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      -{Math.round(((produto.precoOriginal - produto.preco) / produto.precoOriginal) * 100)}%
                    </span>
                  </div>
                )}
              </div>

              {/* Conteúdo */}
              <div className="p-4">
                <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">{produto.nome}</h3>
                
                {/* Avaliação */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-yellow-400 font-semibold text-sm">{produto.avaliacao}</span>
                  </div>
                  <span className="text-gray-400 text-sm">({produto.avaliacoes})</span>
                </div>

                {/* Descrição */}
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">{produto.descricao}</p>

                {/* Benefícios */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {produto.beneficios.slice(0, 2).map((beneficio, idx) => (
                      <span key={idx} className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">
                        {beneficio}
                      </span>
                    ))}
                    {produto.beneficios.length > 2 && (
                      <span className="text-lime-400 text-xs">+{produto.beneficios.length - 2}</span>
                    )}
                  </div>
                </div>

                {/* Preços */}
                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lime-400 font-bold text-xl">
                      R$ {produto.preco.toFixed(2)}
                    </span>
                    {produto.precoOriginal > produto.preco && (
                      <span className="text-gray-400 line-through text-sm">
                        R$ {produto.precoOriginal.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Botões */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => adicionarCarrinho(produto.id)}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-lime-400 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-600 hover:to-lime-500 transition-all text-sm flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Adicionar
                  </button>
                  
                  {carrinho[produto.id] && (
                    <div className="bg-lime-400/20 text-lime-400 py-2 px-3 rounded-lg text-sm font-semibold">
                      {carrinho[produto.id]}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mensagem quando não há resultados */}
        {produtosFiltrados.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-white text-xl font-semibold mb-2">Nenhum produto encontrado</h3>
            <p className="text-gray-300">Tente ajustar os filtros ou buscar por outro termo</p>
          </div>
        )}

        {/* Seção de Benefícios */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
            <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Entrega Rápida</h3>
            <p className="text-gray-300 text-sm">Receba em até 24h na região metropolitana</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
            <Award className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Qualidade Garantida</h3>
            <p className="text-gray-300 text-sm">Produtos selecionados e certificados</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
            <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Suporte Especializado</h3>
            <p className="text-gray-300 text-sm">Tire dúvidas com nossos especialistas</p>
          </div>
        </div>
      </div>
    </div>
  )
}