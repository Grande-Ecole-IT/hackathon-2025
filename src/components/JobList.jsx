import JobCard from "./JobCard";
const JobList = ({ jobs, expandedCard, setExpandedCard }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {jobs.map((job, index) => (
        <JobCard
          key={index}
          job={job}
          isExpanded={expandedCard === index}
          onClick={() => setExpandedCard(expandedCard === index ? null : index)}
        />
      ))}
    </div>
  );
};

export default JobList;
