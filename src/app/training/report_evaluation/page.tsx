"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { getAllTrainingEvaluation1 } from "@/service/evaluation1";
import { getAdminTrainingReportAllUser } from "@/service/training";
import { TrainingType } from "@/types/training-types";
import axios from "axios";
import { useEffect, useState } from "react";

interface adminTrainingDataReportEvalution {
    pelatihan_id ?: number;
    pelatihan_judul : string;
    pelatihan_jenis : string;
    pelatihan_metode : string; 
    pelatihan_lokasi : string; 
    peserta_id : number;
    peserta_nama : string;
    laporan_evaluasi_1: string;
    link_laporan : string;
}

const EvaluationReportTrainingPage = () => {
  const { userData } = useAuth();
  const [trainingData, setTrainingData] = useState<TrainingType[]>([]);
  const [adminTrainingData, setAdminTrainingData] = useState<adminTrainingDataReportEvalution[]>([])
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleEvaluationClick = (
    tglSelesai: string,
    trainingId: number | undefined,
  ) => {
    const trainingEndDate = new Date(tglSelesai);
    const currentDate = new Date();

    if (currentDate < trainingEndDate) {
      alert("Evaluasi belum dapat dilakukan karena pelatihan belum selesai.");
    } else {
      alert("Evaluasi sudah dapat dilakukan.");
      window.location.href = `/training/report_evaluation/${trainingId}`;
    }
  };
  const userTraining = trainingData.filter(
    (training) => training.user_id === userData?.id,
  );

  const fetchAllTraining = async () => {
      try {
        const result = await getAllTrainingEvaluation1()
        setTrainingData(result);
      } catch (error) {
        setError(true);    }
    };
  
  const fetchAdminTrainingReportAllUser = async () => {
    try {
      const result = await getAdminTrainingReportAllUser()
      setAdminTrainingData(result);
    } catch (error) {
      setError(true);
    }
  }
  
  useEffect(() => {
        fetchAllTraining();
  }, []);

  useEffect(() => {
    fetchAdminTrainingReportAllUser();
  }, []);

  return (
    <>
      {" "}
      <ProtectedRoute>
        <DefaultLayout>
          <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">
              Evaluasi Laporan Pelatihan
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Mohon melakukan evaluasi laporan pelatihan terlebih dahulu pada
              pelatihan yang dimiliki
            </p>

            <div className="flex flex-col">
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
                    {userTraining.map((training, key) => (
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
                            className="mr-2 inline-flex items-center space-x-2 rounded-lg bg-gradient-to-r from-green-400 to-green-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:from-green-500 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
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
                    ))}
                  </tbody>
                </table>
              )}

              {userData?.role === "admin" && (
                <table className="dark: min-w-full border-collapse text-left text-sm text-gray-300 text-gray-700">
                  <thead>
                    <tr className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                      <th className="px-6 py-4">No</th>
                      <th className="px-6 py-4">judul</th>
                      <th className="px-6 py-4">RKAP TYPE</th>
                      <th className="px-6 py-4">metode</th>
                      <th className="px-6 py-4">lokasi</th>
                      <th className="px-6 py-4">Laporan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminTrainingData.map((training, key) => (
                      <tr
                        key={training.pelatihan_id}
                        className="group transform transition-transform duration-200 hover:scale-[1.02] hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                          {key + 1}
                        </td>
                        <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                          {training.pelatihan_judul}
                        </td>
                        <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                          {training.pelatihan_jenis}
                        </td>
                        <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                          {training.pelatihan_metode}
                        </td>
                        <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                          {training.pelatihan_lokasi}
                        </td>
                        <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                        {training.laporan_evaluasi_1 === 'Ya' ? (
                            <a 
                              href={training.link_laporan} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-blue-500 hover:underline"
                            >
                              Telah Mengirimkan Laporan
                            </a>
                          ) : (
                            <span className="text-red-500">Belum Mengirimkan Laporan</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            
          </div>
        </DefaultLayout>
      </ProtectedRoute>
    </>
  );
};

export default EvaluationReportTrainingPage;
