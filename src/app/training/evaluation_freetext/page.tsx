"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { getAllTrainingEvaluation1 } from "@/service/evaluation1";
import { TrainingType, UserTraining } from "@/types/training-types";
import axios from "axios";
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import { useRouter } from "next/navigation";


interface FreeTextEvaluation {
    id: number;
    user_id: number;
    pelatihan_id: number;
    konseptualiasasi_pembelajaran: string;
    rencana_tindak_lanjut: string;
    narasumber: string;
    is_completed: boolean | number;
}

interface FreeTextEvaluationForAdmin {
  pelatihan_id: number;
  judul_pelatihan: string;
  metode_pelatihan: string;
  lembaga_pelatihan: string;
  lokasi_pelatihan: string;
  anggaran_pelatihan: string;
  kompetensi_pelatihan: string;
  rkap_type_pelatihan: string;
  jenis_pelatihan: string;
  tgl_mulai_pelatihan: string;
  tgl_selesai_pelatihan: string;
  jam_pelajaran_pelatihan: number;
  user_id: number;
  niksap_peserta: number;
  nama_peserta: string;
  unit_kerja_peserta  : string;
  jabatan_peserta: string;
  level_peserta: number;
  konseptualiasasi_pembelajaran: string;
  rencana_tindak_lanjut: string;
  narasumber: string;
}

const EvaluastionFreeTextPage = () => {
  const { userData } = useAuth();
  const [trainingData, setTrainingData] = useState<TrainingType[]>([]);
  const [freetextEvaluationData, setFreetextEvaluationData] = useState<FreeTextEvaluation[]>([]);
  const [freetextEvaluationDataAdmin, setFreetextEvaluationDataAdmin] = useState<FreeTextEvaluationForAdmin[]>([]);
  const [loadng, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const fetchAllDataFreeText = async () => {
    try {
        const result = await axios.get(`http://localhost:5000/api/evaluation/freetext`, {
            withCredentials: true
        })
        console.log("ini data dari user",result.data.data);
        setFreetextEvaluationData(result.data.data);
    } catch (error) {
        setError(true);
    }
  }

  const fetchAllDataFreeTextForAdmin = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/api/evaluation/all-freetext`, {
        withCredentials: true,
      });
  
      // Proses data untuk memformat tanggal
      const formattedData = result.data.data.map((item: FreeTextEvaluationForAdmin) => ({
        ...item,
        tgl_mulai_pelatihan: format(new Date(item.tgl_mulai_pelatihan), 'dd MMMM yyyy'),
        tgl_selesai_pelatihan: format(new Date(item.tgl_selesai_pelatihan), 'dd MMMM yyyy'),
      }));
  
      setFreetextEvaluationDataAdmin(formattedData);
    } catch (error) {
      setError(true);
    }
  };


  const fetchAllTraining = async () => {
    try {
      const result = await getAllTrainingEvaluation1();
      setTrainingData(result);
    } catch (error) {
      setError(true);
    }
  };

  const handleDetailFreeTextEvaluation = (userId: number, trainingId: number) => {
    router.push(`/training/evaluation_freetext/${userId}/${trainingId}/detail`);
  }

  useEffect(() => {
    if(userData?.role === "user") fetchAllTraining();
  }, [userData]);

  useEffect(() => {
    if(userData?.role === "user") fetchAllDataFreeText();
  }, [userData]);

  useEffect(() => {
    if (userData?.role === "admin") fetchAllDataFreeTextForAdmin();
  }, [userData]);

  const userTraining = trainingData.filter(
    (training) => training.user_id === userData?.id,
  );

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
      window.location.href = `/training/evaluation_freetext/${trainingId}`;
    }
  };

  return (
    <ProtectedRoute>
      <DefaultLayout>
        <>
          <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">
              Evaluasi Pelatihan Free Text
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Halaman ini untuk melihat Semua Evaluasi Pelatihan Free Text
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
                            className={`mr-2 inline-flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium text-white shadow-md focus:outline-none focus:ring-2 ${
                                freetextEvaluationData.some(
                                    (status) =>
                                      status.pelatihan_id === Number(training.id) &&
                                      status.user_id === Number(training.user_id) &&
                                      status.is_completed === 1
                                  )
                                ? "cursor-not-allowed bg-gray-400"
                                : "bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 focus:ring-green-400"
                            }`}
                            disabled={freetextEvaluationData.some(
                                (status) =>
                                  status.pelatihan_id === Number(training.id) &&
                                  status.user_id === Number(training.user_id) &&
                                  status.is_completed === 1
                              )}    
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
                      <th className="px-6 py-4">NIKSAP</th>
                      <th className="px-6 py-4">Nama</th>
                      <th className="px-6 py-4">judul</th>
                      <th className="px-6 py-4">Jenis</th>
                      <th className="px-6 py-4">Tanggal Pelatihan</th>
                      <th className="px-6 py-4">Narasumber</th>
                      <th className="px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {freetextEvaluationDataAdmin.map((training, key) => (
                      <tr
                        key={training.pelatihan_id}
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
                          {training.jenis_pelatihan}
                        </td>
                        <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                          {training.tgl_mulai_pelatihan} - {training.tgl_selesai_pelatihan}
                        </td>
                        <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                          {training.narasumber || "Tidak ada lembaga"}
                        </td>
                        <td className="flex px-6 py-4 text-right">
                          <button
                            className="mr-2 inline-flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium text-white shadow-md focus:outline-none focus:ring-2 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 focus:ring-green-400"
                            onClick={ () => handleDetailFreeTextEvaluation(training.user_id, training.pelatihan_id) }
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
                            <span>Lihat Detail</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}  
            </div>
          </div>
        </>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default EvaluastionFreeTextPage;
