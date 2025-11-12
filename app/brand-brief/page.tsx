"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Languages, 
  Download, 
  Trash2, 
  FileText, 
  Loader2,
  Heart,
  Stethoscope,
  Instagram
} from "lucide-react"
import { Stepper } from "@/components/brief/Stepper"
import { PreviewPane } from "@/components/brief/PreviewPane"
import { FormStep1 } from "@/components/brief/FormStep1"
import { FormStep2 } from "@/components/brief/FormStep2"
import FormStep3 from "@/components/brief/FormStep3"
import FormStep4 from "@/components/brief/FormStep4"
import FormStep5 from "@/components/brief/FormStep5"
import FormStep6 from "@/components/brief/FormStep6"
import FormStep7 from "@/components/brief/FormStep7"
import { ExportButtons } from "@/components/brief/ExportButtons"
import { 
  type BrandBrief, 
  type BasicInfo, 
  type GeneralInfo,
  type SpecialRequirements,
  type FurniturePreferences,
  type StyleColors,
  type Lighting,
  type Budget,
  brandBriefSchema,
  templateData 
} from "@/lib/schemas"
import { 
  createEmptyBrief, 
  saveToStorage, 
  loadFromStorage, 
  clearStorage,
  hasStoredData 
} from "@/lib/storage"
import { useLanguage, type Language, getTranslation } from "@/lib/i18n"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import Image from "next/image"

/*
 * SAINT Brand Brief - Herramienta de Brief Creativo para Diseño de Interiores
 * 
 * Formulario interactivo para recopilar información detallada
 * sobre proyectos de diseño de interiores.
 */

const TOTAL_STEPS = 7

export default function BrandBriefPage() {
  const [currentStep, setCurrentStep] = React.useState(1)
  const [briefData, setBriefData] = React.useState<BrandBrief>(createEmptyBrief())
  const [language, setLanguage] = useLanguage()
  const [isLoading, setIsLoading] = React.useState(false)
  const { toast } = useToast()

  // Cargar datos guardados al montar el componente
  React.useEffect(() => {
    const savedData = loadFromStorage()
    if (savedData) {
      setBriefData(savedData)
      toast({
        title: "Borrador cargado",
        description: "Se ha cargado tu borrador guardado anteriormente.",
      })
    }
  }, [toast])

  // Autoguardado
  React.useEffect(() => {
    if (currentStep > 1) {
      const timer = setTimeout(() => {
        saveToStorage(briefData)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [briefData, currentStep])

  const handleStepSubmit = (stepData: any, stepNumber: number) => {
    setBriefData(prev => ({
      ...prev,
      [`step${stepNumber}`]: stepData
    }))
  }

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSave = () => {
    const success = saveToStorage(briefData)
    if (success) {
      toast({
        title: "Guardado exitoso",
        description: "Tu brief ha sido guardado correctamente.",
      })
    } else {
      toast({
        title: "Error al guardar",
        description: "No se pudo guardar tu brief. Inténtalo de nuevo.",
        variant: "destructive",
      })
    }
  }

  const handleClear = () => {
    clearStorage()
    setBriefData(createEmptyBrief())
    setCurrentStep(1)
    toast({
      title: "Formulario limpiado",
      description: "Se ha limpiado todo el formulario.",
    })
  }

  const handleLoadDraft = () => {
    const savedData = loadFromStorage()
    if (savedData) {
      setBriefData(savedData)
      toast({
        title: "Borrador cargado",
        description: "Se ha cargado tu borrador guardado.",
      })
    } else {
      toast({
        title: "Sin borrador",
        description: "No se encontró ningún borrador guardado.",
        variant: "destructive",
      })
    }
  }

  const handleStartFromTemplate = () => {
    setBriefData(prev => ({
      ...prev,
      ...templateData
    }))
    toast({
      title: "Plantilla cargada",
      description: "Se ha cargado la plantilla con datos de ejemplo.",
    })
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <FormStep1
            data={briefData.step1}
            language={language}
            onSubmit={(data) => handleStepSubmit(data, 1)}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 2:
        return (
          <FormStep2
            data={briefData.step2}
            language={language}
            onSubmit={(data) => handleStepSubmit(data, 2)}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 3:
        return (
          <FormStep3
            data={briefData.step3}
            language={language}
            onSubmit={(data) => handleStepSubmit(data, 3)}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 4:
        return (
          <FormStep4
            data={briefData.step4}
            language={language}
            onSubmit={(data) => handleStepSubmit(data, 4)}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 5:
        return (
          <FormStep5
            data={briefData.step5}
            language={language}
            onSubmit={(data) => handleStepSubmit(data, 5)}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 6:
        return (
          <FormStep6
            data={briefData.step6}
            language={language}
            onSubmit={(data) => handleStepSubmit(data, 6)}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 7:
        return (
          <FormStep7
            data={briefData.step7}
            briefData={briefData}
            language={language}
            onSubmit={(data) => handleStepSubmit(data, 7)}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#CADCFF] to-[#C1FFDD] py-2 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <Image
                src="/saint-logo.png"
                alt="SAINT Logo"
                width={80}
                height={80}
                className="object-contain sm:w-[120px] sm:h-[120px]"
              />
            </Link>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(language === "es" ? "en" : "es")}
                className="border-black text-black hover:bg-black hover:text-white text-xs sm:text-sm px-2 sm:px-4"
              >
                <Languages className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                {language === "es" ? "EN" : "ES"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Stepper */}
      <div className="container mx-auto px-4 py-6">
        <Stepper 
          currentStep={currentStep} 
          totalSteps={TOTAL_STEPS}
          language={language}
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-4 sm:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Form Area */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {renderCurrentStep()}
            </AnimatePresence>
          </div>

          {/* Preview Sidebar - Hidden on mobile */}
          <div className="hidden lg:block lg:col-span-1">
            <PreviewPane 
              data={briefData} 
              language={language}
            />
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <footer className="bg-gray-50 py-4 sm:py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                variant="outline"
                onClick={handleClear}
                className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 text-xs sm:text-sm px-3 sm:px-4"
              >
                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                {getTranslation(language, "clear")}
              </Button>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <a
                href="https://www.instagram.com/sainttagency/?hl=es"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground hover:text-black transition-colors"
              >
                <Instagram className="h-3 w-3 sm:h-4 sm:w-4" />
                @sainttagency
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}