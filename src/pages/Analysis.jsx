import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CVAnalysisDashboard() {
  const [activeSection, setActiveSection] = useState(null);
  const cvImage = "/cv.png"; // Chemin vers l'image du CV

  // Données d'exemple
  const data = {
    globalScore: {
      score: 72,
      label: "Bon potentiel",
      description: "Votre profil présente de bonnes perspectives face à l'automatisation par l'IA.",
      details: [
        { label: "Adaptabilité", value: "Élevée", icon: "🔄" },
        { label: "Potentiel évolutif", value: "Fort", icon: "📈" },
        { label: "Résilience IA", value: "72/100", icon: "🤖" }
      ]
    },
    skills: [
      { 
        name: "Développement", 
        score: 85, 
        status: "Fort",
        details: {
          niveau: "Avancé",
          projets: "15+ projets réalisés",
          technologies: "React, Node.js, Python",
          recommandation: "Approfondir l'architecture cloud"
        }
      },
      { 
        name: "Analyse", 
        score: 68, 
        status: "Moyen",
        details: {
          niveau: "Intermédiaire",
          projets: "Analyse de données complexes",
          technologies: "SQL, Tableau, Pandas",
          recommandation: "Certification en Data Science"
        }
      },
      { 
        name: "Gestion de projet", 
        score: 73, 
        status: "Bon",
        details: {
          niveau: "Intermédiaire+",
          projets: "5 projets menés",
          methodologies: "Agile, Scrum",
          recommandation: "Formation PMP"
        }
      },
      { 
        name: "UI/UX", 
        score: 62, 
        status: "Moyen",
        details: {
          niveau: "Intermédiaire",
          outils: "Figma, Adobe XD",
          projets: "3 designs systèmes",
          recommandation: "Cours avancé en design d'interaction"
        }
      },
    ],
    improvementAreas: [
      { 
        name: "Intelligence émotionnelle", 
        reason: "Essentielle pour le leadership",
        resources: ["Formation en management", "Livre: Emotional Intelligence 2.0"]
      },
      { 
        name: "Analyse de données IA", 
        reason: "Compétence clé pour l'avenir",
        resources: ["Cours: Machine Learning basics", "Certification Google Analytics"]
      },
    ],
    comparison: {
      text: "Meilleur que 65% des profils similaires",
      percentile: 65,
      averageScore: 58
    }
  };

  const chartData = {
    labels: ["Score", ""],
    datasets: [{
      data: [data.globalScore.score, 100 - data.globalScore.score],
      backgroundColor: ["#6366F1", "#F3F4F6"],
      borderWidth: 0,
    }]
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text">
            Analyse de Compétences
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Évaluation de votre profil professionnel
          </p>
        </header>

        <div className="w-full grid grid-cols-1 lg:grid-cols-[2fr_2.8fr_1.2fr] gap-6">
          {/* Colonne de gauche - CV en grand format */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold text-lg text-gray-800 flex items-center">
                <span className="bg-indigo-100 text-indigo-600 p-2 rounded-lg mr-3">
                  📄
                </span>
                Votre CV
              </h2>
            </div>
            <div className="flex-1 overflow-auto p-2">
              <img
                src={cvImage}
                alt="CV analysé"
                className="w-full h-auto object-contain rounded-lg shadow-sm"
              />
            </div>
          </div>

          {/* Colonne centrale - Compétences détaillées */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              <div className="p-5 border-b border-gray-200">
                <h2 className="font-semibold text-lg text-gray-800 flex items-center">
                  <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">
                    🛠️
                  </span>
                  Analyse des Compétences Techniques
                </h2>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.skills.map((skill, index) => (
                  <div
                    key={index}
                    className={`rounded-lg border p-4 transition-all ${
                      activeSection === `skill-${index}`
                        ? "border-indigo-300 bg-indigo-50 shadow-inner"
                        : "border-gray-200 hover:border-indigo-200 bg-gray-50"
                    }`}
                    onClick={() => setActiveSection(activeSection === `skill-${index}` ? null : `skill-${index}`)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-800 text-lg">{skill.name}</h3>
                        <div className="flex items-center mt-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-3">
                            <div
                              className={`h-2.5 rounded-full ${
                                skill.score > 80 ? "bg-emerald-500" :
                                skill.score > 60 ? "bg-blue-500" :
                                "bg-amber-500"
                              }`}
                              style={{ width: `${skill.score}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {skill.score}/100
                          </span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        skill.score > 80 ? "bg-emerald-100 text-emerald-800" :
                        skill.score > 60 ? "bg-blue-100 text-blue-800" :
                        "bg-amber-100 text-amber-800"
                      }`}>
                        {skill.status}
                      </span>
                    </div>

                    {activeSection === `skill-${index}` && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500 font-medium">Niveau</p>
                            <p className="text-gray-800">{skill.details.niveau}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 font-medium">Expérience</p>
                            <p className="text-gray-800">{skill.details.projets}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 font-medium">Technologies</p>
                            <p className="text-gray-800">{skill.details.technologies || skill.details.outils || skill.details.methodologies}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 font-medium">Recommandation</p>
                            <p className="text-indigo-600">{skill.details.recommandation}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              <div className="p-5 border-b border-gray-200">
                <h2 className="font-semibold text-lg text-gray-800 flex items-center">
                  <span className="bg-amber-100 text-amber-600 p-2 rounded-lg mr-3">
                    🚀
                  </span>
                  Axes d'Amélioration
                </h2>
              </div>
              <div className="p-4 space-y-4">
                {data.improvementAreas.map((area, index) => (
                  <div key={index} className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                    <h3 className="font-medium text-gray-800 flex items-center">
                      <span className="bg-amber-100 text-amber-600 p-1.5 rounded-lg mr-2">
                        {index + 1}
                      </span>
                      {area.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{area.reason}</p>
                    <div className="mt-3">
                      <p className="text-xs font-medium text-gray-500 mb-1">Ressources suggérées:</p>
                      <div className="flex flex-wrap gap-2">
                        {area.resources.map((resource, i) => (
                          <span key={i} className="text-xs bg-white px-3 py-1 rounded-full border border-gray-200">
                            {resource}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne de droite - Score global et synthèse */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              <div className="p-5 border-b border-gray-200">
                <h2 className="font-semibold text-lg text-gray-800 flex items-center">
                  <span className="bg-purple-100 text-purple-600 p-2 rounded-lg mr-3">
                    📊
                  </span>
                  Score Global
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
                      {data.globalScore.score}
                    </span>
                    <span className="text-sm text-gray-500">/100</span>
                    <span className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                      data.globalScore.score > 80 ? "bg-emerald-100 text-emerald-800" :
                      data.globalScore.score > 60 ? "bg-blue-100 text-blue-800" :
                      "bg-amber-100 text-amber-800"
                    }`}>
                      {data.globalScore.label}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-center mb-4">
                  {data.globalScore.description}
                </p>
                <div className="w-full space-y-3">
                  {data.globalScore.details.map((detail, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-xl mr-3">{detail.icon}</span>
                      <div>
                        <p className="text-xs text-gray-500">{detail.label}</p>
                        <p className="font-medium text-gray-800">{detail.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              <div className="p-5 border-b border-gray-200">
                <h2 className="font-semibold text-lg text-gray-800 flex items-center">
                  <span className="bg-green-100 text-green-600 p-2 rounded-lg mr-3">
                    📌
                  </span>
                  Comparaison
                </h2>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-700">Votre score</span>
                  <span className="font-medium text-gray-800">{data.globalScore.score}/100</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-700">Moyenne des pairs</span>
                  <span className="font-medium text-gray-800">{data.comparison.averageScore}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full"
                    style={{ width: `${data.comparison.percentile}%` }}
                  ></div>
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">
                  {data.comparison.text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}