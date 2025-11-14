import { type BrandBrief } from "./schemas"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

// Función para enviar a Google Sheets (simulada)
export async function sendToGoogleSheets(data: BrandBrief): Promise<boolean> {
  try {
    // Simular envío a Google Sheets
    console.log("Sending data to Google Sheets:", data)
    
    // Aquí se implementaría la integración real con Google Sheets API
    // const response = await fetch('/api/google-sheets', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // })
    
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return true
  } catch (error) {
    console.error("Error sending to Google Sheets:", error)
    throw error
  }
}

// Función para exportar a JSON (mantenida para uso interno)
export function exportToJSON(data: BrandBrief, filename?: string): void {
  try {
    const jsonString = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement("a")
    link.href = url
    link.download = filename || `saint-brand-brief-${data.id || Date.now()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    console.log("JSON exported successfully")
  } catch (error) {
    console.error("Error exporting JSON:", error)
    throw error
  }
}

// Función para exportar a PDF
export async function exportToPDF(
  data: BrandBrief, 
  elementId: string = "brand-brief-content",
  filename?: string
): Promise<void> {
  try {
    const element = document.getElementById(elementId)
    if (!element) {
      throw new Error("Element not found for PDF export")
    }
    
    // Crear canvas del elemento
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff"
    })
    
    // Crear PDF
    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF("p", "mm", "a4")
    
    const imgWidth = 210 // A4 width in mm
    const pageHeight = 295 // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight
    
    let position = 0
    
    // Agregar primera página
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
    
    // Agregar páginas adicionales si es necesario
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }
    
    // Descargar PDF
    pdf.save(filename || `saint-brand-brief-${data.id || Date.now()}.pdf`)
    
    console.log("PDF exported successfully")
  } catch (error) {
    console.error("Error exporting PDF:", error)
    throw error
  }
}

// Función para generar texto del Scope Draft
export function generateScopeDraft(data: BrandBrief, language: "es" | "en" = "es"): string {
  const t = language === "es" ? {
    title: "DRAFT DE ALCANCE - BRIEF CREATIVO DE DISEÑO DE INTERIORES",
    client: "Cliente",
    commercialName: "Nombre Comercial",
    phone: "Teléfono",
    squareMeters: "Metros Cuadrados",
    areas: "Áreas a Trabajar",
    style: "Estilo Deseado",
    colors: "Colores Principales",
    budget: "Rango de Presupuesto",
    timeline: "Timeline",
    deliverables: "Entregables",
    assumptions: "Supuestos",
    exclusions: "Exclusiones",
    contact: "Contacto"
  } : {
    title: "SCOPE DRAFT - INTERIOR DESIGN CREATIVE BRIEF",
    client: "Client",
    commercialName: "Commercial Name",
    phone: "Phone",
    squareMeters: "Square Meters",
    areas: "Areas to Work",
    style: "Desired Style",
    colors: "Main Colors",
    budget: "Budget Range",
    timeline: "Timeline",
    deliverables: "Deliverables",
    assumptions: "Assumptions",
    exclusions: "Exclusions",
    contact: "Contact"
  }
  
  const budgetRangeText = data.step7?.budgetRange === '120-180k' ? '$120,000 – $180,000' :
    data.step7?.budgetRange === '180-250k' ? '$180,000 – $250,000' :
    data.step7?.budgetRange === '250-330k' ? '$250,000 – $330,000' :
    data.step7?.budgetRange === '330k+' ? '+$330,000' : 'No especificado'
  
  const scopeDraft = `
${t.title}
=====================================

${t.client}: ${data.step1.fullName}
${t.commercialName}: ${data.step1.commercialName || "No especificado"}
${t.phone}: ${data.step1.phone || "No especificado"}
${t.squareMeters}: ${data.step2.squareMeters || "No especificado"} m²
${t.areas}: ${data.step2.areasToWork?.join(", ") || "No especificado"}
${t.style}: ${data.step5.desiredStyle?.join(", ") || "No especificado"}
${t.colors}: ${data.step5.mainColors || "No especificado"}
${t.budget}: ${budgetRangeText}

${t.deliverables}:
- Diseño conceptual del espacio
- Planos y layouts
- Especificaciones de mobiliario
- Paleta de colores y materiales
- Plan de iluminación
- Presupuesto detallado

${t.assumptions}:
- Cliente proporcionará medidas exactas del espacio
- Acceso al espacio para toma de medidas
- Aprobación de presupuesto según rango especificado
- Disponibilidad para reuniones de revisión

${t.exclusions}:
- Obra y construcción (solo diseño)
- Mobiliario y decoración (solo especificaciones)
- Permisos y trámites legales
- Instalaciones eléctricas y plomería (solo diseño)

${t.contact}:
Cliente: ${data.step1.fullName}
Teléfono: ${data.step1.phone || "No especificado"}
Redes Sociales: ${data.step1.socialMedia || "No especificado"}

---
Generado el: ${new Date().toLocaleDateString()}
ID Brief: ${data.id || "No especificado"}
  `.trim()
  
  return scopeDraft
}

// Función para exportar Scope Draft como texto
export function exportScopeDraft(data: BrandBrief, language: "es" | "en" = "es"): void {
  try {
    const scopeText = generateScopeDraft(data, language)
    const blob = new Blob([scopeText], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement("a")
    link.href = url
    link.download = `scope-draft-${data.step1.fullName?.replace(/\s+/g, "-") || "brief"}-${Date.now()}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    console.log("Scope draft exported successfully")
  } catch (error) {
    console.error("Error exporting scope draft:", error)
    throw error
  }
}

