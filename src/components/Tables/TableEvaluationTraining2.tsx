"use client";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { useAuth } from "@/context/AuthContext";
import { unitKerjaList } from "@/types/manajement-users-type";
import { UserTraining } from "@/types/training-types";

const TableEvaluationTraining2 = () => {
  const { userData } = useAuth();
  const [trainingData, setTrainingData] = useState<any[]>([]);
  const [trainingDataAdmin, setTrainingDataAdmin] = useState<UserTraining[]>(
    [],
  );

  const getUnitKerjaIdByName = (name: string): number | undefined => {
    const unit = unitKerjaList.find((unit) => unit.name === name);
    return unit?.id; // Mengembalikan undefined jika tidak ditemukan
  };

  const fetchAllUserAndTheirTrainings = useCallback(async () => {
    try {
      const unitKerjaId = getUnitKerjaIdByName(userData?.unit_kerja ?? "");
      if (!unitKerjaId) {
        console.log("Unit kerja tidak ditemukan dalam daftar.");
        return;
      }

      const result = await axios.get(
        `http://localhost:5000/api/evaluation3?unit_kerja=${unitKerjaId}`,
      );

      // Hapus duplikat berdasarkan kombinasi user_id dan training_id
      const uniqueData = Array.from(
        new Map(
          result.data.data.map((item: any) => [
            `${item.user_id}-${item.training_id}`,
            item,
          ]),
        ).values(),
      );

      const formattedData = uniqueData.map((training: any) => ({
        id: training.training_id,
        judul: training.training_title,
        nama: training.name,
        jenis: training.training_type,
        tgl_mulai: format(new Date(training.start_date), "dd MMMM yyyy"),
        tgl_selesai: format(new Date(training.end_date), "dd MMMM yyyy"),
        lembaga: training.training_location,
        hasCompletedEvaluation: training.has_completed_evaluation,
        participanId: training.user_id,
      }));

      setTrainingData(formattedData);
    } catch (error) {
      console.log(error || "Data tidak ditemukan");
    }
  }, [userData?.unit_kerja]);

  const fetchAllUserAndTheirTrainingsAdmin = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/api/evaluation`);

      const formattedData = result.data.data.map((training: UserTraining) => ({
        ...training,
        start_date: format(new Date(training.start_date), "dd MMMM yyyy"),
        end_date: format(new Date(training.end_date), "dd MMMM yyyy"),
      }));

      setTrainingDataAdmin(formattedData);
    } catch (error) {
      console.log(error || "Data tidak ditemukan");
    }
  };

  useEffect(() => {
    fetchAllUserAndTheirTrainingsAdmin();
  }, []);

  useEffect(() => {
    fetchAllUserAndTheirTrainings();
  }, [fetchAllUserAndTheirTrainings]);

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

    if (currentDate < trainingEndDate) {
      alert("Evaluasi belum dapat dilakukan karena pelatihan belum selesai.");
    } else {
      alert("Evaluasi sudah dapat dilakukan.");
      window.location.href = `/training/evaluation_training2/${trainingId}/${participanId}/details`;
    }
  };

  return (
    <>
      {userData?.level === 1 && userData?.role === "user" && (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">
            Evaluasi Pelatihan lv 1
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
                        {training.judul}
                      </td>
                      <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                        {training.nama}
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
                              training.participanId,
                            )
                          }
                          className="mr-2 inline-flex items-center space-x-2 rounded-lg bg-gradient-to-r from-green-400 to-green-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:from-green-500 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
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
        {userData?.role === "admin" ? (
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
                      <span>Jawab Evaluasi</span>
                    </button>
                    <button className="inline-flex items-center space-x-2 rounded-lg bg-gradient-to-r from-red-400 to-red-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:from-red-500 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-400">
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
        ) : (
          <div>Anda Belum berhak membuka halaman ini Maaf !</div>
        )}
      </div>
    </>
  );
};

export default TableEvaluationTraining2;
