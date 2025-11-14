import { BrandBrief } from './schemas'

// Función para enviar datos a Google Sheets usando nuestra API route
export async function sendToGoogleSheets(briefData: BrandBrief): Promise<{ success: boolean; message: string }> {
  try {
    console.log('Enviando datos a Google Sheets...')
    
    const response = await fetch('/api/send-to-sheets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(briefData),
    })

    const result = await response.json()
    
    if (response.ok && result.success) {
      console.log('Datos enviados exitosamente:', result.message)
      return {
        success: true,
        message: result.message
      }
    } else {
      console.error('Error enviando datos:', result.message)
      return {
        success: false,
        message: result.message || 'Error enviando datos a Google Sheets'
      }
    }
    
  } catch (error) {
    console.error('Error enviando a Google Sheets:', error)
    
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error desconocido'
    }
  }
}

// Función para obtener los headers de las columnas
export function getSheetHeaders(): string[] {
  return [
    'Timestamp',
    'Nombre Completo',
    'Nombre Comercial',
    'Teléfono / WhatsApp',
    'Redes Sociales',
    'Metros Cuadrados',
    'Fecha Estimada',
    'Áreas a Trabajar',
    'Otra Área',
    'Equipo Médico a Considerar',
    'Tipo de Escritorio',
    'Otras Especificaciones de Escritorio',
    'Especificaciones',
    'Cantidad de Almacenamiento',
    'Tipo de Gabinetes',
    'Tipo de Gabinetes (Otro)',
    'Altura Aproximada',
    'Elementos a Conservar',
    'Estilo Deseado',
    'Otro Estilo',
    'Colores Principales',
    'Colores a Evitar',
    'Texturas Favoritas',
    'Percepción Deseada',
    'Ejemplos de Inspiración',
    'Logo o Identidad',
    'Preferencia de Iluminación',
    'Rango de Presupuesto'
  ]
}
