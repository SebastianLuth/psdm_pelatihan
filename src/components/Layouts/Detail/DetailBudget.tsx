"use client";
import React, { useCallback, useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { budgetType } from "@/types/budget-types";
import { useParams } from "next/navigation";
import { PelatihanResponseType, TrainingType } from "@/types/training-types";
import { getDetailBudget } from "@/service/budget";

const DetailBudgetComponent = () => {
  const [trainingData, setTrainingData] = useState<TrainingType[]>([]);
  const [budgetData, setBudgetData] = useState<budgetType | null>(null);

  const { budgetId } = useParams();

  const fetchDetailBudget = useCallback(async () => {
    try {
      const data = await getDetailBudget(Number(budgetId));
      if (data) {
        setBudgetData(data);
        setTrainingData(
          data.semua_pelatihan.map((pelatihan: PelatihanResponseType) => ({
            id: pelatihan.pelatihan_id,
            judul: pelatihan.judul_pelatihan || "Tidak Ada",
            jenis: pelatihan.jenis_anggaran_pelatihan,
            metode: pelatihan.metode_pelatihan,
            lokasi: pelatihan.lokasi_pelatihan || "Tidak Ada",
            jumlah_anggaran: pelatihan.anggaran_pelatihan,
            jumlah_peserta: pelatihan.jumlah_peserta_pelatihan,
            lembaga: pelatihan.lembaga_pelatihan,
            kompetensi: pelatihan.kompetensi_pelatihan,
            rkap_type: pelatihan.rkap_type_pelatihan,
            tgl_mulai: pelatihan.tanggal_mulai_pelatihan,
            tgl_selesai: pelatihan.tanggal_selesai_pelatihan,
          })) || [],
        );
      }
    } catch (error) {
      console.error("Error fetching budget data:", error);
    }
  }, [budgetId]);

  const chartOptions = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["Biaya Pelatihan"],
    },
    xAxis: {
      type: "category",
      data: trainingData.map((training) => training.judul || "Tidak Ada"),
    },
    yAxis: [
      {
        type: "value",
        name: "Biaya (Rp)",
        position: "left",
      },
    ],
    series: [
      {
        name: "Biaya Pelatihan",
        type: "bar",
        data: trainingData.map((training) => training.jumlah_anggaran || 0),
        itemStyle: {
          color: "#4f46e5",
        },
      },
    ],
  };

  useEffect(() => {
    fetchDetailBudget();
  }, [fetchDetailBudget]);

  return (
    <div className="p-6">
      <h1 className="mb-12 text-center text-4xl font-bold text-gray-700 dark:text-white">
        Anggaran Pelatihan {budgetData?.jenis_anggaran || ""}
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
        <div className="flex transform items-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-4 text-white shadow-lg transition-all hover:scale-105">
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-white bg-opacity-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-white"
            >
              <rect x="4" y="4" width="16" height="8" rx="2" />
              <path d="M4 12h16M10 8v8" />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-base font-medium">Total Anggaran</h3>
            <p className="text-base font-bold">
              Rp {budgetData?.total_anggaran?.toLocaleString() || 0}
            </p>
          </div>
        </div>

        <div className="flex transform items-center rounded-xl bg-gradient-to-br from-green-500 to-teal-600 p-4 text-white shadow-lg transition-all hover:scale-105">
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-white bg-opacity-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-white"
            >
              <path d="M4 7h16a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" />
              <path d="M16 12h4M12 12h0" />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-base font-medium">Sisa Anggaran</h3>
            <p className="text-base font-bold">
              Rp {budgetData?.sisa_anggaran?.toLocaleString() || 0}
            </p>
          </div>
        </div>

        <div className="flex transform items-center rounded-xl bg-gradient-to-br from-red-500 to-teal-600 p-4 text-white shadow-lg transition-all hover:scale-105">
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-white bg-opacity-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-white"
            >
              <path d="M4 16v4M8 12v8M12 8v12M16 4v16M20 12v8" />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-base font-medium">Anggaran Terpakai</h3>
            <p className="text-base font-bold">
              Rp{" "}
              {(budgetData?.sisa_anggaran !== null &&
              budgetData?.total_anggaran !== null
                ? (budgetData?.total_anggaran || 0) -
                  (budgetData?.sisa_anggaran || 0)
                : 0
              ).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex transform items-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 p-4 text-white shadow-lg transition-all hover:scale-105">
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-white bg-opacity-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-8 w-8 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12h6m0 0v6m0-6l6-6m-6 0l-6 6"
              />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-base font-medium">Jumlah Pelatihan</h3>
            <p className="text-base font-bold">{trainingData.length}</p>
          </div>
        </div>

        <div className="flex transform items-center rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 p-4 text-white shadow-lg transition-all hover:scale-105">
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-white bg-opacity-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-8 w-8 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m-1-1a2 2 0 104 0v4a2 2 0 11-4 0v-4z"
              />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-base font-medium">Persentase Anggaran</h3>
            <p className="text-base font-bold">
              {Math.round(
                (((budgetData?.total_anggaran || 0) -
                  (budgetData?.sisa_anggaran || 0)) /
                  (budgetData?.total_anggaran || 0)) *
                  100,
              )}
              %
            </p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="mt-12 rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
        <h3 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-white">
          Visualisasi Anggaran
        </h3>
        <ReactECharts option={chartOptions} style={{ height: "400px" }} />
      </div>

      {/* Detail Table Section */}
      <div className="mt-12 rounded-xl bg-white p-8 shadow-xl dark:bg-gray-800">
        <h3 className="mb-8 text-3xl font-extrabold text-gray-800 dark:text-white">
          Detail Pelatihan
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse rounded-xl bg-white shadow-sm dark:bg-gray-900">
            <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  Nama Pelatihan
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  Tanggal Mulai
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  Tanggal Akhir
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  Biaya Pelatihan
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  Lembaga
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  Jenis
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  Metode
                </th>
              </tr>
            </thead>
            <tbody>
              {trainingData.map((training, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0
                      ? "bg-gray-50 dark:bg-gray-800"
                      : "bg-white dark:bg-gray-900"
                  }`}
                >
                  <td className="flex items-center px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-5 w-5 text-indigo-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 14l-2-2m0 0l2-2m-2 2h8m-6 4a9 9 0 110-18 9 9 0 010 18z"
                      />
                    </svg>
                    {training.judul || "Tidak Ada"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {training.tgl_mulai || "Belum Ditentukan"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {training.tgl_selesai || "Belum Ditentukan"}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Rp {training?.jumlah_anggaran?.toLocaleString() || 0}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {training.lembaga || "Tidak Ada"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-600">
                      {training.jenis || ""}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        training.metode === "Online"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {training.metode || "Offline"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Detail Table Section  END*/}
    </div>
  );
};

export default DetailBudgetComponent;
