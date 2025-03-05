"use client";
import { useAuth } from "@/context/AuthContext";
import { TrainingEvaluatedCountType, TrainingType } from "@/types/training-types";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getAllTrainingEvaluation1,
  getAllTrainingsWithEvaluatedCount,
} from "@/service/evaluation1";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const TableEvaluationTraining1 = () => {
  const { userData } = useAuth();
  const [trainingData, setTrainingData] = useState<TrainingType[]>([]);
  const [trainingDataAdmin, setTrainingDataAdmin] = useState<TrainingEvaluatedCountType[]>(
    [],
  );
  const [loadng, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const fetchAllTraining = async () => {
    try {
      const result = await getAllTrainingEvaluation1();
      
      setTrainingData(result);
    } catch (error) {
      setError(true);
    }
  };

  const fetchAllTrainingsWithEvaluatedCount = async () => {
    try {
      const result = await getAllTrainingsWithEvaluatedCount();
      setTrainingDataAdmin(result);
    } catch (error) {
      setError(true);
    }
  };

  const userTraining = trainingData.filter(
    (training) => {
      return training.user_id == userData?.id
    } 
  );

  useEffect(() => {
    if (userData?.role === "user") fetchAllTraining();
  }, [userData?.role]);

  useEffect(() => {
    if (userData?.role === "admin" || userData?.role === "super admin") fetchAllTrainingsWithEvaluatedCount();
  }, [userData?.role]);


  const handleEvaluationClick = (
    tglSelesai: string,
    trainingId: number | undefined
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
        text: "Evaluasi sudah dapat dilakukan.",
        confirmButtonText: "Mulai Evaluasi",
        confirmButtonColor: "#28a745",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push(`/training/evaluation_training1/${trainingId}/answer_evaluation`);
        }
      });
    }
  };

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
          {(userData?.role === "admin" || userData?.role === "super admin") && (
            <table className="min-w-full border-collapse text-left text-sm text-gray-700 dark:text-gray-300">
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
                {trainingDataAdmin.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center">
                      Tidak ada data
                    </td>
                  </tr>
                ) : (
                  trainingDataAdmin.map((training, key) => (
                    <tr
                      key={training.training_id}
                      className="group transform transition-transform duration-200 hover:scale-[1.02] hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                        {key + 1}
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
                        <p className="mr-2 inline-flex items-center space-x-2 rounded-lg bg-gradient-to-r from-green-400 to-green-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:from-green-500 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-400">
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
                            href={`/training/evaluation_training1/${training.training_id}`}
                          >
                            {" "}
                            <span>Detail</span>
                          </Link>
                        </p>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          {userData?.role === "user" && (
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
                    <td colSpan={6} className="text-center">
                      Tidak ada data
                    </td>
                  </tr>
                ) : (
                  userTraining.map((training, key) => (
                    <tr
                      key={training.id}
                      className="group transform transition-transform duration-200 hover:scale-[1.02] hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                        {key + 1}
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
                            training.telah_evaluasi == true
                              ? "cursor-not-allowed bg-gray-400"
                              : "bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 focus:ring-green-400"
                          }`}
                          disabled={training.telah_evaluasi == true}
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
          )}
        </div>
      </div>
    </>
  );
};

export default TableEvaluationTraining1;
