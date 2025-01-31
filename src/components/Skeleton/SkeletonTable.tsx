
const SkeletonTable = ({title} : {title: string}) => {
    return (
      <div className="relative overflow-hidden rounded-xl border border-gray-300 shadow-xl backdrop-blur-lg dark:border-gray-700 dark:bg-gray-900/70">
        <div className="px-6 py-5">
          <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Loading Data {title}
            ...</h4>
        </div>
        <div className="overflow-x">
          {/* Header Table */}
          <table className="min-w-full border-collapse text-left text-sm text-gray-700 dark:text-gray-300">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                <th className="px-6 py-4">
                  <div className="w-16 h-4 bg-gray-300 animate-pulse rounded"></div>
                </th>
                <th className="px-6 py-4">
                  <div className="w-24 h-4 bg-gray-300 animate-pulse rounded"></div>
                </th>
                <th className="px-6 py-4">
                  <div className="w-24 h-4 bg-gray-300 animate-pulse rounded"></div>
                </th>
                <th className="px-6 py-4">
                  <div className="w-24 h-4 bg-gray-300 animate-pulse rounded"></div>
                </th>
                <th className="px-6 py-4">
                  <div className="w-24 h-4 bg-gray-300 animate-pulse rounded"></div>
                </th>
                <th className="px-6 py-4">
                  <div className="w-24 h-4 bg-gray-300 animate-pulse rounded"></div>
                </th>
                <th className="px-6 py-4">
                  <div className="w-24 h-4 bg-gray-300 animate-pulse rounded"></div>
                </th>
                <th className="px-6 py-4">
                  <div className="w-24 h-4 bg-gray-300 animate-pulse rounded"></div>
                </th>
                <th className="px-6 py-4">
                  <div className="w-24 h-4 bg-gray-300 animate-pulse rounded"></div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {/* Skeleton Rows */}
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4">
                      <div className="w-16 h-4 bg-gray-300 animate-pulse rounded"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-24 h-4 bg-gray-300 animate-pulse rounded"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-24 h-4 bg-gray-300 animate-pulse rounded"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-24 h-4 bg-gray-300 animate-pulse rounded"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-24 h-4 bg-gray-300 animate-pulse rounded"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-24 h-4 bg-gray-300 animate-pulse rounded"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-24 h-4 bg-gray-300 animate-pulse rounded"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-24 h-4 bg-gray-300 animate-pulse rounded"></div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="w-16 h-4 bg-gray-300 animate-pulse rounded"></div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default SkeletonTable;
  