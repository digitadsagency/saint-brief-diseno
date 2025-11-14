import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { BrandBrief } from '@/lib/schemas'

// Configuración de Google Sheets
const GOOGLE_SHEETS_CONFIG = {
  SPREADSHEET_ID: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID || '',
  SHEET_NAME: 'Brief Saint Diseño',
}

// Función para preparar los datos en formato de fila para Google Sheets
function prepareDataForSheets(briefData: BrandBrief): string[] {
  const timestamp = new Date().toLocaleString('es-ES')
  
  return [
    // Timestamp
    timestamp,
    
    // Paso 1 - Datos del cliente
    briefData.step1?.fullName || '',
    briefData.step1?.commercialName || '',
    briefData.step1?.phone || '',
    briefData.step1?.socialMedia || '',
    
    // Paso 2 - Información general
    briefData.step2?.squareMeters || '',
    briefData.step2?.estimatedDate || '',
    (briefData.step2?.areasToWork || []).join(', '),
    briefData.step2?.otherArea || '',
    
    // Paso 3 - Equipo médico a considerar
    briefData.step3?.medicalEquipment || '',
    
    // Paso 4 - Preferencias de mobiliario
    briefData.step4?.deskType === 'en_escuadra' ? 'En escuadra (esquinado)' :
    briefData.step4?.deskType === 'en_l' ? 'En L' :
    briefData.step4?.deskType === 'recto' ? 'Recto' :
    briefData.step4?.deskType === 'giratorio' ? 'Giratorio' :
    briefData.step4?.deskType === 'prefiero_propuesta' ? 'Prefiero que ustedes me propongan' :
    briefData.step4?.deskType || '',
    briefData.step4?.deskTypeSpecs || '',
    (briefData.step4?.specifications || []).join(', '),
    briefData.step4?.storageAmount || '',
    (briefData.step4?.cabinetType || []).join(', '),
    briefData.step4?.cabinetTypeOther || '',
    briefData.step4?.approximateHeight || '',
    briefData.step4?.elementsToKeep || '',
    
    // Paso 5 - Estilo, colores y percepción
    (briefData.step5?.desiredStyle || []).join(', '),
    briefData.step5?.otherStyle || '',
    briefData.step5?.mainColors || '',
    briefData.step5?.colorsToAvoid || '',
    briefData.step5?.favoriteTextures || '',
    briefData.step5?.desiredPerception || '',
    briefData.step5?.inspirationExamples || '',
    briefData.step5?.logoOrIdentity || '',
    
    // Paso 6 - Iluminación deseada
    briefData.step6?.lightingPreference === 'warm' ? 'Luz cálida' :
    briefData.step6?.lightingPreference === 'neutral' ? 'Luz neutra' :
    briefData.step6?.lightingPreference === 'cold' ? 'Luz fría' :
    briefData.step6?.lightingPreference || '',
    briefData.step6?.needsFocalLighting ? 'Sí' : 'No',
    briefData.step6?.focalLightingArea || '',
    
    // Paso 7 - Presupuesto y alcance
    briefData.step7?.budgetRange || ''
  ]
}

export async function POST(request: NextRequest) {
  try {
    // Verificar que tenemos el ID de la hoja
    if (!GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID) {
      return NextResponse.json(
        { success: false, message: 'Google Sheets ID no configurado' },
        { status: 500 }
      )
    }

    // Obtener los datos del request
    const briefData: BrandBrief = await request.json()
    
    // Preparar los datos para enviar
    const dataToSend = prepareDataForSheets(briefData)
    
    console.log('Datos preparados para Google Sheets:', dataToSend)
    console.log('ID de la hoja:', GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID)
    
    // Configurar autenticación con Service Account
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      return NextResponse.json(
        { success: false, message: 'Credenciales de Service Account no configuradas' },
        { status: 500 }
      )
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })
    
    // Verificar si la hoja existe y tiene headers
    let rangeResponse
    try {
      rangeResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID,
        range: `${GOOGLE_SHEETS_CONFIG.SHEET_NAME}!A1:AD1`,
      })
    } catch (error) {
      // Si la hoja no existe, crearla
      const spreadsheet = await sheets.spreadsheets.get({
        spreadsheetId: GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID,
      })

      const sheetExists = spreadsheet.data.sheets?.some(
        sheet => sheet.properties?.title === GOOGLE_SHEETS_CONFIG.SHEET_NAME
      )

      if (!sheetExists) {
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId: GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID,
          requestBody: {
            requests: [
              {
                addSheet: {
                  properties: {
                    title: GOOGLE_SHEETS_CONFIG.SHEET_NAME,
                  },
                },
              },
            ],
          },
        })
      }

      // Crear los headers
      const { getSheetHeaders } = await import('@/lib/googleSheets')
      const headers = getSheetHeaders()
      
      await sheets.spreadsheets.values.update({
        spreadsheetId: GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID,
        range: `${GOOGLE_SHEETS_CONFIG.SHEET_NAME}!A1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [headers],
        },
      })

      rangeResponse = { data: { values: [headers] } }
    }

    // Verificar si hay headers, si no, crearlos
    if (!rangeResponse.data.values || rangeResponse.data.values.length === 0) {
      const { getSheetHeaders } = await import('@/lib/googleSheets')
      const headers = getSheetHeaders()
      
      await sheets.spreadsheets.values.update({
        spreadsheetId: GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID,
        range: `${GOOGLE_SHEETS_CONFIG.SHEET_NAME}!A1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [headers],
        },
      })
    }
    
    // Obtener el rango actual para encontrar la siguiente fila vacía
    const allRowsResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID,
      range: `${GOOGLE_SHEETS_CONFIG.SHEET_NAME}!A:A`,
    })

    const nextRow = (allRowsResponse.data.values?.length || 0) + 1
    const appendRange = `${GOOGLE_SHEETS_CONFIG.SHEET_NAME}!A${nextRow}`
    
    console.log(`Escribiendo en fila ${nextRow}`)
    
    // Escribir los datos
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID,
      range: appendRange,
      valueInputOption: 'RAW',
      requestBody: {
        values: [dataToSend],
      },
    })

    console.log('Respuesta de Google Sheets:', response.data)
    
    return NextResponse.json({
      success: true,
      message: 'Datos enviados exitosamente a Google Sheets'
    })
    
  } catch (error) {
    console.error('Error enviando a Google Sheets:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Error desconocido' 
      },
      { status: 500 }
    )
  }
}
