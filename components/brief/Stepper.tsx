"use client"

import React from "react"
import { Check } from "lucide-react"
import { getTranslation, type Language } from "@/lib/i18n"

interface StepperProps {
  currentStep: number
  totalSteps: number
  language: Language
}

export function Stepper({ currentStep, totalSteps, language }: StepperProps) {
  const steps = [
    { number: 1, title: "step1Title" },
    { number: 2, title: "step2Title" },
    { number: 3, title: "step3Title" },
    { number: 4, title: "step4Title" },
    { number: 5, title: "step5Title" },
    { number: 6, title: "step6Title" },
    { number: 7, title: "step7Title" }
  ]

  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#CADCFF] to-[#C1FFDD] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#CADCFF] to-[#C1FFDD] opacity-20 rounded-full" />
      </div>

      {/* Steps - Mobile Optimized */}
      <div className="space-y-4 sm:space-y-0">
        {/* Mobile: Vertical Layout */}
        <div className="block sm:hidden">
          <div className="space-y-3">
            {steps.map((step, index) => {
              const isCompleted = step.number < currentStep
              const isCurrent = step.number === currentStep
              const isUpcoming = step.number > currentStep

              return (
                <div key={step.number} className="flex items-center space-x-3">
                  {/* Step Circle */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 flex-shrink-0 ${
                      isCompleted
                        ? "bg-gradient-to-r from-[#CADCFF] to-[#C1FFDD] text-black shadow-lg"
                        : isCurrent
                        ? "bg-black text-white shadow-lg scale-110"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      step.number
                    )}
                  </div>

                  {/* Step Title */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium transition-colors duration-300 ${
                        isCurrent
                          ? "text-black font-semibold"
                          : isCompleted
                          ? "text-gray-700"
                          : "text-gray-500"
                      }`}
                    >
                      {getTranslation(language, step.title as any)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Desktop: Horizontal Layout */}
        <div className="hidden sm:flex justify-between items-start">
          {steps.map((step, index) => {
            const isCompleted = step.number < currentStep
            const isCurrent = step.number === currentStep
            const isUpcoming = step.number > currentStep

            return (
              <div key={step.number} className="flex flex-col items-center flex-1 min-w-0 px-1">
                {/* Step Circle */}
                <div className="relative mb-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                      isCompleted
                        ? "bg-gradient-to-r from-[#CADCFF] to-[#C1FFDD] text-black shadow-lg"
                        : isCurrent
                        ? "bg-black text-white shadow-lg scale-110"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  
                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute top-6 left-12 w-full h-0.5 transition-all duration-300 ${
                        isCompleted
                          ? "bg-gradient-to-r from-[#CADCFF] to-[#C1FFDD]"
                          : "bg-gray-200"
                      }`}
                      style={{ width: "calc(100% - 3rem)" }}
                    />
                  )}
                </div>

                {/* Step Title */}
                <div className="text-center max-w-24">
                  <p
                    className={`text-xs font-medium transition-colors duration-300 leading-tight ${
                      isCurrent
                        ? "text-black font-semibold"
                        : isCompleted
                        ? "text-gray-700"
                        : "text-gray-500"
                    }`}
                  >
                    {getTranslation(language, step.title as any)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Progress Text */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Paso {currentStep} de {totalSteps} - {Math.round(progress)}% completado
        </p>
      </div>
    </div>
  )
}