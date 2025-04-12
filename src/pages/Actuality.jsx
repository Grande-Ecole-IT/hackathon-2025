import { useState } from "react";
import {
  Search,
  Briefcase,
  Clock,
  DollarSign,
  Filter,
  ChevronDown,
  Heart,
  ArrowLeft,
  ArrowRight,
  Sliders,
  X,
  MapPin,
  CheckCircle,
  User,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router";

// Données structurées
const jobData = {
  categories: [
    { id: 1, name: "Développement Backend", count: 24 },
    { id: 2, name: "Développement Frontend", count: 42 },
    { id: 3, name: "Design UI/UX", count: 36 },
    { id: 4, name: "Marketing Digital", count: 18 },
    { id: 5, name: "Data Science", count: 15 },
  ],
  types: [
    { id: 1, name: "Temps Plein", count: 156 },
    { id: 2, name: "Temps Partiel", count: 84 },
    { id: 3, name: "Freelance", count: 72 },
    { id: 4, name: "Stage", count: 45 },
  ],
  jobs: [
    {
      id: 1,
      title: "Développeur Fullstack React/Node.js",
      company: "TechVision",
      location: "Paris (Remote possible)",
      salary: "65k-80k €/an",
      posted: "Il y a 2 heures",
      description:
        "Nous recherchons un développeur fullstack pour rejoindre notre équipe produit. Vous travaillerez sur des applications web modernes avec React et Node.js. Expérience minimum de 3 ans requise. Environnement agile avec des méthodes modernes de développement.",
      requirements: [
        "3+ ans d'expérience avec React et Node.js",
        "Maîtrise de TypeScript",
        "Expérience avec les bases de données NoSQL",
        "Capacité à travailler en équipe agile",
      ],
      tags: ["React", "Node.js", "TypeScript", "MongoDB"],
      verified: true,
      type: "Temps Plein",
      category: "Développement Frontend",
      saved: false,
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      title: "UX Designer Senior",
      company: "DesignHub",
      location: "Lyon",
      salary: "55k-70k €/an",
      posted: "Il y a 5 heures",
      description:
        "Poste de designer UX senior pour redéfinir l'expérience utilisateur de nos produits digitaux. Vous serez responsable de la conception d'interfaces intuitives et esthétiques en collaboration avec les équipes produit et développement.",
      requirements: [
        "5+ ans d'expérience en design UX/UI",
        "Maîtrise avancée de Figma",
        "Expérience en recherche utilisateur",
        "Portfolio démontrant des projets complexes",
      ],
      tags: ["Figma", "UX Research", "Prototypage", "UI Design"],
      verified: true,
      type: "Temps Plein",
      category: "Design UI/UX",
      saved: true,
      image:
        "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      title: "Data Analyst",
      company: "DataInsights",
      location: "Remote",
      salary: "50k-65k €/an",
      posted: "Il y a 1 jour",
      description:
        "Analyse de données clients et création de dashboards pour aider à la prise de décision. Vous transformerez des données complexes en insights actionnables pour les équipes métiers.",
      requirements: [
        "Maîtrise de SQL et Python",
        "Expérience avec Tableau ou PowerBI",
        "Capacité à communiquer des insights techniques",
        "2+ ans d'expérience en analyse de données",
      ],
      tags: ["SQL", "Python", "Tableau", "Analyse de données"],
      verified: false,
      type: "Temps Partiel",
      category: "Data Science",
      saved: false,
      image:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    },
  ],
};

const JobPage = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    types: [],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [savedJobs, setSavedJobs] = useState([2]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const toggleFilter = (type, id) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      if (newFilters[type].includes(id)) {
        newFilters[type] = newFilters[type].filter((item) => item !== id);
      } else {
        newFilters[type] = [...newFilters[type], id];
      }
      return newFilters;
    });
  };

  const toggleSavedJob = (id) => {
    if (savedJobs.includes(id)) {
      setSavedJobs(savedJobs.filter((jobId) => jobId !== id));
    } else {
      setSavedJobs([...savedJobs, id]);
    }
  };

  const openJobDetails = (job) => {
    setSelectedJob(job);
    setDetailsModalOpen(true);
  };

  const filteredJobs = jobData.jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategories =
      selectedFilters.categories.length === 0 ||
      selectedFilters.categories.includes(job.category);
    const matchesTypes =
      selectedFilters.types.length === 0 ||
      selectedFilters.types.includes(job.type);

    return matchesSearch && matchesCategories && matchesTypes;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-indigo-600 flex items-center">
              <Briefcase className="mr-2" />
              JobConnect
            </h1>

            <div className="hidden md:flex items-center space-x-6">
              <button className="text-gray-600 hover:text-indigo-600 transition-colors">
                Accueil
              </button>
              <button className="text-gray-600 hover:text-indigo-600 transition-colors">
                <Link to="/diagnostic">Diagnostic</Link>
              </button>
              <button className="text-gray-600 hover:text-indigo-600 transition-colors">
                Blog
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-indigo-50">
                <User size={20} />
              </button>
              <button className="hidden md:block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors">
                Publier une offre
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Search */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl p-8 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-4">
            Trouvez le job de vos rêves
          </h2>
          <p className="mb-6 max-w-2xl">
            Des milliers d'offres dans les métiers du digital, design et
            technologie
          </p>

          <div className="relative max-w-3xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-4 border border-transparent rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="Poste, compétences ou entreprise"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-2 top-2 bg-indigo-700 text-white px-4 py-2 rounded-md hover:bg-indigo-800">
              Rechercher
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-1/4">
            <div className="bg-white rounded-xl shadow p-6 sticky top-28">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Filter className="mr-2" />
                Filtres
              </h3>

              {/* Catégories */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Catégories</h4>
                <div className="space-y-2">
                  {jobData.categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center justify-between"
                    >
                      <button
                        onClick={() =>
                          toggleFilter("categories", category.name)
                        }
                        className={`flex items-center text-sm ${
                          selectedFilters.categories.includes(category.name)
                            ? "text-indigo-600 font-medium"
                            : "text-gray-600"
                        }`}
                      >
                        <span className="ml-2">{category.name}</span>
                      </button>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Type de contrat */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">
                  Type de contrat
                </h4>
                <div className="space-y-2">
                  {jobData.types.map((type) => (
                    <div
                      key={type.id}
                      className="flex items-center justify-between"
                    >
                      <button
                        onClick={() => toggleFilter("types", type.name)}
                        className={`flex items-center text-sm ${
                          selectedFilters.types.includes(type.name)
                            ? "text-indigo-600 font-medium"
                            : "text-gray-600"
                        }`}
                      >
                        <span>{type.name}</span>
                      </button>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {type.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() =>
                  setSelectedFilters({ categories: [], types: [] })
                }
                className="text-indigo-600 text-sm font-medium hover:text-indigo-800"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </div>

          {/* Mobile Filters Button */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center justify-center w-full py-3 border border-gray-300 rounded-lg bg-white text-gray-700 mb-4"
          >
            <Sliders className="mr-2" />
            Filtres
          </button>

          {/* Mobile Filters Panel */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 transition-opacity"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="inline-block align-bottom bg-white rounded-t-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Filtres
                    </h3>
                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  {/* Catégories */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">
                      Catégories
                    </h4>
                    <div className="space-y-2">
                      {jobData.categories.map((category) => (
                        <div
                          key={category.id}
                          className="flex items-center justify-between"
                        >
                          <button
                            onClick={() =>
                              toggleFilter("categories", category.name)
                            }
                            className={`flex items-center text-sm ${
                              selectedFilters.categories.includes(category.name)
                                ? "text-indigo-600 font-medium"
                                : "text-gray-600"
                            }`}
                          >
                            <span className="ml-2">{category.name}</span>
                          </button>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            {category.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Type de contrat */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">
                      Type de contrat
                    </h4>
                    <div className="space-y-2">
                      {jobData.types.map((type) => (
                        <div
                          key={type.id}
                          className="flex items-center justify-between"
                        >
                          <button
                            onClick={() => toggleFilter("types", type.name)}
                            className={`flex items-center text-sm ${
                              selectedFilters.types.includes(type.name)
                                ? "text-indigo-600 font-medium"
                                : "text-gray-600"
                            }`}
                          >
                            <span>{type.name}</span>
                          </button>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            {type.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() =>
                        setSelectedFilters({ categories: [], types: [] })
                      }
                      className="flex-1 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Réinitialiser
                    </button>
                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="flex-1 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      Appliquer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            {/* Results Header */}
            <div className="bg-white rounded-xl shadow p-6 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 sm:mb-0">
                  {filteredJobs.length} offres trouvées
                </h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Trier par :</span>
                  <div className="relative">
                    <select className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                      <option>Pertinence</option>
                      <option>Date (récent)</option>
                      <option>Salaire (haut)</option>
                      <option>Salaire (bas)</option>
                    </select>
                    <ChevronDown className="h-4 w-4 text-gray-400 absolute right-2 top-2.5 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Job Listings */}
            {filteredJobs.length > 0 ? (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-xl shadow hover:shadow-md transition-all overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                            <img
                              src={job.image}
                              alt={job.company}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                              {job.title}
                            </h3>
                            <p className="text-indigo-600 font-medium">
                              {job.company}
                            </p>
                            <div className="flex items-center mt-1 space-x-4">
                              <span className="flex items-center text-sm text-gray-600">
                                <MapPin className="h-4 w-4 mr-1" />
                                {job.location}
                              </span>
                              <span className="flex items-center text-sm text-gray-600">
                                <DollarSign className="h-4 w-4 mr-1" />
                                {job.salary}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleSavedJob(job.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          {savedJobs.includes(job.id) ? (
                            <Heart className="h-5 w-5 text-red-500" />
                          ) : (
                            <Heart className="h-5 w-5" />
                          )}
                        </button>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {job.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                          >
                            {tag}
                          </span>
                        ))}
                        {job.verified && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Vérifié
                          </span>
                        )}
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          <Clock className="h-4 w-4 inline mr-1" />
                          {job.posted}
                        </span>
                        <button
                          onClick={() => openJobDetails(job)}
                          className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                          Voir plus <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow p-8 text-center">
                <div className="mx-auto max-w-md">
                  <Search className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">
                    Aucun résultat
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Essayez d'ajuster vos filtres ou votre recherche pour
                    trouver ce que vous cherchez.
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={() => {
                        setSelectedFilters({ categories: [], types: [] });
                        setSearchQuery("");
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Réinitialiser les filtres
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Pagination */}
            {filteredJobs.length > 0 && (
              <div className="mt-8 flex items-center justify-between">
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Précédent
                </button>
                <div className="hidden md:flex space-x-2">
                  <button className="px-4 py-2 border border-indigo-500 text-indigo-600 rounded-md text-sm font-medium bg-indigo-50">
                    1
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50">
                    3
                  </button>
                  <span className="px-4 py-2 text-gray-500">...</span>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50">
                    8
                  </button>
                </div>
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Suivant
                  <ArrowRight className="h-5 w-5 ml-2" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Job Details Modal */}
      {detailsModalOpen && selectedJob && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={() => setDetailsModalOpen(false)}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  onClick={() => setDetailsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {selectedJob.title}
                      </h3>
                      <p className="text-indigo-600 font-medium text-lg">
                        {selectedJob.company}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleSavedJob(selectedJob.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      {savedJobs.includes(selectedJob.id) ? (
                        <HeartFill className="h-6 w-6 text-red-500" />
                      ) : (
                        <Heart className="h-6 w-6" />
                      )}
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    <span className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-1" />
                      {selectedJob.location}
                    </span>
                    <span className="flex items-center text-gray-600">
                      <DollarSign className="h-5 w-5 mr-1" />
                      {selectedJob.salary}
                    </span>
                    <span className="flex items-center text-gray-600">
                      <Clock className="h-5 w-5 mr-1" />
                      {selectedJob.posted}
                    </span>
                    {selectedJob.verified && (
                      <span className="inline-flex items-center text-green-600">
                        <CheckCircle className="h-5 w-5 mr-1" />
                        Entreprise vérifiée
                      </span>
                    )}
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Description du poste
                    </h4>
                    <p className="text-gray-700">{selectedJob.description}</p>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Compétences requises
                    </h4>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      {selectedJob.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {selectedJob.type}
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end space-x-3">
                    <button
                      onClick={() => setDetailsModalOpen(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Fermer
                    </button>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">
                      Postuler maintenant
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPage;
