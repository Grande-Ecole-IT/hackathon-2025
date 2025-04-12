const CardSkeleton = () => {
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-200 relative overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer animate-pulse">
        <div className="h-7 bg-gray-300 rounded-full w-1/3 mb-4"></div>
        
        <div className="h-5 bg-gray-200 rounded-full w-1/4 mb-6"></div>
        
        <div className="space-y-3 mb-6">
          <div className="h-4 bg-gray-200 rounded-full w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
        </div>
        
        <div className="space-y-3">
          <div className="h-4 bg-gray-300 rounded-full w-1/4 mb-2"></div>
          <div className="flex flex-wrap gap-2">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="h-6 bg-gray-200 rounded-lg w-1/5"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  export default CardSkeleton;