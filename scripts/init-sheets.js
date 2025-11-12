/**
 * Script para inicializar las columnas en Google Sheets
 * 
 * Uso: npm run init-sheets
 * 
 * Requiere que las variables de entorno estén configuradas en .env.local
 */

const fs = require('fs')
const path = require('path')
const { google } = require('googleapis')

// Cargar variables de entorno desde .env.local
function loadEnv() {
  const envPath = path.join(process.cwd(), '.env.local')
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8')
    envFile.split('\n').forEach(line => {
      const match = line.match(/^([^=:#]+)=(.*)$/)
      if (match) {
        const key = match[1].trim()
        let value = match[2].trim()
        // Remover comillas si existen
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1)
        }
        process.env[key] = value
      }
    })
  } else {
    console.warn('⚠️  Archivo .env.local no encontrado')
  }
}

loadEnv()

const GOOGLE_SHEETS_CONFIG = {
  SPREADSHEET_ID: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID || '',
  SHEET_NAME: 'Brief Saint Diseño',
}

const headers = [
  'Timestamp',
  'Nombre Completo',
  'Nombre Comercial',
  'Teléfono / WhatsApp',
  'Redes Sociales',
  'Metros Cuadrados',
  'Fecha Estimada',
  'Áreas a Trabajar',
  'Otra Área',
  'Necesita Camilla(s)',
  'Necesita Escritorio Médico',
  'Necesita Mueble para Lavabo',
  'Necesita Sillas',
  'Necesita Almacenamiento',
  'Otros Elementos',
  'Tipo de Escritorio',
  'Tipo de Sillas',
  'Cantidad de Almacenamiento',
  'Tipo de Gabinetes',
  'Altura o Distribución',
  'Elementos a Conservar',
  'Estilo Deseado',
  'Otro Estilo',
  'Colores Principales',
  'Colores a Evitar',
  'Materiales Preferidos',
  'Texturas Favoritas',
  'Percepción Deseada',
  'Ejemplos de Inspiración',
  'Logo o Identidad',
  'Preferencia de Iluminación',
  'Rango de Presupuesto'
]

async function initSheets() {
  try {
    console.log('🚀 Iniciando configuración de Google Sheets...\n')

    // Verificar configuración
    if (!GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID) {
      throw new Error('❌ NEXT_PUBLIC_GOOGLE_SHEETS_ID no está configurado en .env.local')
    }

    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      throw new Error('❌ GOOGLE_SERVICE_ACCOUNT_EMAIL o GOOGLE_PRIVATE_KEY no están configurados en .env.local')
    }

    console.log(`📊 ID de la hoja: ${GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID}`)
    console.log(`📋 Nombre de la hoja: ${GOOGLE_SHEETS_CONFIG.SHEET_NAME}\n`)

    // Configurar autenticación
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    // Verificar acceso a la hoja
    console.log('🔍 Verificando acceso a la hoja...')
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID,
    })
    console.log('✅ Acceso verificado\n')

    // Verificar si la hoja "Brand Briefs" existe
    const sheetExists = spreadsheet.data.sheets?.some(
      sheet => sheet.properties?.title === GOOGLE_SHEETS_CONFIG.SHEET_NAME
    )

    let sheetId

    if (!sheetExists) {
      console.log(`📝 Creando hoja "${GOOGLE_SHEETS_CONFIG.SHEET_NAME}"...`)
      const addSheetResponse = await sheets.spreadsheets.batchUpdate({
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
      sheetId = addSheetResponse.data.replies[0].addSheet.properties.sheetId
      console.log('✅ Hoja creada\n')
    } else {
      console.log(`✅ La hoja "${GOOGLE_SHEETS_CONFIG.SHEET_NAME}" ya existe\n`)
      const sheet = spreadsheet.data.sheets?.find(
        s => s.properties?.title === GOOGLE_SHEETS_CONFIG.SHEET_NAME
      )
      sheetId = sheet?.properties?.sheetId
    }

    // Escribir headers
    console.log('📝 Escribiendo headers...')
    await sheets.spreadsheets.values.update({
      spreadsheetId: GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID,
      range: `${GOOGLE_SHEETS_CONFIG.SHEET_NAME}!A1`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [headers],
      },
    })
    console.log(`✅ ${headers.length} columnas creadas\n`)

    // Formatear la primera fila
    if (sheetId !== null && sheetId !== undefined) {
      console.log('🎨 Formateando headers...')
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
      console.log('✅ Headers formateados (negrita y fondo azul)\n')
    }

    console.log('✨ ¡Configuración completada exitosamente!')
    console.log(`\n📊 Resumen:`)
    console.log(`   - Hoja: ${GOOGLE_SHEETS_CONFIG.SHEET_NAME}`)
    console.log(`   - Columnas: ${headers.length}`)
    console.log(`   - URL: https://docs.google.com/spreadsheets/d/${GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID}`)
    console.log(`\n⚠️  Nota: Si ya tenías la hoja con la columna "Equipo Médico Específico", puedes eliminarla manualmente desde Google Sheets.`)
    console.log(`\n💡 Asegúrate de compartir la hoja con: ${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL}`)

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    if (error.message.includes('Permission denied') || error.message.includes('permission')) {
      console.error('\n💡 Solución:')
      console.error(`   1. Comparte tu Google Sheets con: ${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL}`)
      console.error('   2. Dale permisos de "Editor"')
    } else if (error.message.includes('not found')) {
      console.error('\n💡 Solución:')
      console.error('   1. Verifica que el NEXT_PUBLIC_GOOGLE_SHEETS_ID sea correcto')
      console.error('   2. Asegúrate de que la hoja exista')
    }
    process.exit(1)
  }
}

// Ejecutar
initSheets()

