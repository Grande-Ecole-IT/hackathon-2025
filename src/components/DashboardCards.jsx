import { Link } from "react-router";

const DashboardCard = ({ title, value, description, onClick, to }) => {
  const CardContent = (
    <div
      className={`flex flex-col p-0.5 rounded-xl h-full 
                 shadow-md transform hover:-translate-y-1 
                 transition-all duration-300 hover:shadow-lg 
                 relative overflow-hidden group cursor-pointer
                 bg-gradient-to-br from-blue-50/70 to-violet-50/70`}
    >
      {/* Animated border - more visible */}
      <div
        className="absolute -inset-[2px] rounded-xl pointer-events-none z-0"
        style={{
          background:
            "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #3b82f6 100%)",
          backgroundSize: "200% 200%",
          animation: "gradientBorder 2s linear infinite",
          filter: "blur(0.5px)",
        }}
      ></div>

      {/* Inner card content with slight white overlay */}
      <div className="relative z-10 h-full flex flex-col bg-white/80 backdrop-blur-sm rounded-lg p-5 group-hover:bg-white/90 transition-all duration-300">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500 group-hover:from-blue-600 group-hover:to-violet-600 transition-all duration-300">
          {value}
        </p>
        <p className="text-sm text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">
          {description}
        </p>

        {/* Subtle indication that it's clickable */}
        <div className="mt-auto text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Cliquez pour continuer →
        </div>
      </div>

      {/* Neon glow on hover */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            boxShadow:
              "0 0 15px rgba(99, 102, 241, 0.4), 0 0 30px rgba(59, 130, 246, 0.3)",
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

const DashboardCards = ({ onOpenModal }) => {
  return (
    <>
      <style jsx global>{`
        @keyframes gradientBorder {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <DashboardCard
          title="Diagnostic de CV"
          value="85%"
          description="Évalue ton CV par rapport au marché"
          onClick={onOpenModal}
        />

        <DashboardCard
          title="Idée de business"
          value="Personnalisée"
          description="Génère une idée adaptée à ton profil"
          to="/business-ideas"
        />
      </div>
    </>
  );
};

export default DashboardCards;
