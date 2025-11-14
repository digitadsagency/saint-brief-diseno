import { z } from "zod"

// Paso 1 - Datos del cliente
export const basicInfoSchema = z.object({
  fullName: z.string().min(1, "El nombre completo es requerido"),
  commercialName: z.string().optional(),
  phone: z.string().min(1, "El teléfono es requerido"),
  socialMedia: z.string().optional()
})

// Paso 2 - Información general
export const generalInfoSchema = z.object({
  squareMeters: z.string().min(1, "Los metros cuadrados son requeridos"),
  estimatedDate: z.enum(["asap", "2-3_months", "3-6_months"], {
    errorMap: () => ({ message: "Debes seleccionar una fecha estimada" })
  }),
  areasToWork: z.array(z.string()).min(1, "Debes seleccionar al menos un área a trabajar"),
  otherArea: z.string().optional()
})

// Paso 3 - Equipo médico a considerar
export const specialRequirementsSchema = z.object({
  medicalEquipment: z.string().optional()
})

// Paso 4 - Preferencias de mobiliario
export const furniturePreferencesSchema = z.object({
  deskType: z.enum(["en_escuadra", "en_l", "recto", "giratorio", "prefiero_propuesta"], {
    errorMap: () => ({ message: "Debes seleccionar un tipo de escritorio" })
  }),
  deskTypeSpecs: z.string().optional(),
  specifications: z.array(z.string()).optional(),
  storageAmount: z.string().min(1, "La cantidad de almacenamiento es requerida"),
  cabinetType: z.array(z.string()).min(1, "Debes seleccionar al menos un tipo de gabinete"),
  cabinetTypeOther: z.string().optional(),
  approximateHeight: z.string().min(1, "Tu altura aproximada es requerida"),
  elementsToKeep: z.string().optional()
})

// Paso 5 - Estilo, colores y percepción
export const styleColorsSchema = z.object({
  desiredStyle: z.array(z.string()).min(1, "Debes seleccionar al menos un estilo"),
  otherStyle: z.string().optional(),
  mainColors: z.string().min(1, "Los colores principales son requeridos"),
  colorsToAvoid: z.string().optional(),
  favoriteTextures: z.string().optional(),
  desiredPerception: z.string().min(1, "La percepción deseada es requerida"),
  inspirationExamples: z.string().optional(),
  logoOrIdentity: z.string().optional()
})

// Paso 6 - Iluminación deseada
export const lightingSchema = z.object({
  lightingPreference: z.enum(["warm", "neutral", "cold"], {
    errorMap: () => ({ message: "Debes seleccionar una preferencia de iluminación" })
  })
})

// Paso 7 - Presupuesto y alcance
export const budgetSchema = z.object({
  budgetRange: z.enum(["120-180k", "180-250k", "250-330k", "330k+"], {
    errorMap: () => ({ message: "Debes seleccionar un rango de presupuesto" })
  })
})

// Esquema maestro
export const brandBriefSchema = z.object({
  id: z.string().uuid().optional(),
  timestamp: z.date().default(() => new Date()),
  step1: basicInfoSchema,
  step2: generalInfoSchema,
  step3: specialRequirementsSchema,
  step4: furniturePreferencesSchema,
  step5: styleColorsSchema,
  step6: lightingSchema,
  step7: budgetSchema,
  status: z.enum(["draft", "completed"]).default("draft")
})

export type BrandBrief = z.infer<typeof brandBriefSchema>
export type BasicInfo = z.infer<typeof basicInfoSchema>
export type GeneralInfo = z.infer<typeof generalInfoSchema>
export type SpecialRequirements = z.infer<typeof specialRequirementsSchema>
export type FurniturePreferences = z.infer<typeof furniturePreferencesSchema>
export type StyleColors = z.infer<typeof styleColorsSchema>
export type Lighting = z.infer<typeof lightingSchema>
export type Budget = z.infer<typeof budgetSchema>

// Esquemas para validación por paso
export const stepSchemas = {
  1: basicInfoSchema,
  2: generalInfoSchema,
  3: specialRequirementsSchema,
  4: furniturePreferencesSchema,
  5: styleColorsSchema,
  6: lightingSchema,
  7: budgetSchema
} as const

// Datos de ejemplo para plantilla
export const templateData: Partial<BrandBrief> = {
  step1: {
    fullName: "Cliente Ejemplo",
    commercialName: "Espacio Diseño",
    phone: "+52 55 1234 5678",
    socialMedia: "@espaciodiseno"
  },
  step2: {
    squareMeters: "80",
    estimatedDate: "2-3_months",
    areasToWork: ["Recepción", "Sala de espera"],
    otherArea: ""
  },
  step3: {
    medicalEquipment: "Televisión, camilla, mesa de Mayo, sillas de exploración, ultrasonido…"
  },
  step4: {
    deskType: "en_l",
    deskTypeSpecs: "Necesito un escritorio con privacidad, con cajones…",
    specifications: ["Almacenamiento cerca de mi escritorio", "Archivero o cajonera con llave"],
    storageAmount: "Moderado",
    cabinetType: ["Colgante", "Cerrado"],
    cabinetTypeOther: "",
    approximateHeight: "1.70 m",
    elementsToKeep: ""
  },
  step5: {
    desiredStyle: ["Minimalista", "Contemporáneo"],
    otherStyle: "",
    mainColors: "Blanco, gris, beige",
    colorsToAvoid: "Colores muy oscuros",
    favoriteTextures: "Mate, natural",
    desiredPerception: "Limpio, moderno, cálido",
    inspirationExamples: "https://pinterest.com/ejemplo",
    logoOrIdentity: ""
  },
  step6: {
    lightingPreference: "neutral"
  },
  step7: {
    budgetRange: "180-250k"
  }
}