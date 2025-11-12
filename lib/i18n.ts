import React from "react"

export type Language = "es" | "en"

export interface Translations {
  // Header
  appTitle: string
  appSubtitle: string
  
  // Navigation
  back: string
  next: string
  save: string
  clear: string
  loadDraft: string
  startFromTemplate: string
  exportJSON: string
  exportPDF: string
  finish: string
  
  // Steps
  step1Title: string
  step1Subtitle: string
  step2Title: string
  step2Subtitle: string
  step3Title: string
  step3Subtitle: string
  step4Title: string
  step4Subtitle: string
  step5Title: string
  step5Subtitle: string
  step6Title: string
  step6Subtitle: string
  step7Title: string
  step7Subtitle: string
  summaryTitle: string
  summarySubtitle: string
  
  // Step 1 - Datos básicos
  fullName: string
  preferredName: string
  specialty: string
  cities: string
  yearsExperience: string
  
  // Step 2 - Identidad y estilo
  perception: string
  cercanoHumano: string
  eleganteAspiracional: string
  innovadorTecnologico: string
  profesionalTecnico: string
  casualDirecto: string
  whatNotAre: string
  philosophy: string
  
  // Step 3 - Procedimientos y negocio
  favoriteProcedures: string
  highValueServices: string
  accessibleServices: string
  
  // Step 4 - Paciente ideal
  averageAge: string
  predominantGender: string
  mujer: string
  hombre: string
  ambos: string
  commonFears: string
  
  // Step 5 - Diferenciadores
  whatMakesDifferent: string
  keyTechnologies: string
  
  // Step 6 - Metas de marketing
  mainObjective: string
  masConsultas: string
  mejorReputacion: string
  nuevosServicios: string
  expansionGeografica: string
  liderazgoOpinion: string
  monthlyNewConsultations: string
  inspiringAccounts: string
  
  // Step 7 - Storytelling
  whySpecialty: string
  markedCase: string
  commonPhrase: string
  fiveYearVision: string
  mythToDebunk: string
  frequentQuestions: string
  curiosityTopic: string
  
  // Step 8 - Historial de anuncios
  hasDoneAds: string
  platforms: string
  investmentAmount: string
  results: string
  bestFormats: string
  whatDidntWork: string
  
  // Common
  yes: string
  no: string
  add: string
  remove: string
  other: string
  specify: string
  required: string
  optional: string
  
  // Toast messages
  exportedSuccessfully: string
  savedSuccessfully: string
  submittedSuccessfully: string
  errorOccurred: string
  exportError: string
  exportOptions: string
  generateScopeDraft: string
  createViewLink: string
}

