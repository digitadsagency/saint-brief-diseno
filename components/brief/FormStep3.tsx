"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
    formState: { errors, isValid }
  } = useForm<SpecialRequirements>({
    resolver: zodResolver(specialRequirementsSchema),
    defaultValues: {
      medicalEquipment: data.medicalEquipment || "Televisión, camilla, mesa de Mayo, sillas de exploración, ultrasonido…"
    },
    mode: "onChange"
  })

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
            Equipo médico a considerar
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-8">
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="medicalEquipment" className="text-base font-medium">
                Equipo médico a considerar:
              </Label>
              <Textarea
                id="medicalEquipment"
                {...register("medicalEquipment")}
                placeholder="Televisión, camilla, mesa de Mayo, sillas de exploración, ultrasonido…"
                rows={4}
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
