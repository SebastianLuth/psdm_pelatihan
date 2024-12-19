"use client";
import { deleteBudget, getAllBudget } from "@/service/budget";
import { budgetType } from "@/types/budget-types";
import { useCallback, useEffect, useState, Suspense, ChangeEvent } from "react";
import { ErrorBoundary } from "react-error-boundary";
import React from "react";
import { debounce } from "lodash";
import { useRouter } from 'next/navigation';
const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => (
  <div role="alert">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);

const TableDataAnggaran: React.FC = () => {
  const [budgetData, setBudgetData] = useState<budgetType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const fetchAllBudget = useCallback(async () => {
    setLoading(true);
    setError(false);
    setSuccess(false);
    try {
      const result = await getAllBudget();
      setBudgetData(result);
      setSuccess(true);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDeleteBudget = async (id: number | undefined) => {
    setLoading(true);
    try {
      await deleteBudget(id);
      fetchAllBudget();
    } catch (error) {
      console.log(error || "Data tidak ditemukan");
    } finally {
      setLoading(false);
    }
  };

  const handleDetail = (id: number | undefined) => {
    if (id) {
      router.push(`/budget/budget_data/${id}`);
    }
  };

  useEffect(() => {
    fetchAllBudget();
  }, [fetchAllBudget]);

  const debouncedSearch = debounce((query: string) => {
    setSearchQuery(query);
  }, 300);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  const filteredBudgetData = budgetData.filter(budget =>
    budget.jenis_anggaran.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={fetchAllBudget}>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="relative overflow-hidden rounded-xl border border-gray-300 bg-white/70 shadow-xl backdrop-blur-lg dark:border-gray-700 dark:bg-gray-900/70">
          <div className="px-6 py-5">
            <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Semua Data Anggaran
            </h4>
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-3">
                <span className="text-gray-700 dark:text-gray-300">Show</span>
                <select className="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <span className="text-gray-700 dark:text-gray-300">entries</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-gray-700 dark:text-gray-300">
                  Search:
                </span>
                <input
                  type="text"
                  className="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                  placeholder="Search..."
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {/* Header Table */}
            <table className="min-w-full border-collapse text-left text-sm text-gray-700 dark:text-gray-300">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                  <th className="px-4 py-4">No</th>
                  <th className="px-4 py-4">Jenis Anggaran</th>
                  <th className="px-4 py-4">Total Anggaran</th>
                  <th className="px-4 py-4">Sisa Anggaran</th>
                  <th className="px-4 py-4">Tahun Anggaran</th>
                  <th className="px-4 py-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredBudgetData.map((budget, index) => (
                  <tr
                    key={budget.id}
                    className="group transform transition-transform duration-200 hover:scale-[1.02] hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-4 py-4 text-gray-800 dark:text-gray-100">
                      {index + 1}
                    </td>
                    <td className="px-4 py-4 text-gray-800 dark:text-gray-100">
                      {budget.jenis_anggaran}
                    </td>
                    <td className="px-4 py-4 text-gray-800 dark:text-gray-100">
                      {budget.total_anggaran}
                    </td>
                    <td className="px-4 py-4 text-gray-800 dark:text-gray-100">
                      {budget.sisa_anggaran}
                    </td>
                    <td className="px-4 py-4 text-gray-800 dark:text-gray-100">
                      {budget.tahun_anggaran}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                       onClick={() => handleDetail(budget.id)}
                       className="mr-2 inline-flex items-center space-x-2 rounded-lg bg-gradient-to-r from-green-400 to-green-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:from-green-500 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 5h2m-1 14V5m9 4H4m5 0a1 1 0 000 2h6a1 1 0 000-2H9z"
                          />
                        </svg>
                        Detail
                      </button>
                      <button
                        onClick={() => handleDeleteBudget(budget.id)}
                        className="inline-flex items-center space-x-2 rounded-lg bg-gradient-to-r from-red-400 to-red-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:from-red-500 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default React.memo(TableDataAnggaran);
