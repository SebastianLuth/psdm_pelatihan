"use client";
import SkeletonTable from "@/components/Skeleton/SkeletonTable";
import { useAuth } from "@/context/AuthContext";
import { getAllUserAndTheirTrainings } from "@/service/evaluation1";
import { UserTraining } from "@/types/training-types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

const DetailUsersEvaluationStatus = () => {
  const { userData } = useAuth();
  const [trainingDataAdmin, setTrainingDataAdmin] = useState<UserTraining[]>(
    [],
  );
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const pelatihanId = useParams().training_id;

  const fetchAllUserAndTheirTrainings = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getAllUserAndTheirTrainings(Number(pelatihanId));
      setTrainingDataAdmin(result);
    } catch (error) {
      setError(true);
    } finally{
      setLoading(false);
    }
  }, [pelatihanId]);

    // Handle perubahan input search
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
      setCurrentPage(1); // Reset ke halaman pertama saat mencari
    };

    const getFilteredData = (data: UserTraining[]) => {

      const filtered = data.filter((training) =>
        training.training_title
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
      );;

      // Pagination berdasarkan hasil filter
      const totalEntries = filtered.length || 0;
      const totalPages = Math.ceil(totalEntries / entriesPerPage);
      const startIndex = (currentPage - 1) * entriesPerPage;
      const endIndex = startIndex + entriesPerPage;
      const currentData = filtered.slice(startIndex, endIndex);

      return { filtered, currentData, totalEntries, totalPages, startIndex, endIndex };
    }

    // Dapatkan data yang difilter dan dipaginasi
  const {
    filtered: filteredTrainingData,
    currentData,
    totalEntries,
    totalPages, 
    startIndex, 
    endIndex 
  } = getFilteredData(trainingDataAdmin);
  
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
    if (userData?.role === "admin" || userData?.role === "super admin")
      fetchAllUserAndTheirTrainings();
  }, [fetchAllUserAndTheirTrainings, userData?.role]);

  return (
    <>
      {
        loading ? (
          <SkeletonTable 
            title="Detail Evaluasi LV 3"
          />
        ) : (
          <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="mb-6 flex flex-col items-start sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h4 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Detail Evaluasi LV 1
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Halaman ini untuk melihat semua Evaluasi LV 1 pada pelatihan {trainingDataAdmin[0]?.training_title}.
              </p>
            </div>
  
            <div className="mt-4 flex flex-col gap-2 sm:mt-0 sm:flex-row sm:items-center">
              <input
                onChange={handleSearchChange}
                type="text"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 sm:w-64"
                placeholder="Cari Judul Pelatihan..."
              />
            </div>
          </div>
  
          <div className="flex flex-col">
            <table className="min-w-full border-collapse text-left text-sm text-gray-700 dark:text-gray-300">
              <thead>
                <tr className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                  <th className="px-6 py-4">No</th>
                  <th className="px-6 py-4">NIKSAP</th>
                  <th className="px-6 py-4">Nama</th>
                  <th className="px-6 py-4">Judul Pelatihan</th>
                  <th className="px-6 py-4">Jenis Anggaran</th>
                  <th className="px-6 py-4">Tanggal Acara</th>
                  <th className="px-6 py-4">Status Evaluasi</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentData.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center">
                      Tidak ada data
                    </td>
                  </tr>
                ) : (
                  currentData.map((training, key) => (
                    <tr
                      key={key}
                      className="group transform transition-transform duration-200 hover:scale-[1.02] hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                      {(currentPage - 1) * entriesPerPage + key + 1}
                      </td>
                      <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                        {training.username}
                      </td>
                      <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                        {training.name}
                      </td>
                      <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                        {training.training_title}
                      </td>
                      <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                        {training.training_type}
                      </td>
                      <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                        {training.start_date} - {training.end_date}
                      </td>
                      <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                        {training.has_completed_evaluation
                          ? "Selesai"
                          : "Belum Selesai"}
                      </td>
                      <td className="flex px-6 py-4 text-right">
                        <button className="mr-2 inline-flex items-center space-x-2 rounded-lg bg-gradient-to-r from-green-400 to-green-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:from-green-500 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-400">
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
                          <Link
                            key={training.training_id}
                            href={`/training/evaluation_training1/${training.user_id}/${training.training_id}`}
                          >
                            {" "}
                            <span>Detail</span>
                          </Link>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
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
     
    </>
  );
};

export default DetailUsersEvaluationStatus;
