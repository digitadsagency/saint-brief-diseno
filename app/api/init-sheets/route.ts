import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { getSheetHeaders } from '@/lib/googleSheets'

// Configuración de Google Sheets
const GOOGLE_SHEETS_CONFIG = {
  SPREADSHEET_ID: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID || '',
  SHEET_NAME: 'Brief Saint Diseño',
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

    // Obtener los headers
    const headers = getSheetHeaders()

    // Verificar si la hoja existe, si no, crearla
    try {
      await sheets.spreadsheets.get({
        spreadsheetId: GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID,
      })
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'No se pudo acceder a la hoja. Verifica el ID y los permisos.' },
        { status: 500 }
      )
    }

    // Verificar si la hoja "Brand Briefs" existe
    try {
      const spreadsheet = await sheets.spreadsheets.get({
        spreadsheetId: GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID,
      })

      const sheetExists = spreadsheet.data.sheets?.some(
        sheet => sheet.properties?.title === GOOGLE_SHEETS_CONFIG.SHEET_NAME
      )

      // Si la hoja no existe, crearla
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
    } catch (error) {
      console.error('Error verificando/creando la hoja:', error)
    }

    // Escribir los headers en la primera fila
    const headerRange = `${GOOGLE_SHEETS_CONFIG.SHEET_NAME}!A1`
    
    await sheets.spreadsheets.values.update({
      spreadsheetId: GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID,
      range: headerRange,
      valueInputOption: 'RAW',
      requestBody: {
        values: [headers],
      },
    })

    // Formatear la primera fila (headers) con negrita y fondo
    const sheetId = await getSheetId(sheets, GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID, GOOGLE_SHEETS_CONFIG.SHEET_NAME)
    
    if (sheetId !== null) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID,
        requestBody: {
          requests: [
            {
              repeatCell: {
                range: {
                  sheetId: sheetId,
                  startRowIndex: 0,
                  endRowIndex: 1,
                },
                cell: {
                  userEnteredFormat: {
                    backgroundColor: {
                      red: 0.79,
                      green: 0.86,
                      blue: 1.0,
                    },
                    textFormat: {
                      bold: true,
                    },
                  },
                },
                fields: 'userEnteredFormat(backgroundColor,textFormat)',
              },
            },
            // Congelar la primera fila
            {
              updateSheetProperties: {
                properties: {
                  sheetId: sheetId,
                  gridProperties: {
                    frozenRowCount: 1,
                  },
                },
                fields: 'gridProperties.frozenRowCount',
              },
            },
          ],
        },
      })
    }

    return NextResponse.json({
      success: true,
      message: `Columnas inicializadas exitosamente. Se crearon ${headers.length} columnas.`,
      columns: headers.length,
    })
    
  } catch (error) {
    console.error('Error inicializando Google Sheets:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Error desconocido inicializando Google Sheets' 
      },
      { status: 500 }
    )
  }
}

// Función auxiliar para obtener el ID de la hoja
async function getSheetId(
  sheets: any,
  spreadsheetId: string,
  sheetName: string
): Promise<number | null> {
  try {
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId,
    })

    const sheet = spreadsheet.data.sheets?.find(
      (s: any) => s.properties?.title === sheetName
    )

    return sheet?.properties?.sheetId || null
  } catch (error) {
    console.error('Error obteniendo sheet ID:', error)
    return null
  }
}

