"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface MenuImage {
  id: number
  image_path: string
  image_alt: string
  display_order: number
}

interface MenuItem {
  id: number
  title: string
  description: string
  price: number | null
  display_order: number
  is_available: boolean
  category_name: string
  images: MenuImage[]
}

interface Category {
  id: number
  name: string
  display_order: number
  items: MenuItem[]
}

export default function MenuPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMenu()
  }, [])

  const fetchMenu = async () => {
    try {
      const response = await fetch('/api/menu')
      if (!response.ok) {
        throw new Error('Failed to fetch menu')
      }
      const data = await response.json()
      setCategories(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#04241f] flex items-center justify-center">
        <div className="text-white text-xl">Caricamento menu...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#04241f] flex items-center justify-center">
        <div className="text-white text-xl">Errore nel caricamento del menu: {error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#04241f] via-[#0c3930] to-[#04241f]">
      {/* Header */}
      <header className="bg-[#f5f1e8] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button
                variant="outline"
                className="border-[#04241f] text-[#04241f] hover:bg-[#04241f] hover:text-white transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Torna al Sito
              </Button>
            </Link>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-extralight text-[#04241f] font-georgia">
                Il nostro <span className="text-[#c6976c]">Menù</span>
              </h1>
              <p className="text-[#0c3930] font-light mt-2">
                Scopri le nostre specialità preparate con passione
              </p>
            </div>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Menu Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {categories.length === 0 ? (
          <div className="text-center text-white">
            <h2 className="text-2xl font-light mb-4">Menu in preparazione</h2>
            <p className="text-[#f5f1e8]/70">Il nostro menu sarà presto disponibile. Tornate a trovarci!</p>
          </div>
        ) : (
          <div className="space-y-20">
            {categories.map((category) => (
              <section key={category.id} className="relative">
                {/* Category Header */}
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-extralight text-white mb-4 font-georgia">
                    {category.name}
                  </h2>
                  <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#c6976c] to-transparent mx-auto"></div>
                </div>

                {/* Category Items */}
                {category.items && category.items.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {category.items.map((item) => (
                      <Card
                        key={item.id}
                        className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 group overflow-hidden"
                      >
                        <CardContent className="p-0">
                          {/* Item Images */}
                          {item.images && item.images.length > 0 && (
                            <div className="relative overflow-hidden">
                              <Image
                                src={item.images[0].image_path}
                                alt={item.images[0].image_alt || item.title}
                                width={400}
                                height={300}
                                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                              {item.images.length > 1 && (
                                <Badge
                                  variant="secondary"
                                  className="absolute top-3 right-3 bg-[#c6976c] text-white"
                                >
                                  +{item.images.length - 1} foto
                                </Badge>
                              )}
                            </div>
                          )}

                          {/* Item Content */}
                          <div className="p-6">
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="text-xl font-light text-white font-georgia group-hover:text-[#c6976c] transition-colors duration-300">
                                {item.title}
                              </h3>
                              {item.price && (
                                <Badge
                                  variant="outline"
                                  className="border-[#c6976c] text-[#c6976c] bg-transparent"
                                >
                                  €{item.price.toFixed(2)}
                                </Badge>
                              )}
                            </div>
                            <p className="text-[#f5f1e8]/90 font-light leading-relaxed text-sm">
                              {item.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-[#f5f1e8]/60 py-12">
                    <p>Nessun piatto disponibile in questa categoria al momento.</p>
                  </div>
                )}
              </section>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#04241f] border-t border-white/10 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-light text-white mb-6 font-georgia">
            Prenota il tuo tavolo
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-[#c6976c] hover:bg-[#f0c243] text-[#04241f] font-light px-12 py-4 transition-all duration-300 hover:scale-105"
            >
              <a href="tel:0371944807">
                Chiama: 0371 944 807
              </a>
            </Button>
            <span className="text-[#f5f1e8]/60 hidden sm:block">oppure</span>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[#04241f] font-light px-12 py-4 transition-all duration-300 hover:scale-105"
            >
              <Link href="/#contatti">
                Vai ai Contatti
              </Link>
            </Button>
          </div>
          <p className="text-[#f5f1e8]/60 text-sm mt-6">
            Via del Capanno, 37 - 26900 Lodi (LO) | MAR/VEN 12-15 e 19-23 | SAB/DOM 19-23
          </p>
        </div>
      </footer>
    </div>
  )
} 