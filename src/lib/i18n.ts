export type Language = 'pt' | 'en' | 'es'

export interface Translations {
  [key: string]: {
    [key: string]: string | string[] | { [key: string]: string | string[] }
  }
}

// Função utilitária para interpolação de strings
export const interpolate = (template: string, params: { [key: string]: string }): string => {
  return Object.keys(params).reduce((str, param) => {
    return str.replace(new RegExp(`{{${param}}}`, 'g'), params[param])
  }, template)
}

// Função para obter tradução aninhada
export const getNestedTranslation = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : null
  }, obj)
}