export const es: Translations = {
  // Header
  appTitle: "SAINT Brand Brief",
  appSubtitle: "Herramienta de Brief Médico",
  
  // Navigation
  back: "Atrás",
  next: "Siguiente",
  save: "Guardar",
  clear: "Limpiar",
  loadDraft: "Cargar borrador",
  startFromTemplate: "Empezar con plantilla",
  exportJSON: "Exportar JSON",
  exportPDF: "Exportar PDF",
  finish: "Finalizar",
  
  // Steps
  step1Title: "Datos del cliente",
  step1Subtitle: "Información de contacto",
  step2Title: "Información general",
  step2Subtitle: "Dimensiones y áreas",
  step3Title: "Requerimientos especiales",
  step3Subtitle: "Mobiliario específico",
  step4Title: "Preferencias de mobiliario",
  step4Subtitle: "Detalles de diseño",
  step5Title: "Estilo, colores y percepción",
  step5Subtitle: "Estética del proyecto",
  step6Title: "Iluminación deseada",
  step6Subtitle: "Preferencias de luz",
  step7Title: "Presupuesto y alcance",
  step7Subtitle: "Rango de inversión",
  summaryTitle: "Resumen",
  summarySubtitle: "Revisión final",
  
  // Step 1 - Datos básicos
  fullName: "Nombre completo",
  preferredName: "Nombre preferido para comunicación",
  specialty: "Especialidad",
  cities: "Ciudades donde consultas",
  yearsExperience: "Años de experiencia",
  
  // Step 2 - Identidad y estilo
  perception: "Cómo quieres que te perciban (elige 3)",
  cercanoHumano: "Cercano y humano",
  eleganteAspiracional: "Elegante y aspiracional",
  innovadorTecnologico: "Innovador y tecnológico",
  profesionalTecnico: "Profesional técnico",
  casualDirecto: "Casual y directo",
  whatNotAre: "Qué NO eres como médico",
  philosophy: "Tu filosofía como médico en una frase",
  
  // Step 3 - Procedimientos y negocio
  favoriteProcedures: "Procedimientos favoritos (2-3 que disfrutas más)",
  highValueServices: "Servicios de mayor valor o margen",
  accessibleServices: "Servicios accesibles o 'gancho'",
  
  // Step 4 - Paciente ideal
  averageAge: "Edad promedio de tu paciente ideal",
  predominantGender: "Género predominante",
  mujer: "Mujer",
  hombre: "Hombre",
  ambos: "Ambos",
  commonFears: "Miedos más comunes (hasta 3)",
  
  // Step 5 - Diferenciadores
  whatMakesDifferent: "Qué te hace diferente",
  keyTechnologies: "Tecnologías, técnicas o certificaciones clave",
  
  // Step 6 - Metas de marketing
  mainObjective: "Objetivo principal para los próximos 6 meses",
  masConsultas: "Más consultas",
  mejorReputacion: "Mejor reputación",
  nuevosServicios: "Nuevos servicios",
  expansionGeografica: "Expansión geográfica",
  liderazgoOpinion: "Liderazgo de opinión",
  monthlyNewConsultations: "Consultas nuevas al mes que te gustaría generar",
  inspiringAccounts: "Médicos, marcas o cuentas que te inspiran",
  
  // Step 7 - Storytelling
  whySpecialty: "Por qué elegiste tu especialidad",
  markedCase: "Caso de paciente que te marcó",
  commonPhrase: "Frase que sueles repetirle a tus pacientes",
  fiveYearVision: "Dónde te gustaría estar en 5 años",
  mythToDebunk: "Mayor mito que quieres derribar",
  frequentQuestions: "Preguntas que te hacen SIEMPRE en consulta",
  curiosityTopic: "Procedimiento o tema que genera más curiosidad",
  
  // Step 8 - Historial de anuncios
  hasDoneAds: "¿Has hecho anuncios antes?",
  platforms: "Plataformas utilizadas",
  investmentAmount: "Cuánto invertías",
  results: "Qué resultados obtenías",
  bestFormats: "Formatos que conectaron mejor",
  whatDidntWork: "Qué definitivamente NO funcionó",
  
  // Common
  yes: "Sí",
  no: "No",
  add: "Agregar",
  remove: "Eliminar",
  other: "Otro",
  specify: "Especificar",
  required: "Requerido",
  optional: "Opcional",
  
  // Toast messages
  exportedSuccessfully: "Exportado exitosamente",
  savedSuccessfully: "Guardado exitosamente",
  submittedSuccessfully: "Enviado exitosamente",
  errorOccurred: "Ocurrió un error",
  exportError: "Error al exportar",
  exportOptions: "Opciones de exportación",
  generateScopeDraft: "Generar borrador de alcance",
  createViewLink: "Crear enlace de vista"
}

