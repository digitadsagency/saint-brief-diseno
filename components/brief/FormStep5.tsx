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
import { Palette } from "lucide-react"
import { styleColorsSchema, type StyleColors } from "@/lib/schemas"
import { type Language, getTranslation } from "@/lib/i18n"

interface FormStep5Props {
  data: StyleColors
  language: Language
  onSubmit: (data: StyleColors) => void
  onNext: () => void
  onBack: () => void
}

const styleOptions = [
  "Minimalista",
  "Contemporáneo",
  "Cálido",
  "Nórdico",
  "Luxury Boutique",
  "Natural u orgánico"
]

export default function FormStep5({ data, language, onSubmit, onNext, onBack }: FormStep5Props) {
  const [selectedStyles, setSelectedStyles] = React.useState<string[]>(data.desiredStyle || [])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid }
  } = useForm<StyleColors>({
    resolver: zodResolver(styleColorsSchema),
    defaultValues: data,
    mode: "onChange"
  })

  React.useEffect(() => {
    setValue("desiredStyle", selectedStyles, { shouldValidate: true })
  }, [selectedStyles, setValue])

  const toggleStyle = (style: string) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(prev => prev.filter(s => s !== style))
    } else {
      setSelectedStyles(prev => [...prev, style])
    }
  }

  const onFormSubmit = (formData: StyleColors) => {
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
            <Palette className="h-5 w-5" />
            Estilo, colores y percepción
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-8">
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            {/* Estilo deseado */}
            <div className="space-y-4">
              <Label className="text-base font-medium">
                Selecciona los estilos que te gusten: *
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {styleOptions.map((style) => (
                  <div key={style} className="flex items-center space-x-2">
                    <Checkbox
                      id={style}
                      checked={selectedStyles.includes(style)}
                      onCheckedChange={() => toggleStyle(style)}
                    />
                    <Label htmlFor={style} className="font-normal cursor-pointer">
                      {style}
                    </Label>
                  </div>
                ))}
              </div>
              
              {/* Otro estilo */}
              <div className="space-y-2">
                <Label htmlFor="otherStyle" className="text-sm text-muted-foreground">
                  Otro… Tecnológico, femenino, clínico…
                </Label>
                <Input
                  id="otherStyle"
                  {...register("otherStyle")}
                  placeholder="Especifica otro estilo"
                  className="w-full"
                />
              </div>
              
              {errors.desiredStyle && (
                <p className="text-sm text-red-500">{errors.desiredStyle.message}</p>
              )}
            </div>

            {/* Colores principales */}
            <div className="space-y-2">
              <Label htmlFor="mainColors" className="text-base font-medium">
                Colores principales preferidos *
              </Label>
              <Input
                id="mainColors"
                {...register("mainColors")}
                placeholder="Ej: Blanco, gris, beige"
                className="w-full"
              />
              {errors.mainColors && (
                <p className="text-sm text-red-500">{errors.mainColors.message}</p>
              )}
            </div>

            {/* Colores a evitar */}
            <div className="space-y-2">
              <Label htmlFor="colorsToAvoid" className="text-base font-medium">
                Colores que desea evitar
              </Label>
              <Input
                id="colorsToAvoid"
                {...register("colorsToAvoid")}
                placeholder="Ej: Colores muy oscuros, rojos intensos"
                className="w-full"
              />
            </div>

            {/* Texturas o acabados */}
            <div className="space-y-2">
              <Label htmlFor="favoriteTextures" className="text-base font-medium">
                Texturas o acabados favoritos (opcional)
              </Label>
              <Input
                id="favoriteTextures"
                {...register("favoriteTextures")}
                placeholder="Ej: Mate, brillante, natural, industrial"
                className="w-full"
              />
            </div>

            {/* Percepción deseada */}
            <div className="space-y-2">
              <Label htmlFor="desiredPerception" className="text-base font-medium">
                Cuando un paciente entra a tu consultorio, ¿quieres que sienta que está en un entorno médico profesional o en un espacio más cálido (como spa, boutique, hotel, etc.)? *
              </Label>
              <Textarea
                id="desiredPerception"
                {...register("desiredPerception")}
                placeholder="Describe la percepción que quieres que tenga el paciente..."
                rows={3}
                className="w-full"
              />
              {errors.desiredPerception && (
                <p className="text-sm text-red-500">{errors.desiredPerception.message}</p>
              )}
            </div>

            {/* Ejemplos de inspiración */}
            <div className="space-y-2">
              <Label htmlFor="inspirationExamples" className="text-base font-medium">
                Ejemplos de inspiración (links, link de Pinterest, referencias)
              </Label>
              <Textarea
                id="inspirationExamples"
                {...register("inspirationExamples")}
                placeholder="Ej: https://pinterest.com/ejemplo"
                rows={2}
                className="w-full"
              />
            </div>

            {/* Logo o identidad visual */}
            <div className="space-y-2">
              <Label htmlFor="logoOrIdentity" className="text-base font-medium">
                Logo o identidad visual de la clínica (si aplica)
              </Label>
              <Input
                id="logoOrIdentity"
                {...register("logoOrIdentity")}
                placeholder="Describe o proporciona link al logo"
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
