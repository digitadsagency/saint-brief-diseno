"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send, CheckCircle } from "lucide-react"
import { budgetSchema, type Budget, type BrandBrief } from "@/lib/schemas"
import { type Language, getTranslation } from "@/lib/i18n"
import { sendToGoogleSheets } from "@/lib/googleSheets"
import { sendEmailNotification } from "@/lib/email"
import { useState } from "react"

interface FormStep7Props {
  data: Budget
  briefData: BrandBrief
  language: Language
  onSubmit: (data: Budget) => void
  onNext: () => void
  onBack: () => void
}

export default function FormStep7({ data, briefData, language, onSubmit, onNext, onBack }: FormStep7Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<Budget>({
    resolver: zodResolver(budgetSchema),
    defaultValues: data,
    mode: "onChange"
  })

  const handleFormSubmit = async (formData: Budget) => {
    setIsSubmitting(true)
    
    try {
      // Actualizar el briefData con el último paso
      const completeBrief: BrandBrief = {
        ...briefData,
        step7: formData,
        status: "completed"
      }
      
      // Enviar a Google Sheets
      const sheetsResult = await sendToGoogleSheets(completeBrief)
      
      // Enviar notificación por correo
      const emailResult = await sendEmailNotification(completeBrief)
      
      if (sheetsResult.success) {
        console.log("Google Sheets:", sheetsResult.message)
        if (emailResult.success) {
          console.log("Email notification:", emailResult.message)
        } else {
          console.warn("Email notification failed:", emailResult.message)
        }
        
        onSubmit(formData)
        setIsSubmitted(true)
      } else {
        throw new Error(sheetsResult.message)
      }
      
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Hubo un error al enviar el formulario. Por favor, intenta de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center min-h-[400px]"
      >
        <Card className="w-full max-w-md bg-white border-gray-200 shadow-lg">
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-black mb-2">
              ¡Brief enviado exitosamente!
            </h2>
            <p className="text-gray-600 mb-6">
              Gracias! Todo esto nos permite llegar a un diseño que te guste. 
              A continuación nos pondremos en contacto contigo para agendar tu toma de medidas, 
              y con eso comenzar a trabajar en tu diseño.
            </p>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-black text-white hover:bg-gray-800"
            >
              Crear nuevo brief
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white border-gray-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-[#CADCFF] to-[#C1FFDD]">
          <CardTitle className="text-black flex items-center gap-2">
            <Send className="h-5 w-5" />
            Presupuesto y alcance
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-8">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Rango de inversión */}
            <div className="space-y-2">
              <Label htmlFor="budgetRange" className="text-base font-medium">
                ¿Cuál es el rango de inversión que planeas hacer? *
              </Label>
              <Textarea
                id="budgetRange"
                {...register("budgetRange")}
                placeholder="Ej: Entre $200,000 y $300,000 MXN"
                rows={3}
                className="w-full"
              />
              {errors.budgetRange && (
                <p className="text-sm text-red-500">{errors.budgetRange.message}</p>
              )}
            </div>

            {/* Disclaimer */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>*</strong> Trabajaremos dentro del presupuesto establecido; sin embargo, el costo final puede fluctuar hasta un 15% dependiendo de los materiales seleccionados y los ajustes del diseño.
              </p>
            </div>

            {/* Botones de Navegación */}
            <div className="flex justify-between pt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onBack}
                className="border-[#CADCFF] text-black hover:bg-[#CADCFF] hover:text-black"
              >
                {getTranslation(language, "back")}
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting || !isValid}
                className="bg-black text-white hover:bg-gray-800 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Enviar Brief
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
