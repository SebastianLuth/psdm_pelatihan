"use client";

import { TrainingType } from "@/types/training-types";
import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Link from "next/link";

const TableDataTraingin = () => {
  const [allTraining, setAllTraining] = useState<TrainingType[]>([]);
  const fetchAllTraining = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/api/training`);
      const formattedData = result.data.data.map((training: TrainingType) => ({
        ...training,
        tgl_mulai: format(new Date(training.tgl_mulai), "dd MMMM yyyy"),
        tgl_selesai: format(new Date(training.tgl_selesai), "dd MMMM yyyy"),
      }));
      console.log(result.data.data)
      setAllTraining(formattedData);
    } catch (error) {
      console.log(error || "Data tidak ditemukan");
    }
  };

  const handleDeleteTraining = async (trainingId: number | undefined) => {
    console.log("deleted");
  };

  useEffect(() => {
    fetchAllTraining();
  }, []);
  return (
    <>
      <div className="relative overflow-hidden rounded-xl border border-gray-300 bg-white/70 shadow-xl backdrop-blur-lg dark:border-gray-700 dark:bg-gray-900/70">
        <div className="px-6 py-5">
          <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Data Pelatihan
          </h4>
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3">
              <span className="text-gray-700 dark:text-gray-300">Show</span>
              <select className="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span className="text-gray-700 dark:text-gray-300">entries</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2 text-gray-700 dark:text-gray-300">
                Search:
              </span>
              <input
                type="text"
                className="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
        {/* Table */}
        <div className="overflow-x">
          {/* Header Table */}
          <table className="min-w-full border-collapse text-left text-sm text-gray-700 dark:text-gray-300">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                <th className="px-6 py-4">No</th>
                <th className="px-6 py-4">Nama Pelatihan</th>
                <th className="px-6 py-4">Jenis Pelatihan</th>
                <th className="px-6 py-4">Lembaga</th>
                <th className="px-6 py-4">Lokasi</th>
                <th className="px-6 py-4">Tanggal Mulai</th>
                <th className="px-6 py-4">Tanggal Selesai</th>
                <th className="px-6 py-4">Metode Pelatihan</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {allTraining.map((training, index) => (
                <tr
                  key={training.id}
                  className="group transform transition-transform duration-200 hover:scale-[1.02] hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                    {training.judul}
                  </td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                    {training.jenis}
                  </td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                    {training.lembaga}
                  </td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                    {training.lokasi}
                  </td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                    {training.tgl_mulai}
                  </td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                    {training.tgl_selesai}
                  </td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                    {training.metode}
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
                        key={training.id}
                        href={`/training/training_data/${training.id}`}
                      >
                        {" "}
                        <span>Detail</span>
                      </Link>
                    </button>
                    <button
                      onClick={() => handleDeleteTraining(training.id)}
                      className="inline-flex items-center space-x-2 rounded-lg bg-gradient-to-r from-red-400 to-red-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:from-red-500 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
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
        </div>
      </div>
    </>
  );
};
export default TableDataTraingin;
