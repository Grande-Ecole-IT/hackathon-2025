import {
  ArrowRight,
  Bot,
  FileSearch,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router";

const DashboardCard = ({ title, value, description, onClick, to, icon }) => {
  const CardContent = (
    <div
      className={`flex flex-col p-0.5 rounded-xl h-full 
                 shadow-sm transform hover:-translate-y-1 
                 transition-all duration-300 hover:shadow-md 
                 relative overflow-hidden group cursor-pointer
                 bg-gradient-to-br from-blue-50/50 to-violet-50/50`}
    >
      {/* Bordure animée subtile */}
      <div
        className="absolute -inset-[1px] rounded-xl pointer-events-none z-0 opacity-70"
        style={{
          background:
            "linear-gradient(90deg, #3b82f660 0%, #8b5cf660 50%, #3b82f660 100%)",
          backgroundSize: "200% 200%",
          animation: "gradientBorder 6s linear infinite",
          filter: "blur(0.5px)",
        }}
      ></div>

      {/* Contenu de la carte */}
      <div className="relative z-10 h-full flex flex-col bg-white/90 backdrop-blur-sm rounded-lg p-5 group-hover:bg-white transition-all duration-300">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors duration-300">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-2xl font-bold mb-3 text-gray-700">{value}</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
          {description}
        </p>

        {/* Indication discrète que c'est cliquable */}
        <div className="mt-auto flex items-center text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>Cliquer pour découvrir</span>
          <ArrowRight className="ml-1 h-3 w-3" />
        </div>
      </div>

      {/* Légère lueur au survol */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none">
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            boxShadow: "0 0 10px rgba(99, 102, 241, 0.2)",
          }}
        ></div>
      </div>
    </div>
  );

  return to ? (
    <Link to={to} className="block h-full">
      {CardContent}
    </Link>
  ) : (
    <div onClick={onClick} className="h-full">
      {CardContent}
    </div>
  );
};

const DashboardCards = ({ onOpenModal, setIsOpen, scrollToJobs }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <DashboardCard
          title="Diagnostic de CV"
          value="Évaluation complète"
          description="Obtenez une analyse détaillée de votre CV avec des recommandations personnalisées pour améliorer votre attractivité auprès des recruteurs."
          onClick={onOpenModal}
          icon={<FileSearch className="h-5 w-5" />}
        />

        <DashboardCard
          title="Idées Business IA"
          value="Opportunités innovantes"
          description="Découvrez des idées d'entreprises exploitant l'intelligence artificielle, adaptées à votre profil et au marché actuel."
          to="/business-ideas"
          icon={<Lightbulb className="h-5 w-5" />}
        />

        <DashboardCard
          title="Assistant IA"
          value="Conseiller virtuel"
          description="Discutez avec notre chatbot expert pour obtenir des conseils personnalisés sur votre carrière et vos projets professionnels."
          onClick={() => setIsOpen(true)}
          icon={<Bot className="h-5 w-5" />}
        />

        <DashboardCard
          title="Métiers en tendance"
          value="Top 6 du moment"
          description="Explorez les professions les plus demandées actuellement avec les compétences clés requises et les salaires moyens."
          onClick={scrollToJobs}
          icon={<TrendingUp className="h-5 w-5" />}
        />
      </div>
    </>
  );
};

export default DashboardCards;
