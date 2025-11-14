import { NextRequest, NextResponse } from 'next/server'
import { BrandBrief } from '@/lib/schemas'
const nodemailer = require('nodemailer')

// Función para crear el HTML del correo
function createEmailHTML(briefData: BrandBrief): string {
  const timestamp = new Date().toLocaleString('es-ES')
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Nuevo Brief Creativo de Diseño de Interiores</title>
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #2c3e50; margin: 0; padding: 0; background: #ffffff; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #CADCFF 0%, #C1FFDD 100%); padding: 30px; margin-bottom: 30px; text-align: center; border-bottom: 4px solid #CADCFF; }
        .header h1 { color: #2c3e50; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: 1px; }
        .header p { color: #2c3e50; margin: 10px 0 0 0; font-size: 14px; opacity: 0.8; }
        .section { margin-bottom: 25px; padding: 25px; background: #ffffff; border: 1px solid #e8f4fd; border-left: 4px solid #CADCFF; }
        .section h2 { color: #2c3e50; margin-top: 0; font-size: 18px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #e8f4fd; padding-bottom: 10px; }
        .field { margin-bottom: 15px; padding: 15px; background: #f8f9fa; border-left: 3px solid #CADCFF; }
        .field strong { color: #2c3e50; font-weight: 600; }
        .highlight { background: linear-gradient(135deg, #f8f9fa 0%, #e8f4fd 100%); padding: 25px; border: 1px solid #CADCFF; margin: 25px 0; }
        .footer { text-align: center; margin-top: 40px; padding: 25px; background: linear-gradient(135deg, #f8f9fa 0%, #e8f4fd 100%); border-top: 2px solid #CADCFF; }
        .badge { display: inline-block; background: linear-gradient(135deg, #CADCFF 0%, #C1FFDD 100%); color: #2c3e50; padding: 4px 8px; font-size: 11px; font-weight: 500; margin: 2px; text-transform: uppercase; letter-spacing: 0.5px; border: 1px solid #CADCFF; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0; }
        .stat-card { background: #ffffff; padding: 20px; border: 1px solid #CADCFF; text-align: center; }
        .stat-number { font-size: 20px; font-weight: 600; color: #2c3e50; }
        .stat-label { font-size: 12px; color: #6c757d; margin-top: 5px; text-transform: uppercase; letter-spacing: 0.5px; }
        .divider { height: 1px; background: linear-gradient(90deg, #CADCFF 0%, #C1FFDD 100%); margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>NUEVO BRIEF CREATIVO DE DISEÑO DE INTERIORES</h1>
          <p>Fecha: ${timestamp}</p>
        </div>

        <div class="highlight">
          <h3 style="margin-top: 0; color: #2c3e50; text-transform: uppercase; letter-spacing: 0.5px; font-size: 16px;">RESUMEN DEL CLIENTE</h3>
          <div class="stats">
            <div class="stat-card">
              <div class="stat-number">${briefData.step1?.fullName || 'N/A'}</div>
              <div class="stat-label">Nombre Completo</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">${briefData.step2?.squareMeters || 'N/A'} m²</div>
              <div class="stat-label">Metros Cuadrados</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">${briefData.step7?.budgetRange || 'N/A'}</div>
              <div class="stat-label">Rango de Presupuesto</div>
            </div>
          </div>
          <div class="divider"></div>
          <p><strong>Nombre Comercial:</strong> ${briefData.step1?.commercialName || 'No especificado'}</p>
          <p><strong>Teléfono:</strong> ${briefData.step1?.phone || 'No especificado'}</p>
          <p><strong>Redes Sociales:</strong> ${briefData.step1?.socialMedia || 'No especificadas'}</p>
        </div>

        <div class="section">
          <h2>INFORMACIÓN GENERAL</h2>
          <div class="field"><strong>Metros Cuadrados:</strong> ${briefData.step2?.squareMeters || 'No especificado'} m²</div>
          <div class="field"><strong>Fecha Estimada:</strong> ${briefData.step2?.estimatedDate === 'asap' ? 'Lo más pronto posible' : briefData.step2?.estimatedDate === '2-3_months' ? 'De 2 a 3 meses' : briefData.step2?.estimatedDate === '3-6_months' ? 'De 3 a 6 meses' : 'No especificada'}</div>
          <div class="field"><strong>Áreas a Trabajar:</strong> ${(briefData.step2?.areasToWork || []).join(', ') || 'No especificadas'}</div>
          ${briefData.step2?.otherArea ? `<div class="field"><strong>Otra Área:</strong> ${briefData.step2.otherArea}</div>` : ''}
        </div>

        <div class="section">
          <h2>EQUIPO MÉDICO A CONSIDERAR</h2>
          <div class="field">${briefData.step3?.medicalEquipment || 'No especificado'}</div>
        </div>

        <div class="section">
          <h2>PREFERENCIAS DE MOBILIARIO</h2>
          <div class="field"><strong>Tipo de Escritorio:</strong> ${
            briefData.step4?.deskType === 'en_escuadra' ? 'En escuadra (esquinado)' :
            briefData.step4?.deskType === 'en_l' ? 'En L' :
            briefData.step4?.deskType === 'recto' ? 'Recto' :
            briefData.step4?.deskType === 'giratorio' ? 'Giratorio' :
            briefData.step4?.deskType === 'prefiero_propuesta' ? 'Prefiero que ustedes me propongan' :
            briefData.step4?.deskType || 'No especificado'
          }</div>
          ${briefData.step4?.deskTypeSpecs ? `<div class="field"><strong>Otras Especificaciones:</strong> ${briefData.step4.deskTypeSpecs}</div>` : ''}
          ${(briefData.step4?.specifications || []).length > 0 ? `<div class="field"><strong>Especificaciones:</strong> ${(briefData.step4.specifications || []).join(', ')}</div>` : ''}
          <div class="field"><strong>Cantidad de Almacenamiento:</strong> ${briefData.step4?.storageAmount || 'No especificado'}</div>
          <div class="field"><strong>Tipo de Gabinetes:</strong> ${(briefData.step4?.cabinetType || []).join(', ') || 'No especificado'}${briefData.step4?.cabinetTypeOther ? ` (${briefData.step4.cabinetTypeOther})` : ''}</div>
          <div class="field"><strong>Altura Aproximada:</strong> ${briefData.step4?.approximateHeight || 'No especificado'}</div>
          ${briefData.step4?.elementsToKeep ? `<div class="field"><strong>Elementos a Conservar:</strong> ${briefData.step4.elementsToKeep}</div>` : ''}
        </div>

        <div class="section">
          <h2>ESTILO, COLORES Y PERCEPCIÓN</h2>
          <div class="field"><strong>Estilo Deseado:</strong> ${(briefData.step5?.desiredStyle || []).map(s => `<span class="badge">${s}</span>`).join(' ')}</div>
          ${briefData.step5?.otherStyle ? `<div class="field"><strong>Otro Estilo:</strong> ${briefData.step5.otherStyle}</div>` : ''}
          <div class="field"><strong>Colores Principales:</strong> ${briefData.step5?.mainColors || 'No especificados'}</div>
          ${briefData.step5?.colorsToAvoid ? `<div class="field"><strong>Colores a Evitar:</strong> ${briefData.step5.colorsToAvoid}</div>` : ''}
          ${briefData.step5?.favoriteTextures ? `<div class="field"><strong>Texturas Favoritas:</strong> ${briefData.step5.favoriteTextures}</div>` : ''}
          <div class="field"><strong>Percepción Deseada:</strong> ${briefData.step5?.desiredPerception || 'No especificada'}</div>
          ${briefData.step5?.inspirationExamples ? `<div class="field"><strong>Ejemplos de Inspiración:</strong> ${briefData.step5.inspirationExamples}</div>` : ''}
          ${briefData.step5?.logoOrIdentity ? `<div class="field"><strong>Logo o Identidad:</strong> ${briefData.step5.logoOrIdentity}</div>` : ''}
        </div>

        <div class="section">
          <h2>ILUMINACIÓN DESEADA</h2>
          <div class="field"><strong>Preferencia:</strong> ${briefData.step6?.lightingPreference === 'warm' ? 'Luz cálida' : briefData.step6?.lightingPreference === 'neutral' ? 'Luz neutra' : briefData.step6?.lightingPreference === 'cold' ? 'Luz fría' : 'No especificada'}</div>
          <div class="field"><strong>¿Necesita Iluminación Focal?</strong> ${briefData.step6?.needsFocalLighting ? 'Sí' : 'No'}</div>
          ${briefData.step6?.focalLightingArea ? `<div class="field"><strong>¿En qué área?</strong> ${briefData.step6.focalLightingArea}</div>` : ''}
        </div>

        <div class="section">
          <h2>PRESUPUESTO Y ALCANCE</h2>
          <div class="field"><strong>Rango de Inversión:</strong> ${briefData.step7?.budgetRange || 'No especificado'}</div>
        </div>

        <div class="footer">
          <p><strong>SAINT Agency</strong> - Brief Creativo de Diseño de Interiores</p>
          <p>Este correo fue generado automáticamente cuando se completó un nuevo brief creativo.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

// Función para crear el texto plano del correo
function createEmailText(briefData: BrandBrief): string {
  const timestamp = new Date().toLocaleString('es-ES')
  
  return `
NUEVO BRIEF CREATIVO DE DISEÑO DE INTERIORES
Fecha: ${timestamp}

RESUMEN DEL CLIENTE:
- Nombre: ${briefData.step1?.fullName || 'No especificado'}
- Nombre Comercial: ${briefData.step1?.commercialName || 'No especificado'}
- Teléfono: ${briefData.step1?.phone || 'No especificado'}
- Redes Sociales: ${briefData.step1?.socialMedia || 'No especificadas'}
- Metros Cuadrados: ${briefData.step2?.squareMeters || 'No especificado'} m²
- Rango de Presupuesto: ${briefData.step7?.budgetRange || 'No especificado'}

INFORMACIÓN GENERAL:
- Metros Cuadrados: ${briefData.step2?.squareMeters || 'No especificado'} m²
- Fecha Estimada: ${briefData.step2?.estimatedDate === 'asap' ? 'Lo más pronto posible' : briefData.step2?.estimatedDate === '2-3_months' ? 'De 2 a 3 meses' : briefData.step2?.estimatedDate === '3-6_months' ? 'De 3 a 6 meses' : 'No especificada'}
- Áreas a Trabajar: ${(briefData.step2?.areasToWork || []).join(', ') || 'No especificadas'}
${briefData.step2?.otherArea ? `- Otra Área: ${briefData.step2.otherArea}` : ''}

EQUIPO MÉDICO A CONSIDERAR:
${briefData.step3?.medicalEquipment || 'No especificado'}

PREFERENCIAS DE MOBILIARIO:
- Tipo de Escritorio: ${
  briefData.step4?.deskType === 'en_escuadra' ? 'En escuadra (esquinado)' :
  briefData.step4?.deskType === 'en_l' ? 'En L' :
  briefData.step4?.deskType === 'recto' ? 'Recto' :
  briefData.step4?.deskType === 'giratorio' ? 'Giratorio' :
  briefData.step4?.deskType === 'prefiero_propuesta' ? 'Prefiero que ustedes me propongan' :
  briefData.step4?.deskType || 'No especificado'
}
${briefData.step4?.deskTypeSpecs ? `- Otras Especificaciones: ${briefData.step4.deskTypeSpecs}` : ''}
${(briefData.step4?.specifications || []).length > 0 ? `- Especificaciones: ${(briefData.step4.specifications || []).join(', ')}` : ''}
- Cantidad de Almacenamiento: ${briefData.step4?.storageAmount || 'No especificado'}
- Tipo de Gabinetes: ${(briefData.step4?.cabinetType || []).join(', ') || 'No especificado'}${briefData.step4?.cabinetTypeOther ? ` (${briefData.step4.cabinetTypeOther})` : ''}
- Altura Aproximada: ${briefData.step4?.approximateHeight || 'No especificado'}
${briefData.step4?.elementsToKeep ? `- Elementos a Conservar: ${briefData.step4.elementsToKeep}` : ''}

ESTILO, COLORES Y PERCEPCIÓN:
- Estilo Deseado: ${(briefData.step5?.desiredStyle || []).join(', ') || 'No especificado'}
${briefData.step5?.otherStyle ? `- Otro Estilo: ${briefData.step5.otherStyle}` : ''}
- Colores Principales: ${briefData.step5?.mainColors || 'No especificados'}
${briefData.step5?.colorsToAvoid ? `- Colores a Evitar: ${briefData.step5.colorsToAvoid}` : ''}
${briefData.step5?.favoriteTextures ? `- Texturas Favoritas: ${briefData.step5.favoriteTextures}` : ''}
- Percepción Deseada: ${briefData.step5?.desiredPerception || 'No especificada'}
${briefData.step5?.inspirationExamples ? `- Ejemplos de Inspiración: ${briefData.step5.inspirationExamples}` : ''}
${briefData.step5?.logoOrIdentity ? `- Logo o Identidad: ${briefData.step5.logoOrIdentity}` : ''}

ILUMINACIÓN DESEADA:
- Preferencia: ${briefData.step6?.lightingPreference === 'warm' ? 'Luz cálida' : briefData.step6?.lightingPreference === 'neutral' ? 'Luz neutra' : briefData.step6?.lightingPreference === 'cold' ? 'Luz fría' : 'No especificada'}
- ¿Necesita Iluminación Focal? ${briefData.step6?.needsFocalLighting ? 'Sí' : 'No'}
${briefData.step6?.focalLightingArea ? `- ¿En qué área? ${briefData.step6.focalLightingArea}` : ''}

PRESUPUESTO Y ALCANCE:
- Rango de Inversión: ${briefData.step7?.budgetRange || 'No especificado'}

---
SAINT Agency - Brief Creativo de Diseño de Interiores
Este correo fue generado automáticamente cuando se completó un nuevo brief creativo.
  `
}

export async function POST(request: NextRequest) {
  try {
    // Verificar que tenemos las credenciales de email
    if (!process.env.GMAIL_EMAIL || !process.env.GMAIL_APP_PASSWORD) {
      return NextResponse.json(
        { success: false, message: 'Credenciales de email no configuradas' },
        { status: 500 }
      )
    }

    // Obtener los datos del request
    const briefData: BrandBrief = await request.json()
    
    // Crear el transporter de nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    })

    // Configurar el correo
    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: 'contacto@saintagency.com.mx, paolaloya16@gmail.com', // Enviar a ambos correos
      subject: `Nuevo Brief Creativo - ${briefData.step1?.fullName || 'Cliente'} (${briefData.step2?.squareMeters || 'N/A'} m²)`,
      text: createEmailText(briefData),
      html: createEmailHTML(briefData)
    }

    // Enviar el correo
    const info = await transporter.sendMail(mailOptions)
    
    console.log('Correo enviado exitosamente:', info.messageId)
    
    return NextResponse.json({
      success: true,
      message: 'Correo enviado exitosamente',
      messageId: info.messageId
    })
    
  } catch (error) {
    console.error('Error enviando correo:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Error desconocido enviando correo' 
      },
      { status: 500 }
    )
  }
}
