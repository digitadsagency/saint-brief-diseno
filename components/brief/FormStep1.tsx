"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Phone, Instagram } from "lucide-react"
import { basicInfoSchema, type BasicInfo } from "@/lib/schemas"
import { type Language, getTranslation } from "@/lib/i18n"

interface FormStep1Props {
  data: BasicInfo
  language: Language
  onSubmit: (data: BasicInfo) => void
  onNext: () => void
  onBack: () => void
}

export function FormStep1({ data, language, onSubmit, onNext, onBack }: FormStep1Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<BasicInfo>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: data,
    mode: "onChange"
  })

  const onFormSubmit = (formData: BasicInfo) => {
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
            <User className="h-5 w-5" />
            Datos del cliente
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-8">
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            {/* Nombre completo */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-base font-medium">
                Nombre completo del cliente *
              </Label>
              <Input
                id="fullName"
                {...register("fullName")}
                placeholder="Ej: María González Pérez"
                className="w-full"
              />
              {errors.fullName && (
                <p className="text-sm text-red-500">{errors.fullName.message}</p>
              )}
            </div>

            {/* Nombre comercial */}
            <div className="space-y-2">
              <Label htmlFor="commercialName" className="text-base font-medium">
                Nombre comercial (si aplica)
              </Label>
              <Input
                id="commercialName"
                {...register("commercialName")}
                placeholder="Ej: Espacio Diseño"
                className="w-full"
              />
            </div>

            {/* Teléfono / WhatsApp */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-base font-medium flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Teléfono / WhatsApp *
              </Label>
              <Input
                id="phone"
                {...register("phone")}
                placeholder="Ej: +52 55 1234 5678"
                className="w-full"
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            {/* Redes sociales */}
            <div className="space-y-2">
              <Label htmlFor="socialMedia" className="text-base font-medium flex items-center gap-2">
                <Instagram className="h-4 w-4" />
                Redes sociales (si aplica)
              </Label>
              <Input
                id="socialMedia"
                {...register("socialMedia")}
                placeholder="Ej: @espaciodiseno"
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
