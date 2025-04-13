"use client";
import { useAuth } from "@/context/AuthContext";
import { getDetailDataFreeTextTraining } from "@/service/free-text";
import { FreeTextEvaluationForAdmin } from "@/types/freetext-type";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const DetailUsersEvaluationFreetextStatus = () => {
  const { userData } = useAuth();

  const [trainingDataAdmin, setTrainingDataAdmin] = useState<
    FreeTextEvaluationForAdmin[]
  >([]);
  const [loadng, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const pelatihanId = useParams().trainingId;

  const fetchAllUserAndTheirTrainings = useCallback(async () => {
    try {
      const result = await getDetailDataFreeTextTraining(Number(pelatihanId));
      console.log(result);
      setTrainingDataAdmin(result);
    } catch (error) {
      setError(true);
    }
  }, [pelatihanId]);

  useEffect(() => {
    if (userData?.role === "admin" || userData?.role === "super admin")
      fetchAllUserAndTheirTrainings();
  }, [fetchAllUserAndTheirTrainings, userData?.role]);

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">
          Evaluasi Pelatihan lv 1
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Halaman ini untuk melihat Semua Evaluasi Pelatihan lv 1.
        </p>

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
              {trainingDataAdmin.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center">
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                trainingDataAdmin.map((training, key) => (
                  <tr
                    key={training.user_id}
                    className="group transform transition-transform duration-200 hover:scale-[1.02] hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                      {key + 1}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                      {training.niksap_peserta}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                      {training.nama_peserta}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                      {training.judul_pelatihan}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                      {training.rkap_type_pelatihan}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                      {training.tgl_mulai_pelatihan} -{" "}
                      {training.tgl_selesai_pelatihan}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                      {training.is_completed === 1
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
                          key={training.pelatihan_id}
                          href={`/training/evaluation_freetext/${training.pelatihan_id}/detail/${training.user_id}`}
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
          <div className="mb-4 mr-4 mt-8 flex items-center justify-between text-sm text-gray-500">
            <span>
              {/* {" "}
   Showing {startIndex + 1} to {Math.min(endIndex, totalEntries)}{" "}
   of {totalEntries} entries */}
            </span>
            <div className="space-x-2">
              <button
                className="rounded-lg bg-gray-200 px-3 py-1 transition hover:bg-gray-300"
                // onClick={handlePreviousPage}
                // disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className="rounded-lg bg-gray-200 px-3 py-1 transition hover:bg-gray-300"
                // onClick={handleNextPage}
                // disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailUsersEvaluationFreetextStatus;
