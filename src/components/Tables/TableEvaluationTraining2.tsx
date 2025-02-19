"use client";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { UserTraining } from "@/types/training-types";
import { getAllUserAndTheirTrainings } from "@/service/evaluation1";
import { getAllUserAndTheirTrainingsEvaluation3, getStatusEvaluation3 } from "@/service/evaluasi3";
import { UserTrainingEvaluation3 } from "@/types/evaluasi3";

interface StatusEvaluation3{
  evaluator_id : number;
  user_id : number;
  status : boolean | number;
  pelatihan_id: number
}

const TableEvaluationTraining2 = () => {
  const { userData } = useAuth();
  const [trainingData, setTrainingData] = useState<UserTrainingEvaluation3[]>(
    [],
  );
  const [trainingDataAdmin, setTrainingDataAdmin] = useState<UserTraining[]>(
    [],
  );

  const [statusEvaluation3, setStatusEvaluation3] = useState<StatusEvaluation3[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchStatusEvaluation3 = async () => {
    try {
      setLoading(true);
      const result = await getStatusEvaluation3();
      setStatusEvaluation3(result);
    } catch (error) {
      setError(true);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUserAndTheirTrainings = useCallback(async () => {
    try {
      const result = await getAllUserAndTheirTrainingsEvaluation3();
      console.log("ini resultnya ", result)
      setTrainingData(result || []);
    } catch (error) {
      setError(true);
    }
  }, []);

  const fetchAllUserAndTheirTrainingsAdmin = async () => {
    try {
      const result = await getAllUserAndTheirTrainings();
      setTrainingDataAdmin(result);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(()=>{
    fetchStatusEvaluation3();
  }, [])

  useEffect(() => {
    if (userData?.role === "admin" || userData?.role === "super admin") fetchAllUserAndTheirTrainingsAdmin();
  }, [userData]);

  useEffect(() => {
    if (userData?.role === "user") fetchAllUserAndTheirTrainings();
    
    }, [fetchAllUserAndTheirTrainings, userData?.level, userData?.role]);

  const handleEvaluationClick = (
    tglSelesai: string,
    trainingId: number | undefined,
    participanId: number,
  ) => {
    const trainingEndDate = new Date(tglSelesai);
    const currentDate = new Date();

    if (currentDate < trainingEndDate) {
      alert("Evaluasi belum dapat dilakukan karena pelatihan belum selesai.");
    } else {
      alert("Evaluasi sudah dapat dilakukan.");
      window.location.href = `/training/evaluation_training2/${trainingId}/${participanId}`;
    }
  };

  const handleEvaluationClickAdmin = (
    tglSelesai: string,
    trainingId: number | undefined,
    participanId: number,
  ) => {
    const trainingEndDate = new Date(tglSelesai);
    const currentDate = new Date();
    window.location.href = `/training/evaluation_training2/${trainingId}/${participanId}/details`;
  };


  return (
    <>
      
      {userData?.level === 1 && userData?.role === "user" && (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">
            Evaluasi Pelatihan lv 3
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Halaman ini untuk melihat Semua Evaluasi Pelatihan lv 1.
          </p>

          <div className="flex flex-col">
            {userData?.role === "user" && (
              <table className="dark: min-w-full border-collapse text-left text-sm text-gray-300 text-gray-700">
                <thead>
                  <tr className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                    <th className="px-6 py-4">No</th>
                    <th className="px-6 py-4">Judul</th>
                    <th className="px-6 py-4">Nama</th>
                    <th className="px-6 py-4">Jenis</th>
                    <th className="px-6 py-4">Tanggal Pelatihan</th>
                    <th className="px-6 py-4">Lembaga</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {trainingData.map((training, key) => (
                    <tr
                      key={training.id}
                      className="group transform transition-transform duration-200 hover:scale-[1.02] hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                        {key + 1}
                      </td>
                      <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                        {training.judul_pelatihan}
                      </td>
                      <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                        {training.nama_peserta}
                      </td>
                      <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                        {training.RKAP_type_pelatihan}
                      </td>
                      <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                        {training.tgl_mulai_pelatihan} - {training.tgl_selesai_pelatihan}
                      </td>
                      <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                        {training.lembaga_pelatihan || "Tidak ada lembaga"}
                      </td>
                      <td className="flex px-6 py-4 text-right">
                        <button
                          onClick={() =>
                            handleEvaluationClick(
                              training.tgl_mulai_pelatihan,
                              Number(training.pelatihan_id),
                              Number(training.user_id),
                            )
                          }
                          className={`mr-2 inline-flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium text-white shadow-md focus:outline-none focus:ring-2 ${
                            statusEvaluation3.some(
                              (status) =>
                                status.pelatihan_id === Number(training.pelatihan_id) &&
                                status.user_id === Number(training.user_id) &&
                                status.status === 1
                            )
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 focus:ring-green-400"
                          }`}
                          disabled={statusEvaluation3.some(
                            (status) =>
                              status.pelatihan_id === Number(training.pelatihan_id) &&
                              status.user_id === Number(training.user_id) &&
                              status.status === 1
                          )}                        >
                          <span>Jawab Evaluasi</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
      <div className="flex flex-col">
        {(userData?.role === "admin" || userData?.role === "super admin") && (
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
              {trainingDataAdmin.map((training, key) => (
                <tr
                  key={training.user_id}
                  className="group transform transition-transform duration-200 hover:scale-[1.02] hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                    {key + 1}
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
                    <button
                      onClick={() =>
                        handleEvaluationClickAdmin(
                          training.end_date,
                          training.training_id,
                          training.user_id,
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
                      <span>Detail</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      )}
      {userData?.level !== 1 && userData?.role !== "user" && userData?.role !== "admin" && (
      <p>Anda Belum Berhak Membuka Halaman Ini</p>
      )}
      </div>
    </>
  );
};

export default TableEvaluationTraining2;
