import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useLocation } from "react-router";
import { MessageCircle, X, Send } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CVAnalysisDashboard() {
  const [activeSection, setActiveSection] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageAxe, setCurrentPageAxe] = useState(1);
  const skillsPerPage = 4;
  const axesToImprovePerPage = 2;
  const location = useLocation();
  const { data, file } = location.state || {};
  const [fileUrl, setFileUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  console.log(data);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);

      // Nettoyage mémoire à la fermeture
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  // Pagination des compétences
  const indexOfLastSkill = currentPage * skillsPerPage;
  const indexOfFirstSkill = indexOfLastSkill - skillsPerPage;
  const currentSkills =
    data?.hard_skills?.slice(indexOfFirstSkill, indexOfLastSkill) || [];
  const totalPages = Math.ceil(
    (data?.hard_skills?.length || 0) / skillsPerPage
  );

  // Pagination des axes d'ameliorations
  const indexOfLastAxes = currentPageAxe * axesToImprovePerPage;
  const indexOfFirstAxes = indexOfLastAxes - axesToImprovePerPage;
  const currentAxes =
    data?.improvement_areas?.slice(indexOfFirstAxes, indexOfLastAxes) || [];
  const totalPagesAxes = Math.ceil(
    (data?.improvement_areas?.length || 0) / axesToImprovePerPage
  );

  // Formatage des données pour le graphique
  const chartData = {
    labels: ["Score", ""],
    datasets: [
      {
        data: [
          data?.global_evaluation.score,
          100 - data?.global_evaluation.score,
        ],
        backgroundColor: ["#EF4444", "#F3F4F6"],
        borderWidth: 0,
      },
    ],
  };

  // Fonction pour déterminer la couleur en fonction du niveau de risque
  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case "Faible":
        return "bg-green-100 text-green-800";
      case "Moyen":
        return "bg-yellow-100 text-yellow-800";
      case "Élevé":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Analyse de Compétences
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Évaluation de votre profil professionnel
          </p>
        </header>

        <div className="w-full grid grid-cols-1 lg:grid-cols-[2fr_2.8fr_1.2fr] gap-6">
          {/* Colonne de gauche - CV en grand format */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-300 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-300">
              <h2 className="font-semibold text-lg text-gray-800 flex items-center">
                <span className="bg-gray-200 text-gray-700 p-2 rounded-lg mr-3">
                  📄
                </span>
                Votre CV
              </h2>
            </div>
            <div className="flex-1 overflow-auto p-2">
              {file && file.type.startsWith("image/") && (
                <img
                  src={fileUrl}
                  alt="Aperçu du CV"
                  className="w-full max-w-[794px] max-h-[1123px] border shadow rounded"
                />
              )}
            </div>
          </div>

          {/* Colonne centrale - Compétences détaillées */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-300 overflow-hidden">
              <div className="p-5 border-b border-gray-300">
                <h2 className="font-semibold text-lg text-gray-800 flex items-center">
                  <span className="bg-gray-200 text-gray-700 p-2 rounded-lg mr-3">
                    🛠️
                  </span>
                  Compétences Techniques
                </h2>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentSkills.map((skill, index) => (
                  <div
                    key={index}
                    className={`rounded-lg border p-4 transition-all ${
                      activeSection === `skill-${index}`
                        ? "border-gray-400 bg-gray-100 shadow-inner"
                        : "border-gray-300 hover:border-gray-400 bg-white"
                    }`}
                    onClick={() =>
                      setActiveSection(
                        activeSection === `skill-${index}`
                          ? null
                          : `skill-${index}`
                      )
                    }
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-800 text-lg">
                          {skill.name}
                        </h3>
                        <div className="flex items-center mt-2">
                          <div className="w-32 bg-gray-300 rounded-full h-2.5 mr-3">
                            <div
                              className={`h-2.5 rounded-full ${
                                skill.score > 80
                                  ? "bg-gray-800"
                                  : skill.score > 60
                                  ? "bg-gray-600"
                                  : "bg-gray-400"
                              }`}
                              style={{ width: `${skill.score}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {skill.score}/100
                          </span>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(
                          skill.risk_level
                        )}`}
                      >
                        {skill.risk_level}
                      </span>
                    </div>

                    {activeSection === `skill-${index}` && (
                      <div className="mt-4 pt-4 border-t border-gray-300">
                        <p className="text-gray-600">{skill.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-4 pb-4 flex justify-between items-center">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-md ${
                      currentPage === 1
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Précédent
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {currentPage} sur {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-md ${
                      currentPage === totalPages
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Suivant
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-300 overflow-hidden">
              <div className="p-5 border-b border-gray-300">
                <h2 className="font-semibold text-lg text-gray-800 flex items-center">
                  <span className="bg-gray-200 text-gray-700 p-2 rounded-lg mr-3">
                    🚀
                  </span>
                  Axes d'Amélioration
                </h2>
              </div>
              <div className="p-4 space-y-4">
                {currentAxes.map((area, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <h3 className="font-medium text-gray-800 flex items-center">
                      <span className="bg-gray-200 text-gray-700 p-1.5 rounded-lg mr-2">
                        {index + 1}
                      </span>
                      {area.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Priorité: {area.reason}/5
                    </p>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPagesAxes > 1 && (
                <div className="px-4 pb-4 flex justify-between items-center">
                  <button
                    onClick={() =>
                      setCurrentPageAxe((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPageAxe === 1}
                    className={`px-4 py-2 rounded-md ${
                      currentPageAxe === 1
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Précédent
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {currentPageAxe} sur {totalPagesAxes}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPageAxe((prev) =>
                        Math.min(prev + 1, totalPagesAxes)
                      )
                    }
                    disabled={currentPageAxe === totalPagesAxes}
                    className={`px-4 py-2 rounded-md ${
                      currentPageAxe === totalPagesAxes
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    Suivant
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Colonne de droite - Score global et synthèse */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-300 overflow-hidden">
              <div className="p-5 border-b border-gray-300">
                <h2 className="font-semibold text-lg text-gray-800 flex items-center">
                  <span className="bg-gray-200 text-gray-700 p-2 rounded-lg mr-3">
                    📊
                  </span>
                  Évaluation Globale
                </h2>
              </div>
              <div className="p-4 flex flex-col items-center">
                <div className="relative w-48 h-48 mb-4">
                  <Doughnut
                    data={chartData}
                    options={{
                      cutout: "75%",
                      plugins: { legend: { display: false } },
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-gray-800">
                      {data.global_evaluation.score}
                    </span>
                    <span className="text-sm text-gray-500">/100</span>
                    <span
                      className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                        data.global_evaluation.score > 80
                          ? "bg-gray-800 text-white"
                          : data.global_evaluation.score > 60
                          ? "bg-gray-600 text-white"
                          : "bg-gray-400 text-gray-800"
                      }`}
                    >
                      {data.global_evaluation.evaluation}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-center mb-4">
                  {data.global_evaluation.description}
                </p>
                <div className="w-full space-y-3">
                  {data.global_evaluation.details.map((detail, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-xl mr-3">{detail.icon}</span>
                      <div>
                        <p className="text-xs text-gray-600">{detail.label}</p>
                        <p className="font-medium text-gray-800">
                          {detail.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Floating Chat Icon - ABSOLUTE POSITION */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 animate-bounce right-6 z-50 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-2 border-white bg-white"
        aria-label="Ouvrir le chat"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-gray-700 m-auto" />
        ) : (
          <div className="relative w-full h-full">
            {/* Image du robot avec animation Tailwind */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
              alt="Chatbot"
              className="w-full h-full p-2 object-contain"
            />
            {/* Badge de notification */}
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white animate-pulse border border-white">
              1
            </span>
          </div>
        )}
      </button>
    </div>
  );
}
