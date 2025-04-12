import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { useLocation } from "react-router";
import Navbar from "../components/Navbar";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CVAnalysisDashboard() {
  const location = useLocation();
  const { data, file } = location.state || {};
  const [fileUrl, setFileUrl] = useState("");
  const [activeTab, setActiveTab] = useState("Soft Skills"); // Changé pour Soft Skills par défaut
  const [expandedSkill, setExpandedSkill] = useState(null);
  const [showFullScoreDescription, setShowFullScoreDescription] =
    useState(false);

  // Couleurs du thème
  const themeColors = {
    primary: "#6473FF",
    secondary: "#7864FF",
    accent: "#00B38F",
    light: "#F0F4F8",
    dark: "#1E293B",
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
    if (score > 50) return themeColors.primary;
    if (score > 25) return themeColors.secondary;
    return themeColors.secondary;
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
          themeColors.light,
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

  const truncateText = (text, length = 50) => {
    if (!text) return "";
    return text.length > length ? `${text.substring(0, length)}...` : text;
  };

  return (
    <div
      className="min-h-screen bg-gray-50 flex flex-col"
      style={{ backgroundColor: themeColors.light }}
    >
      <Navbar />

      <div className="flex-1 overflow-auto p-4 mt-18">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne centrale - CV */}
          <div className="flex flex-col">
            <div className="flex-1 flex flex-col">
              <div className="flex-1 flex items-start justify-center">
                {file && file.type.startsWith("image/") && (
                  <img
                    src={fileUrl}
                    alt="Aperçu du CV"
                    className="max-w-full max-h-[70vh] object-contain rounded"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Colonne gauche - Score et Compétences */}
          <div className="space-y-6">
            {/* Carte Score - Version compacte/étendue */}
            {showFullScoreDescription ? (
              <div
                className="rounded-xl shadow-md p-6 transition-all"
                style={{
                  backgroundColor: "white",
                  borderLeft: `4px solid ${themeColors.primary}`,
                }}
              >
                <h3
                  className="text-lg font-semibold mb-3"
                  style={{ color: themeColors.dark }}
                >
                  Score Global: {data?.global_evaluation?.score || 0}/100
                </h3>
                <p className="text-sm" style={{ color: themeColors.dark }}>
                  {data?.global_evaluation?.description}
                </p>
                <button
                  onClick={toggleScoreDescription}
                  className="mt-3 text-sm font-medium"
                  style={{ color: themeColors.primary }}
                >
                  Voir le graphique
                </button>
              </div>
            ) : (
              <div
                className="rounded-xl shadow-md p-6 transition-all hover:shadow-lg"
                style={{
                  backgroundColor: "white",
                  borderLeft: `4px solid ${themeColors.primary}`,
                }}
              >
                <div className="flex items-center">
                  <div className="relative w-24 h-24">
                    {" "}
                    {/* Taille augmentée */}
                    <Doughnut
                      data={chartData}
                      options={{
                        cutout: "70%",
                        plugins: { legend: { display: false } },
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="text-2xl font-bold"
                        style={{ color: themeColors.dark }}
                      >
                        {data?.global_evaluation?.score || 0}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3
                      className="text-lg font-semibold"
                      style={{ color: themeColors.dark }}
                    >
                      Score Global
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: themeColors.primary }}
                    >
                      {truncateText(data?.global_evaluation?.description, 60)}
                      {data?.global_evaluation?.description?.length > 60 && (
                        <button
                          onClick={toggleScoreDescription}
                          className="ml-1 text-sm font-medium"
                          style={{ color: themeColors.primary }}
                        >
                          Voir plus
                        </button>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Compétences Techniques */}
            <div
              className="rounded-xl shadow-md p-6 transition-all hover:shadow-lg"
              style={{ backgroundColor: "white" }}
            >
              <h2
                className="text-xl font-semibold mb-4 pb-2 border-b"
                style={{
                  color: themeColors.dark,
                  borderColor: themeColors.light,
                }}
              >
                Compétences Techniques
              </h2>
              <div className="space-y-3">
                {data?.hard_skills?.map((skill, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg overflow-hidden transition-all duration-200 ${
                      expandedSkill === index
                        ? "border-gray-300"
                        : "border-transparent"
                    }`}
                  >
                    <div
                      className="p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleSkill(index)}
                      style={{
                        backgroundColor:
                          expandedSkill === index
                            ? themeColors.light
                            : "transparent",
                      }}
                    >
                      <span
                        className="font-medium"
                        style={{ color: themeColors.dark }}
                      >
                        {skill.name}
                      </span>
                      <div className="flex items-center">
                        <span
                          className="text-sm px-2 py-1 rounded mr-2"
                          style={{
                            backgroundColor: themeColors.light,
                            color: themeColors.primary,
                          }}
                        >
                          {skill.score}/100
                        </span>
                        <svg
                          className={`w-4 h-4 transform transition-transform ${
                            expandedSkill === index ? "rotate-180" : ""
                          }`}
                          style={{ color: themeColors.primary }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                    {expandedSkill === index && (
                      <div
                        className="px-3 pb-3 pt-1 animate-fadeIn"
                        style={{ backgroundColor: themeColors.light }}
                      >
                        <div
                          className="w-full rounded-full h-2 mb-2"
                          style={{ backgroundColor: themeColors.light }}
                        >
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${skill.score}%`,
                              backgroundColor: getScoreColor(skill.score),
                            }}
                          />
                        </div>
                        <div className="flex justify-between text-xs mb-2">
                          <span style={{ color: themeColors.dark }}>
                            Niveau
                          </span>
                          <span
                            style={{
                              color:
                                skill.risk_level === "Élevé"
                                  ? "#EF4444"
                                  : themeColors.primary,
                            }}
                          >
                            {skill.risk_level} risque
                          </span>
                        </div>
                        {skill.description && (
                          <p
                            className="text-sm"
                            style={{ color: themeColors.dark }}
                          >
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

          {/* Colonne droite - Axes d'amélioration */}
          <div className="space-y-6">
            <div
              className="rounded-xl shadow-md p-6 transition-all hover:shadow-lg"
              style={{ backgroundColor: "white" }}
            >
              <div
                className="flex items-center justify-between mb-4 pb-2 border-b"
                style={{ borderColor: themeColors.light }}
              >
                <h2
                  className="text-xl font-semibold"
                  style={{ color: themeColors.dark }}
                >
                  Axes d'Amélioration
                </h2>
                <div
                  className="flex rounded-lg p-1"
                  style={{ backgroundColor: themeColors.light }}
                >
                  {["Soft Skills", "Hard Skills"].map(
                    (
                      tab // Ordre inversé
                    ) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-1 text-sm rounded-md transition-all ${
                          activeTab === tab
                            ? "shadow text-white"
                            : "text-gray-600"
                        }`}
                        style={{
                          backgroundColor:
                            activeTab === tab
                              ? themeColors.primary
                              : "transparent",
                        }}
                      >
                        {tab}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="space-y-3">
                {(activeTab === "Hard Skills"
                  ? data?.improvement_areas?.hard_skills
                  : data?.improvement_areas?.soft_skills
                )?.map((area, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg transition-all hover:shadow-sm"
                    style={{
                      backgroundColor: themeColors.light,
                      borderLeft: `3px solid ${
                        activeTab === "Hard Skills"
                          ? themeColors.primary
                          : themeColors.secondary
                      }`,
                    }}
                  >
                    <div className="flex items-start">
                      <div>
                        <p
                          className="font-medium"
                          style={{ color: themeColors.dark }}
                        >
                          {area.name}
                        </p>
                        <p
                          className="text-sm mt-1"
                          style={{ color: themeColors.primary }}
                        >
                          {area.reason}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-xl shadow-md p-6 transition-all hover:shadow-lg"
              style={{ backgroundColor: "white" }}
            >
              <h2
                className="text-xl font-semibold mb-4 pb-2 border-b"
                style={{
                  color: themeColors.dark,
                  borderColor: themeColors.light,
                }}
              >
                Détails d'Évaluation
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {data?.global_evaluation?.details?.map((detail, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg text-center transition-all hover:shadow-sm"
                    style={{ backgroundColor: themeColors.light }}
                  >
                    <p
                      className="text-xs"
                      style={{ color: themeColors.primary }}
                    >
                      {detail.label}
                    </p>
                    <p
                      className="font-medium text-sm"
                      style={{
                        color:
                          detail.value === "Faible"
                            ? "#10B981"
                            : detail.value === "Moyen"
                            ? "#F59E0B"
                            : "#EF4444",
                      }}
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
    </div>
  );
}
