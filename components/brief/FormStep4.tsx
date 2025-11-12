"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sofa } from "lucide-react"
import { furniturePreferencesSchema, type FurniturePreferences } from "@/lib/schemas"
import { type Language, getTranslation } from "@/lib/i18n"

interface FormStep4Props {
  data: FurniturePreferences
  language: Language
  onSubmit: (data: FurniturePreferences) => void
  onNext: () => void
  onBack: () => void
}

export default function FormStep4({ data, language, onSubmit, onNext, onBack }: FormStep4Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<FurniturePreferences>({
    resolver: zodResolver(furniturePreferencesSchema),
    defaultValues: data,
    mode: "onChange"
  })

  const onFormSubmit = (formData: FurniturePreferences) => {
    onSubmit(formData)
    onNext()
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
            <Sofa className="h-5 w-5" />
            Preferencias de mobiliario
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-8">
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            {/* Tipo de escritorio */}
            <div className="space-y-2">
              <Label htmlFor="deskType" className="text-base font-medium">
                Tipo de escritorio deseado (forma, tamaño, materiales, nivel de privacidad) *
              </Label>
              <Textarea
                id="deskType"
                {...register("deskType")}
                placeholder="Ej: Escritorio moderno de madera, tamaño mediano, con privacidad"
                rows={3}
                className="w-full"
              />
              {errors.deskType && (
                <p className="text-sm text-red-500">{errors.deskType.message}</p>
              )}
            </div>

            {/* Tipo de sillas */}
            <div className="space-y-2">
              <Label htmlFor="chairType" className="text-base font-medium">
                Tipo de sillas o bancas preferidas *
              </Label>
              <Input
                id="chairType"
                {...register("chairType")}
                placeholder="Ej: Sillas ergonómicas, bancas modernas"
                className="w-full"
              />
              {errors.chairType && (
                <p className="text-sm text-red-500">{errors.chairType.message}</p>
              )}
            </div>

            {/* Almacenamiento */}
            <div className="space-y-2">
              <Label htmlFor="storageAmount" className="text-base font-medium">
                Cuánto almacenamiento necesitas *
              </Label>
              <Input
                id="storageAmount"
                {...register("storageAmount")}
                placeholder="Ej: Moderado, Abundante, Mínimo"
                className="w-full"
              />
              {errors.storageAmount && (
                <p className="text-sm text-red-500">{errors.storageAmount.message}</p>
              )}
            </div>

            {/* Tipo de gabinetes */}
            <div className="space-y-2">
              <Label htmlFor="cabinetType" className="text-base font-medium">
                Tipo de gabinetes o mobiliario mural (colgante, cerrado, abierto) *
              </Label>
              <Input
                id="cabinetType"
                {...register("cabinetType")}
                placeholder="Ej: Gabinetes colgantes, cerrados"
                className="w-full"
              />
              {errors.cabinetType && (
                <p className="text-sm text-red-500">{errors.cabinetType.message}</p>
              )}
            </div>

            {/* Altura o distribución */}
            <div className="space-y-2">
              <Label htmlFor="furnitureHeight" className="text-base font-medium">
                Altura o distribución preferida de los muebles (te puedes basar en tu altura) *
              </Label>
              <Input
                id="furnitureHeight"
                {...register("furnitureHeight")}
                placeholder="Ej: Altura estándar, distribución ergonómica"
                className="w-full"
              />
              {errors.furnitureHeight && (
                <p className="text-sm text-red-500">{errors.furnitureHeight.message}</p>
              )}
            </div>

            {/* Elementos a conservar */}
            <div className="space-y-2">
              <Label htmlFor="elementsToKeep" className="text-base font-medium">
                Elementos que desea conservar o reutilizar (si aplica)
              </Label>
              <Textarea
                id="elementsToKeep"
                {...register("elementsToKeep")}
                placeholder="Ej: Mesa de centro, lámpara vintage"
                rows={2}
                className="w-full"
              />
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
                disabled={!isValid}
                className="bg-black text-white hover:bg-gray-800"
              >
                {getTranslation(language, "next")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
