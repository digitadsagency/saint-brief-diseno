"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Building2, Calendar } from "lucide-react"
import { generalInfoSchema, type GeneralInfo } from "@/lib/schemas"
import { type Language, getTranslation } from "@/lib/i18n"

interface FormStep2Props {
  data: GeneralInfo
  language: Language
  onSubmit: (data: GeneralInfo) => void
  onNext: () => void
  onBack: () => void
}

const areaOptions = [
  "Recepción",
  "Sala de espera",
  "Consultorio médico",
  "Procedimientos",
  "Baño",
  "Oficina administrativa",
  "Almacenaje"
]

export function FormStep2({ data, language, onSubmit, onNext, onBack }: FormStep2Props) {
  const [selectedAreas, setSelectedAreas] = React.useState<string[]>(data.areasToWork || [])
  const [showOtherArea, setShowOtherArea] = React.useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid }
  } = useForm<GeneralInfo>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: data,
    mode: "onChange"
  })

  React.useEffect(() => {
    setValue("areasToWork", selectedAreas, { shouldValidate: true })
  }, [selectedAreas, setValue])

  const toggleArea = (area: string) => {
    if (selectedAreas.includes(area)) {
      setSelectedAreas(prev => prev.filter(a => a !== area))
    } else {
      setSelectedAreas(prev => [...prev, area])
    }
  }

  const onFormSubmit = (formData: GeneralInfo) => {
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
            <Building2 className="h-5 w-5" />
            Información general
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-8">
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            {/* Metros cuadrados */}
            <div className="space-y-2">
              <Label htmlFor="squareMeters" className="text-base font-medium">
                Metros cuadrados aproximados *
              </Label>
              <Input
                id="squareMeters"
                {...register("squareMeters")}
                placeholder="Ej: 80"
                className="w-full"
              />
              {errors.squareMeters && (
                <p className="text-sm text-red-500">{errors.squareMeters.message}</p>
              )}
            </div>

            {/* Fecha estimada */}
            <div className="space-y-2">
              <Label className="text-base font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Fecha estimada de apertura o remodelación *
              </Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="asap"
                    value="asap"
                    checked={watch("estimatedDate") === "asap"}
                    onChange={(e) => setValue("estimatedDate", "asap" as any)}
                    className="rounded"
                  />
                  <Label htmlFor="asap">Lo más pronto posible</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="2-3_months"
                    value="2-3_months"
                    checked={watch("estimatedDate") === "2-3_months"}
                    onChange={(e) => setValue("estimatedDate", "2-3_months" as any)}
                    className="rounded"
                  />
                  <Label htmlFor="2-3_months">De 2 a 3 meses</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="3-6_months"
                    value="3-6_months"
                    checked={watch("estimatedDate") === "3-6_months"}
                    onChange={(e) => setValue("estimatedDate", "3-6_months" as any)}
                    className="rounded"
                  />
                  <Label htmlFor="3-6_months">De 3 a 6 meses</Label>
                </div>
              </div>
              {errors.estimatedDate && (
                <p className="text-sm text-red-500">{errors.estimatedDate.message}</p>
              )}
            </div>

            {/* Áreas a trabajar */}
            <div className="space-y-4">
              <Label className="text-base font-medium">
                Áreas a trabajar *
              </Label>
              <p className="text-sm text-muted-foreground">
                Selecciona todas las áreas que necesitas trabajar
              </p>
              
              <div className="space-y-2">
                {areaOptions.map((area) => (
                  <div key={area} className="flex items-center space-x-2">
                    <Checkbox
                      id={area}
                      checked={selectedAreas.includes(area)}
                      onCheckedChange={() => toggleArea(area)}
                    />
                    <Label htmlFor={area} className="font-normal cursor-pointer">
                      {area}
                    </Label>
                  </div>
                ))}
                
                {/* Opción "Otro" */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="other"
                    checked={showOtherArea}
                    onCheckedChange={(checked) => {
                      setShowOtherArea(!!checked)
                      if (!checked) {
                        setValue("otherArea", "")
                      }
                    }}
                  />
                  <Label htmlFor="other" className="font-normal cursor-pointer">
                    Otro:
                  </Label>
                </div>
                
                {showOtherArea && (
                  <Input
                    {...register("otherArea")}
                    placeholder="Especifica otra área"
                    className="ml-6"
                  />
                )}
              </div>
              
              {errors.areasToWork && (
                <p className="text-sm text-red-500">{errors.areasToWork.message}</p>
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
