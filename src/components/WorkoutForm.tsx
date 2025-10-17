'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { 
  Plus, 
  Trash2, 
  Save, 
  Calendar, 
  Dumbbell, 
  Clock, 
  Target,
  AlertCircle,
  Copy,
  Edit
} from 'lucide-react'
import { WorkoutLog, Exercise } from '@/lib/types'
import { validateWorkoutLog, calculateWorkoutVolume, calculateWorkoutDuration, estimateCaloriesBurned } from '@/lib/workout-utils'
import { useTranslation } from '@/lib/i18n'

interface WorkoutFormProps {
  locale?: 'pt-BR' | 'en' | 'es'
  initialData?: Partial<WorkoutLog>
  onSave?: (workout: Omit<WorkoutLog, 'id' | 'created_at' | 'updated_at'>) => void
  onCancel?: () => void
  userId: string
}

export function WorkoutForm({ 
  locale = 'pt-BR', 
  initialData,
  onSave,
  onCancel,
  userId
}: WorkoutFormProps) {
  const { t } = useTranslation(locale)
  
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0])
  const [type, setType] = useState<WorkoutLog['type']>(initialData?.type || 'strength')
  const [exercises, setExercises] = useState<Exercise[]>(initialData?.exercises || [
    { name: '', sets: 0, reps: 0, weight: 0 }
  ])
  const [notes, setNotes] = useState(initialData?.notes || '')
  const [calories, setCalories] = useState(initialData?.calories?.toString() || '')
  const [tags, setTags] = useState(initialData?.tags?.join(', ') || '')
  const [errors, setErrors] = useState<string[]>([])
  const [isSaving, setIsSaving] = useState(false)

  // Calcular estatísticas em tempo real
  const workoutVolume = calculateWorkoutVolume(exercises)
  const workoutDuration = calculateWorkoutDuration(exercises)
  const estimatedCalories = estimateCaloriesBurned(type, workoutDuration / 60)

  const addExercise = () => {
    setExercises([...exercises, { name: '', sets: 0, reps: 0, weight: 0 }])
  }

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index))
  }

  const updateExercise = (index: number, field: keyof Exercise, value: any) => {
    const updatedExercises = [...exercises]
    updatedExercises[index] = { ...updatedExercises[index], [field]: value }
    setExercises(updatedExercises)
  }

  const duplicateExercise = (index: number) => {
    const exerciseToDuplicate = { ...exercises[index] }
    const newExercises = [...exercises]
    newExercises.splice(index + 1, 0, exerciseToDuplicate)
    setExercises(newExercises)
  }

  const handleSave = async () => {
    setIsSaving(true)
    setErrors([])

    try {
      const workoutData: Omit<WorkoutLog, 'id' | 'created_at' | 'updated_at'> = {
        user_id: userId,
        date,
        type,
        exercises: exercises.filter(ex => ex.name.trim() !== ''),
        notes: notes.trim(),
        calories: calories ? parseInt(calories) : estimatedCalories,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
      }

      const validation = validateWorkoutLog(workoutData)
      if (!validation.isValid) {
        setErrors(validation.errors)
        return
      }

      onSave?.(workoutData)
    } catch (error) {
      setErrors(['Erro ao salvar treino'])
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Dumbbell className="w-5 h-5" />
          {initialData?.id ? 'Editar Treino' : t('workout.addNew')}
        </CardTitle>
        <CardDescription>
          Registre os detalhes do seu treino para acompanhar o progresso
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Informações Básicas */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">{t('workout.date')}</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>{t('workout.type')}</Label>
            <Select value={type} onValueChange={(value) => setType(value as WorkoutLog['type'])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="strength">{t('workout.type.strength')}</SelectItem>
                <SelectItem value="cardio">{t('workout.type.cardio')}</SelectItem>
                <SelectItem value="mobility">{t('workout.type.mobility')}</SelectItem>
                <SelectItem value="mixed">{t('workout.type.mixed')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Estatísticas em Tempo Real */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-muted p-3 rounded-lg text-center">
            <div className="text-lg font-semibold">{workoutVolume.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Volume Total (kg)</div>
          </div>
          <div className="bg-muted p-3 rounded-lg text-center">
            <div className="text-lg font-semibold">{Math.round(workoutDuration / 60)}</div>
            <div className="text-sm text-muted-foreground">Duração (min)</div>
          </div>
          <div className="bg-muted p-3 rounded-lg text-center">
            <div className="text-lg font-semibold">{estimatedCalories}</div>
            <div className="text-sm text-muted-foreground">Calorias Est.</div>
          </div>
        </div>

        <Separator />

        {/* Exercícios */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{t('workout.exercises')}</h3>
            <Button onClick={addExercise} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Exercício
            </Button>
          </div>

          {exercises.map((exercise, index) => (
            <Card key={index} className="p-4">
              <div className="space-y-4">
                {/* Nome do Exercício */}
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <Input
                      placeholder={t('workout.exercise.name')}
                      value={exercise.name}
                      onChange={(e) => updateExercise(index, 'name', e.target.value)}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => duplicateExercise(index)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeExercise(index)}
                    disabled={exercises.length === 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Campos baseados no tipo de treino */}
                {(type === 'strength' || type === 'mixed') && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <Label className="text-xs">{t('workout.exercise.sets')}</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={exercise.sets || ''}
                        onChange={(e) => updateExercise(index, 'sets', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">{t('workout.exercise.reps')}</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={exercise.reps || ''}
                        onChange={(e) => updateExercise(index, 'reps', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">{t('workout.exercise.weight')} (kg)</Label>
                      <Input
                        type="number"
                        step="0.5"
                        placeholder="0"
                        value={exercise.weight || ''}
                        onChange={(e) => updateExercise(index, 'weight', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">{t('workout.exercise.rpe')}</Label>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        placeholder="1-10"
                        value={exercise.rpe || ''}
                        onChange={(e) => updateExercise(index, 'rpe', parseInt(e.target.value) || undefined)}
                      />
                    </div>
                  </div>
                )}

                {(type === 'cardio' || type === 'mixed') && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div>
                      <Label className="text-xs">{t('workout.exercise.distance')} (km)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="0"
                        value={exercise.distance || ''}
                        onChange={(e) => updateExercise(index, 'distance', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">{t('workout.exercise.duration')} (min)</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={exercise.duration_sec ? Math.round(exercise.duration_sec / 60) : ''}
                        onChange={(e) => updateExercise(index, 'duration_sec', (parseInt(e.target.value) || 0) * 60)}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">{t('workout.exercise.rpe')}</Label>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        placeholder="1-10"
                        value={exercise.rpe || ''}
                        onChange={(e) => updateExercise(index, 'rpe', parseInt(e.target.value) || undefined)}
                      />
                    </div>
                  </div>
                )}

                {type === 'mobility' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">{t('workout.exercise.duration')} (min)</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={exercise.duration_sec ? Math.round(exercise.duration_sec / 60) : ''}
                        onChange={(e) => updateExercise(index, 'duration_sec', (parseInt(e.target.value) || 0) * 60)}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">{t('workout.exercise.rpe')}</Label>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        placeholder="1-10"
                        value={exercise.rpe || ''}
                        onChange={(e) => updateExercise(index, 'rpe', parseInt(e.target.value) || undefined)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        <Separator />

        {/* Informações Adicionais */}
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="calories">{t('workout.calories')} (opcional)</Label>
              <Input
                id="calories"
                type="number"
                placeholder={estimatedCalories.toString()}
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Estimativa automática: {estimatedCalories} calorias
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tags">{t('workout.tags')}</Label>
              <Input
                id="tags"
                placeholder="força, hipertrofia, peito"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Separe as tags com vírgulas
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">{t('workout.notes')}</Label>
            <Textarea
              id="notes"
              placeholder="Observações sobre o treino, como se sentiu, ajustes feitos..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        {/* Erros */}
        {errors.length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <ul className="list-disc list-inside">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Ações */}
        <div className="flex gap-3">
          <Button onClick={handleSave} disabled={isSaving} className="flex-1">
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? t('common.loading') : t('workout.save')}
          </Button>
          {onCancel && (
            <Button variant="outline" onClick={onCancel}>
              {t('common.cancel')}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}