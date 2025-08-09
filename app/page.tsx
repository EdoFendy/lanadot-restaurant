"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Clock, Instagram, Cookie, Heart, Calendar } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [visibleElements, setVisibleElements] = useState(new Set())
  const [showCookieBanner, setShowCookieBanner] = useState(false)
  const [cookiesAccepted, setCookiesAccepted] = useState(false)

  const observerRef = useRef<IntersectionObserver | null>(null)

  // Phone numbers - easy to modify
  const phoneNumber1 = "0371 944 807"
  const phoneNumber2 = "392 2794932"
  const phoneNumber1Clean = phoneNumber1.replace(/\s/g, "")
  const phoneNumber2Clean = phoneNumber2.replace(/\s/g, "")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  // Check cookie consent on load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const consent = localStorage.getItem("lanadot-cookie-consent")
      if (consent === "accepted") {
        setCookiesAccepted(true)
      } else if (consent === "declined") {
        setCookiesAccepted(false)
      } else {
        // Show banner after a short delay, but don't block the site
        setTimeout(() => setShowCookieBanner(true), 1500)
      }
    }
  }, [])

  // 3) Reveal-on-scroll con IntersectionObserver
  useEffect(() => {
    if (isLoading) return

    // Evita errori in ambienti non-browser
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return

    observerRef.current = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const el = entry.target as HTMLElement | null
          // Se per qualsiasi motivo el è nullo, interrompi
          if (!el || !el.id) return

          setVisibleElements((prev) => {
            if (prev.has(el.id)) return prev
            const next = new Set(prev)
            next.add(el.id)
            return next
          })

          // Smette di osservare l'elemento per ridurre overhead
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll("[data-animate]")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [isLoading])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleCookieAccept = () => {
    localStorage.setItem("lanadot-cookie-consent", "accepted")
    setCookiesAccepted(true)
    setShowCookieBanner(false)
  }

  const handleCookieDecline = () => {
    localStorage.setItem("lanadot-cookie-consent", "declined")
    setShowCookieBanner(false)
  }

  const handleSocialClick = (url: string) => {
    if (!cookiesAccepted) {
      setShowCookieBanner(true)
      return
    }
    window.open(url, "_blank")
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#0c3930] via-[#1a4a42] to-[#0c3930]">
        <div className="text-center">
          <div className="animate-fade-in-up">
            <Image
              src="/images/logo-light-new.png"
              alt="L'Anadot"
              width={400}
              height={200}
              className="mx-auto h-40 w-auto animate-pulse-slow"
            />
          </div>
          <div className="mt-8 animate-fade-in-up-delay">
            <div className="w-64 h-1 bg-[#f5f1e8]/20 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#c6976c] to-[#f0c243] rounded-full animate-loading-bar"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#04241f] overflow-x-hidden">
      {/* Cookie Banner - Professional Bottom Bar */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-3">
                  <Cookie className="w-5 h-5 text-[#c6976c] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#04241f] font-medium text-sm mb-1">
                      Questo sito utilizza cookie per migliorare l'esperienza utente
                    </p>
                    <p className="text-[#0c3930]/70 text-xs leading-relaxed">
                      Utilizziamo cookie tecnici e di terze parti per funzionalità come Google Maps e social media.
                      <Link href="/privacy-policy" className="text-[#c6976c] hover:underline ml-1">
                        Leggi la Privacy Policy
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={handleCookieDecline}
                  className="text-[#0c3930]/70 hover:text-[#04241f] text-sm font-medium transition-colors duration-200"
                >
                  Solo necessari
                </button>
                <Button
                  onClick={handleCookieAccept}
                  size="sm"
                  className="bg-[#04241f] hover:bg-[#0c3930] text-white px-6 py-2 text-sm"
                >
                  Accetta tutti
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-500 ${
          isScrolled ? "bg-[#f5f1e8]/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 animate-slide-in-left">
              <button onClick={() => scrollToSection("home")} className="transition-all duration-500 hover:scale-110">
                <Image
                  src={isScrolled ? "/images/logo-dark.png" : "/images/logo-light-new.png"}
                  alt="L'Anadot"
                  width={160}
                  height={80}
                  className="h-16 w-auto"
                />
              </button>
            </div>
            <div className="hidden md:flex space-x-8 animate-slide-in-down">
              {[
                { name: "Home", id: "home" },
                { name: "Menù", id: "menu" },
                { name: "Chi Siamo", id: "chisiamo" },
                { name: "Cucina", id: "cucina" },
                { name: "Location", id: "location" },
                { name: "Gallery", id: "gallery" },
                { name: "Contatti", id: "contatti" },
              ].map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className={`${
                    isScrolled ? "text-[#04241f] hover:text-[#0c3930]" : "text-white hover:text-[#f5f1e8]"
                  } transition-all duration-300 font-light relative group`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#c6976c] transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>
            <div className="flex space-x-4 animate-slide-in-right">
              <Button
                asChild
                className="bg-[#f5f1e8] hover:bg-white text-[#04241f] hover:text-[#0c3930] font-light border-2 border-[#f5f1e8] transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <a href={`tel:${phoneNumber1Clean}`}>
                  <Phone className="w-4 h-4 mr-2" />
                  Chiamaci
                </a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/interior-1.jpg"
            alt="L'Anadot Interior"
            fill
            className="object-cover scale-105 animate-ken-burns"
            priority
          />
          <div className="absolute inset-0 bg-[#04241f]/70"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4 flex flex-col items-center justify-center h-full">
          <div className="mb-8 animate-fade-in-up">
            <Image
              src="/images/logo-light-new.png"
              alt="L'Anadot"
              width={350}
              height={175}
              className="mx-auto h-32 w-auto hover:scale-105 transition-transform duration-500"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-extralight mb-6 tracking-wide animate-fade-in-up-delay leading-tight font-georgia">
            Tradizione, cura, atmosfera.
            <br />L’essenziale per stare bene.
          </h1>
          <div className="text-center mb-10 animate-fade-in-up-delay">
            <p className="text-lg md:text-xl font-light opacity-90 mb-4">Via del Capanno, 37 - Lodi</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-lg md:text-xl font-light">
              <button
                className="flex items-center gap-2 hover:text-[#c6976c] transition-colors duration-300"
                onClick={() => window.open(`tel:${phoneNumber1Clean}`, "_self")}
              >
                <Phone className="w-4 h-4" />
                <span>{phoneNumber1}</span>
              </button>
              <span className="hidden sm:block text-[#c6976c]">•</span>
              <button
                className="flex items-center gap-2 hover:text-[#c6976c] transition-colors duration-300"
                onClick={() => window.open(`tel:${phoneNumber2Clean}`, "_self")}
              >
                <Phone className="w-4 h-4" />
                <span>{phoneNumber2}</span>
              </button>
            </div>
          </div>
          <div className="animate-fade-in-up-delay-3">
            <Button
              size="lg"
              onClick={() => scrollToSection("contatti")}
              className="bg-[#f5f1e8] hover:bg-white text-[#04241f] hover:text-[#0c3930] font-light px-12 py-4 transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-[#f5f1e8]"
            >
              Prenota Ora
            </Button>
          </div>
        </div>
      </section>

      

      {/* About Section */}
      <section id="chisiamo" className="py-32 bg-[#f5f1e8] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#c6976c] rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-[#f0c243] rounded-full animate-float-delay"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div
              data-animate
              id="about-text"
              className={`transition-all duration-1000 ${
                visibleElements.has("about-text") ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="space-y-8 text-[#0c3930] text-lg font-light leading-relaxed">
                <p>
                  L'Anadot è la sintesi di due percorsi, da una parte, una grande passione per il buon cibo   ed il buon vino e, dall'altra, l'esperienza di 25 anni di lavoro nel mondo della ristorazione: pizzerie affollate fino all'alba, ristoranti eleganti in piazza, cucine che hanno lasciato un segno - Alberto Franceschini "Franz"
                </p>
                <p>
                  Oggi tutto questo si ritrova in un posto nuovo, affacciato sul fiume, tranquillo e curato. Una cucina attenta, una carta dei vini selezionata con criterio, un servizio presente e competente.
                </p>
                <p>
                  Ogni dettaglio è pensato per far stare bene le persone: chi viene a pranzo, chi cena con calma, chi festeggia o semplicemente ha voglia di mangiare qualcosa di buono.
                </p>
                <p>
                  Lo spirito non è quello di seguire mode ma quello di ascoltare le stagioni e il territorio con genuinità e autenticità.
                </p>
              </div>
            </div>
            <div
              data-animate
              id="about-image"
              className={`relative transition-all duration-1000 delay-300 ${
                visibleElements.has("about-image") ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-[#c6976c]/20 to-[#f0c243]/20 rounded-2xl blur-xl"></div>
              <Image
                src="/images/interior-2.jpg"
                alt="Interior L'Anadot"
                width={600}
                height={800}
                className="rounded-2xl shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Cuisine Section - REDESIGNED */}
      <section id="cucina" className="py-32 bg-[#0c3930] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#04241f]/50 to-transparent"></div>
          <div className="absolute top-20 right-10 w-64 h-64 bg-[#c6976c]/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 left-10 w-48 h-48 bg-[#f0c243]/10 rounded-full blur-3xl animate-pulse-slow-delay"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Main Title */}
          <div
            data-animate
            id="cuisine-main-title"
            className={`text-center mb-24 transition-all duration-1000 ${
              visibleElements.has("cuisine-main-title") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-5xl md:text-7xl font-extralight text-white mb-6 leading-tight font-georgia">
              Una cucina <span className="text-[#c6976c]">libera</span>,
              <br />
              <span className="text-[#c6976c]">radicata</span>, <span className="text-[#c6976c]">concreta</span>
            </h2>
          </div>

          {/* Three Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
            {/* Column 1: Philosophy */}
            <div
              data-animate
              id="cuisine-philosophy"
              className={`transition-all duration-1000 ${
                visibleElements.has("cuisine-philosophy") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 h-full border border-white/10 hover:bg-white/10 transition-all duration-500 group">
                <div className="w-16 h-16 bg-gradient-to-br from-[#c6976c] to-[#f0c243] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-light text-white mb-6 font-georgia">La Filosofia</h3>
                <div className="text-[#f5f1e8] font-light leading-relaxed space-y-4">
                  <p>
                    La cucina de L'Anadot parte da un'idea semplice: <strong>cucinare bene, ogni giorno</strong>. Senza dogmi, senza etichette.
                  </p>
                  <p>
                    Ingredienti selezionati, fornitori fidati e una visione chiara: offrire varietà senza rinunciare alla qualità.
                  </p>
                </div>
              </div>
            </div>

            {/* Column 2: Approach */}
            <div
              data-animate
              id="cuisine-approach"
              className={`transition-all duration-1000 delay-200 ${
                visibleElements.has("cuisine-approach") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 h-full border border-white/10 hover:bg-white/10 transition-all duration-500 group">
                <div className="w-16 h-16 bg-gradient-to-br from-[#f0c243] to-[#c6976c] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-light text-white mb-6 font-georgia">L'Approccio</h3>
                <div className="text-[#f5f1e8] font-light leading-relaxed space-y-4">
                  <p>
                    Un menù che parte da solide certezze, ma lascia spazio alla creatività quotidiana.
                  </p>
                  <p>
                    Perché un buon prodotto arriva fresco, non programmato.
                  </p>
                  <p>
                    Perché la stagionalità non è una tendenza, è una necessità.
                  </p>
                  <p>
                    La libertà in cucina permette di proporre piatti diversi, sorprendenti, autentici.
                  </p>
                </div>
              </div>
            </div>

            {/* Column 3: Territory */}
            <div
              data-animate
              id="cuisine-territory"
              className={`transition-all duration-1000 delay-400 ${
                visibleElements.has("cuisine-territory") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 h-full border border-white/10 hover:bg-white/10 transition-all duration-500 group">
                <div className="w-16 h-16 bg-gradient-to-br from-[#c6976c] via-[#f0c243] to-[#c6976c] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-light text-white mb-6 font-georgia">Il Territorio</h3>
                <div className="text-[#f5f1e8] font-light leading-relaxed space-y-4">
                  <p>
                    La base è territoriale: Lodi e la Lombardia sono il cuore. Ma ci sono influenze toscane, siciliane, francesi e personali.
                  </p>
                  <p>Contaminazioni che non snaturano, ma arricchiscono. Un equilibrio tra tradizione e innovazione.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div
            data-animate
            id="cuisine-bottom-section"
            className={`transition-all duration-1000 delay-600 ${
              visibleElements.has("cuisine-bottom-section") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-light text-white mb-8 font-georgia">La Nostra Proposta</h3>
                <div className="text-xl text-[#f5f1e8] font-light max-w-4xl mx-auto leading-relaxed space-y-6">
                  <p>
                    Dagli antipasti pensati per essere condivisi ai piatti del giorno scritti a mano, ogni scelta segue
                    un criterio preciso: far sentire ogni ospite a proprio agio, con un'offerta ampia, accessibile e ben
                    fatta.
                  </p>
                  <p>
                    A L'Anadot si trova carne, pesce, verdure, paste fresche, piatti della tradizione e idee nuove. Non per accontentare tutti, ma per accogliere chiunque abbia voglia di mangiare — davvero bene.
                  </p>
                </div>
              </div>

              {/* Food Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {[
                  {
                    img: "/images/pasta.jpg",
                    title: "Primi",
                    desc: "Paste fresche e piatti della tradizione con un tocco contemporaneo. Ogni piatto nasce da ingredienti scelti con cura e preparazioni essenziali, in equilibrio tra semplicità e ricercatezza.",
                  },
                  {
                    img: "/images/carne.png",
                    title: "Carne",
                    desc: "Tagli selezionati con attenzione, cotture precise, condimenti che esaltano senza coprire. La nostra proposta varia ogni giorno, con una ricerca costante di qualità — come nel caso del filetto irlandese o di altre carni pregiate scelte in base alla disponibilità e alla stagione.",
                  },
                  {
                    img: "/images/antipasto.png",
                    title: "Pesce e Crudité",
                    desc: "Una selezione quotidiana di pesce fresco, valorizzata con rispetto di gusti e sapori. Crudo o cucinato, ogni proposta punta su freschezza, equilibrio e intensità.",
                  },
                  {
                    img: "/images/dessert.jpg",
                    title: "Dolci",
                    desc: "Dolci essenziali, ma mai banali. Preparati con ingredienti di qualità e un tocco creativo, chiudono il pasto con eleganza e personalità.",
                  },
                ].map((item, index) => (
                  <Card
                    key={index}
                    className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 group overflow-hidden"
                  >
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden">
                        <Image
                          src={item.img || "/placeholder.svg"}
                          alt={item.title}
                          width={400}
                          height={300}
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                      <div className="p-6">
                        <h4 className="text-xl font-light text-white mb-3 font-georgia">{item.title}</h4>
                        <p className="text-[#f5f1e8]/80 font-light leading-relaxed text-sm">{item.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Wine Section */}
              <div className="mb-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                  <h4 className="text-2xl font-light text-white mb-6 font-georgia text-center">La selezione di Vini</h4>
                  <div className="text-[#f5f1e8] font-light leading-relaxed space-y-4 max-w-3xl mx-auto text-center">
                    <p>
                      Vini di qualità selezionati per accompagnare i piatti, tra etichette note e scelte meno convenzionali. Chi ama il vino trova sempre qualcosa di interessante.
                    </p>
                    <p>
                      Consigli disponibili al tavolo, per abbinare senza complicazioni.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <Button
                      onClick={() => scrollToSection("menu")}
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-[#04241f] font-light px-8 py-3 transition-all duration-300 hover:scale-105"
                    >
                      Scopri il Menù
                    </Button>
                    <Button
                      onClick={() => scrollToSection("menu")}
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-[#04241f] font-light px-8 py-3 transition-all duration-300 hover:scale-105"
                    >
                      Scopri la selezione di Vini
                    </Button>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button
                  onClick={() => scrollToSection("contatti")}
                  size="lg"
                  className="bg-[#f5f1e8] hover:bg-white text-[#04241f] hover:text-[#0c3930] font-light px-12 py-4 transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-[#f5f1e8]"
                >
                  Prenota Ora
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-32 bg-[#f5f1e8] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-32 right-20 w-40 h-40 bg-[#c6976c] rounded-full animate-float"></div>
          <div className="absolute bottom-32 left-20 w-28 h-28 bg-[#f0c243] rounded-full animate-float-delay"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div
              data-animate
              id="location-text"
              className={`transition-all duration-1000 ${
                visibleElements.has("location-text") ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <h2 className="text-5xl md:text-6xl font-extralight text-[#04241f] mb-10 leading-tight font-georgia">
                La nostra location:
                <br />
                <span className="text-[#c6976c]">Un posto dove fermarsi</span>
              </h2>
              <div className="space-y-8 text-[#0c3930] text-lg font-light leading-relaxed">
                <p>
                  L'Anadot si trova a pochi passi dal centro, affacciato sull'Adda. Una posizione riservata, comoda da raggiungere anche in bicicletta, lontana dal caos.
                </p>
                <p>
                  Lo spazio è stato completamente ristrutturato nel 2025 e oggi accoglie in ambienti contemporanei ma caldi, essenziali, senza ostentazione.
                </p>
                <p>Un posto dove si viene per stare comodi, mangiare in pace, parlare, bere, condividere.</p>
                <p>
                  È il tipo di ristorante dove si può tornare spesso, senza annoiarsi.
                  <br />
                  Perfetto per una cena in coppia, un pranzo di lavoro, una serata tra amici.
                </p>
                <p className="text-[#c6976c] font-medium text-xl">
                  Perché ogni volta si respira la stessa sensazione: quella di essere nel posto giusto.
                </p>
              </div>
            </div>
            <div
              data-animate
              id="location-image"
              className={`relative transition-all duration-1000 delay-300 ${
                visibleElements.has("location-image") ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-[#c6976c]/20 to-[#f0c243]/20 rounded-2xl blur-xl"></div>
              <Image
                src="/images/terrace.jpg"
                alt="Terrace L'Anadot"
                width={600}
                height={800}
                className="rounded-2xl shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32 bg-[#04241f] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            data-animate
            id="gallery-fan"
            className={`relative transition-all duration-1500 ${
              visibleElements.has("gallery-fan") ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="relative overflow-x-auto pb-8">
              <div className="flex space-x-8 px-8" style={{ width: "max-content" }}>
                {[
                  { src: "/images/interior-1.jpg", rotation: -8 },
                  { src: "/images/interior-2.jpg", rotation: -4 },
                  { src: "/images/terrace.jpg", rotation: 0 },
                  { src: "/images/seating.jpg", rotation: 4 },
                  { src: "/images/pasta.jpg", rotation: 8 },
                  { src: "/images/prawns.jpg", rotation: -6 },
                  { src: "/images/dessert.jpg", rotation: 6 },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 w-80 h-96 transition-all duration-1000 hover:scale-110 hover:z-20 cursor-pointer group ${
                      visibleElements.has("gallery-fan") ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                    style={{
                      transform: `rotate(${item.rotation}deg)`,
                      transitionDelay: `${index * 150}ms`,
                    }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={item.src || "/placeholder.svg"}
                        alt={`Gallery image ${index + 1}`}
                        fill
                        className="object-cover rounded-2xl shadow-2xl transition-transform duration-500 group-hover:rotate-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#04241f]/60 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: 7 }).map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full bg-[#c6976c]/30 transition-all duration-300 hover:bg-[#c6976c]"
                ></div>
              ))}
            </div>

            {/* Scroll hint */}
            <div className="text-center mt-6">
              <p className="text-[#f5f1e8]/60 text-sm font-light">← Scorri per vedere tutte le immagini →</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu CTA (moved near the end) */}
      <section id="menu" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-24 h-24 bg-[#c6976c] rounded-full animate-float"></div>
          <div className="absolute bottom-10 left-10 w-20 h-20 bg-[#f0c243] rounded-full animate-float-delay"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-extralight text-[#04241f] mb-4 leading-tight font-georgia">
              Il nostro <span className="text-[#c6976c]">Menù</span>
            </h2>
            <p className="text-lg text-[#0c3930] font-light max-w-3xl mx-auto">
              Scopri le nostre specialità preparate ogni giorno con ingredienti freschi e di stagione
            </p>
          </div>
          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-[#04241f] hover:bg-[#0c3930] text-[#f5f1e8] hover:text-white font-light px-12 py-4 transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-[#04241f]"
            >
              <Link href="/menu">Scopri il Menu Completo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contatti" className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-1/4 w-36 h-36 bg-[#c6976c] rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-1/4 w-32 h-32 bg-[#f0c243] rounded-full animate-float-delay"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div
            data-animate
            id="contact-title"
            className={`transition-all duration-1000 ${
              visibleElements.has("contact-title") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-extralight text-[#04241f] mb-20 font-georgia">
              <span className="text-[#c6976c]">Contatti</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            {[
              {
                icon: MapPin,
                title: "Indirizzo",
                content: "Via del Capanno, 37\n26900 Lodi (LO)",
                action: cookiesAccepted
                  ? () => window.open("https://maps.google.com/?q=Via+del+Capanno+37+Lodi", "_blank")
                  : () => setShowCookieBanner(true),
              },
              {
                icon: Phone,
                title: "Telefono",
                content: `${phoneNumber1}\n${phoneNumber2}`,
                action: () => window.open(`tel:${phoneNumber1Clean}`, "_self"),
              },
              {
                icon: Clock,
                title: "Orari",
                content: "MAR / VEN 12-15 e 19-23\nSAB / DOM 19-23",
              },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  data-animate
                  id={`contact-${index}`}
                  className={`flex flex-col items-center group transition-all duration-1000 ${
                    visibleElements.has(`contact-${index}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  } ${item.action ? "cursor-pointer hover:scale-105" : ""}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                  onClick={item.action}
                >
                  <Icon className="w-16 h-16 text-[#e96746] mb-6 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-light text-[#04241f] mb-4 font-georgia">{item.title}</h3>
                  <p className="text-[#0c3930] font-light whitespace-pre-line leading-relaxed">{item.content}</p>
                </div>
              )
            })}
          </div>

          <div
            data-animate
            id="contact-social"
            className={`flex justify-center space-x-8 mb-12 transition-all duration-1000 ${
              visibleElements.has("contact-social") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Button
              size="icon"
              variant="outline"
              onClick={() => handleSocialClick("https://instagram.com")}
              className="border-2 border-[#04241f] text-[#04241f] hover:bg-[#04241f] hover:text-white w-14 h-14 transition-all duration-300 hover:scale-110 hover:shadow-lg bg-transparent"
            >
              <Instagram className="w-6 h-6" />
            </Button>
          </div>

          <div
            data-animate
            id="contact-button"
            className={`transition-all duration-1000 ${
              visibleElements.has("contact-button") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Button
              size="lg"
              asChild
              className="bg-[#04241f] hover:bg-[#0c3930] text-[#f5f1e8] hover:text-white font-light px-16 py-6 text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-[#04241f]"
            >
              <a href={`tel:${phoneNumber1Clean}`}>
                <Phone className="w-5 h-5 mr-2" />
                Prenota Ora
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#04241f] text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#0c3930]/30 to-transparent"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-6">
              <button onClick={() => scrollToSection("home")}>
                <Image
                  src="/images/logo-light-new.png"
                  alt="L'Anadot"
                  width={120}
                  height={60}
                  className="h-12 w-auto hover:scale-110 transition-transform duration-300"
                />
              </button>
              <div>
                <p className="font-light opacity-75 text-lg">© 2024 L'Anadot. Tutti i diritti riservati.</p>
                <p className="font-light opacity-75 mt-2">Via del Capanno, 37 - 26900 Lodi (LO)</p>
              </div>
              <div className="flex items-center gap-6">
                <button
                  onClick={() => window.open(`tel:${phoneNumber1Clean}`, "_self")}
                  className="font-light opacity-75 hover:opacity-100 transition-opacity duration-300 flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  {phoneNumber1}
                </button>
                <button
                  onClick={() => handleSocialClick("https://instagram.com")}
                  className="font-light opacity-75 hover:opacity-100 transition-opacity duration-300 flex items-center gap-2"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </button>
              </div>
              <div className="flex gap-4 text-sm">
                <Link href="/privacy-policy" className="opacity-75 hover:opacity-100 transition-opacity duration-300">
                  Privacy Policy
                </Link>
                <Link href="/cookie-policy" className="opacity-75 hover:opacity-100 transition-opacity duration-300">
                  Cookie Policy
                </Link>
              </div>
            </div>

            {/* Right Column - Google Maps */}
            <div className="space-y-4">
              <h3 className="text-xl font-light font-georgia">Dove Siamo</h3>
              {cookiesAccepted ? (
                <div className="w-full h-64 rounded-2xl overflow-hidden shadow-xl">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.8!2d9.5034!3d45.3142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c1234567890%3A0x1234567890abcdef!2sVia%20del%20Capanno%2C%2037%2C%2026900%20Lodi%20LO%2C%20Italy!5e0!3m2!1sen!2sit!4v1234567890123!5m2!1sen!2sit"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="L'Anadot Location"
                  ></iframe>
                </div>
              ) : (
                <div
                  className="w-full h-64 rounded-2xl bg-gradient-to-br from-[#0c3930] to-[#04241f] flex items-center justify-center cursor-pointer hover:from-[#1a4a42] hover:to-[#0c3930] transition-all duration-300"
                  onClick={() => setShowCookieBanner(true)}
                >
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-[#c6976c] mx-auto mb-4" />
                    <p className="text-white font-light mb-2">Clicca per visualizzare la mappa</p>
                    <p className="text-[#f5f1e8]/60 text-sm">Richiede l'accettazione dei cookie</p>
                  </div>
                </div>
              )}
              <button
                onClick={
                  cookiesAccepted
                    ? () => window.open("https://maps.google.com/?q=Via+del+Capanno+37+Lodi", "_blank")
                    : () => setShowCookieBanner(true)
                }
                className="w-full bg-[#c6976c] hover:bg-[#f0c243] text-[#04241f] font-light py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <MapPin className="w-5 h-5" />
                Apri in Google Maps
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
