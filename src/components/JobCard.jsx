import { Star } from "lucide-react";
import { useState } from "react";

const JobCard = ({ job }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Carte normale (compacte) */}
      <div
        className={`bg-white rounded-xl p-6 border border-gray-200 relative overflow-hidden
                    transition-all duration-300 hover:shadow-lg cursor-pointer
                    ${isExpanded ? "ring-2 ring-black" : ""}`}
        onClick={toggleExpand}
      >
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900">{job.post_name}</h3>
        </div>

        <div className="flex items-center mb-4">
          <Star className="text-yellow-500 w-5 h-5 mr-2" />
          <span className="text-gray-900 font-semibold">
            {job.min_salary.toLocaleString()} -{" "}
            {job.max_salary.toLocaleString()} {job.currency}
          </span>
        </div>

        <p className="text-gray-700 mb-4 line-clamp-2 text-sm">{job.details}</p>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            Compétences clés:
          </h4>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, i) => (
              <span
                key={i}
                className="bg-gray-100 text-gray-900 px-3 py-1 rounded-full text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Modal-like pour l'expansion */}
      {isExpanded && (
        <div className="fixed inset-0 backdrop-blur-lg flex items-center justify-center p-4 z-50">
          <div
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand();
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {job.post_name}
              </h2>
            </div>

            <div className="flex items-center mb-6">
              <Star className="text-yellow-500 w-5 h-5 mr-2" />
              <span className="text-lg font-semibold text-gray-900">
                {job.min_salary.toLocaleString()} -{" "}
                {job.max_salary.toLocaleString()} {job.currency}
              </span>
            </div>

            <div className="prose max-w-none mb-6">
              <p className="text-gray-700 whitespace-pre-line text-sm">
                {job.details}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Compétences demandés:
              </h3>
              <div className="flex flex-wrap gap-3">
                {job.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-gray-900 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobCard;
