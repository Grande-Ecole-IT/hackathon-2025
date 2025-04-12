/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import CardSkeleton from "../components/CardSkeleton";
import DashboardCards from "../components/DashboardCards";
import FilterSidebar from "../components/FilterSidebar";
import FloatingChatBot from "../components/FloatingChatBot";
import JobList from "../components/JobList";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCard, setExpandedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const jobsUri = "https://hackathon-2025-back.onrender.com/job-trend";

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(jobsUri);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setJobs(data);
        setFilteredJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleFilter = (filters) => {
    const results = jobs.filter((job) => {
      const salaryMatch =
        job.min_salary >= filters.salaryRange[0] &&
        job.max_salary <= filters.salaryRange[1];
      const skillsMatch =
        filters.skills.length === 0 ||
        filters.skills.some((skill) => job.skills.includes(skill));
      return salaryMatch && skillsMatch;
    });
    setFilteredJobs(results);
  };

  useEffect(() => {
    const results = jobs.filter(
      (job) =>
        job.post_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    setFilteredJobs(results);
  }, [searchTerm, jobs]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-violet-50/30">
      <Navbar />
      <div className="w-full h-auto pt-24 pb-10">
        <div className="container mx-auto px-4">
          <DashboardCards onOpenModal={() => setIsModalOpen(true)} />

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <FilterSidebar onFilter={handleFilter} />
            </div>

            <div className="lg:w-3/4">
              <h3 className="py-6 text-2xl text-gray-800 font-medium">
                Les métiers tendances:
              </h3>

              <div className="  mb-6 ">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher des métiers ou compétences..."
                    className="w-full px-4 py-3 rounded-lg border-2 border-blue-100/60 bg-white/50 
                              focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <svg
                    className="absolute right-3 top-3.5 h-5 w-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  <CardSkeleton />
                  <CardSkeleton />
                  <CardSkeleton />
                </div>
              )}

              {error && (
                <div
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border-2 border-blue-100/50 
                              shadow-sm text-center max-w-md mx-auto"
                >
                  <p className="font-medium text-red-500">
                    Erreur lors du chargement:
                  </p>
                  <p className="mb-3 text-gray-700">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium py-2 px-4 rounded-lg 
                              hover:from-blue-600 hover:to-violet-600 transition-colors"
                  >
                    Réessayer
                  </button>
                </div>
              )}
              {!loading && !error && (
                <>
                  {filteredJobs.length === 0 ? (
                    <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-xl border-2 border-blue-100/50 p-6">
                      <p className="text-gray-700">
                        Aucun métier trouvé correspondant à vos critères.
                      </p>
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setFilteredJobs(jobs);
                        }}
                        className="mt-4 text-violet-600 font-medium hover:underline"
                      >
                        Réinitialiser les filtres
                      </button>
                    </div>
                  ) : (
                    <JobList
                      jobs={filteredJobs}
                      expandedCard={expandedCard}
                      setExpandedCard={setExpandedCard}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        {showScrollTop && (
          <motion.div
            className="fixed inset-x-0 bottom-4 flex justify-center z-50 pointer-events-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="pointer-events-auto bg-white/10 backdrop-blur-lg p-3 rounded-full shadow-xl hover:shadow-2xl transition-all"
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
                <path d="m5 12 7-7 7 7" />
                <path d="M12 19V5" />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {/* Floating Chat Icon - ABSOLUTE POSITION */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        style={{
          position: "fixed",
          right: "24px",
          bottom: "24px",
        }}
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
};

export default HomePage;
