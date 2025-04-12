import { Link } from "react-router";
import Button from "./Button";

const DashboardCard = ({ title, value, description, color, children }) => {
  const bgColor = color === "black" ? "bg-gray-800" : "bg-white";
  const textColor = color === "black" ? "text-white" : "text-gray-900";

  return (
    <div
      className={`${bgColor} ${textColor} p-6 rounded-xl h-full 
                  transform hover:-translate-y-1 transition-transform duration-300
                  shadow-[0_10px_20px_rgba(0,0,0,0.1)]`}
    >
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-2xl font-extrabold mb-2">{value}</p>
      <p className="text-sm opacity-80 mb-4">{description}</p>
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
        color="white"
      >
        <Button onClick={onOpenModal} color="dark" type="button">
          Evaluer mon CV
        </Button>
      </DashboardCard>

      <DashboardCard
        title="Idée de business"
        value="Personnalisée"
        description="Génère une idée de business adaptée à ton profil"
        color="black"
      >
        <Button color="light" type="button">
          <Link to="/business">Générer une idée</Link>
        </Button>
      </DashboardCard>
    </div>
  );
};

export default DashboardCards;
