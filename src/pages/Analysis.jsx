import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import {
  Award,
  BarChart2,
  ChevronDown,
  ChevronUp,
  Code,
  FileText,
  MessageCircle,
  TrendingUp,
  UserCheck,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { useLocation } from "react-router";
import Navbar from "../components/Navbar";
import FloatingChatBot from "../components/FloatingChatBot";
import BreadCrumb from "../components/BreadCrumb";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CVAnalysisDashboard() {
  const location = useLocation();
  const { data, file } = location.state || {};
  const [fileUrl, setFileUrl] = useState("");
  const [activeTab, setActiveTab] = useState("Soft Skills");
  const [expandedSkill, setExpandedSkill] = useState(null);
  const [showFullScoreDescription, setShowFullScoreDescription] =
    useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Couleurs du thème cohérentes avec le reste de l'application
  const themeColors = {
    primary: "#6366f1", // violet-500
    secondary: "#8b5cf6", // violet-600
    accent: "#a855f7", // violet-700
    light: "#f5f3ff", // violet-50
    dark: "#4c1d95", // violet-900
    success: "#10b981", // emerald-500
    danger: "#f59e0b", // amber-500
    warning: "#ef4444", // red-500
  };

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  const getScoreColor = (score) => {
    if (score > 75) return themeColors.accent;
    if (score > 50) return themeColors.warning;
    if (score > 25) return themeColors.danger;
    return themeColors.success;
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
          "#e2e8f0", // gray-200
        ],
        borderWidth: 0,
      },
    ],
  };

  const toggleSkill = (index) => {
    setExpandedSkill(expandedSkill === index ? null : index);
  };

  const toggleScoreDescription = () => {
    setShowFullScoreDescription(!showFullScoreDescription);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50/30 to-violet-50/30 px-20`}>
      <Navbar />
      <BreadCrumb />
      <div className="container mx-auto  py-6 pt-24 mt-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne gauche - Score et Compétences */}
          <div className="space-y-6">
            {/* Carte Score */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl border-2 border-blue-100/50 shadow-sm p-6 transition-all hover:shadow-md">
              {showFullScoreDescription ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100/50 text-blue-600">
                      <Award className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Score Global: {data?.global_evaluation?.score || 0}/100
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    {data?.global_evaluation?.description}
                  </p>
                  <button
                    onClick={toggleScoreDescription}
                    className="text-sm font-medium text-blue-500 hover:text-blue-600 flex items-center gap-1"
                  >
                    <BarChart2 className="h-4 w-4" />
                    Voir le graphique
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-24">
                    <Doughnut
                      data={chartData}
                      options={{
                        cutout: "70%",
                        plugins: { legend: { display: false } },
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold text-gray-800">
                        {data?.global_evaluation?.score || 0}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-500" />
                      <h3 className="text-lg font-semibold text-gray-800">
                        Score Global
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {data?.global_evaluation?.description?.substring(0, 60)}
                      ...
                    </p>
                    <button
                      onClick={toggleScoreDescription}
                      className="text-sm font-medium text-blue-500 hover:text-blue-600 flex items-center gap-1 mt-2"
                    >
                      <ChevronDown className="h-4 w-4" />
                      Voir plus
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Compétences Techniques */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl border-2 border-blue-100/50 shadow-sm p-6 px-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-100/50 text-blue-600">
                  <Code className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Compétences Techniques
                </h2>
              </div>
              <div className="space-y-3">
                {data?.hard_skills?.map((skill, index) => (
                  <div
                    key={index}
                    className={`rounded-lg overflow-hidden transition-all ${
                      expandedSkill === index ? "bg-blue-50/50" : ""
                    }`}
                  >
                    <div
                      className="p-3 flex justify-between items-center cursor-pointer hover:bg-blue-50/30 text-sm"
                      onClick={() => toggleSkill(index)}
                    >
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium text-gray-800">
                          {skill.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs px-2 py-1 rounded-full bg-blue-100/50 text-blue-600"
                          style={{
                            backgroundColor: `${getScoreColor(skill.score)}20`,
                            color: getScoreColor(skill.score),
                          }}
                        >
                          {skill.score}/100
                        </span>
                        {expandedSkill === index ? (
                          <ChevronUp className="h-4 w-4 text-blue-500" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                    </div>
                    {expandedSkill === index && (
                      <div className="px-3 pb-3 pt-1 bg-blue-50/30 animate-[fadeIn_0.2s_ease-out]">
                        <div className="w-full rounded-full h-2 mb-2 bg-blue-100/50">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${skill.score}%`,
                              backgroundColor: getScoreColor(skill.score),
                            }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-600 mb-2">
                          <span>Niveau</span>
                          <span
                            className={
                              skill.risk_level === "Élevé"
                                ? "text-red-500"
                                : "text-blue-500"
                            }
                          >
                            {skill.risk_level} risque
                          </span>
                        </div>
                        {skill.description && (
                          <p className="text-sm text-gray-600">
                            {skill.description}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne centrale - Aperçu du CV */}
          <div className="flex flex-col">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl border-2 border-blue-100/50 shadow-sm p-6 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-blue-100/50 text-blue-600">
                  <FileText className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Votre CV
                </h2>
              </div>
              <div className="flex-1 flex items-start justify-center p-2">
                {file && file.type.startsWith("image/") && (
                  <img
                    src={fileUrl}
                    alt="Aperçu du CV"
                    className="max-w-full max-h-[70vh] object-contain rounded-lg border border-blue-100/50"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Colonne droite - Axes d'amélioration */}
          {/* Colonne droite - Axes d'amélioration (version épurée) */}
          <div className="space-y-6">
            {/* Carte Axes d'Amélioration */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl border-2 border-blue-100/50 shadow-sm p-6">
              <div className="flex flex-col gap-4">
                {/* En-tête avec onglets */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100/50 text-blue-600">
                      <UserCheck className="h-5 w-5" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Axes d'Amélioration
                    </h2>
                  </div>

                  {/* Onglets simplifiés */}
                  <div className="flex border-b border-blue-100">
                    {["Soft Skills", "Hard Skills"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-sm font-medium transition-all relative ${
                          activeTab === tab
                            ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-500"
                            : "text-gray-500 hover:text-blue-500"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Liste des améliorations */}
                <div className="space-y-2">
                  {(activeTab === "Hard Skills"
                    ? data?.improvement_areas?.hard_skills
                    : data?.improvement_areas?.soft_skills
                  )?.map((area, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg transition-all hover:bg-blue-50/30"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 flex-shrink-0 ${
                            activeTab === "Hard Skills"
                              ? "text-blue-500"
                              : "text-purple-500"
                          }`}
                        >
                          {activeTab === "Hard Skills" ? (
                            <Code className="h-4 w-4" />
                          ) : (
                            <UserCheck className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {area.name}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {area.reason}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Détails d'évaluation (resté identique mais plus cohérent) */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl border-2 border-blue-100/50 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-100/50 text-blue-600">
                  <BarChart2 className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Détails d'Évaluation
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {data?.global_evaluation?.details?.map((detail, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-blue-50/30 hover:bg-blue-100/30 transition-colors"
                  >
                    <span>{detail.icon}</span>
                    <p className="text-xs text-blue-600">{detail.label}</p>
                    <p
                      className={`text-sm font-medium ${
                        detail.value === "Fort"
                          ? "text-green-500"
                          : detail.value === "Moyen"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {detail.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Ouvrir le chat"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <div className="relative">
            <MessageCircle className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white animate-pulse">
              1
            </span>
          </div>
        )}
      </button>
      <FloatingChatBot isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
