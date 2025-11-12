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
import { Checkbox } from "@/components/ui/checkbox"
import { Package } from "lucide-react"
import { specialRequirementsSchema, type SpecialRequirements } from "@/lib/schemas"
import { type Language, getTranslation } from "@/lib/i18n"

interface FormStep3Props {
  data: SpecialRequirements
  language: Language
  onSubmit: (data: SpecialRequirements) => void
  onNext: () => void
  onBack: () => void
}

export default function FormStep3({ data, language, onSubmit, onNext, onBack }: FormStep3Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid }
  } = useForm<SpecialRequirements>({
    resolver: zodResolver(specialRequirementsSchema),
    defaultValues: data,
    mode: "onChange"
  })

  const watchedValues = watch()

  const onFormSubmit = (formData: SpecialRequirements) => {
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
            <Package className="h-5 w-5" />
            Requerimientos especiales
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-8">
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            <p className="text-sm text-muted-foreground mb-4">
              Selecciona o especifica lo que debe incluir el diseño
            </p>

            {/* Checkboxes para requerimientos */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="needsExamTable"
                  checked={watchedValues.needsExamTable}
                  onCheckedChange={(checked) => setValue("needsExamTable", !!checked)}
                />
                <Label htmlFor="needsExamTable" className="font-normal cursor-pointer">
                  Camilla(s)
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="needsMedicalDesk"
                  checked={watchedValues.needsMedicalDesk}
                  onCheckedChange={(checked) => setValue("needsMedicalDesk", !!checked)}
                />
                <Label htmlFor="needsMedicalDesk" className="font-normal cursor-pointer">
                  Escritorio médico
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="needsSink"
                  checked={watchedValues.needsSink}
                  onCheckedChange={(checked) => setValue("needsSink", !!checked)}
                />
                <Label htmlFor="needsSink" className="font-normal cursor-pointer">
                  Mueble para lavabo o tarja
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="needsChairs"
                  checked={watchedValues.needsChairs}
                  onCheckedChange={(checked) => setValue("needsChairs", !!checked)}
                />
                <Label htmlFor="needsChairs" className="font-normal cursor-pointer">
                  Sillas de atención
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="needsStorage"
                  checked={watchedValues.needsStorage}
                  onCheckedChange={(checked) => setValue("needsStorage", !!checked)}
                />
                <Label htmlFor="needsStorage" className="font-normal cursor-pointer">
                  Estanterías / almacenamiento
                </Label>
              </div>
            </div>

            {/* Otros elementos */}
            <div className="space-y-2">
              <Label htmlFor="otherElements" className="text-base font-medium">
                Otros elementos:
              </Label>
              <Textarea
                id="otherElements"
                {...register("otherElements")}
                placeholder="Especifica otros elementos que necesitas"
                rows={3}
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
