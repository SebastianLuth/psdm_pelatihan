"use client";

import { useAuth } from "@/context/AuthContext";
import { TrainingType } from "@/types/training-types";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { format } from "date-fns";

const TableEvaluationTraining1 = () => {
  const { userData } = useAuth();
  const [trainingData, setTrainingData] = useState<TrainingType[]>([]);

  const fetchAllTraining = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/api/training`);
      const formattedData = result.data.data.map((training: TrainingType) => ({
        ...training,
        tgl_mulai: format(new Date(training.tgl_mulai), "dd MMMM yyyy"),
        tgl_selesai: format(new Date(training.tgl_selesai), "dd MMMM yyyy"),
      }));
      setTrainingData(formattedData);
    } catch (error) {
      console.log(error || "Data tidak ditemukan");
    }
  };

  useEffect(() => {
    fetchAllTraining();
  }, []);

  const userTraining = trainingData.filter((training) =>
    training.peserta.some((participant) => participant.user_id === userData?.id),
  );

  const handleEvaluationClick = (tglSelesai: string, trainingId: number | undefined) => {
    const trainingEndDate = new Date(tglSelesai);
    const currentDate = new Date();

    if (currentDate < trainingEndDate) {
      alert("Evaluasi belum dapat dilakukan karena pelatihan belum selesai.");
    } else {
      alert("Evaluasi sudah dapat dilakukan.");
      window.location.href = `/training/evaluation_training1/${trainingId}`;
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
          {/* Header Table */}
          <div className="grid grid-cols-6 rounded-sm bg-gray-2 dark:bg-meta-6">
            <div className="p-2.5 text-start xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">No</h5>
            </div>
            <div className="p-2.5 text-start xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">NIK SAP</h5>
            </div>
            <div className="p-2.5 text-start xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">Nama</h5>
            </div>
            <div className="p-2.5 text-start xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">Pelatihan</h5>
            </div>
            <div className="p-2.5 text-start xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">Status</h5>
            </div>
            <div className="p-2.5 text-start xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">Action</h5>
            </div>
          </div>

          {userData?.role === "admin" &&
            trainingData.map((training, key) => (
              <div
                className={`grid grid-cols-6 ${
                  key === trainingData.length - 1
                    ? ""
                    : "border-b border-stroke dark:border-strokedark"
                }`}
                key={key}
              >
                <div className="flex items-center justify-start p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">{training.judul}</p>
                </div>
                <div className="flex items-center justify-start p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">{training.jenis}</p>
                </div>
                <div className="flex items-center justify-start p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">{training.jumlah_anggaran}</p>
                </div>
                <div className="flex items-center justify-start p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">{training.tgl_mulai}</p>
                </div>
                <div className="flex items-center justify-start p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">{training.tgl_selesai}</p>
                </div>
                <div className="flex items-center justify-start gap-4 p-2.5 xl:p-5">
                  <Link
                    className="text-black dark:text-white"
                    href={`/training/evaluation_training1/${training.id}/edit`}
                  >
                    Detail
                  </Link>
                </div>
              </div>
            ))}

          {userData?.role === "user" &&
            userTraining.map((training, key) => (
              <div
                key={key}
                className={`grid grid-cols-6 ${
                  key === userTraining.length - 1
                    ? ""
                    : "border-b border-stroke dark:border-strokedark"
                }`}
              >
                <div className="flex items-center justify-start p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">{training.judul}</p>
                </div>
                <div className="flex items-center justify-start p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">{training.jenis}</p>
                </div>
                <div className="flex items-center justify-start p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">{training.tgl_mulai}</p>
                </div>
                <div className="flex items-center justify-start p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">{training.tgl_selesai}</p>
                </div>
                <div className="flex items-center justify-start gap-4 p-2.5 xl:p-5">
                  <button
                    className="text-black dark:text-white"
                    onClick={() => handleEvaluationClick(training.tgl_selesai, training.id)}
                  >
                    Jawab Evaluasi
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default TableEvaluationTraining1;
