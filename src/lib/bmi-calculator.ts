import { BMICalculation } from './types'

// Função para calcular IMC com precisão
export function calculateBMI(
  weight: number,
  height: number,
  units: 'metric' | 'imperial',
  heightFeet?: number,
  heightInches?: number
): BMICalculation {
  let weight_kg: number
  let height_m: number

  if (units === 'imperial') {
    // Converter libras para kg
    weight_kg = weight * 0.45359237
    
    // Converter pés e polegadas para metros
    if (heightFeet !== undefined && heightInches !== undefined) {
      const totalInches = (heightFeet * 12) + heightInches
      height_m = totalInches * 0.0254
    } else {
      // Se apenas height foi fornecido em polegadas
      height_m = height * 0.0254
    }
  } else {
    weight_kg = weight
    height_m = height / 100 // cm para metros
  }

  // Calcular IMC
  const bmi = weight_kg / (height_m * height_m)
  const bmi_rounded = Math.round(bmi * 10) / 10 // 1 casa decimal

  // Calcular IMC Prime
  const bmi_prime = Math.round((bmi / 25) * 100) / 100 // 2 casas decimais

  // Determinar categoria
  let category: BMICalculation['category']
  if (bmi < 18.5) category = 'underweight'
  else if (bmi < 25) category = 'normal'
  else if (bmi < 30) category = 'overweight'
  else if (bmi < 35) category = 'obese_1'
  else if (bmi < 40) category = 'obese_2'
  else category = 'obese_3'

  // Calcular faixa de peso saudável (IMC 18.5-24.9)
  const healthy_min_kg = 18.5 * (height_m * height_m)
  const healthy_max_kg = 24.9 * (height_m * height_m)

  return {
    bmi: bmi_rounded,
    bmi_prime,
    category,
    healthy_weight_range: {
      min_kg: Math.round(healthy_min_kg * 10) / 10,
      max_kg: Math.round(healthy_max_kg * 10) / 10
    }
  }
}

// Função para converter peso entre unidades
export function convertWeight(weight: number, from: 'kg' | 'lb', to: 'kg' | 'lb'): number {
  if (from === to) return weight
  
  if (from === 'kg' && to === 'lb') {
    return Math.round(weight * 2.20462 * 10) / 10
  }
  
  if (from === 'lb' && to === 'kg') {
    return Math.round(weight * 0.45359237 * 10) / 10
  }
  
  return weight
}

// Função para converter altura entre unidades
export function convertHeight(height: number, from: 'cm' | 'in', to: 'cm' | 'in'): number {
  if (from === to) return height
  
  if (from === 'cm' && to === 'in') {
    return Math.round(height * 0.393701 * 10) / 10
  }
  
  if (from === 'in' && to === 'cm') {
    return Math.round(height * 2.54 * 10) / 10
  }
  
  return height
}

// Função para converter polegadas para pés e polegadas
export function inchesToFeetAndInches(totalInches: number): { feet: number; inches: number } {
  const feet = Math.floor(totalInches / 12)
  const inches = totalInches % 12
  return { feet, inches }
}

// Função para converter pés e polegadas para polegadas totais
export function feetAndInchesToInches(feet: number, inches: number): number {
  return (feet * 12) + inches
}

// Função para formatar altura baseada na unidade
export function formatHeight(height_cm: number, units: 'metric' | 'imperial'): string {
  if (units === 'metric') {
    return `${height_cm} cm`
  } else {
    const totalInches = convertHeight(height_cm, 'cm', 'in')
    const { feet, inches } = inchesToFeetAndInches(totalInches)
    return `${feet}'${inches}"`
  }
}

// Função para formatar peso baseada na unidade
export function formatWeight(weight_kg: number, units: 'metric' | 'imperial'): string {
  if (units === 'metric') {
    return `${weight_kg} kg`
  } else {
    const weight_lb = convertWeight(weight_kg, 'kg', 'lb')
    return `${weight_lb} lb`
  }
}

