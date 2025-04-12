import { useState } from "react"
import { Link } from "react-router"
import { Rocket, Users, DollarSign, ArrowRight, CheckCircle } from "lucide-react"
import { FileText, Video, PenToolIcon as Tool, ExternalLink } from "lucide-react"
import { Clock } from "lucide-react"


export default function LaunchPlanPage() {
  const [tab, setTab] = useState("steps")

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <Rocket className="h-12 w-12 text-emerald-500 mb-4" />
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Votre Plan de Lancement</h1>
        <p className="text-xl text-gray-500 max-w-3xl">
          Une feuille de route personnalisée pour transformer votre idée en entreprise viable, avec des ressources et
          des étapes concrètes.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Tabs & Content */}
        <div className="lg:col-span-2">
          {/* Custom Tabs */}
          <div className="mb-8">
            <div className="grid grid-cols-3 gap-2 bg-gray-100 rounded-md p-1">
              {[
                { label: "Étapes clés", value: "steps" },
                { label: "Ressources", value: "resources" },
                { label: "Calendrier", value: "timeline" },
              ].map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTab(t.value)}
                  className={`text-sm font-medium px-4 py-2 rounded-md transition-all ${
                    tab === t.value ? "bg-white shadow text-emerald-600" : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {tab === "steps" && (
            <div className="space-y-6">
              {/* EXAMPLES */}
              <LaunchStepCard
                number="1"
                title="Validation de l'idée"
                description="Testez votre concept auprès de clients potentiels pour valider le besoin et affiner votre proposition de valeur."
                tasks={[
                  "Créer un questionnaire pour les clients potentiels",
                  "Réaliser 10-15 entretiens de découverte",
                  "Analyser les retours et ajuster votre concept",
                  "Créer une landing page pour tester l'intérêt",
                ]}
                timeframe="2-4 semaines"
                status="in-progress"
              />
                              <LaunchStepCard
                  number="2"
                  title="Business Plan et Modèle Économique"
                  description="Définissez votre modèle économique, vos sources de revenus et vos projections financières."
                  tasks={[
                    "Définir votre proposition de valeur unique",
                    "Identifier vos segments de clientèle",
                    "Établir votre structure de coûts",
                    "Définir vos sources de revenus",
                    "Créer des projections financières sur 3 ans",
                  ]}
                  timeframe="3-4 semaines"
                  status="pending"
                />

                <LaunchStepCard
                  number="3"
                  title="MVP (Produit Minimum Viable)"
                  description="Développez une version minimale de votre produit ou service pour commencer à le tester sur le marché."
                  tasks={[
                    "Définir les fonctionnalités essentielles",
                    "Créer un prototype ou une première version",
                    "Tester avec un groupe d'utilisateurs pilotes",
                    "Recueillir les retours et itérer",
                  ]}
                  timeframe="1-3 mois"
                  status="pending"
                />

                <LaunchStepCard
                  number="4"
                  title="Structure Juridique et Administrative"
                  description="Mettez en place la structure juridique de votre entreprise et les éléments administratifs nécessaires."
                  tasks={[
                    "Choisir la forme juridique adaptée",
                    "Enregistrer votre entreprise",
                    "Ouvrir un compte bancaire professionnel",
                    "Mettre en place une comptabilité",
                    "Vérifier les obligations réglementaires spécifiques à votre secteur",
                  ]}
                  timeframe="2-4 semaines"
                  status="pending"
                />

                <LaunchStepCard
                  number="5"
                  title="Stratégie Marketing et Acquisition"
                  description="Développez votre stratégie pour attirer vos premiers clients et faire connaître votre offre."
                  tasks={[
                    "Définir votre identité de marque",
                    "Créer votre site web et vos profils sur les réseaux sociaux",
                    "Élaborer une stratégie de contenu",
                    "Identifier les canaux d'acquisition les plus pertinents",
                    "Mettre en place un système de suivi et d'analyse",
                  ]}
                  timeframe="1-2 mois"
                  status="pending"
                />
            </div>
          )}

          {tab === "resources" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResourceCard
                title="Template de Business Plan"
                description="Un modèle complet pour structurer votre business plan, avec des exemples et des conseils."
                type="document"
                link="/resources/business-plan-template"
              />
              <ResourceCard
                title="Guide d'Entretien Client"
                description="Un guide pratique pour mener des entretiens efficaces avec vos clients potentiels."
                type="document"
                link="/resources/customer-interview-guide"
              />
              <ResourceCard
                title="Calculateur de Rentabilité"
                description="Un outil Excel pour estimer votre seuil de rentabilité et vos projections financières."
                type="tool"
                link="/resources/profitability-calculator"
              />
              <ResourceCard
                title="Webinaire: Choisir sa Structure Juridique"
                description="Un webinaire enregistré avec un expert juridique sur les différentes formes juridiques."
                type="video"
                link="/resources/legal-structure-webinar"
              />
            </div>
          )}

          {tab === "timeline" && (
            <div className="bg-white rounded-lg border p-6 space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Calendrier de lancement</h2>
                <p className="text-sm text-gray-500">
                  Un calendrier prévisionnel pour le lancement de votre entreprise, basé sur votre disponibilité et vos
                  ressources.
                </p>
              </div>
              <div className="text-center py-12 text-gray-500">
                Veuillez d'abord compléter votre profil de disponibilité pour générer un calendrier personnalisé.
              </div>
              <div>
                <Link
                  to="/launch-plan/timeline"
                  className="inline-flex items-center justify-center w-full px-4 py-2 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 transition-colors"
                >
                  Configurer mon calendrier
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          <div className="bg-white rounded-lg shadow border sticky top-8 p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold">Votre progression</h2>
              <p className="text-sm text-gray-500">Suivez l'avancement de votre projet entrepreneurial</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Progression globale</span>
                <span className="font-medium">15%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: "15%" }}></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-emerald-500 mr-2" />
                <span className="text-sm">Analyse de potentiel complétée</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-emerald-500 mr-2" />
                <span className="text-sm">Idées business générées</span>
              </div>
              <div className="flex items-center text-gray-400">
                <div className="h-5 w-5 border-2 border-gray-300 rounded-full mr-2"></div>
                <span className="text-sm">Validation de l'idée</span>
              </div>
              <div className="flex items-center text-gray-400">
                <div className="h-5 w-5 border-2 border-gray-300 rounded-full mr-2"></div>
                <span className="text-sm">Business plan créé</span>
              </div>
              <div className="flex items-center text-gray-400">
                <div className="h-5 w-5 border-2 border-gray-300 rounded-full mr-2"></div>
                <span className="text-sm">MVP développé</span>
              </div>
            </div>

            <div className="flex flex-col space-y-4 pt-4">
              <Link
                to="/mentorship"
                className="inline-flex items-center justify-center w-full px-4 py-2 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 transition-colors"
              >
                Trouver un mentor
                <Users className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/funding"
                className="inline-flex items-center justify-center w-full px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-100 transition-colors"
              >
                Options de financement
                <DollarSign className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export function ResourceCard({ title, description, type, link }) {
  const icon = {
    document: <FileText className="h-5 w-5 text-blue-500" />,
    video: <Video className="h-5 w-5 text-red-500" />,
    tool: <Tool className="h-5 w-5 text-purple-500" />,
    link: <ExternalLink className="h-5 w-5 text-gray-500" />
  }

  return (
    <div className="rounded-2xl border bg-white shadow-sm p-4">
      <Link to={link} className="flex items-start space-x-3 hover:opacity-80 transition-opacity">
        <div className="mt-1 flex-shrink-0">{icon[type]}</div>
        <div>
          <h3 className="font-medium mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </Link>
    </div>
  )
}



export function LaunchStepCard({ number, title, description, tasks, timeframe, status }) {
  const badgeClasses = {
    completed: "bg-emerald-50 text-emerald-700 border border-emerald-100",
    "in-progress": "bg-blue-50 text-blue-700 border border-blue-100",
    pending: "bg-gray-100 text-gray-700 border border-gray-200"
  }

  const badgeText = {
    completed: "Complété",
    "in-progress": "En cours",
    pending: "À faire"
  }

  return (
    <div className="rounded-2xl border bg-white shadow-sm p-4">
      <div className="mb-2 flex flex-row items-start">
        <div className="bg-emerald-100 text-emerald-800 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-semibold">
          {number}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">{title}</h3>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${badgeClasses[status]}`}>
              {badgeText[status]}
            </span>
          </div>
        </div>
      </div>

      <div className="text-gray-600 mb-4">{description}</div>

      <div className="space-y-2 mb-4">
        <h4 className="font-medium text-sm">Tâches clés:</h4>
        <ul className="space-y-1">
          {tasks.map((task, index) => (
            <li key={index} className="flex items-start text-sm">
              <span className="text-emerald-500 mr-2">•</span>
              <span>{task}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center text-sm text-gray-500">
        <Clock className="h-4 w-4 mr-1" />
        <span>Durée estimée: {timeframe}</span>
      </div>
    </div>
  )
}

