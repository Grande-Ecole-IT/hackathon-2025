import { Link } from "react-router"
import { Lightbulb, ArrowRight, ThumbsUp, ThumbsDown, Clock, Target, TrendingUp } from "lucide-react"
import { useState } from "react"

export default function BusinessIdeasPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <Lightbulb className="h-12 w-12 text-emerald-500 mb-4" />
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
          Vos Opportunités Entrepreneuriales
        </h1>
        <p className="text-xl text-gray-500 max-w-3xl">
          Basées sur l'analyse de votre CV et de vos compétences, voici les idées de business qui correspondent le mieux
          à votre profil.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Left side (tabs + skill match) */}
        <div className="lg:col-span-2">
          <TabsSection />

          {/* Skill Analysis */}
          <div className="bg-white shadow rounded-lg mb-8 p-6 border">
            <h2 className="text-xl font-bold mb-1">Analyse de vos compétences clés</h2>
            <p className="text-gray-500 mb-6">
              Voici les compétences identifiées dans votre CV qui représentent vos atouts entrepreneuriaux
            </p>
            <div className="space-y-6">
              <SkillMatchCard
                skill="Design UX/UI"
                level="Expert"
                marketDemand="Élevée"
                entrepreneurialValue="Très élevée"
                description="Votre expertise en design UX/UI est un atout majeur pour créer des produits centrés sur l'utilisateur."
              />
              <SkillMatchCard
                skill="Gestion de projet"
                level="Avancé"
                marketDemand="Élevée"
                entrepreneurialValue="Élevée"
                description="Vos compétences en gestion de projet vous permettront de structurer efficacement le développement."
              />
              <SkillMatchCard
                skill="Développement Front-end"
                level="Intermédiaire"
                marketDemand="Très élevée"
                entrepreneurialValue="Élevée"
                description="Cette compétence technique vous permet de créer rapidement des prototypes et des MVP."
              />
              <SkillMatchCard
                skill="Communication client"
                level="Avancé"
                marketDemand="Élevée"
                entrepreneurialValue="Très élevée"
                description="Votre capacité à communiquer efficacement est essentielle pour vendre votre solution et fidéliser vos clients."
              />
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="sticky top-8 h-fit bg-white shadow rounded-lg p-6 border">
          <h2 className="text-xl font-bold mb-1">Prochaines étapes</h2>
          <p className="text-gray-500 mb-6">Transformez ces idées en business concret</p>

          <StepCard step={1} title="Valider votre idée" desc="Testez votre concept auprès de clients potentiels." link="/validation-toolkit" button="Outils de validation" />
          <StepCard step={2} title="Plan de lancement" desc="Feuille de route pour transformer votre idée." link="/launch-plan" button="Créer mon plan" />
          <StepCard step={3} title="Mentorat entrepreneurial" desc="Connectez-vous avec des entrepreneurs expérimentés." link="/mentorship" button="Trouver un mentor" />

          <Link to="/launch-plan" className="block mt-6 w-full bg-emerald-600 text-white font-semibold py-2 px-4 rounded hover:bg-emerald-700 text-center">
            Créer mon business plan <ArrowRight className="inline ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

