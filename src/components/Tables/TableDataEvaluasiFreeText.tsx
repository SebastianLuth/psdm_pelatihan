"use client";
import { useAuth } from "@/context/AuthContext";
import { getAllTrainingEvaluation1 } from "@/service/evaluation1";
import { TrainingEvaluatedCountType, TrainingType } from "@/types/training-types";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FreeTextEvaluation,
} from "@/types/freetext-type";
import {
  getAllDataCountEvaluatedFreeTextForAdmin,
  getAllDataFreeTextTrainingbyUser,
} from "@/service/free-text";
import SkeletonTable from "../Skeleton/SkeletonTable";
import Swal from "sweetalert2";
import Link from "next/link";

const EvaluastionFreeTextComponent = () => {
  const { userData } = useAuth();
  const [trainingData, setTrainingData] = useState<TrainingType[]>([]);
  const [freetextEvaluationData, setFreetextEvaluationData] = useState<
    FreeTextEvaluation[]
  >([]);
  const [freetextEvaluationCountDataAdmin, setFreetextEvaluationCountDataAdmin] =
    useState<TrainingEvaluatedCountType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  const fetchAllDataFreeText = async () => {
    try {
      setLoading(true);
      const result = await getAllDataFreeTextTrainingbyUser();
      console.log(result);
      setFreetextEvaluationData(result);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllDataCountEvaluatedFreeTextForAdmin = async () => {
    try {
      setLoading(true);
      const result = await getAllDataCountEvaluatedFreeTextForAdmin();
      setFreetextEvaluationCountDataAdmin(result);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllTraining = async () => {
    try {
      setLoading(true);
      const result = await getAllTrainingEvaluation1();
      setTrainingData(result);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const userTraining = trainingData.filter(
    (training) => training.user_id === userData?.id,
  );

  const selectedData = useMemo(() => {
    return userData?.role === "admin" || userData?.role === "super admin"
    ? freetextEvaluationCountDataAdmin
    : trainingData.filter((training) => training.user_id === userData?.id);
  },[freetextEvaluationCountDataAdmin, trainingData, userData?.id, userData?.role])

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset ke halaman pertama saat mencari
  };

  const getFilteredData = (data: any[]) => {
    let filtered = null;

    if (userData?.role === "super admin" || userData?.role === "admin")
      filtered = data.filter((training) =>
        training.training_title
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
      );

    if (userData?.role === "user")
      filtered = data.filter((training) =>
        training.judul.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    
    const totalEntries = filtered?.length || 0;
    const totalPages = Math.ceil(totalEntries / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const currentData = filtered?.slice(startIndex, endIndex);

    return { filtered, currentData, totalEntries, totalPages, startIndex, endIndex };

  }

  const {filtered : filteredData, currentData, totalEntries, totalPages, startIndex, endIndex} = getFilteredData(selectedData);

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
    if (userData?.role === "user") fetchAllTraining();
  }, [userData]);

  useEffect(() => {
    if (userData?.role === "user") fetchAllDataFreeText();
  }, [userData]);

  useEffect(() => {
    if (userData?.role === "admin" || userData?.role === "super admin") fetchAllDataCountEvaluatedFreeTextForAdmin();
  }, [userData]);

  const handleEvaluationClick = (
    tglSelesai: string,
    trainingId: number | undefined,
  ) => {
    const trainingEndDate = new Date(tglSelesai);
    const currentDate = new Date();

    if (currentDate < trainingEndDate) {
          Swal.fire({
            icon: "warning",
            title: "Evaluasi Belum Dapat Dilakukan",
            text: "Pelatihan belum selesai, silakan coba lagi nanti.",
            confirmButtonColor: "#f39c12",
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Evaluasi Tersedia",
            text: "Evaluasi FeedBack Peserta sudah dapat dilakukan.",
            confirmButtonText: "Mulai Evaluasi",
            confirmButtonColor: "#28a745",
          }).then((result) => {
            if (result.isConfirmed) {
              router.push(`/training/evaluation_freetext/${trainingId}/answer`);
            }
          });
        }
  };

  if (loading) return <SkeletonTable title="Evaluasi Pelatihan Free Text" />;

  return (
    <> 
      {
        loading ? (
          <SkeletonTable
            title="Evaluasi Pelatihan Free Text"/>
        ) : (
        <>
          <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="mb-6 flex flex-col items-start sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h4 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Evaluasi Feedback Pelatihan 
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Halaman ini untuk melihat semua Evaluasi Feedback Pelatihan 
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
          {userData?.role === "user" && (
            <>
              <table className="dark: min-w-full border-collapse text-left text-sm text-gray-300 text-gray-700">
                <thead>
                  <tr className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                    <th className="px-6 py-4">No</th>
                    <th className="px-6 py-4">judul</th>
                    <th className="px-6 py-4">Jenis</th>
                    <th className="px-6 py-4">Tanggal Pelatihan</th>
                    <th className="px-6 py-4">Lembaga</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userTraining.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center">
                        Tidak ada data
                      </td>
                    </tr>
                  ) : (
                    (currentData || []).map((training, key) => (
                      <tr
                        key={key}
                        className="group transform transition-transform duration-200 hover:scale-[1.02] hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                        {(currentPage - 1) * entriesPerPage + key + 1}
                        </td>
                        <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                          {training.judul}
                        </td>
                        <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                          {training.jenis}
                        </td>
                        <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                          {training.tgl_mulai} - {training.tgl_selesai}
                        </td>
                        <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                          {training.lembaga || "Tidak ada lembaga"}
                        </td>
                        <td className="flex px-6 py-4 text-right">
                          <button
                            onClick={() =>
                              handleEvaluationClick(
                                training.tgl_selesai,
                                training.id,
                              )
                            }
                            className={`mr-2 inline-flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium text-white shadow-md focus:outline-none focus:ring-2 ${
                              Array.isArray(freetextEvaluationData) &&
                              freetextEvaluationData.some(
                                (status) =>
                                  status.pelatihan_id === Number(training.id) &&
                                  status.user_id === Number(training.user_id) &&
                                  status.is_completed === 1,
                              )
                                ? "cursor-not-allowed bg-gray-400"
                                : "bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 focus:ring-green-400"
                            }`}
                            disabled={
                              Array.isArray(freetextEvaluationData) &&
                              freetextEvaluationData.some(
                                (status) =>
                                  status.pelatihan_id === Number(training.id) &&
                                  status.user_id === Number(training.user_id) &&
                                  status.is_completed === 1,
                              )
                            }
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
                                d="M11 5h2m-1 14V5m9 4H4m5 0a1 1 0 000 2h6a1 1 0 000-2H9z"
                              />
                            </svg>
                            <span>Jawab Evaluasi</span>
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
            </>
          )}

          {(userData?.role === "admin" || userData?.role === "super admin") && (
            <>
              <table className="dark: min-w-full border-collapse text-left text-sm text-gray-300 text-gray-700">
                <thead>
                  <tr className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                      <th className="px-6 py-4">No</th>
                      <th className="px-6 py-4">Jenis RKAP </th>
                      <th className="px-6 py-4">Judul Pelatihan</th>
                      <th className="px-6 py-4">Lokasi Pelatihan</th>
                      <th className="px-6 py-4">Tanggal Acara</th>
                      <th className="px-6 py-4">Jumlah Yang  Telah Evaluasi</th>
                      <th className="px-6 py-4">Jumlah Yang Belum Evaluasi</th>
                      <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {freetextEvaluationCountDataAdmin.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center">
                        Tidak ada data
                      </td>
                    </tr>
                  ) : (
                    (currentData || []).map((training, key) => (
                      <tr
                        key={key}
                        className="group transform transition-transform duration-200 hover:scale-[1.02] hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                        {(currentPage - 1) * entriesPerPage + key + 1}
                        </td>
                        <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                          {training.rkap_training_type}
                        </td>
                        <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                          {training.training_title}
                        </td>
                        <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                          {training.training_location}
                        </td>
                        <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                          {training.start_date} - {training.end_date}
                        </td>
                        <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                          {training.evaluated_count}
                        </td>
                        <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                          {training.not_evaluated_count}
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
                              href={`/training/evaluation_freetext/${training.training_id}`}
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
            </>
          )}
        </div>
      </div>
        </>
        )
        
      }
      
    </>
  );
};

export default EvaluastionFreeTextComponent;