export const en: Translations = {
  // Header
  appTitle: "SAINT Brand Brief",
  appSubtitle: "Medical Brief Tool",
  
  // Navigation
  back: "Back",
  next: "Next",
  save: "Save",
  clear: "Clear",
  loadDraft: "Load draft",
  startFromTemplate: "Start with template",
  exportJSON: "Export JSON",
  exportPDF: "Export PDF",
  finish: "Finish",
  
  // Steps
  step1Title: "Client Data",
  step1Subtitle: "Contact information",
  step2Title: "General Information",
  step2Subtitle: "Dimensions and areas",
  step3Title: "Special Requirements",
  step3Subtitle: "Specific furniture",
  step4Title: "Furniture Preferences",
  step4Subtitle: "Design details",
  step5Title: "Style, Colors and Perception",
  step5Subtitle: "Project aesthetics",
  step6Title: "Desired Lighting",
  step6Subtitle: "Light preferences",
  step7Title: "Budget and Scope",
  step7Subtitle: "Investment range",
  summaryTitle: "Summary",
  summarySubtitle: "Final review",
  
  // Step 1 - Basic Information
  fullName: "Full name",
  preferredName: "Preferred name for communication",
  specialty: "Specialty",
  cities: "Cities where you practice",
  yearsExperience: "Years of experience",
  
  // Step 2 - Identity and Style
  perception: "How you want to be perceived (choose 3)",
  cercanoHumano: "Close and human",
  eleganteAspiracional: "Elegant and aspirational",
  innovadorTecnologico: "Innovative and technological",
  profesionalTecnico: "Professional technical",
  casualDirecto: "Casual and direct",
  whatNotAre: "What you are NOT as a doctor",
  philosophy: "Your philosophy as a doctor in one phrase",
  
  // Step 3 - Procedures and Business
  favoriteProcedures: "Favorite procedures (2-3 you enjoy most)",
  highValueServices: "High value or margin services",
  accessibleServices: "Accessible or 'hook' services",
  
  // Step 4 - Ideal Patient
  averageAge: "Average age of your ideal patient",
  predominantGender: "Predominant gender",
  mujer: "Female",
  hombre: "Male",
  ambos: "Both",
  commonFears: "Most common fears (up to 3)",
  
  // Step 5 - Differentiators
  whatMakesDifferent: "What makes you different",
  keyTechnologies: "Key technologies, techniques or certifications",
  
  // Step 6 - Marketing Goals
  mainObjective: "Main objective for the next 6 months",
  masConsultas: "More consultations",
  mejorReputacion: "Better reputation",
  nuevosServicios: "New services",
  expansionGeografica: "Geographic expansion",
  liderazgoOpinion: "Opinion leadership",
  monthlyNewConsultations: "New monthly consultations you'd like to generate",
  inspiringAccounts: "Doctors, brands or accounts that inspire you",
  
  // Step 7 - Storytelling
  whySpecialty: "Why you chose your specialty",
  markedCase: "Patient case that marked you",
  commonPhrase: "Phrase you usually repeat to your patients",
  fiveYearVision: "Where you'd like to be in 5 years",
  mythToDebunk: "Biggest myth you want to debunk",
  frequentQuestions: "Questions you're ALWAYS asked in consultation",
  curiosityTopic: "Procedure or topic that generates most curiosity",
  
  // Step 8 - Ad History
  hasDoneAds: "Have you done ads before?",
  platforms: "Platforms used",
  investmentAmount: "How much you invested",
  results: "What results you got",
  bestFormats: "Formats that connected best",
  whatDidntWork: "What definitely didn't work",
  
  // Common
  yes: "Yes",
  no: "No",
  add: "Add",
  remove: "Remove",
  other: "Other",
  specify: "Specify",
  required: "Required",
  optional: "Optional",
  
  // Toast messages
  exportedSuccessfully: "Exported successfully",
  savedSuccessfully: "Saved successfully",
  submittedSuccessfully: "Submitted successfully",
  errorOccurred: "An error occurred",
  exportError: "Export error",
  exportOptions: "Export options",
  generateScopeDraft: "Generate scope draft",
  createViewLink: "Create view link"
}

export function getTranslation(language: Language, key: keyof Translations): string {
  const translations = language === "es" ? es : en
  return translations[key] || key
}

export function useLanguage(): [Language, (lang: Language) => void] {
  const [language, setLanguage] = React.useState<Language>("es")
  
  React.useEffect(() => {
    const saved = localStorage.getItem("saint-language")
    if (saved && (saved === "es" || saved === "en")) {
      setLanguage(saved)
    }
  }, [])
  
  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("saint-language", lang)
  }
  
  return [language, changeLanguage]
}