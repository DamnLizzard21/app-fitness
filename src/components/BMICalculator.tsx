'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Calculator, Scale, TrendingUp, AlertCircle, Info } from 'lucide-react'
import { calculateBMI, getBMIContextualMessage, validateBMIInput, formatHeight, formatWeight } from '@/lib/bmi-calculator'
import { useTranslation } from '@/lib/i18n'
import { BMICalculation } from '@/lib/types'

interface BMICalculatorProps {
  locale?: 'pt-BR' | 'en' | 'es'
  defaultUnits?: 'metric' | 'imperial'
  onCalculate?: (result: BMICalculation) => void
}

export function BMICalculator({ 
  locale = 'pt-BR', 
  defaultUnits = 'metric',
  onCalculate 
}: BMICalculatorProps) {
  const { t } = useTranslation(locale)
  
  const [units, setUnits] = useState<'metric' | 'imperial'>(defaultUnits)
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [heightFeet, setHeightFeet] = useState('')
  const [heightInches, setHeightInches] = useState('')
  const [age, setAge] = useState('')
  const [sex, setSex] = useState<'male' | 'female' | 'other' | ''>('')
  const [result, setResult] = useState<BMICalculation | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const [isCalculating, setIsCalculating] = useState(false)

  const handleCalculate = async () => {
    setIsCalculating(true)
    setErrors([])

    try {
      const weightNum = parseFloat(weight)
      const heightNum = parseFloat(height)
      const heightFeetNum = parseFloat(heightFeet)
      const heightInchesNum = parseFloat(heightInches)

      // Validar entrada
      let validationHeight = heightNum
      if (units === 'imperial' && heightFeet && heightInches) {
        validationHeight = (heightFeetNum * 12) + heightInchesNum
      }

      const validation = validateBMIInput(weightNum, validationHeight, units)
      
      if (!validation.isValid) {
        setErrors(validation.errors)
        return
      }

      // Calcular IMC
      const bmiResult = calculateBMI(
        weightNum,
        heightNum,
        units,
        units === 'imperial' ? heightFeetNum : undefined,
        units === 'imperial' ? heightInchesNum : undefined
      )

      setResult(bmiResult)
      onCalculate?.(bmiResult)
    } catch (error) {
      setErrors(['Erro ao calcular IMC. Verifique os valores inseridos.'])
    } finally {
      setIsCalculating(false)
    }
  }

  const getBMICategoryColor = (category: BMICalculation['category']) => {
    switch (category) {
      case 'underweight': return 'bg-blue-500'
      case 'normal': return 'bg-green-500'
      case 'overweight': return 'bg-yellow-500'
      case 'obese_1': return 'bg-orange-500'
      case 'obese_2': return 'bg-red-500'
      case 'obese_3': return 'bg-red-700'
      default: return 'bg-gray-500'
    }
  }

  const getBMICategoryText = (category: BMICalculation['category']) => {
    return t(`bmi.category.${category}`)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            {t('bmi.title')}
          </CardTitle>
          <CardDescription>
            {t('bmi.disclaimer')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Seletor de Unidades */}
          <div className="flex gap-4">
            <Button
              variant={units === 'metric' ? 'default' : 'outline'}
              onClick={() => setUnits('metric')}
              className="flex-1"
            >
              {t('units.metric')}
            </Button>
            <Button
              variant={units === 'imperial' ? 'default' : 'outline'}
              onClick={() => setUnits('imperial')}
              className="flex-1"
            >
              {t('units.imperial')}
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Peso */}
            <div className="space-y-2">
              <Label htmlFor="weight">{t('bmi.weight')}</Label>
              <div className="relative">
                <Input
                  id="weight"
                  type="number"
                  placeholder={units === 'metric' ? '70' : '154'}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="pr-12"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  {units === 'metric' ? t('units.kg') : t('units.lb')}
                </span>
              </div>
            </div>

            {/* Altura */}
            <div className="space-y-2">
              <Label htmlFor="height">{t('bmi.height')}</Label>
              {units === 'metric' ? (
                <div className="relative">
                  <Input
                    id="height"
                    type="number"
                    placeholder="175"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="pr-12"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    {t('units.cm')}
                  </span>
                </div>
              ) : (
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      type="number"
                      placeholder="5"
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(e.target.value)}
                      className="pr-12"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      {t('units.ft')}
                    </span>
                  </div>
                  <div className="relative flex-1">
                    <Input
                      type="number"
                      placeholder="9"
                      value={heightInches}
                      onChange={(e) => setHeightInches(e.target.value)}
                      className="pr-12"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      {t('units.in')}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Idade (opcional) */}
            <div className="space-y-2">
              <Label htmlFor="age">{t('bmi.age')} (opcional)</Label>
              <Input
                id="age"
                type="number"
                placeholder="25"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            {/* Sexo (opcional) */}
            <div className="space-y-2">
              <Label>{t('bmi.sex')} (opcional)</Label>
              <Select value={sex} onValueChange={(value) => setSex(value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">{t('bmi.male')}</SelectItem>
                  <SelectItem value="female">{t('bmi.female')}</SelectItem>
                  <SelectItem value="other">{t('bmi.other')}</SelectItem>
                </SelectContent>
              </Select>
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

          {/* Botão Calcular */}
          <Button 
            onClick={handleCalculate}
            disabled={!weight || !height || (units === 'imperial' && (!heightFeet || !heightInches)) || isCalculating}
            className="w-full"
          >
            <Scale className="w-4 h-4 mr-2" />
            {isCalculating ? t('common.loading') : t('bmi.calculate')}
          </Button>
        </CardContent>
      </Card>

      {/* Resultado */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Resultado do IMC
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* IMC Principal */}
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {result.bmi}
              </div>
              <Badge className={`${getBMICategoryColor(result.category)} text-white px-4 py-2`}>
                {getBMICategoryText(result.category)}
              </Badge>
            </div>

            {/* Métricas Adicionais */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted p-4 rounded-lg text-center">
                <div className="text-2xl font-semibold">{result.bmi_prime}</div>
                <div className="text-sm text-muted-foreground">{t('bmi.prime')}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  (1.0 = IMC ideal)
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-lg text-center">
                <div className="text-sm font-medium mb-2">{t('bmi.healthyRange')}</div>
                <div className="text-lg">
                  {formatWeight(result.healthy_weight_range.min_kg, units)} - {formatWeight(result.healthy_weight_range.max_kg, units)}
                </div>
              </div>
            </div>

            {/* Mensagem Contextual */}
            {age && sex && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  {getBMIContextualMessage(
                    result.bmi,
                    result.category,
                    parseInt(age),
                    sex as any,
                    locale
                  )}
                </AlertDescription>
              </Alert>
            )}

            {/* Disclaimer */}
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                {t('bmi.disclaimer')}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  )
}