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

const deskTypeOptions = [
  { value: "en_escuadra", label: "En escuadra (esquinado)" },
  { value: "en_l", label: "En L" },
  { value: "recto", label: "Recto" },
  { value: "giratorio", label: "Giratorio" },
  { value: "prefiero_propuesta", label: "Prefiero que ustedes me propongan" }
]

const specificationOptions = [
  "Almacenamiento cerca de mi escritorio",
  "Archivero o cajonera con llave",
  "Display para productos",
  "Basurero escondido",
  "Espacio para frigobar",
  "Espacio para destacar diplomas",
  "Área de lavado con tarja médica",
  "Iluminación regulable",
  "Zona de café (en recepción)",
  "Almacén de blancos",
  "Espejo de cuerpo completo"
]

const cabinetTypeOptions = [
  "Colgante",
  "Abierto",
  "Cerrado",
  "Mixto"
]

export default function FormStep4({ data, language, onSubmit, onNext, onBack }: FormStep4Props) {
  const [selectedSpecifications, setSelectedSpecifications] = React.useState<string[]>(data.specifications || [])
  const [selectedCabinetTypes, setSelectedCabinetTypes] = React.useState<string[]>(data.cabinetType || [])
  const [showCabinetOther, setShowCabinetOther] = React.useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid }
  } = useForm<FurniturePreferences>({
    resolver: zodResolver(furniturePreferencesSchema),
    defaultValues: data,
    mode: "onChange"
  })

  React.useEffect(() => {
    setValue("specifications", selectedSpecifications, { shouldValidate: true })
  }, [selectedSpecifications, setValue])

  React.useEffect(() => {
    setValue("cabinetType", selectedCabinetTypes, { shouldValidate: true })
    setShowCabinetOther(selectedCabinetTypes.includes("Otro"))
  }, [selectedCabinetTypes, setValue])

  const toggleSpecification = (spec: string) => {
    if (selectedSpecifications.includes(spec)) {
      setSelectedSpecifications(prev => prev.filter(s => s !== spec))
    } else {
      setSelectedSpecifications(prev => [...prev, spec])
    }
  }

  const toggleCabinetType = (type: string) => {
    if (type === "Otro") {
      if (selectedCabinetTypes.includes("Otro")) {
        setSelectedCabinetTypes(prev => prev.filter(t => t !== "Otro"))
        setShowCabinetOther(false)
      } else {
        setSelectedCabinetTypes(prev => [...prev, "Otro"])
        setShowCabinetOther(true)
      }
    } else {
      if (selectedCabinetTypes.includes(type)) {
        setSelectedCabinetTypes(prev => prev.filter(t => t !== type))
      } else {
        setSelectedCabinetTypes(prev => [...prev, type])
      }
    }
  }

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
            <div className="space-y-4">
              <Label className="text-base font-medium">
                Tipo de escritorio *
              </Label>
              <div className="space-y-2">
                {deskTypeOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={option.value}
                      name="deskType"
                      value={option.value}
                      checked={watch("deskType") === option.value}
                      onChange={(e) => setValue("deskType", e.target.value as any)}
                      className="rounded"
                    />
                    <Label htmlFor={option.value} className="font-normal cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.deskType && (
                <p className="text-sm text-red-500">{errors.deskType.message}</p>
              )}

              {/* Otras especificaciones */}
              <div className="space-y-2 mt-4">
                <Label htmlFor="deskTypeSpecs" className="text-base font-medium">
                  Otras especificaciones:
                </Label>
                <Textarea
                  id="deskTypeSpecs"
                  {...register("deskTypeSpecs")}
                  placeholder="Ej. Necesito un escritorio con privacidad, con cajones…"
                  rows={2}
                  className="w-full"
                />
              </div>
            </div>

            {/* Especificaciones */}
            <div className="space-y-3">
              <Label className="text-base font-medium">
                ¿Necesitas alguna de estas especificaciones?
              </Label>
              <div className="space-y-2">
                {specificationOptions.map((spec) => (
                  <div key={spec} className="flex items-center space-x-2">
                    <Checkbox
                      id={spec}
                      checked={selectedSpecifications.includes(spec)}
                      onCheckedChange={() => toggleSpecification(spec)}
                    />
                    <Label htmlFor={spec} className="font-normal cursor-pointer">
                      {spec}
                    </Label>
                  </div>
                ))}
              </div>
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
            <div className="space-y-3">
              <Label className="text-base font-medium">
                Tipo de gabinetes o mobiliario mural *
              </Label>
              <div className="space-y-2">
                {cabinetTypeOptions.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={selectedCabinetTypes.includes(type)}
                      onCheckedChange={() => toggleCabinetType(type)}
                    />
                    <Label htmlFor={type} className="font-normal cursor-pointer">
                      {type}
                    </Label>
                  </div>
                ))}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="cabinet-otro"
                    checked={selectedCabinetTypes.includes("Otro")}
                    onCheckedChange={() => toggleCabinetType("Otro")}
                  />
                  <Label htmlFor="cabinet-otro" className="font-normal cursor-pointer">
                    Otro
                  </Label>
                </div>
              </div>
              {showCabinetOther && (
                <div className="mt-2">
                  <Input
                    {...register("cabinetTypeOther")}
                    placeholder="Especifica otro tipo"
                    className="w-full"
                  />
                </div>
              )}
              {errors.cabinetType && (
                <p className="text-sm text-red-500">{errors.cabinetType.message}</p>
              )}
            </div>

            {/* Altura aproximada */}
            <div className="space-y-2">
              <Label htmlFor="approximateHeight" className="text-base font-medium">
                Para personalizar la ergonomía del consultorio, ¿cuál es tu altura aproximada? *
              </Label>
              <Input
                id="approximateHeight"
                {...register("approximateHeight")}
                placeholder="Ej: 1.70 m, 1.65 m"
                className="w-full"
              />
              {errors.approximateHeight && (
                <p className="text-sm text-red-500">{errors.approximateHeight.message}</p>
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
