import { BMIResult } from './types'

// Conversões de unidades
export const convertWeight = {
  lbToKg: (lb: number): number => lb * 0.45359237,
  kgToLb: (kg: number): number => kg / 0.45359237
}

export const convertHeight = {
  feetInchesToCm: (feet: number, inches: number): number => ((feet * 12) + inches) * 2.54,
  cmToFeetInches: (cm: number): { feet: number; inches: number } => {
    const totalInches = cm / 2.54
    const feet = Math.floor(totalInches / 12)
    const inches = Math.round(totalInches % 12)
    return { feet, inches }
  },
  cmToM: (cm: number): number => cm / 100
}

// Cálculo de IMC preciso
export function calculateBMI(
  weight: number,
  height: number,
  units: 'metric' | 'imperial',
  heightFeet?: number,
  heightInches?: number
): BMIResult {
  let weightKg: number
  let heightM: number

  if (units === 'imperial') {
    weightKg = convertWeight.lbToKg(weight)
    if (heightFeet !== undefined && heightInches !== undefined) {
      const heightCm = convertHeight.feetInchesToCm(heightFeet, heightInches)
      heightM = convertHeight.cmToM(heightCm)
    } else {
      // Se altura foi passada em polegadas totais
      heightM = (height * 2.54) / 100
    }
  } else {
    weightKg = weight
    heightM = convertHeight.cmToM(height)
  }

  // Cálculo do IMC
  const bmi = Math.round((weightKg / (heightM ** 2)) * 10) / 10
  const bmiPrime = Math.round((bmi / 25) * 100) / 100

  // Classificação WHO
  let category: string
  if (bmi < 18.5) category = 'underweight'
  else if (bmi < 25) category = 'normal'
  else if (bmi < 30) category = 'overweight'
  else if (bmi < 35) category = 'obese1'
  else if (bmi < 40) category = 'obese2'
  else category = 'obese3'

  // Faixa de peso saudável (IMC 18.5-24.9)
  const healthyMinKg = Math.round((18.5 * (heightM ** 2)) * 10) / 10
  const healthyMaxKg = Math.round((24.9 * (heightM ** 2)) * 10) / 10

  const healthyWeightRange = units === 'imperial' 
    ? {
        min: Math.round(convertWeight.kgToLb(healthyMinKg) * 10) / 10,
        max: Math.round(convertWeight.kgToLb(healthyMaxKg) * 10) / 10
      }
    : {
        min: healthyMinKg,
        max: healthyMaxKg
      }

  // Recomendações baseadas no IMC
  const recommendations: string[] = []
  
  if (category === 'underweight') {
    recommendations.push('Considere consultar um nutricionista para ganho de peso saudável')
    recommendations.push('Inclua exercícios de força para ganho de massa muscular')
  } else if (category === 'normal') {
    recommendations.push('Mantenha um estilo de vida ativo e alimentação equilibrada')
    recommendations.push('Continue monitorando seu peso regularmente')
  } else if (category === 'overweight') {
    recommendations.push('Considere um déficit calórico moderado para perda de peso')
    recommendations.push('Aumente a atividade física gradualmente')
  } else {
    recommendations.push('Consulte um médico para orientação personalizada')
    recommendations.push('Considere acompanhamento nutricional profissional')
    recommendations.push('Inicie atividade física com supervisão')
  }

  return {
    bmi,
    bmiPrime,
    category,
    healthyWeightRange,
    recommendations
  }
}

// Validações
export function validateWeight(weight: number, units: 'metric' | 'imperial'): boolean {
  if (units === 'metric') {
    return weight >= 20 && weight <= 300 // kg
  } else {
    return weight >= 44 && weight <= 660 // lb
  }
}

export function validateHeight(height: number, units: 'metric' | 'imperial'): boolean {
  if (units === 'metric') {
    return height >= 100 && height <= 250 // cm
  } else {
    return height >= 36 && height <= 96 // inches
  }
}

export function validateFeetInches(feet: number, inches: number): boolean {
  return feet >= 3 && feet <= 8 && inches >= 0 && inches < 12
}