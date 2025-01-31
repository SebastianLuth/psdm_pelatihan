import React from "react";

const FormSkeleton = () => {
  return (
    <div className="w-full h-screen flex items-start justify-center pt-10">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-40 mb-6"></div>
        
        <div className="h-12 bg-gray-300 rounded w-full mb-6"></div>
        <div className="h-12 bg-gray-300 rounded w-full mb-6"></div>
        <div className="h-28 bg-gray-300 rounded w-full mb-6"></div>
        
        <div className="h-12 bg-gray-400 rounded w-full"></div>
      </div>
    </div>
  );
};

export default FormSkeleton;