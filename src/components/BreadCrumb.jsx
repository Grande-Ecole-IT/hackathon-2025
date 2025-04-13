import { Link, useLocation } from "react-router";

const BreadCrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname?.split("/").filter(Boolean);

  const getPathForSegment = (index) => {
    return "/" + pathSegments.slice(0, index + 1).join("/");
  };

  return (
    <div className="m-10">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-md text-gray-700">
          <li>
            <Link
              to="/home"
              className="flex items-center transition-all duration-300 ease-in-out hover:text-blue-500 hover:scale-105"
              aria-label="Home"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home
            </Link>
          </li>

          {pathSegments?.map((path, index) => (
            <li key={index} className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-gray-600 mx-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <Link
                to={getPathForSegment(index)}
                className={`capitalize transition-all duration-300 ease-in-out hover:text-blue-500 hover:scale-105 ${
                  index === pathSegments.length - 1
                    ? "text-blue-600 border-b-2 p-1" // Style pour le dernier élément
                    : "text-blue-600" // Style pour les autres éléments
                }`}
              >
                {path}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default BreadCrumb;