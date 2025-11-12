"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Lightbulb } from "lucide-react"
import { lightingSchema, type Lighting } from "@/lib/schemas"
import { type Language, getTranslation } from "@/lib/i18n"

interface FormStep6Props {
  data: Lighting
  language: Language
  onSubmit: (data: Lighting) => void
  onNext: () => void
  onBack: () => void
}

export default function FormStep6({ data, language, onSubmit, onNext, onBack }: FormStep6Props) {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid }
  } = useForm<Lighting>({
    resolver: zodResolver(lightingSchema),
    defaultValues: data,
    mode: "onChange"
  })

  const onFormSubmit = (formData: Lighting) => {
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
            <Lightbulb className="h-5 w-5" />
            Iluminación deseada
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-8">
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            {/* Preferencia de iluminación */}
            <div className="space-y-2">
              <Label className="text-base font-medium">
                Preferencia *
              </Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="warm"
                    value="warm"
                    checked={watch("lightingPreference") === "warm"}
                    onChange={(e) => setValue("lightingPreference", "warm" as any)}
                    className="rounded"
                  />
                  <Label htmlFor="warm" className="font-normal cursor-pointer">
                    Luz cálida
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="neutral"
                    value="neutral"
                    checked={watch("lightingPreference") === "neutral"}
                    onChange={(e) => setValue("lightingPreference", "neutral" as any)}
                    className="rounded"
                  />
                  <Label htmlFor="neutral" className="font-normal cursor-pointer">
                    Luz neutra
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="cold"
                    value="cold"
                    checked={watch("lightingPreference") === "cold"}
                    onChange={(e) => setValue("lightingPreference", "cold" as any)}
                    className="rounded"
                  />
                  <Label htmlFor="cold" className="font-normal cursor-pointer">
                    Luz fría
                  </Label>
                </div>
              </div>
              {errors.lightingPreference && (
                <p className="text-sm text-red-500">{errors.lightingPreference.message}</p>
              )}
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
