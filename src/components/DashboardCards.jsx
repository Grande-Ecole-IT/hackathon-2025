import { Link } from "react-router";
import Button from "./Button";

const DashboardCard = ({ title, value, description, children }) => {
  return (
    <div
      className="bg-white/90 backdrop-blur-sm p-6 rounded-xl h-full 
                   border border-gray-200 shadow-md
                   transform hover:-translate-y-1 transition-all duration-300
                   hover:shadow-lg relative overflow-hidden"
    >
      <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500">
        {value}
      </p>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      {children}
    </div>
  );
};

const DashboardCards = ({ onOpenModal }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <DashboardCard
        title="Diagnostic de CV"
        value="85%"
        description="Évalue ton CV par rapport au marché"
      >
        <Button
          onClick={onOpenModal}
          className="w-full mt-4 bg-gradient-to-r from-blue-500 to-violet-500 text-white hover:from-blue-600 hover:to-violet-600"
        >
          Evaluer mon CV
        </Button>
      </DashboardCard>

      <DashboardCard
        title="Idée de business"
        value="Personnalisée"
        description="Génère une idée adaptée à ton profil"
      >
        <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-violet-500 text-white hover:from-blue-600 hover:to-violet-600">
          <Link to="/business-ideas">Générer une idée</Link>
        </Button>
      </DashboardCard>
    </div>
  );
};

export default DashboardCards;
