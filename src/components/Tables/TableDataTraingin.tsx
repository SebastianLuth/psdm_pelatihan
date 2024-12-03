"use client";

import { TrainingType } from "@/types/training-types";
import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";

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
      setAllTraining(formattedData);
    } catch (error) {
      console.log(error || "Data tidak ditemukan" );
    }
  }
  useEffect(() => {
    fetchAllTraining();
  }, []);
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">
          Data Pelatihan
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Halaman ini untuk melihat data semua Pelatihan.
        </p>
        <div className="flex items-center justify-between py-4">
          {/* Dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-700">Show</span>
            <select className="rounded-md border border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span className="text-gray-700">entries</span>
          </div>

          {/* Search */}
          <div className="flex items-center">
            <span className="mr-2 text-gray-700">Search:</span>
            <input
              type="text"
              className="rounded-md border border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search..."
            />
          </div>
        </div>
        <div className="flex flex-col">
          {/* Header Table */}
          <div className="grid grid-cols-9 rounded-sm bg-gray-2 dark:bg-meta-9">
            <div className="p-2.5 text-start xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                No
              </h5>
            </div>
            <div className="p-2.5 text-start xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Nama Pelatihan
              </h5>
            </div>
            <div className="p-2.5 text-start xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
               Jenis Pelatihan
              </h5>
            </div>
            <div className="p-2.5 text-start xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
               Lembaga
              </h5>
            </div>
            <div className="p-2.5 text-start xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
               Lokasi
              </h5>
            </div>
            <div className="p-2.5 text-start xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
               Tanggal Mulai
              </h5>
            </div>
            <div className="p-2.5 text-start xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
               Tanggal Selesai
              </h5>
            </div>
            <div className="p-2.5 text-start xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
               Metode Pelatihan
              </h5>
            </div>
            <div className="p-2.5 text-start xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Action
              </h5>
            </div>
          </div>

          {/* Data Rows */}
          {allTraining.map((brand, key) => (
            <div
              className={`grid grid-cols-9 ${
                key === allTraining.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={key}
            >
              <div className="flex items-center justify-start p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{key + 1}</p>
              </div><div className="flex items-center justify-start p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{brand.judul}</p>
              </div><div className="flex items-center justify-start p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{brand.jenis}</p>
              </div><div className="flex items-center justify-start p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{brand.lembaga}</p>
              </div>
              <div className="flex items-center justify-start p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{brand.lokasi}</p>
              </div>
              <div className="flex items-center justify-start p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{brand.tgl_mulai}</p>
              </div>
              <div className="flex items-center justify-start p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{brand.tgl_selesai}</p>
              </div>
              <div className="flex items-center justify-start p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{brand.metode}</p>
              </div>
              <div className="flex items-center justify-start gap-4 p-2.5 xl:p-5">
                <button className="text-black dark:text-white">Detail</button>
                <button className="text-black dark:text-white">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TableDataTraingin;
