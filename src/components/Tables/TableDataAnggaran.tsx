"use client";
import { deleteBudget, getAllBudget } from "@/service/budget";
import { budgetType } from "@/types/budget-types";
import { useCallback, useEffect, useState, Suspense, ChangeEvent } from "react";
import { ErrorBoundary } from "react-error-boundary";
import React from "react";
import { debounce } from "lodash";
import { useRouter } from 'next/navigation';
import Swal from "sweetalert2";
import SkeletonTable from "../Skeleton/SkeletonTable";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
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


  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState<number>(10);
  
  const {userData} = useAuth();
  const router = useRouter();

  const fetchAllBudget = useCallback(async () => {
    setLoading(true);
    setError(false);
    setSuccess(false);
    try {
      const result = await getAllBudget();

      const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];


      const formattedData = result.map((budget: budgetType) => ({
        ...budget,
        nama_bulan_anggaran: monthNames[Number(budget.bulan_anggaran) - 1] || "Invalid Month"
      }))
      setBudgetData(formattedData);
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
    } catch (error : any) {
      setError(true);
      let errorMessage =
      error.response?.data.message ||
      error.response?.data.error ||
      error.response?.error||
        "Failed to submit budget.";
      if(error.response?.data.error === 'Cannot delete or update a parent row: a foreign key constraint fails (`psdm_pelatihan`.`tbl_pelatihan`, CONSTRAINT `tbl_pelatihan_ibfk_1` FOREIGN KEY (`jenis`) REFERENCES `tbl_anggaran` (`jenis_anggaran`))') {
        errorMessage = "Data Anggaran ini masih digunakan oleh data pelatihan. Silakan hapus data pelatihan terlebih dahulu.";
      }
        await Swal.fire({
              title: "Gagal!",
              text: `${errorMessage}`,
              icon: "error",
              confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDetail = (id: number | undefined) => {
    if (id) {
      router.push(`/budget/budget_data/${id}`);
    }
  };

  const getFilteredData = (data: budgetType[]) => {
    let filtered = data.filter((budget) =>
      budget.jenis_anggaran
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    );

    // Pagination berdasarkan hasil filter
    const totalEntries = filtered?.length || 0;
    const totalPages = Math.ceil(totalEntries / limit);
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    const currentData = filtered?.slice(startIndex, endIndex);

    return { filtered, currentData, totalEntries, totalPages, startIndex, endIndex };
  };

  const {
    filtered: filteredBudgetData,
    currentData,
    totalEntries,
    totalPages,
    startIndex,
    endIndex
  } = getFilteredData(budgetData);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
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
  const handleLimitChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(event.target.value));
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={fetchAllBudget}>
      <Suspense fallback={<div>Loading...</div>}>
      { loading === true ? (
        <SkeletonTable title="Anggaran" />
      ) : (
        <div className="relative overflow-hidden rounded-xl border border-gray-300 bg-white/70 shadow-xl backdrop-blur-lg dark:border-gray-700 dark:bg-gray-900/70">
          <div className="px-6 py-5">
            <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Semua Data Anggaran
            </h4>
            <div className="flex items-center justify-between space-x-4 mt-5" >
              <div className="flex items-center space-x-3">
                <span className="text-gray-700 dark:text-gray-300">Show</span>
                <select 
                onChange={handleLimitChange}
                value={limit}
                className="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
              <div className="flex-grow items-center">
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                  placeholder="Search..."
                  onChange={handleSearchChange}
                />
              </div>
              <Link href={'/budget/add_budget'} 
              className="inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-indigo-700 hover:shadow-md"> 
              Tambahkan RKAP Anggaran
              </Link>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {/* Header Table */}
            <table className="min-w-full border-collapse text-left text-sm text-gray-700 dark:text-gray-300">
              <thead>
                <tr className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                  <th className="px-4 py-4">No</th>
                  <th className="px-4 py-4">Jenis Anggaran</th>
                  <th className="px-4 py-4">Total Anggaran</th>
                  <th className="px-4 py-4">Sisa Anggaran</th>
                  <th className="px-4 py-4">Tahun Anggaran</th>
                  <th className="px-4 py-4">Bulan Anggaran</th>
                  <th className="px-4 py-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {
                  budgetData.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-4 text-center">
                        Tidak ada data anggaran
                      </td>
                    </tr>
                  )
                : (
                  currentData.map((budget, index) => (
                    <tr
                      key={index}
                      className="group transform transition-transform duration-200 hover:scale-[1.02] hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="px-4 py-4 text-gray-800 dark:text-gray-100">
                        {(currentPage - 1) * limit + index + 1}
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
                      <td className="px-4 py-4 text-gray-800 dark:text-gray-100">
                        {budget.nama_bulan_anggaran}
                      </td>
                      <td className="flex space-x-2 px-4 py-4 text-right">
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
                  ))
                )}
              </tbody>
            </table>
            <div className="p-4 flex items-center justify-between text-sm text-gray-500">
              <span>
              {" "}
              Showing {startIndex + 1} to {Math.min(endIndex, totalEntries)}{" "}
              of {totalEntries} entries
              </span>
              <div className="space-x-2">
                <button
                  className="rounded-lg bg-gray-200 px-3 py-1 transition hover:bg-gray-300"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  >
                    Previous
                </button>
                <button
                  className="rounded-lg bg-gray-200 px-3 py-1 transition hover:bg-gray-300"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }
      </Suspense>
    </ErrorBoundary>
  );
};

export default React.memo(TableDataAnggaran);
