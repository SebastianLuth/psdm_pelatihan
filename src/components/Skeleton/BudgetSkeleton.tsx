import React from "react";

const BudgetSkeleton: React.FC = () => {
  return (
    <div className="p-6 animate-pulse">
      <h1 className="mb-12 h-10 w-1/2 mx-auto bg-gray-300 dark:bg-gray-700 rounded"></h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
        {Array(5).fill(0).map((_, index) => (
          <div
            key={index}
            className="flex items-center rounded-xl bg-gray-300 dark:bg-gray-700 p-4 shadow-lg"
          >
            <div className="h-16 w-16 rounded-full bg-gray-400 dark:bg-gray-600"></div>
            <div className="ml-4">
              <div className="h-4 w-32 bg-gray-400 dark:bg-gray-600 rounded mb-2"></div>
              <div className="h-6 w-24 bg-gray-400 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 h-96 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
      
      <div className="mt-12 p-8 rounded-xl bg-gray-300 dark:bg-gray-700">
        <div className="h-8 w-1/3 bg-gray-400 dark:bg-gray-600 rounded mb-8"></div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse rounded-xl">
            <thead className="bg-gray-400 dark:bg-gray-600">
              <tr>
                {Array(7).fill(0).map((_, index) => (
                  <th
                    key={index}
                    className="px-6 py-4 text-left"
                  >
                    <div className="h-4 w-20 bg-gray-500 dark:bg-gray-700 rounded"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array(5).fill(0).map((_, index) => (
                <tr key={index} className="bg-gray-300 dark:bg-gray-700">
                  {Array(7).fill(0).map((_, subIndex) => (
                    <td
                      key={subIndex}
                      className="px-6 py-4"
                    >
                      <div className="h-4 w-24 bg-gray-400 dark:bg-gray-600 rounded"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BudgetSkeleton;
