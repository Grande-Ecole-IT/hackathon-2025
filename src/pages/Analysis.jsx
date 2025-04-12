import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useLocation } from "react-router";
import { MessageCircle, X, Send } from "lucide-react";
import FloatingChatBot from "../components/FloatingChatBot";
import Navbar from "../components/Navbar";

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
  const [activeTab, setActiveTab] = useState("Soft Skills");
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
  const currentAxesHard =
    data?.improvement_areas?.hard_skills?.slice(
      indexOfFirstAxes,
      indexOfLastAxes
    ) || [];

  const currentAxesSoft =
    data?.improvement_areas?.soft_skills?.slice(
      indexOfFirstAxes,
      indexOfLastAxes
    ) || [];
  const totalPagesAxes = Math.ceil(
    (data?.improvement_areas?.length || 0) / axesToImprovePerPage
  );

  const getScoreColor = (score) => {
    if (score > 75) return "#d50f18";
    if (score > 50) return "#fc516b";
    if (score > 25) return "#3B82F6";
    return "#6366F1";
  };

  const chartData = {
    labels: ["Score", ""],
    datasets: [
      {
        data: [
          data?.global_evaluation?.score || 0,
          100 - (data?.global_evaluation?.score || 0),
        ],
        backgroundColor: [
          getScoreColor(data?.global_evaluation?.score),
          "#efeaea",
        ],
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
      <Navbar />
      <div className="mt-16">
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
                    🚀
                  </span>
                  Axes d'Amélioration
                </h2>
              </div>
              <div className="grid grid-cols-2 mb-4 border rounded overflow-hidden">
                {["Hard Skills", "Soft Skills"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-4 text-sm font-medium ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              {activeTab == "Hard Skills" ? (
                <div className="p-4 space-y-4">
                  {currentAxesHard.map((area, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <h3 className="font-medium text-gray-800 flex items-center">
                        {area.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Priorité: {area.reason}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  {currentAxesSoft.map((area, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <h3 className="font-medium text-gray-800 flex items-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800`}
                        >
                          {area.name}
                        </span>
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Priorité: {area.reason}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination modernisée */}
              {totalPagesAxes > 1 && (
                <div className="px-4 pb-4 flex justify-between items-center gap-4">
                  <button
                    onClick={() =>
                      setCurrentPageAxe((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPageAxe === 1}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 ${
                      currentPageAxe === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-500/90 to-violet-500/90 text-white hover:from-blue-600 hover:to-violet-600 shadow-md hover:shadow-lg"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={
                        currentPageAxe === 1 ? "text-gray-400" : "text-white"
                      }
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                    Précédent
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from(
                      { length: Math.min(totalPagesAxes, 5) },
                      (_, i) => {
                        const pageNumber = i + 1;
                        return (
                          <button
                            key={i}
                            onClick={() => setCurrentPageAxe(pageNumber)}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                              currentPageAxe === pageNumber
                                ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-md"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      }
                    )}
                    {totalPagesAxes > 5 && (
                      <span className="px-2 text-gray-500">...</span>
                    )}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPageAxe((prev) =>
                        Math.min(prev + 1, totalPagesAxes)
                      )
                    }
                    disabled={currentPageAxe === totalPagesAxes}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 ${
                      currentPageAxe === totalPagesAxes
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-500/90 to-violet-500/90 text-white hover:from-blue-600 hover:to-violet-600 shadow-md hover:shadow-lg"
                    }`}
                  >
                    Suivant
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={
                        currentPageAxe === totalPagesAxes
                          ? "text-gray-400"
                          : "text-white"
                      }
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-300 overflow-hidden">
              <div className="p-5 border-b border-gray-300">
                <h2 className="font-semibold text-lg text-gray-800 flex items-center">
                  <span className="bg-gradient-to-r from-blue-400 to-violet-400 text-gray-700 p-2 rounded-lg mr-3">
                    🛠️
                  </span>
                  Futur-Proof Scores
                </h2>
                <p>
                  Evaluation de la resilience de votre metier face a
                  l'automatisation par l'IA
                </p>
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
                        <div className="flex items-center mt-2 mb-3">
                          <div className="w-full bg-gray-300 rounded-full h-2.5 mr-3">
                            <div
                              className={`h-2.5 rounded-full ${
                                skill.score > 80
                                  ? "bg-gray-800"
                                  : skill.score > 60
                                  ? "bg-gradient-to-r from-blue-500 to-violet-500"
                                  : "bg-gradient-to-l from-blue-300 to-violet-300"
                              }`}
                              style={{ width: `${skill.score}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex flex-row space-x-4 items-center">
                          <p className="text-xs">Risque d'automatisation :</p>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(
                              skill.risk_level
                            )}`}
                          >
                            {skill.risk_level}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {skill.score}/100
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
              {/* Pagination améliorée */}
              {totalPages > 1 && (
                <div className="px-4 pb-4 flex justify-between items-center">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-md transition-all duration-200 ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-400 to-violet-400 text-white hover:from-blue-500 hover:to-violet-500 shadow-md"
                    }`}
                  >
                    Précédent
                  </button>

                  <div className="flex items-center space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-all ${
                          currentPage === i + 1
                            ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-md"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-md transition-all duration-200 ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-400 to-violet-400 text-white hover:from-blue-500 hover:to-violet-500 shadow-md"
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
      <FloatingChatBot isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
