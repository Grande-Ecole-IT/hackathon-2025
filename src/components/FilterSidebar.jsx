import { useState } from "react";

const FilterSidebar = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    salaryRange: [0, 10000],
    skills: [],
  });

  const skillsOptions = [
    "Communication",
    "Analysis",
    "Technical",
    "Management",
    "Creativity",
    "Problem Solving",
  ];

  const handleSkillToggle = (skill) => {
    setFilters((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg h-fit sticky top-24">
      <h3 className="font-bold text-lg mb-4 text-gray-900">Filters</h3>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Salary Range
        </label>
        <input
          type="range"
          min="0"
          max="10000"
          step="1000"
          className="w-full"
          onChange={(e) =>
            setFilters({ ...filters, salaryRange: [0, e.target.value] })
          }
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0 {filters.currency}</span>
          <span>
            {filters.salaryRange[1]} {filters.currency}
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Skills
        </label>
        <div className="space-y-2">
          {skillsOptions.map((skill) => (
            <div key={skill} className="flex items-center">
              <input
                type="checkbox"
                id={skill}
                checked={filters.skills.includes(skill)}
                onChange={() => handleSkillToggle(skill)}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <label htmlFor={skill} className="ml-2 text-sm text-gray-700">
                {skill}
              </label>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => onFilter(filters)}
        className="mt-6 w-full bg-gradient-to-r from-blue-500 to-violet-500 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
