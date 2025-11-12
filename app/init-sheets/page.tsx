"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

export default function InitSheetsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleInit = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/init-sheets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : 'Error desconocido'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#CADCFF] to-[#C1FFDD] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Inicializar Google Sheets</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Esta herramienta creará automáticamente las columnas necesarias en tu hoja de Google Sheets.
            Asegúrate de que el ID de la hoja esté configurado en tu archivo .env.local
          </p>

          <Button
            onClick={handleInit}
            disabled={isLoading}
            className="w-full bg-black text-white hover:bg-gray-800"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Inicializando...
              </>
            ) : (
              'Inicializar Columnas'
            )}
          </Button>

          {result && (
            <div className={`p-4 rounded-lg flex items-start gap-3 ${
              result.success 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              {result.success ? (
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
              )}
              <div className="flex-1">
                <p className={`font-medium ${
                  result.success ? 'text-green-800' : 'text-red-800'
                }`}>
                  {result.success ? '¡Éxito!' : 'Error'}
                </p>
                <p className={`text-sm mt-1 ${
                  result.success ? 'text-green-700' : 'text-red-700'
                }`}>
                  {result.message}
                </p>
              </div>
            </div>
          )}

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium mb-2">Columnas que se crearán:</p>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
              <li>Timestamp</li>
              <li>Datos del cliente (4 columnas)</li>
              <li>Información general (4 columnas)</li>
              <li>Requerimientos especiales (7 columnas)</li>
              <li>Preferencias de mobiliario (6 columnas)</li>
              <li>Estilo y colores (9 columnas)</li>
              <li>Iluminación (1 columna)</li>
              <li>Presupuesto (1 columna)</li>
              <li className="font-medium mt-2">Total: 33 columnas</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

