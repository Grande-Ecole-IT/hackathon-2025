import { Link } from "react-router"
import { Lightbulb, ArrowRight, ThumbsUp, ThumbsDown, Clock, Target, TrendingUp, DollarSign, Activity, CheckCircle, Bookmark, Palette, LayoutGrid, Code, MessageCircle, ClipboardCheck, Users, FileText, Video, Calculator, Map, Star } from "lucide-react"
import { useState } from "react"

export default function BusinessIdeasPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      {/* Header avec animation et dégradé */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="relative mb-6">
          <Lightbulb className="h-14 w-14 text-emerald-500 z-10 relative" />
          <div className="absolute inset-0 bg-emerald-100 rounded-full blur-md opacity-75 -z-0 animate-pulse" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
          Vos Opportunités Entrepreneuriales
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
          Basées sur l'analyse approfondie de votre profil, découvrez les idées de business <span className="font-medium text-emerald-600">sur-mesure</span> qui correspondent à vos compétences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-8">
          <TabsSection />

          {/* Analyse des compétences */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyse de vos compétences clés</h2>
              <p className="text-gray-600">
                Votre <span className="font-medium text-emerald-600">ADN entrepreneurial</span> révélé par nos algorithmes
              </p>
            </div>
            
            <div className="space-y-6">
              <SkillMatchCard
                skill="Design UX/UI"
                level="Expert"
                marketDemand="Élevée"
                entrepreneurialValue="Très élevée"
                description="Votre expertise en design UX/UI est un atout majeur pour créer des produits centrés sur l'utilisateur."
                icon={<Palette className="h-5 w-5 text-emerald-500" />}
              />
              <SkillMatchCard
                skill="Gestion de projet"
                level="Avancé"
                marketDemand="Élevée"
                entrepreneurialValue="Élevée"
                description="Vos compétences en gestion de projet vous permettront de structurer efficacement le développement."
                icon={<LayoutGrid className="h-5 w-5 text-blue-500" />}
              />
              <SkillMatchCard
                skill="Développement Front-end"
                level="Intermédiaire"
                marketDemand="Très élevée"
                entrepreneurialValue="Élevée"
                description="Cette compétence technique vous permet de créer rapidement des prototypes et des MVP."
                icon={<Code className="h-5 w-5 text-purple-500" />}
              />
              <SkillMatchCard
                skill="Communication client"
                level="Avancé"
                marketDemand="Élevée"
                entrepreneurialValue="Très élevée"
                description="Votre capacité à communiquer efficacement est essentielle pour vendre votre solution et fidéliser vos clients."
                icon={<MessageCircle className="h-5 w-5 text-amber-500" />}
              />
            </div>
          </div>
        </div>

        {/* Sidebar droite sticky */}
        <div className="space-y-6 sticky top-8 h-fit">
          <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl shadow-lg p-8 border border-emerald-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Prochaines étapes</h2>
            <p className="text-gray-600 mb-6">Transformez ces idées en <span className="font-medium">business concret</span></p>

            <div className="space-y-5">
              <StepCard 
                step={1} 
                title="Valider votre idée" 
                desc="Testez votre concept auprès de clients potentiels avant de développer." 
                link="/validation-toolkit" 
                button="Outils de validation"
                icon={<ClipboardCheck className="h-5 w-5" />}
              />
              <StepCard 
                step={2} 
                title="Plan de lancement" 
                desc="Feuille de route complète pour transformer votre idée en réalité." 
                link="/launch-plan" 
                button="Créer mon plan"
                icon  ={<Map className="h-5 w-5" />}
              />
              <StepCard 
                step={3} 
                title="Mentorat entrepreneurial" 
                desc="Connectez-vous avec des entrepreneurs expérimentés dans votre domaine." 
                link="/mentorship" 
                button="Trouver un mentor"
                icon={<Users className="h-5 w-5" />}
              />
            </div>

            <Link 
              to="/launch-plan" 
              className="mt-8 w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all flex items-center justify-center"
            >
              Créer mon business plan
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          {/* Widget supplémentaire */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="font-semibold text-lg mb-3">Ressources recommandées</h3>
            <div className="space-y-3">
              <a href="#" className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <FileText className="h-4 w-4 text-gray-500 mr-3" />
                <span className="text-sm">Guide du jeune entrepreneur</span>
              </a>
              <a href="#" className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <Video className="h-4 w-4 text-gray-500 mr-3" />
                <span className="text-sm">Webinaire : Trouver ses premiers clients</span>
              </a>
              <a href="#" className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <Calculator className="h-4 w-4 text-gray-500 mr-3" />
                <span className="text-sm">Calculateur de rentabilité</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Nouveau design pour StepCard
function StepCard({ step, title, desc, link, button, icon }) {
  return (
    <div className="flex items-start p-4 bg-white rounded-xl border border-gray-200 hover:border-emerald-300 transition-colors">
      <div className="flex-shrink-0 bg-emerald-100 text-emerald-600 rounded-lg p-2 mr-4">
        {icon || <span className="font-bold">{step}</span>}
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{desc}</p>
        <Link 
          to={link} 
          className="inline-block mt-3 text-sm font-medium text-emerald-600 hover:text-emerald-700"
        >
          {button} →
        </Link>
      </div>
    </div>
  );
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
      <div className="grid grid-cols-2 mb-4 border rounded overflow-hidden">
        {["match", "trending"].map((tab) => (
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
  const ideaLink = `/business-ideas/${title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="border border-gray-200 rounded-xl shadow-sm p-6 bg-white space-y-5 hover:shadow-md transition-shadow duration-300">
      {/* Header with title and match score */}
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <div className="flex items-center bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full pl-3 pr-1 py-1">
          <span className="font-bold text-white mr-2">{matchScore}%</span>
          <span className="text-xs bg-white text-emerald-700 px-2 py-0.5 rounded-full font-medium">
            Match
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed">{description}</p>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InfoBlock 
          icon={<Clock className="h-5 w-5 text-emerald-500" />} 
          label="Temps de mise en marché" 
          value={timeToMarket} 
          className="bg-emerald-50"
        />
        <InfoBlock 
          icon={<DollarSign className="h-5 w-5 text-blue-500" />} 
          label="Niveau d'investissement" 
          value={investmentLevel} 
          className="bg-blue-50"
        />
        <InfoBlock 
          icon={<Activity className="h-5 w-5 text-purple-500" />} 
          label="Niveau de concurrence" 
          value={competitionLevel} 
          className="bg-purple-50"
        />
      </div>

      {/* Skills section */}
      <div className="space-y-2">
        <h4 className="font-medium text-gray-700">Compétences requises:</h4>
        <div className="flex flex-wrap gap-2">
          {skillsRequired.map((skill, i) => (
            <span 
              key={i} 
              className="text-xs font-medium bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full flex items-center"
            >
              <CheckCircle className="h-3 w-3 mr-1 text-emerald-500" />
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Clients section */}
      <div className="space-y-2">
        <h4 className="font-medium text-gray-700">Clients potentiels:</h4>
        <div className="flex flex-wrap gap-2">
          {potentialClients.map((client, i) => (
            <span 
              key={i} 
              className="text-xs font-medium bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full"
            >
              {client}
            </span>
          ))}
        </div>
      </div>

      {/* Footer with actions */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="flex gap-1">
          <button className="border border-gray-200 rounded-full p-2 hover:bg-gray-50 transition-colors">
            <ThumbsUp className="h-4 w-4 text-gray-500 hover:text-emerald-500" />
          </button>
          <button className="border border-gray-200 rounded-full p-2 hover:bg-gray-50 transition-colors">
            <ThumbsDown className="h-4 w-4 text-gray-500 hover:text-red-500" />
          </button>
          <button className="border border-gray-200 rounded-full p-2 hover:bg-gray-50 transition-colors">
            <Bookmark className="h-4 w-4 text-gray-500 hover:text-blue-500" />
          </button>
        </div>
        <Link 
          to={ideaLink} 
          className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-lg hover:shadow-md transition-all flex items-center"
        >
          Explorer cette idée
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function SkillMatchCard({ skill, level, marketDemand, entrepreneurialValue, description, icon }) {
  // Fonction pour déterminer la couleur en fonction du niveau
  const getLevelColor = (level) => {
    switch(level) {
      case 'Expert': return 'bg-emerald-100 text-emerald-800';
      case 'Avancé': return 'bg-blue-100 text-blue-800';
      case 'Intermédiaire': return 'bg-amber-100 text-amber-800';
      case 'Débutant': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Fonction pour déterminer l'icône de demande
  const getDemandIcon = (demand) => {
    switch(demand) {
      case 'Très élevée': return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'Élevée': return <TrendingUp className="h-4 w-4 text-orange-500" />;
      case 'Moyenne': return <Minus className="h-4 w-4 text-yellow-500" />;
      case 'Faible': return <TrendingDown className="h-4 w-4 text-gray-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="group p-5 border border-gray-200 rounded-xl bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-300">
      <div className="flex items-start gap-4">
        {icon && (
          <div className="p-2.5 bg-emerald-50 rounded-lg text-emerald-600">
            {icon}
          </div>
        )}
        
        <div className="flex-1 space-y-3">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg text-gray-900">{skill}</h3>
            <span className={`text-xs px-2.5 py-1 rounded-full ${getLevelColor(level)}`}>
              {level}
            </span>
          </div>
          
          <p className="text-gray-600 leading-relaxed">{description}</p>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-1.5">
              {getDemandIcon(marketDemand)}
              <span className="text-sm font-medium text-gray-700">Demande: </span>
              <span className="text-sm font-semibold">{marketDemand}</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium text-gray-700">Valeur: </span>
              <span className="text-sm font-semibold">{entrepreneurialValue}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant InfoBlock amélioré
function InfoBlock({ icon, label, value, className = "" }) {
  return (
    <div className={`p-3 rounded-lg ${className}`}>
      <div className="flex items-center mb-1">
        {icon}
        <span className="text-xs font-medium text-gray-500 ml-1">{label}</span>
      </div>
      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  );
}