function TabsSection() {
  const [activeTab, setActiveTab] = useState("match")

  const ideas = {
    match: [
      {
        title: "Agence de Consulting UX/UI Spécialisée",
        description:
          "Créez une agence de conseil en expérience utilisateur dans un secteur spécifique.",
        matchScore: 92,
        investmentLevel: "Faible à Moyen",
        timeToMarket: "1-3 mois",
        competitionLevel: "Moyenne",
        skillsRequired: ["Design UX/UI", "Gestion de projet", "Connaissance sectorielle", "Communication client"],
        potentialClients: ["Startups", "PME", "Grandes entreprises"],
      },
      {
        title: "Plateforme de Formation en Ligne",
        description:
          "Développez une plateforme de cours en ligne pour professionnels en reconversion.",
        matchScore: 87,
        investmentLevel: "Moyen",
        timeToMarket: "3-6 mois",
        competitionLevel: "Élevée",
        skillsRequired: ["Expertise technique", "Pédagogie", "Marketing digital", "Production de contenu"],
        potentialClients: ["Professionnels", "Étudiants", "Entreprises"],
      },
      {
        title: "Service de Développement d'Applications SaaS",
        description:
          "Lancez un service de développement d'applications SaaS pour PME.",
        matchScore: 85,
        investmentLevel: "Faible à Moyen",
        timeToMarket: "1-2 mois",
        competitionLevel: "Moyenne à Élevée",
        skillsRequired: ["Développement web/mobile", "Architecture", "Gestion de projet", "Relation client"],
        potentialClients: ["Startups", "PME", "Professions libérales"],
      },
    ],
    trending: [
      {
        title: "Service de Conseil en IA pour PME",
        description:
          "Aidez les PME à intégrer des solutions d'IA adaptées à leurs besoins spécifiques.",
        matchScore: 78,
        investmentLevel: "Faible",
        timeToMarket: "1-2 mois",
        competitionLevel: "Moyenne",
        skillsRequired: ["Connaissance de l'IA", "Conseil", "Analyse de besoins", "Gestion de projet"],
        potentialClients: ["PME", "Startups", "Professions libérales"],
      },
    ],
    innovative: [
      {
        title: "Marketplace de Talents Freelance Vérifiés",
        description:
          "Plateforme mettant en relation entreprises et freelances vérifiés avec matching IA.",
        matchScore: 75,
        investmentLevel: "Élevé",
        timeToMarket: "6-12 mois",
        competitionLevel: "Élevée",
        skillsRequired: ["Développement", "Marketing", "RH", "Gestion communauté"],
        potentialClients: ["Entreprises", "Freelances"],
      },
    ],
  }

  return (
    <div className="mb-8">
      <div className="grid grid-cols-3 mb-4 border rounded overflow-hidden">
        {["match", "trending", "innovative"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === tab ? "bg-emerald-100 text-emerald-700" : "hover:bg-gray-100"
            }`}
          >
            {tab === "match" ? "Meilleur match" : tab === "trending" ? "Tendances" : "Innovant"}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {ideas[activeTab].map((idea, index) => (
          <BusinessIdeaCard key={index} {...idea} />
        ))}
      </div>
    </div>
  )
}

function BusinessIdeaCard({
  title,
  description,
  matchScore,
  investmentLevel,
  timeToMarket,
  competitionLevel,
  skillsRequired,
  potentialClients,
}) {
  const ideaLink = `/business-ideas/${title.toLowerCase().replace(/\s+/g, "-")}`

  return (
    <div className="border rounded-lg shadow-sm p-6 bg-white space-y-4">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="flex items-center">
          <span className="font-bold text-emerald-600 mr-2">{matchScore}%</span>
          <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">Match</span>
        </div>
      </div>

      <p className="text-gray-700">{description}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <InfoBlock icon={<Clock className="h-4 w-4 mr-1" />} label="Temps de mise en marché" value={timeToMarket} />
        <InfoBlock icon={<Target className="h-4 w-4 mr-1" />} label="Niveau d'investissement" value={investmentLevel} />
        <InfoBlock icon={<TrendingUp className="h-4 w-4 mr-1" />} label="Niveau de concurrence" value={competitionLevel} />
      </div>

      <div>
        <h4 className="font-medium mb-2">Compétences requises:</h4>
        <div className="flex flex-wrap gap-2">
          {skillsRequired.map((skill, i) => (
            <span key={i} className="text-sm bg-gray-100 px-2 py-1 rounded">{skill}</span>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2">Clients potentiels:</h4>
        <div className="flex flex-wrap gap-2">
          {potentialClients.map((client, i) => (
            <span key={i} className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded">{client}</span>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t">
        <div className="flex gap-2">
          <button className="border rounded-full p-2 hover:bg-gray-100">
            <ThumbsUp className="h-4 w-4 text-gray-500" />
          </button>
          <button className="border rounded-full p-2 hover:bg-gray-100">
            <ThumbsDown className="h-4 w-4 text-gray-500" />
          </button>
        </div>
        <Link to={ideaLink} className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 flex items-center">
          Explorer cette idée
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

function SkillMatchCard({ skill, level, marketDemand, entrepreneurialValue, description }) {
  return (
    <div className="p-4 border rounded bg-gray-50 space-y-2">
      <h3 className="font-semibold text-gray-800">{skill}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <div className="flex gap-4 text-sm text-gray-500">
        <span><strong>Niveau :</strong> {level}</span>
        <span><strong>Demande :</strong> {marketDemand}</span>
        <span><strong>Valeur :</strong> {entrepreneurialValue}</span>
      </div>
    </div>
  )
}

function StepCard({ step, title, desc, link, button }) {
  return (
    <div className="p-4 mb-4 border rounded-lg bg-gray-50">
      <h3 className="font-medium mb-2 flex items-center">
        <span className="bg-emerald-100 text-emerald-800 w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
          {step}
        </span>
        {title}
      </h3>
      <p className="text-sm text-gray-600 mb-3">{desc}</p>
      <Link to={link} className="block text-center w-full border rounded px-4 py-2 text-sm hover:bg-gray-100">
        {button} <ArrowRight className="inline h-3 w-3 ml-1" />
      </Link>
    </div>
  )
}

function InfoBlock({ icon, label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-500 mb-1 flex items-center">{icon}{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}