// Función para crear enlace de vista compartible
export function createViewLink(data: BrandBrief): string {
  try {
    // Serializar datos para URL
    const serializedData = btoa(JSON.stringify(data))
    const baseUrl = window.location.origin
    return `${baseUrl}/brand-brief/view?data=${encodeURIComponent(serializedData)}`
  } catch (error) {
    console.error("Error creating view link:", error)
    throw error
  }
}

// Función para copiar enlace al portapapeles
export async function copyViewLinkToClipboard(data: BrandBrief): Promise<boolean> {
  try {
    const viewLink = createViewLink(data)
    await navigator.clipboard.writeText(viewLink)
    console.log("View link copied to clipboard")
    return true
  } catch (error) {
    console.error("Error copying view link:", error)
    return false
  }
}

// Función para formatear datos para vista previa
export function formatDataForPreview(data: BrandBrief, language: "es" | "en" = "es"): Record<string, any> {
  return {
    id: data.id,
    timestamp: data.timestamp,
    status: data.status,
    step1: {
      fullName: data.step1.fullName,
      commercialName: data.step1.commercialName,
      phone: data.step1.phone,
      socialMedia: data.step1.socialMedia
    },
    step2: {
      squareMeters: data.step2.squareMeters,
      estimatedDate: data.step2.estimatedDate,
      areasToWork: data.step2.areasToWork,
      otherArea: data.step2.otherArea
    },
    step3: {
      medicalEquipment: data.step3.medicalEquipment
    },
    step4: {
      deskType: data.step4.deskType,
      deskTypeSpecs: data.step4.deskTypeSpecs,
      specifications: data.step4.specifications,
      storageAmount: data.step4.storageAmount,
      cabinetType: data.step4.cabinetType,
      cabinetTypeOther: data.step4.cabinetTypeOther,
      approximateHeight: data.step4.approximateHeight,
      elementsToKeep: data.step4.elementsToKeep
    },
    step5: {
      desiredStyle: data.step5.desiredStyle,
      otherStyle: data.step5.otherStyle,
      mainColors: data.step5.mainColors,
      colorsToAvoid: data.step5.colorsToAvoid,
      favoriteTextures: data.step5.favoriteTextures,
      desiredPerception: data.step5.desiredPerception,
      inspirationExamples: data.step5.inspirationExamples,
      logoOrIdentity: data.step5.logoOrIdentity
    },
    step6: {
      lightingPreference: data.step6.lightingPreference
    },
    step7: {
      budgetRange: data.step7.budgetRange
    }
  }
}
