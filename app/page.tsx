"use client"

import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRight, 
  Instagram
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {

  return (
    <div className="min-h-screen flex flex-col" style={{background: 'linear-gradient(180deg, #CADCFF 0%, #C1FFDD 100%)'}}>
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <Image
                src="/saint-logo.png"
                alt="SAINT Logo"
                width={120}
                height={120}
                className="object-contain"
              />
            </Link>
            
            <Link href="/brand-brief">
              <Button className="bg-black text-white hover:bg-gray-800">
                Iniciar Brand Brief
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col">
        {/* Hero Section - Full Height */}
        <section className="flex-1 flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge variant="outline" className="mb-4">
                  Herramienta Profesional
                </Badge>
                
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">
                  Empecemos por conocerte
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Queremos entender tu visión y necesidades para tu proyecto de diseño. Cada respuesta nos ayudará a crear un diseño que realmente se parezca a ti y a tu espacio.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/brand-brief">
                    <Button size="lg" className="w-full sm:w-auto bg-black text-white hover:bg-gray-800">
                      Iniciar Brand Brief
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                  
                  <a
                    href="https://www.instagram.com/sainttagency/?hl=es"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <Button variant="outline" size="lg" className="w-full sm:w-auto border-black text-black hover:bg-black hover:text-white">
                      Sobre nosotros
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Link href="/" className="flex items-center mb-4 md:mb-0 hover:opacity-80 transition-opacity">
              <Image
                src="/saint-logo.png"
                alt="SAINT Logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </Link>
            
            <div className="flex flex-col items-center md:items-end gap-4">
              <a
                href="https://www.instagram.com/sainttagency/?hl=es"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-black transition-colors"
              >
                <Instagram className="h-4 w-4" />
                @sainttagency
              </a>
              
              <div className="text-sm text-muted-foreground text-center md:text-right">
                <p>© 2024 SAINT Agency. Todos los derechos reservados.</p>
                <p className="mt-1">
                  Herramienta profesional para diseño de interiores.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
