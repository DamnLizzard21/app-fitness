'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Calendar,
  Dumbbell,
  Clock,
  Target,
  MoreVertical,
  Edit,
  Copy,
  Trash2,
  Download,
  Filter,
  Search,
  TrendingUp,
  BarChart3
} from 'lucide-react'
import { WorkoutLog } from '@/lib/types'
import { calculateWorkoutVolume, calculateWorkoutDuration, generateWorkoutCSV } from '@/lib/workout-utils'
import { useTranslation } from '@/lib/i18n'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface WorkoutListProps {
  locale?: 'pt-BR' | 'en' | 'es'
  workouts: WorkoutLog[]
  onEdit?: (workout: WorkoutLog) => void
  onDuplicate?: (workout: WorkoutLog) => void
  onDelete?: (workoutId: string) => void
  isLoading?: boolean
}

export function WorkoutList({ 
  locale = 'pt-BR',
  workouts,
  onEdit,
  onDuplicate,
  onDelete,
  isLoading = false
}: WorkoutListProps) {
  const { t } = useTranslation(locale)
  
  const [filteredWorkouts, setFilteredWorkouts] = useState<WorkoutLog[]>(workouts)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'date' | 'type' | 'volume'>('date')
  const [showStats, setShowStats] = useState(false)

  // Atualizar workouts filtrados quando props mudarem
  useEffect(() => {
    let filtered = [...workouts]

    // Filtro de busca
    if (searchTerm) {
      filtered = filtered.filter(workout =>
        workout.exercises.some(ex => 
          ex.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        workout.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workout.tags.some(tag => 
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    // Filtro por tipo
    if (typeFilter !== 'all') {
      filtered = filtered.filter(workout => workout.type === typeFilter)
    }

    // Ordenação
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case 'type':
          return a.type.localeCompare(b.type)
        case 'volume':
          return calculateWorkoutVolume(b.exercises) - calculateWorkoutVolume(a.exercises)
        default:
          return 0
      }
    })

    setFilteredWorkouts(filtered)
  }, [workouts, searchTerm, typeFilter, sortBy])

  const getWorkoutTypeColor = (type: WorkoutLog['type']) => {
    switch (type) {
      case 'strength': return 'bg-blue-500'
      case 'cardio': return 'bg-red-500'
      case 'mobility': return 'bg-green-500'
      case 'mixed': return 'bg-purple-500'
      default: return 'bg-gray-500'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.round(seconds / 60)
    if (minutes < 60) {
      return `${minutes}min`
    }
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}h ${remainingMinutes}min`
  }

  const exportToCSV = () => {
    const csv = generateWorkoutCSV(filteredWorkouts)
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `treinos-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  // Calcular estatísticas
  const totalWorkouts = filteredWorkouts.length
  const totalVolume = filteredWorkouts.reduce((sum, workout) => 
    sum + calculateWorkoutVolume(workout.exercises), 0
  )
  const totalDuration = filteredWorkouts.reduce((sum, workout) => 
    sum + calculateWorkoutDuration(workout.exercises), 0
  )
  const averageVolume = totalWorkouts > 0 ? totalVolume / totalWorkouts : 0

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filtros e Controles */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Busca */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar exercícios, notas ou tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filtro por Tipo */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="strength">{t('workout.type.strength')}</SelectItem>
                <SelectItem value="cardio">{t('workout.type.cardio')}</SelectItem>
                <SelectItem value="mobility">{t('workout.type.mobility')}</SelectItem>
                <SelectItem value="mixed">{t('workout.type.mixed')}</SelectItem>
              </SelectContent>
            </Select>

            {/* Ordenação */}
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Data</SelectItem>
                <SelectItem value="type">Tipo</SelectItem>
                <SelectItem value="volume">Volume</SelectItem>
              </SelectContent>
            </Select>

            {/* Ações */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowStats(!showStats)}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Stats
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={exportToCSV}
                disabled={filteredWorkouts.length === 0}
              >
                <Download className="w-4 h-4 mr-2" />
                CSV
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      {showStats && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Estatísticas dos Treinos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{totalWorkouts}</div>
                <div className="text-sm text-muted-foreground">Total de Treinos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{totalVolume.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Volume Total (kg)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{formatDuration(totalDuration)}</div>
                <div className="text-sm text-muted-foreground">Tempo Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{Math.round(averageVolume).toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Volume Médio</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Treinos */}
      {filteredWorkouts.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Dumbbell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum treino encontrado</h3>
            <p className="text-muted-foreground">
              {searchTerm || typeFilter !== 'all' 
                ? 'Tente ajustar os filtros de busca'
                : 'Comece registrando seu primeiro treino!'
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredWorkouts.map((workout) => {
            const volume = calculateWorkoutVolume(workout.exercises)
            const duration = calculateWorkoutDuration(workout.exercises)

            return (
              <Card key={workout.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Badge className={`${getWorkoutTypeColor(workout.type)} text-white`}>
                        {t(`workout.type.${workout.type}`)}
                      </Badge>
                      <div>
                        <h3 className="font-semibold">{formatDate(workout.date)}</h3>
                        <p className="text-sm text-muted-foreground">
                          {workout.exercises.length} exercício{workout.exercises.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit?.(workout)}>
                          <Edit className="w-4 h-4 mr-2" />
                          {t('common.edit')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDuplicate?.(workout)}>
                          <Copy className="w-4 h-4 mr-2" />
                          {t('workout.duplicate')}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => onDelete?.(workout.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          {t('common.delete')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Estatísticas do Treino */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center bg-muted p-2 rounded">
                      <div className="font-semibold">{volume.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Volume (kg)</div>
                    </div>
                    <div className="text-center bg-muted p-2 rounded">
                      <div className="font-semibold">{formatDuration(duration)}</div>
                      <div className="text-xs text-muted-foreground">Duração</div>
                    </div>
                    <div className="text-center bg-muted p-2 rounded">
                      <div className="font-semibold">{workout.calories || 0}</div>
                      <div className="text-xs text-muted-foreground">Calorias</div>
                    </div>
                  </div>

                  {/* Exercícios */}
                  <div className="space-y-2 mb-4">
                    {workout.exercises.slice(0, 3).map((exercise, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="font-medium">{exercise.name}</span>
                        <span className="text-muted-foreground">
                          {exercise.sets && exercise.reps && exercise.weight
                            ? `${exercise.sets}x${exercise.reps} @ ${exercise.weight}kg`
                            : exercise.distance
                            ? `${exercise.distance}km`
                            : exercise.duration_sec
                            ? formatDuration(exercise.duration_sec)
                            : ''
                          }
                          {exercise.rpe && ` (RPE ${exercise.rpe})`}
                        </span>
                      </div>
                    ))}
                    {workout.exercises.length > 3 && (
                      <div className="text-sm text-muted-foreground">
                        +{workout.exercises.length - 3} exercício{workout.exercises.length - 3 !== 1 ? 's' : ''}
                      </div>
                    )}
                  </div>

                  {/* Notas */}
                  {workout.notes && (
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground italic">
                        "{workout.notes}"
                      </p>
                    </div>
                  )}

                  {/* Tags */}
                  {workout.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {workout.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}