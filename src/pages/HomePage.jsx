import { useEffect, useState } from "react";
import DashboardCards from "../components/DashboardCards";
import FilterSidebar from "../components/FilterSidebar";
import JobList from "../components/JobList";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import CardSkeleton from "../components/CardSkeleton";

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCard, setExpandedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const jobsUri = "https://hackathon-2025-back.onrender.com/job-trend";

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
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="w-full h-auto pt-24 pb-10">
        <div className="container mx-auto px-4">
          <DashboardCards onOpenModal={() => setIsModalOpen(true)} />

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <FilterSidebar onFilter={handleFilter} />
            </div>

            <div className="lg:w-3/4">
              <h3 className="py-6 text-2xl">Les métiers tendances:</h3>

              <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search jobs or skills..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 
                              focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <svg
                    className="absolute right-3 top-3.5 h-5 w-5 text-gray-400"
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
                  className="bg-white text-gray-800 p-4 rounded-xl border border-gray-200 
                              shadow-sm text-center max-w-md mx-auto"
                >
                  <p className="font-medium text-red-600">
                    Error loading jobs:
                  </p>
                  <p className="mb-3">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-3 bg-black text-white font-medium py-2 px-4 rounded-lg 
                              hover:bg-gray-800 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              )}
              {!loading && !error && (
                <>
                  {filteredJobs.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-700">
                        No jobs found matching your criteria.
                      </p>
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setFilteredJobs(jobs);
                        }}
                        className="mt-4 text-black font-medium hover:underline"
                      >
                        Clear all filters
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
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default HomePage;
