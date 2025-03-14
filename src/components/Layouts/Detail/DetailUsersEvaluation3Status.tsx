"use client";
import SkeletonTable from "@/components/Skeleton/SkeletonTable";
import { useAuth } from "@/context/AuthContext";
import { getDetailAllEvaluatorAndUserEvaluastion3 } from "@/service/evaluasi3";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";

interface DetailUsersEvaluation3Status {
  training_id: number;
  training_title: string;
  rkap_training_type: string;
  start_date: string;
  end_date: string;
  evaluator_id: number;
  evaluator_name: string;
  evaluator_jabatan: string;
  evaluator_unit_kerja: string;
  user_id: number;
  user_name: string;
  user_unit_kerja: string;
  evaluator_category: string;
  is_completed: boolean;
}

const DetailUsersEvaluation3Status = () => {
  const { userData } = useAuth();
  const [evaluasi3, setEvaluasi3] = useState<DetailUsersEvaluation3Status[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");

  const pelatihanId = useParams().training_id;

  const fetchDetailAllEvaluatorAndUserEvaluastion3 = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getDetailAllEvaluatorAndUserEvaluastion3(
        Number(pelatihanId),
      );

      console.log("result", result);
      setEvaluasi3(result);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [pelatihanId]);

      // Handle pencarian
const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setSearchQuery(event.target.value);
  setCurrentPage(1); // Reset ke halaman pertama saat mencari
};

    // Gunakan useMemo agar tidak dihitung ulang setiap render
    const filteredData = useMemo(() => {
      return evaluasi3.filter((training) =>
        training.training_title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, [evaluasi3, searchQuery]);

    // Pagination Data
    const totalEntries = filteredData.length;
    const totalPages = Math.ceil(totalEntries / entriesPerPage);

    const currentData = useMemo(() => {
      const startIndex = (currentPage - 1) * entriesPerPage;
      return filteredData.slice(startIndex, startIndex + entriesPerPage);
    }, [filteredData, currentPage, entriesPerPage]);

    // Hitung indeks untuk tampilan
    const startIndexDisplay = (currentPage - 1) * entriesPerPage + 1;
    const endIndexDisplay = Math.min(startIndexDisplay + currentData.length - 1, totalEntries);

    const handleNextPage = () => {
      if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePreviousPage = () => {
      if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };
    
  useEffect(() => {
    if (userData?.role === "admin" || userData?.role === "super admin")
      fetchDetailAllEvaluatorAndUserEvaluastion3();
  }, [fetchDetailAllEvaluatorAndUserEvaluastion3, userData?.role]);

  return (
    <> {
      loading ? (
        <SkeletonTable
          title="Detail Evaluasi Pelatihan lv 3" />
      ) : (
        <>
          <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="mb-6 flex flex-col items-start sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h4 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Detail Evaluasi Pelatihan LV 3
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Halaman ini untuk melihat semua Evaluasi Pelatihan LV 3.
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

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-gray-700 dark:text-gray-300">
                <thead>
                  <tr className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                    <th className="px-6 py-4">No</th>
                    <th className="px-6 py-4">Judul Pelatihan</th>
                    <th className="px-6 py-4">Nama Evaluator</th>
                    <th className="px-6 py-4">Jabatan Evaluator</th>
                    <th className="px-6 py-4">Nama Participant</th>
                    <th className="px-6 py-4">Unit Keja Participant</th>
                    <th className="px-6 py-4">Tanggal Acara</th>
                    <th className="px-6 py-4">Kategory Evaluator</th>
                    <th className="px-6 py-4">Status Evaluasi</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {evaluasi3 && evaluasi3.length === 0 ? (
                    <tr >
                      <td colSpan={12} className="py-4 text-center">
                        Tidak ada data
                      </td>
                    </tr>
                  ) : (
                    (currentData || []).map((training, key) => (
                      <tr
                        key={key}
                        className="group transform transition-transform duration-200 hover:scale-[1.02] hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <td className="px-6 py-4">{(currentPage - 1) * entriesPerPage + key + 1}</td>
                        <td className="px-6 py-4">{training.training_title}</td>
                        <td className="px-6 py-4">{training.evaluator_name}</td>
                        <td className="px-6 py-4">
                          {training.evaluator_unit_kerja}
                        </td>
                        <td className="px-6 py-4">{training.user_name}</td>
                        <td className="px-6 py-4">
                          {training.evaluator_unit_kerja}
                        </td>
                        <td className="px-6 py-4">
                          {training.start_date} - {training.end_date}
                        </td>
                        <td className="px-6 py-4">{training.evaluator_category}</td>
                        <td className="px-6 py-4">
                          {training.is_completed ? "Selesai" : "Belum Selesai"}
                        </td>
                        <td className="px-6 py-4">
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
                              href={`/training/evaluation_training2/${training.training_id}/${training.user_id}/details`}
                            >
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
                  Showing {startIndexDisplay + 1} to {Math.min(endIndexDisplay, totalEntries)}{" "}
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
        </>
      )
    }
    </>
  );
};

export default DetailUsersEvaluation3Status;
