"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import Image from "next/image";
import Link from "next/link";
import ReactECharts from "echarts-for-react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export default function TrainingDataId({
  sidebarOpen,
}: {
  sidebarOpen: boolean;
}) {
  const containerClasses = sidebarOpen ? "ml-72" : "ml-0 lg:ml-72";

  // Data untuk chart
  const biayaData = [
    { name: "Sekretariat", value: 6555000 },
    { name: "Fasilitator Eksternal", value: 23076923 },
    { name: "Akomodasi", value: 9750000 },
    { name: "Perdiem", value: 13750000 },
  ];

  const chartOptions = {
    title: {
      text: "Distribusi Biaya Pelatihan",
      left: "center",
      textStyle: {
        fontSize: 18,
        fontWeight: "bold",
      },
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      bottom: "0%",
    },
    series: [
      {
        name: "Biaya",
        type: "pie",
        radius: "50%",
        data: biayaData.map((item) => ({
          value: item.value,
          name: item.name,
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <div className="mx-auto space-y-8 p-6">
          <Breadcrumb pageName="Web Developer"></Breadcrumb>
          {/* Section: Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white shadow-lg">
              <h3 className="text-lg font-semibold">Total Biaya</h3>
              <p className="text-2xl font-bold">Rp 55.131.923,00</p>
              <p className="mt-2 text-sm">Tahun Anggaran: 2023</p>
            </div>
            <div className="rounded-lg bg-gradient-to-r from-green-500 to-green-600 p-6 text-white shadow-lg">
              <h3 className="text-lg font-semibold">Tanggal Pelatihan</h3>
              <p className="text-2xl font-bold">16 - 17 Januari 2023</p>
              <p className="mt-2 text-sm">Lokasi: PABATU - IHT</p>
            </div>
            <div className="rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white shadow-lg">
              <h3 className="text-lg font-semibold">Jenis & Metode</h3>
              <p className="text-2xl font-bold">In House Training</p>
              <p className="mt-2 text-sm">Metode: Offline</p>
            </div>
          </div>

          {/* Section: Chart */}
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
              Visualisasi Biaya Pelatihan
            </h3>
            <ReactECharts option={chartOptions} style={{ height: "400px" }} />
          </div>

          {/* Section: Detailed Info */}
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
              Rincian Biaya Pelatihan
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {biayaData.length > 0 ? (
                biayaData.map((item) => (
                  <div
                    key={item.name}
                    className="flex justify-between border-b border-gray-300 pb-2 dark:border-gray-700"
                  >
                    <p className="font-medium text-gray-800 dark:text-gray-300">
                      {item.name}
                    </p>
                    <p className="font-bold text-gray-800 dark:text-gray-100">
                      Rp {item.value.toLocaleString("id-ID")}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  Data tidak ditemukan.
                </p>
              )}
            </div>
          </div>

          {/* Section: Action Buttons */}
          <div className="mt-6 flex justify-end space-x-4">
            <button className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
              Tambah Biaya
            </button>
            <button className="rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600">
              Edit Biaya
            </button>
            <button className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600">
              Hapus
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-gray-300 bg-white/70 shadow-xl backdrop-blur-lg dark:border-gray-700 dark:bg-gray-900/70">
          <h4 className="px-6 py-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
            List Peserta Pelatihan Evaluasi Level 1
          </h4>
          <div className="overflow-x-auto">
            {/* Header Table */}
            <table className="min-w-full border-collapse text-left text-sm text-gray-700 dark:text-gray-300">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                  <th className="px-6 py-4">No</th>
                  <th className="px-6 py-4">NIK SAP</th>
                  <th className="px-6 py-4">Nama</th>
                  <th className="px-6 py-4">Nomor Hp</th>
                  <th className="px-6 py-4">Unit Kerja</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="group transform transition-transform duration-200 hover:scale-[1.02] hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                    1
                  </td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                    judul
                  </td>
                  <td className="flex items-center px-6 py-4 align-middle text-gray-800 dark:text-gray-100">
                    <div className="mr-2 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                      <Image
                        width={112}
                        height={112}
                        src={"/images/user/user-01.png"}
                        alt="User"
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-500">
                      Nama
                    </p>
                  </td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                    lembaga
                  </td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                    lokasi
                  </td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                    <div className="relative grid select-none items-center whitespace-nowrap rounded-md bg-green-500/20 px-2 py-1 font-sans text-xs font-bold uppercase text-green-900">
                      <span className="">Telah dinilai</span>
                    </div>
                  </td>
                  <td className="flex justify-end px-6 py-4">
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
                      <Link href={`/training/training_data/1`}>
                        {" "}
                        <span>Detail</span>
                      </Link>
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
              </tbody>
            </table>
          </div>
        </div>
      </DefaultLayout>
    </ProtectedRoute>
  );
}
