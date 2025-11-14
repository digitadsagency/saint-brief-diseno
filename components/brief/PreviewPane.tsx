"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { type BrandBrief } from "@/lib/schemas"
import { type Language, getTranslation } from "@/lib/i18n"

interface PreviewPaneProps {
  data: BrandBrief
  language: Language
}

export function PreviewPane({ data, language }: PreviewPaneProps) {
  const formatDataForPreview = (data: BrandBrief) => {
    return {
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
        chairType: data.step4.chairType,
        storageAmount: data.step4.storageAmount,
        cabinetType: data.step4.cabinetType,
        furnitureHeight: data.step4.furnitureHeight,
        elementsToKeep: data.step4.elementsToKeep
      },
      step5: {
        desiredStyle: data.step5.desiredStyle,
        otherStyle: data.step5.otherStyle,
        mainColors: data.step5.mainColors,
        colorsToAvoid: data.step5.colorsToAvoid,
        preferredMaterials: data.step5.preferredMaterials,
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

  const previewData = formatDataForPreview(data)

  return (
    <Card className="h-fit sticky top-4 bg-white border-gray-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-[#CADCFF] to-[#C1FFDD]">
        <CardTitle className="flex items-center gap-2 text-black">
          <div className="w-2 h-2 bg-black rounded-full" />
          {getTranslation(language, "summaryTitle")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Información básica */}
        {previewData.step1.fullName && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-gray-700">Datos del cliente</h4>
            <div className="space-y-1">
              <p className="text-sm"><strong>Nombre:</strong> {previewData.step1.fullName}</p>
              {previewData.step1.commercialName && (
                <p className="text-sm"><strong>Nombre Comercial:</strong> {previewData.step1.commercialName}</p>
              )}
              {previewData.step1.phone && (
                <p className="text-sm"><strong>Teléfono:</strong> {previewData.step1.phone}</p>
              )}
              {previewData.step1.socialMedia && (
                <p className="text-sm"><strong>Redes Sociales:</strong> {previewData.step1.socialMedia}</p>
              )}
            </div>
          </div>
        )}

        {/* Información general */}
        {previewData.step2.squareMeters && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-gray-700">Información general</h4>
            <div className="space-y-1">
              <p className="text-sm"><strong>Metros Cuadrados:</strong> {previewData.step2.squareMeters} m²</p>
              {previewData.step2.estimatedDate && (
                <p className="text-sm"><strong>Fecha Estimada:</strong> {
                  previewData.step2.estimatedDate === 'asap' ? 'Lo más pronto posible' :
                  previewData.step2.estimatedDate === '2-3_months' ? 'De 2 a 3 meses' :
                  previewData.step2.estimatedDate === '3-6_months' ? 'De 3 a 6 meses' : previewData.step2.estimatedDate
                }</p>
              )}
              {previewData.step2.areasToWork.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {previewData.step2.areasToWork.map((area, index) => (
                    <Badge key={index} className="text-xs bg-[#CADCFF] text-black border-[#CADCFF]">
                      {area}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Equipo médico a considerar */}
        {previewData.step3.medicalEquipment && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-gray-700">Equipo médico a considerar</h4>
            <p className="text-sm">{previewData.step3.medicalEquipment}</p>
          </div>
        )}

        {/* Estilo deseado */}
        {previewData.step5.desiredStyle.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-gray-700">Estilo deseado</h4>
            <div className="flex flex-wrap gap-1">
              {previewData.step5.desiredStyle.map((style, index) => (
                <Badge key={index} className="text-xs bg-[#C1FFDD] text-black border-[#C1FFDD]">
                  {style}
                </Badge>
              ))}
            </div>
            {previewData.step5.mainColors && (
              <p className="text-sm"><strong>Colores:</strong> {previewData.step5.mainColors}</p>
            )}
          </div>
        )}

        {/* Presupuesto - Solo mostrar si el brief está completado */}
        {data.status === "completed" && previewData.step7.budgetRange && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-gray-700">Presupuesto</h4>
            <p className="text-sm">
              <strong>Rango:</strong> {
                previewData.step7.budgetRange === '120-180k' ? '$120,000 – $180,000' :
                previewData.step7.budgetRange === '180-250k' ? '$180,000 – $250,000' :
                previewData.step7.budgetRange === '250-330k' ? '$250,000 – $330,000' :
                previewData.step7.budgetRange === '330k+' ? '+$330,000' : previewData.step7.budgetRange
              }
            </p>
          </div>
        )}

        {/* Estado del formulario */}
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Estado:</span>
            <Badge className="bg-[#CADCFF] text-black border-[#CADCFF]">
              {data.status === "draft" ? "Borrador" : "Completado"}
            </Badge>
          </div>
          {data.timestamp && (
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-gray-600">Última actualización:</span>
              <span className="text-gray-500">
                {new Date(data.timestamp).toLocaleDateString(language === "es" ? "es-ES" : "en-US")}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
