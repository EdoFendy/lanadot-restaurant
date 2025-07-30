import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Shield, Eye, Cookie, Users, Lock, Mail, CheckCircle, Phone, MapPin, Calendar } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - Informativa sulla Privacy",
  description:
    "Informativa completa sulla privacy di L'Anadot ristorante. Scopri come trattiamo i tuoi dati personali in conformità al GDPR e alle normative italiane sulla privacy.",
  keywords: ["privacy policy", "GDPR", "protezione dati", "L'Anadot", "ristorante Lodi", "informativa privacy"],
  openGraph: {
    title: "Privacy Policy - L'Anadot Ristorante",
    description: "Informativa completa sulla privacy e protezione dei dati personali del ristorante L'Anadot di Lodi.",
    url: "https://lanadot.it/privacy-policy",
  },
  alternates: {
    canonical: "/privacy-policy",
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/images/logo-dark.png" alt="L'Anadot" width={120} height={60} className="h-10 w-auto" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#c6976c] hover:text-[#04241f] transition-colors duration-300 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Torna al sito
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#c6976c]/10 rounded-2xl mb-6">
            <Shield className="w-8 h-8 text-[#c6976c]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extralight text-[#04241f] font-georgia mb-4">
            Informativa sulla Privacy
          </h1>
          <p className="text-[#0c3930]/70 font-light">
            Ultimo aggiornamento: {new Date().toLocaleDateString("it-IT")} | Versione 1.0
          </p>
        </div>

        {/* Content Cards */}
        <div className="space-y-8">
          {/* Data Controller */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#c6976c]/10 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-[#c6976c]" />
              </div>
              <h2 className="text-2xl font-light text-[#04241f] font-georgia">Titolare del Trattamento</h2>
            </div>
            <div className="bg-[#f5f1e8] rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-[#04241f] mb-3">Dati del Titolare</h3>
                  <div className="space-y-2 text-[#0c3930] font-light">
                    <p>
                      <strong>Denominazione:</strong> Ristorante L'Anadot
                    </p>
                    <p>
                      <strong>Sede legale:</strong> Via del Capanno, 37 - 26900 Lodi (LO)
                    </p>
                    <p>
                      <strong>Partita IVA:</strong> 000000
                    </p>
                    <p>
                      <strong>Codice Fiscale:</strong> CODFISCALE
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-[#04241f] mb-3">Contatti Privacy</h3>
                  <div className="space-y-2 text-[#0c3930] font-light">
                    <p>
                      <strong>Telefono:</strong> 0371 944 807
                    </p>
                    <p>
                      <strong>Email:</strong> info@lanadot.it
                    </p>

                    <p className="text-xs text-[#0c3930]/70 mt-3">Risposta garantita entro 30 giorni dalla richiesta</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data We Actually Collect */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#c6976c]/10 rounded-xl flex items-center justify-center">
                <Eye className="w-5 h-5 text-[#c6976c]" />
              </div>
              <h2 className="text-2xl font-light text-[#04241f] font-georgia">Dati che Raccogliamo Effettivamente</h2>
            </div>

            <div className="space-y-6">
              {/* Technical Data */}
              <div className="border-l-4 border-blue-400 bg-blue-50 rounded-r-xl p-6">
                <h3 className="text-lg font-medium text-[#04241f] mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  Dati Tecnici (Raccolti Automaticamente)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-[#04241f] text-sm mb-2">Informazioni del Browser</h4>
                    <ul className="text-xs text-[#0c3930]/70 space-y-1">
                      <li>• Tipo di browser e versione</li>
                      <li>• Sistema operativo</li>
                      <li>• Risoluzione schermo</li>
                      <li>• Lingua del browser</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-[#04241f] text-sm mb-2">Dati di Navigazione</h4>
                    <ul className="text-xs text-[#0c3930]/70 space-y-1">
                      <li>• Indirizzo IP (anonimizzato)</li>
                      <li>• Pagine visitate sul sito</li>
                      <li>• Tempo di permanenza</li>
                      <li>• Referrer (sito di provenienza)</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 text-sm text-[#0c3930] bg-white rounded-lg p-3">
                  <strong>Finalità:</strong> Garantire il corretto funzionamento del sito web e la sicurezza
                  informatica.
                  <br />
                  <strong>Base giuridica:</strong> Interesse legittimo (Art. 6, par. 1, lett. f GDPR)
                </div>
              </div>

              {/* Contact Data */}
              <div className="border-l-4 border-green-400 bg-green-50 rounded-r-xl p-6">
                <h3 className="text-lg font-medium text-[#04241f] mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-green-600" />
                  Dati di Contatto (Solo se ci Contatti)
                </h3>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-medium text-[#04241f] text-sm mb-2">Quando ci chiami telefonicamente</h4>
                  <ul className="text-sm text-[#0c3930] space-y-2">
                    <li>
                      • <strong>Numero di telefono:</strong> Solo per la durata della chiamata
                    </li>
                    <li>
                      • <strong>Nome:</strong> Solo se fornito volontariamente per prenotazioni
                    </li>
                    <li>
                      • <strong>Preferenze:</strong> Eventuali richieste specifiche (allergie, tavoli, orari)
                    </li>
                  </ul>
                  <div className="mt-3 text-sm text-[#0c3930] bg-green-100 rounded-lg p-3">
                    <strong>Finalità:</strong> Gestione prenotazioni e comunicazioni relative al servizio.
                    <br />
                    <strong>Base giuridica:</strong> Consenso esplicito (Art. 6, par. 1, lett. a GDPR)
                    <br />
                    <strong>Conservazione:</strong> I dati telefonici non vengono registrati o conservati
                  </div>
                </div>
              </div>

              {/* Cookie Data */}
              <div className="border-l-4 border-orange-400 bg-orange-50 rounded-r-xl p-6">
                <h3 className="text-lg font-medium text-[#04241f] mb-4 flex items-center gap-2">
                  <Cookie className="w-5 h-5 text-orange-600" />
                  Dati dei Cookie
                </h3>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-[#04241f] text-sm mb-2">Cookie Tecnici (Sempre Attivi)</h4>
                    <ul className="text-sm text-[#0c3930] space-y-1">
                      <li>
                        • <strong>lanadot-cookie-consent:</strong> Memorizza la tua scelta sui cookie
                      </li>
                      <li>
                        • <strong>Durata:</strong> 12 mesi
                      </li>
                      <li>
                        • <strong>Tipo:</strong> localStorage del browser
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-[#04241f] text-sm mb-2">
                      Cookie di Terze Parti (Solo se Accettati)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="border border-gray-200 rounded-lg p-3">
                        <h5 className="font-medium text-[#04241f] text-xs mb-1">Google Maps</h5>
                        <p className="text-xs text-[#0c3930]/70">Cookie per il funzionamento della mappa interattiva</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-3">
                        <h5 className="font-medium text-[#04241f] text-xs mb-1">Instagram</h5>
                        <p className="text-xs text-[#0c3930]/70">Cookie per l'integrazione social</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What We DON'T Collect */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-2xl font-light text-[#04241f] font-georgia">Cosa NON Raccogliamo</h2>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <p className="text-[#0c3930] font-light mb-4">
                Per trasparenza, specifichiamo chiaramente cosa <strong>NON</strong> raccogliamo:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-[#0c3930] font-light text-sm">
                  <li>❌ Indirizzi email</li>
                  <li>❌ Dati di pagamento</li>
                  <li>❌ Dati di geolocalizzazione precisa</li>
                  <li>❌ Cronologia di navigazione esterna</li>
                </ul>
                <ul className="space-y-2 text-[#0c3930] font-light text-sm">
                  <li>❌ Profili comportamentali</li>
                  <li>❌ Dati biometrici</li>
                  <li>❌ Registrazioni audio/video</li>
                  <li>❌ Analytics di terze parti</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Usage */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#c6976c]/10 rounded-xl flex items-center justify-center">
                <Lock className="w-5 h-5 text-[#c6976c]" />
              </div>
              <h2 className="text-2xl font-light text-[#04241f] font-georgia">Come Utilizziamo i Dati</h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: Phone,
                  title: "Gestione Prenotazioni",
                  desc: "I dati forniti telefonicamente sono utilizzati esclusivamente per gestire la tua prenotazione",
                  legal: "Base giuridica: Consenso (Art. 6.1.a GDPR)",
                },
                {
                  icon: Shield,
                  title: "Sicurezza del Sito",
                  desc: "I dati tecnici ci aiutano a prevenire attacchi informatici e garantire la sicurezza",
                  legal: "Base giuridica: Interesse legittimo (Art. 6.1.f GDPR)",
                },
                {
                  icon: MapPin,
                  title: "Servizi di Localizzazione",
                  desc: "Google Maps è utilizzato solo per mostrarti come raggiungerci",
                  legal: "Base giuridica: Consenso esplicito per cookie di terze parti",
                },
              ].map((item, index) => (
                <div key={index} className="bg-[#f5f1e8] rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[#c6976c]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-[#04241f] mb-2">{item.title}</h3>
                      <p className="text-[#0c3930] font-light text-sm mb-2">{item.desc}</p>
                      <p className="text-xs text-[#0c3930]/70 italic">{item.legal}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data Retention */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#c6976c]/10 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#c6976c]" />
              </div>
              <h2 className="text-2xl font-light text-[#04241f] font-georgia">Conservazione dei Dati</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-medium text-[#04241f] mb-3">Dati Tecnici</h3>
                <p className="text-sm text-[#0c3930] mb-2">
                  <strong>Durata:</strong> Sessione di navigazione
                </p>
                <p className="text-xs text-[#0c3930]/70">Cancellati automaticamente alla chiusura del browser</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="font-medium text-[#04241f] mb-3">Consenso Cookie</h3>
                <p className="text-sm text-[#0c3930] mb-2">
                  <strong>Durata:</strong> 12 mesi
                </p>
                <p className="text-xs text-[#0c3930]/70">Puoi modificare o cancellare in qualsiasi momento</p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <h3 className="font-medium text-[#04241f] mb-3">Dati Prenotazioni</h3>
                <p className="text-sm text-[#0c3930] mb-2">
                  <strong>Durata:</strong> Non conservati
                </p>
                <p className="text-xs text-[#0c3930]/70">Utilizzati solo durante la chiamata telefonica</p>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#c6976c]/10 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#c6976c]" />
              </div>
              <h2 className="text-2xl font-light text-[#04241f] font-georgia">I Tuoi Diritti GDPR</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Accesso (Art. 15)", desc: "Richiedere informazioni sui dati che trattiamo" },
                { title: "Rettifica (Art. 16)", desc: "Correggere dati inesatti o incompleti" },
                { title: "Cancellazione (Art. 17)", desc: "Richiedere la cancellazione dei tuoi dati" },
                { title: "Limitazione (Art. 18)", desc: "Limitare il trattamento in casi specifici" },
                { title: "Portabilità (Art. 20)", desc: "Ricevere i dati in formato strutturato" },
                { title: "Opposizione (Art. 21)", desc: "Opporti al trattamento per motivi legittimi" },
              ].map((right, index) => (
                <div key={index} className="bg-[#f5f1e8] rounded-xl p-4">
                  <h3 className="font-medium text-[#04241f] mb-2 text-sm">{right.title}</h3>
                  <p className="text-[#0c3930] font-light text-xs">{right.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <h3 className="font-medium text-[#04241f] mb-2">Come Esercitare i Tuoi Diritti</h3>
              <p className="text-[#0c3930] font-light text-sm mb-2">
                Per esercitare qualsiasi diritto, contattaci a <strong>privacy@lanadot.it</strong> o chiama il{" "}
                <strong>0371 944 807</strong>
              </p>
              <p className="text-xs text-[#0c3930]/70">
                Ti risponderemo entro 30 giorni e, se necessario, ti forniremo assistenza gratuita per l'esercizio dei
                tuoi diritti.
              </p>
            </div>
          </div>

          {/* Third Party Services */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#c6976c]/10 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-[#c6976c]" />
              </div>
              <h2 className="text-2xl font-light text-[#04241f] font-georgia">Servizi di Terze Parti</h2>
            </div>

            <div className="space-y-4">
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <span className="text-red-600 font-bold text-sm">G</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#04241f]">Google Maps</h3>
                    <p className="text-xs text-[#0c3930]/70">maps.google.com</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium text-[#04241f] mb-2">Finalità</h4>
                    <ul className="text-[#0c3930] space-y-1 text-xs">
                      <li>• Visualizzazione mappa interattiva</li>
                      <li>• Calcolo percorsi</li>
                      <li>• Informazioni di geolocalizzazione</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#04241f] mb-2">Privacy Policy</h4>
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#c6976c] hover:underline text-xs"
                    >
                      policies.google.com/privacy
                    </a>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-sm">IG</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#04241f]">Instagram</h3>
                    <p className="text-xs text-[#0c3930]/70">instagram.com</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium text-[#04241f] mb-2">Finalità</h4>
                    <ul className="text-[#0c3930] space-y-1 text-xs">
                      <li>• Link al profilo social</li>
                      <li>• Condivisione contenuti</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#04241f] mb-2">Privacy Policy</h4>
                    <a
                      href="https://help.instagram.com/519522125107875"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#c6976c] hover:underline text-xs"
                    >
                      help.instagram.com/privacy
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-r from-[#c6976c]/10 to-[#f0c243]/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <Mail className="w-5 h-5 text-[#c6976c]" />
              </div>
              <h2 className="text-2xl font-light text-[#04241f] font-georgia">Contatti e Reclami</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6">
                <h3 className="font-medium text-[#04241f] mb-3">Contatta il Titolare</h3>
                <div className="space-y-2 text-[#0c3930] font-light text-sm">
                  <p>
                    📧 <strong>Email:</strong> info@lanadot.it
                  </p>
                  <p>
                    📞 <strong>Telefono:</strong> 0371 944 807
                  </p>
                  <p>
                    📍 <strong>Indirizzo:</strong> Via del Capanno, 37 - 26900 Lodi (LO)
                  </p>
                  <p className="text-xs text-[#0c3930]/70 mt-3">Orari: Martedì-Domenica, 12:00-14:00 | 19:00-23:00</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6">
                <h3 className="font-medium text-[#04241f] mb-3">Autorità di Controllo</h3>
                <div className="space-y-2 text-[#0c3930] font-light text-sm">
                  <p>
                    <strong>Garante per la Protezione dei Dati Personali</strong>
                  </p>
                  <p>📧 garante@gpdp.it</p>
                  <p>📞 06 69677 1</p>
                  <p>🌐 www.garanteprivacy.it</p>
                  <p className="text-xs text-[#0c3930]/70 mt-3">
                    Puoi presentare reclamo se ritieni che il trattamento violi il GDPR
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
