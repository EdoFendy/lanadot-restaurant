import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Cookie, Settings, Shield, CheckCircle, AlertCircle, Info, Trash2, Eye } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy - Informativa sui Cookie",
  description:
    "Informativa dettagliata sui cookie utilizzati dal sito L'Anadot ristorante. Scopri come gestiamo i cookie tecnici e di terze parti in conformità alle normative europee.",
  keywords: ["cookie policy", "cookie", "privacy", "L'Anadot", "ristorante Lodi", "GDPR", "informativa cookie"],
  openGraph: {
    title: "Cookie Policy - L'Anadot Ristorante",
    description:
      "Informativa completa sui cookie e tecnologie di tracciamento utilizzate dal ristorante L'Anadot di Lodi.",
    url: "https://lanadot.it/cookie-policy",
  },
  alternates: {
    canonical: "/cookie-policy",
  },
}

export default function CookiePolicyPage() {
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
            <Cookie className="w-8 h-8 text-[#c6976c]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extralight text-[#04241f] font-georgia mb-4">
            Informativa sui Cookie
          </h1>
          <p className="text-[#0c3930]/70 font-light">
            Ultimo aggiornamento: {new Date().toLocaleDateString("it-IT")} | Versione 1.0
          </p>
        </div>

        {/* Content Cards */}
        <div className="space-y-8">
          {/* What are cookies */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#c6976c]/10 rounded-xl flex items-center justify-center">
                <Info className="w-5 h-5 text-[#c6976c]" />
              </div>
              <h2 className="text-2xl font-light text-[#04241f] font-georgia">Cosa sono i Cookie</h2>
            </div>
            <div className="prose prose-gray max-w-none">
              <p className="text-[#0c3930] font-light leading-relaxed mb-6">
                I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo quando visiti il nostro
                sito web. Sono ampiamente utilizzati per far funzionare i siti web in modo efficiente e fornire
                informazioni ai proprietari del sito.
              </p>

              <div className="bg-[#f5f1e8] rounded-xl p-6">
                <h3 className="text-lg font-medium text-[#04241f] mb-4">I cookie ci aiutano a:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-[#0c3930] font-light">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      Ricordare le tue preferenze sui cookie
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      Garantire la sicurezza del sito
                    </li>
                  </ul>
                  <ul className="space-y-2 text-[#0c3930] font-light">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      Fornire funzionalità di base
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      Integrare servizi di terze parti
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Cookie Analysis */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#c6976c]/10 rounded-xl flex items-center justify-center">
                <Eye className="w-5 h-5 text-[#c6976c]" />
              </div>
              <h2 className="text-2xl font-light text-[#04241f] font-georgia">Cookie Utilizzati nel Dettaglio</h2>
            </div>

            <div className="space-y-6">
              {/* Technical Cookies */}
              <div className="border border-green-200 bg-green-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-medium text-[#04241f]">Cookie Tecnici Necessari</h3>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Sempre Attivi
                  </span>
                </div>

                <div className="bg-white rounded-xl p-6 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium text-[#04241f] mb-2">Nome Cookie</h4>
                      <p className="text-[#0c3930] font-mono text-xs bg-gray-100 p-2 rounded">lanadot-cookie-consent</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-[#04241f] mb-2">Finalità</h4>
                      <p className="text-[#0c3930] text-xs">Memorizza la tua scelta sui cookie</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-[#04241f] mb-2">Durata</h4>
                      <p className="text-[#0c3930] text-xs">12 mesi</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-[#04241f] mb-2">Tipo</h4>
                      <p className="text-[#0c3930] text-xs">localStorage</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-100 rounded-lg p-4">
                  <p className="text-green-800 text-sm">
                    <strong>Base giuridica:</strong> Interesse legittimo (Art. 6.1.f GDPR) - Necessari per il
                    funzionamento del sito
                  </p>
                </div>
              </div>

              {/* Third-party Cookies */}
              <div className="border border-orange-200 bg-orange-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-orange-600" />
                  <h3 className="text-xl font-medium text-[#04241f]">Cookie di Terze Parti</h3>
                  <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Consenso Richiesto
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Google Maps */}
                  <div className="bg-white rounded-xl p-6 border-l-4 border-red-400">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <span className="text-red-600 font-bold text-sm">G</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-[#04241f]">Google Maps</h4>
                        <p className="text-xs text-[#0c3930]/70">Fornitore: Google LLC</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-[#04241f] mb-2 text-sm">Cookie Impostati</h5>
                        <ul className="text-xs text-[#0c3930] space-y-1 font-mono bg-gray-50 p-3 rounded">
                          <li>• NID (6 mesi)</li>
                          <li>• CONSENT (20 anni)</li>
                          <li>• 1P_JAR (1 mese)</li>
                          <li>• DV (1 giorno)</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-[#04241f] mb-2 text-sm">Finalità</h5>
                        <ul className="text-xs text-[#0c3930] space-y-1">
                          <li>• Visualizzazione mappa interattiva</li>
                          <li>• Calcolo percorsi e indicazioni</li>
                          <li>• Geolocalizzazione del ristorante</li>
                          <li>• Funzionalità di zoom e navigazione</li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4 bg-red-50 rounded-lg p-3">
                      <p className="text-red-800 text-xs">
                        <strong>Privacy Policy:</strong>
                        <a
                          href="https://policies.google.com/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline ml-1"
                        >
                          policies.google.com/privacy
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Instagram */}
                  <div className="bg-white rounded-xl p-6 border-l-4 border-purple-400">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-purple-600 font-bold text-sm">IG</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-[#04241f]">Instagram</h4>
                        <p className="text-xs text-[#0c3930]/70">Fornitore: Meta Platforms Inc.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-[#04241f] mb-2 text-sm">Cookie Impostati</h5>
                        <ul className="text-xs text-[#0c3930] space-y-1 font-mono bg-gray-50 p-3 rounded">
                          <li>• ig_did (1 anno)</li>
                          <li>• csrftoken (1 anno)</li>
                          <li>• mid (2 anni)</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-[#04241f] mb-2 text-sm">Finalità</h5>
                        <ul className="text-xs text-[#0c3930] space-y-1">
                          <li>• Link al profilo Instagram</li>
                          <li>• Condivisione contenuti social</li>
                          <li>• Autenticazione utente</li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4 bg-purple-50 rounded-lg p-3">
                      <p className="text-purple-800 text-xs">
                        <strong>Privacy Policy:</strong>
                        <a
                          href="https://help.instagram.com/519522125107875"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline ml-1"
                        >
                          help.instagram.com/privacy
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cookie Management */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#c6976c]/10 rounded-xl flex items-center justify-center">
                <Settings className="w-5 h-5 text-[#c6976c]" />
              </div>
              <h2 className="text-2xl font-light text-[#04241f] font-georgia">Gestione delle Preferenze Cookie</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#f5f1e8] rounded-xl p-6">
                <h3 className="text-lg font-medium text-[#04241f] mb-4 flex items-center gap-2">
                  <Cookie className="w-5 h-5 text-[#c6976c]" />
                  Sul nostro sito
                </h3>
                <div className="space-y-3">
                  <p className="text-[#0c3930] font-light text-sm">
                    Puoi modificare le tue preferenze in qualsiasi momento tramite il banner che appare nella parte
                    inferiore del sito.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-medium text-[#04241f] text-sm mb-2">Opzioni disponibili:</h4>
                    <ul className="text-xs text-[#0c3930] space-y-1">
                      <li>
                        • <strong>"Solo necessari":</strong> Accetta solo cookie tecnici
                      </li>
                      <li>
                        • <strong>"Accetta tutti":</strong> Accetta tutti i cookie inclusi quelli di terze parti
                      </li>
                    </ul>
                  </div>
                  <div className="bg-yellow-100 rounded-lg p-3">
                    <p className="text-yellow-800 text-xs">
                      💡 Il banner riapparirà se cancelli i cookie del browser o dopo 12 mesi
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#f5f1e8] rounded-xl p-6">
                <h3 className="text-lg font-medium text-[#04241f] mb-4 flex items-center gap-2">
                  <Trash2 className="w-5 h-5 text-[#c6976c]" />
                  Nel tuo browser
                </h3>
                <div className="space-y-3">
                  <p className="text-[#0c3930] font-light text-sm mb-4">
                    Puoi gestire o eliminare i cookie direttamente dalle impostazioni del tuo browser:
                  </p>
                  <div className="space-y-2 text-sm text-[#0c3930] font-light">
                    <div className="flex items-center gap-2 bg-white p-2 rounded">
                      <span className="w-2 h-2 bg-[#c6976c] rounded-full"></span>
                      <span>
                        <strong>Chrome:</strong> Impostazioni → Privacy e sicurezza → Cookie
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-white p-2 rounded">
                      <span className="w-2 h-2 bg-[#c6976c] rounded-full"></span>
                      <span>
                        <strong>Firefox:</strong> Opzioni → Privacy e sicurezza → Cookie
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-white p-2 rounded">
                      <span className="w-2 h-2 bg-[#c6976c] rounded-full"></span>
                      <span>
                        <strong>Safari:</strong> Preferenze → Privacy → Cookie
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-white p-2 rounded">
                      <span className="w-2 h-2 bg-[#c6976c] rounded-full"></span>
                      <span>
                        <strong>Edge:</strong> Impostazioni → Privacy, ricerca e servizi
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Consequences */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#c6976c]/10 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-[#c6976c]" />
              </div>
              <h2 className="text-2xl font-light text-[#04241f] font-georgia">Impatto delle Tue Scelte</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-lg font-medium text-green-800 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Se accetti tutti i cookie
                </h3>
                <ul className="space-y-2 text-green-700 font-light text-sm">
                  <li>✅ Mappa Google Maps completamente funzionale</li>
                  <li>✅ Link diretti ai social media</li>
                  <li>✅ Esperienza di navigazione ottimale</li>
                  <li>✅ Tutte le funzionalità del sito disponibili</li>
                </ul>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <h3 className="text-lg font-medium text-orange-800 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Se accetti solo cookie necessari
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-orange-800 text-sm mb-1">Funziona normalmente:</h4>
                    <ul className="space-y-1 text-orange-700 font-light text-xs">
                      <li>✅ Navigazione del sito web</li>
                      <li>✅ Visualizzazione contenuti</li>
                      <li>✅ Chiamate telefoniche</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-orange-800 text-sm mb-1">Non disponibile:</h4>
                    <ul className="space-y-1 text-orange-700 font-light text-xs">
                      <li>❌ Mappa interattiva (placeholder mostrato)</li>
                      <li>❌ Link diretti ai social media</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#c6976c]/10 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#c6976c]" />
              </div>
              <h2 className="text-2xl font-light text-[#04241f] font-georgia">Base Giuridica e Conformità</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-[#f5f1e8] rounded-xl p-6">
                <h3 className="font-medium text-[#04241f] mb-3">Normative di Riferimento</h3>
                <ul className="space-y-2 text-[#0c3930] font-light text-sm">
                  <li>
                    • <strong>GDPR (Regolamento UE 2016/679):</strong> Protezione dei dati personali
                  </li>
                  <li>
                    • <strong>Direttiva ePrivacy (2002/58/CE):</strong> Privacy nelle comunicazioni elettroniche
                  </li>
                  <li>
                    • <strong>D.Lgs. 196/2003 (Codice Privacy italiano):</strong> Normativa nazionale
                  </li>
                  <li>
                    • <strong>Provvedimento Garante del 10 giugno 2021:</strong> Linee guida sui cookie
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h4 className="font-medium text-[#04241f] mb-2 text-sm">Cookie Tecnici</h4>
                  <p className="text-blue-800 text-xs">
                    <strong>Base giuridica:</strong> Interesse legittimo (Art. 6.1.f GDPR)
                    <br />
                    <strong>Consenso:</strong> Non richiesto
                  </p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                  <h4 className="font-medium text-[#04241f] mb-2 text-sm">Cookie di Terze Parti</h4>
                  <p className="text-orange-800 text-xs">
                    <strong>Base giuridica:</strong> Consenso esplicito (Art. 6.1.a GDPR)
                    <br />
                    <strong>Consenso:</strong> Obbligatorio e revocabile
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-r from-[#c6976c]/10 to-[#f0c243]/10 rounded-2xl p-8">
            <h3 className="text-xl font-light text-[#04241f] font-georgia mb-4 flex items-center gap-2">
              <Cookie className="w-6 h-6 text-[#c6976c]" />
              Domande sui Cookie?
            </h3>
            <p className="text-[#0c3930] font-light leading-relaxed mb-6">
              Per qualsiasi chiarimento sull'uso dei cookie, per esercitare i tuoi diritti o per segnalare problemi
              tecnici, contattaci:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6">
                <h4 className="font-medium text-[#04241f] mb-3">Contatti Diretti</h4>
                <div className="space-y-2 text-[#0c3930] font-light text-sm">
                  <p>
                    📞 <strong>Telefono:</strong> 0371 944 807
                  </p>
                  <p>
                    📧 <strong>Email:</strong> privacy@lanadot.it
                  </p>
                  <p>
                    📍 <strong>Indirizzo:</strong> Via del Capanno, 37 - 26900 Lodi (LO)
                  </p>
                  <p className="text-xs text-[#0c3930]/70 mt-2">Orari: Mar-Dom, 12:00-14:00 | 19:00-23:00</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6">
                <h4 className="font-medium text-[#04241f] mb-3">Risorse Aggiuntive</h4>
                <div className="space-y-2 text-sm">
                  <Link
                    href="/privacy-policy"
                    className="block text-[#c6976c] hover:text-[#04241f] font-medium transition-colors duration-300"
                  >
                    📄 Privacy Policy completa →
                  </Link>
                  <a
                    href="https://www.garanteprivacy.it"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[#c6976c] hover:text-[#04241f] font-medium transition-colors duration-300"
                  >
                    🏛️ Garante Privacy →
                  </a>
                  <a
                    href="https://ec.europa.eu/info/law/law-topic/data-protection_it"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[#c6976c] hover:text-[#04241f] font-medium transition-colors duration-300"
                  >
                    🇪🇺 Informazioni GDPR →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