// Função para validar dados de entrada
export function validateBMIInput(
  weight: number,
  height: number,
  units: 'metric' | 'imperial'
): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (units === 'metric') {
    // Validação métrica
    if (weight < 20 || weight > 300) {
      errors.push('Peso deve estar entre 20kg e 300kg')
    }
    if (height < 100 || height > 250) {
      errors.push('Altura deve estar entre 100cm e 250cm')
    }
  } else {
    // Validação imperial
    if (weight < 44 || weight > 660) {
      errors.push('Weight must be between 44lb and 660lb')
    }
    if (height < 39 || height > 98) {
      errors.push('Height must be between 39in and 98in')
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Função para obter mensagem contextual baseada em idade e sexo
export function getBMIContextualMessage(
  bmi: number,
  category: BMICalculation['category'],
  age?: number,
  sex?: 'male' | 'female' | 'other',
  locale: 'pt-BR' | 'en' | 'es' = 'pt-BR'
): string {
  const messages = {
    'pt-BR': {
      underweight: {
        general: 'Seu IMC indica baixo peso. Considere consultar um nutricionista.',
        young: 'Para sua idade, é importante focar em uma alimentação balanceada.',
        adult: 'Considere aumentar a ingestão calórica de forma saudável.'
      },
      normal: {
        general: 'Parabéns! Seu IMC está na faixa saudável.',
        young: 'Continue mantendo hábitos saudáveis.',
        adult: 'Mantenha seu estilo de vida ativo e alimentação equilibrada.'
      },
      overweight: {
        general: 'Seu IMC indica sobrepeso. Pequenas mudanças podem fazer diferença.',
        young: 'Foque em atividades físicas regulares e alimentação balanceada.',
        adult: 'Considere um programa de exercícios e acompanhamento nutricional.'
      },
      obese_1: {
        general: 'Seu IMC indica obesidade grau I. É recomendável buscar orientação profissional.',
        young: 'Importante buscar acompanhamento médico e nutricional.',
        adult: 'Considere um plano estruturado de perda de peso com profissionais.'
      },
      obese_2: {
        general: 'Seu IMC indica obesidade grau II. Busque acompanhamento médico.',
        young: 'Essencial ter acompanhamento médico especializado.',
        adult: 'Recomendamos avaliação médica completa e plano de tratamento.'
      },
      obese_3: {
        general: 'Seu IMC indica obesidade grau III. Procure ajuda médica urgente.',
        young: 'Necessário acompanhamento médico imediato.',
        adult: 'Busque avaliação médica especializada urgentemente.'
      }
    },
    'en': {
      underweight: {
        general: 'Your BMI indicates underweight. Consider consulting a nutritionist.',
        young: 'For your age, focus on balanced nutrition is important.',
        adult: 'Consider increasing caloric intake in a healthy way.'
      },
      normal: {
        general: 'Congratulations! Your BMI is in the healthy range.',
        young: 'Keep maintaining healthy habits.',
        adult: 'Maintain your active lifestyle and balanced diet.'
      },
      overweight: {
        general: 'Your BMI indicates overweight. Small changes can make a difference.',
        young: 'Focus on regular physical activities and balanced nutrition.',
        adult: 'Consider an exercise program and nutritional guidance.'
      },
      obese_1: {
        general: 'Your BMI indicates class I obesity. Professional guidance is recommended.',
        young: 'Important to seek medical and nutritional guidance.',
        adult: 'Consider a structured weight loss plan with professionals.'
      },
      obese_2: {
        general: 'Your BMI indicates class II obesity. Seek medical guidance.',
        young: 'Essential to have specialized medical guidance.',
        adult: 'We recommend complete medical evaluation and treatment plan.'
      },
      obese_3: {
        general: 'Your BMI indicates class III obesity. Seek urgent medical help.',
        young: 'Immediate medical guidance needed.',
        adult: 'Seek specialized medical evaluation urgently.'
      }
    },
    'es': {
      underweight: {
        general: 'Tu IMC indica bajo peso. Considera consultar un nutricionista.',
        young: 'Para tu edad, es importante enfocarse en una alimentación balanceada.',
        adult: 'Considera aumentar la ingesta calórica de forma saludable.'
      },
      normal: {
        general: '¡Felicitaciones! Tu IMC está en el rango saludable.',
        young: 'Continúa manteniendo hábitos saludables.',
        adult: 'Mantén tu estilo de vida activo y alimentación equilibrada.'
      },
      overweight: {
        general: 'Tu IMC indica sobrepeso. Pequeños cambios pueden hacer la diferencia.',
        young: 'Enfócate en actividades físicas regulares y alimentación balanceada.',
        adult: 'Considera un programa de ejercicios y orientación nutricional.'
      },
      obese_1: {
        general: 'Tu IMC indica obesidad grado I. Se recomienda buscar orientación profesional.',
        young: 'Importante buscar orientación médica y nutricional.',
        adult: 'Considera un plan estructurado de pérdida de peso con profesionales.'
      },
      obese_2: {
        general: 'Tu IMC indica obesidad grado II. Busca orientación médica.',
        young: 'Esencial tener orientación médica especializada.',
        adult: 'Recomendamos evaluación médica completa y plan de tratamiento.'
      },
      obese_3: {
        general: 'Tu IMC indica obesidad grado III. Busca ayuda médica urgente.',
        young: 'Necesario orientación médica inmediata.',
        adult: 'Busca evaluación médica especializada urgentemente.'
      }
    }
  }

  const categoryMessages = messages[locale][category]
  
  if (age && age < 18) {
    return categoryMessages.young
  } else if (age && age >= 18) {
    return categoryMessages.adult
  }
  
  return categoryMessages.general
}