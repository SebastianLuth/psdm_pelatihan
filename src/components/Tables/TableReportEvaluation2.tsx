'use client'
import axios from "axios";
import React, { useState } from "react";

interface dateType {
  startDate: string;
  endDate: string;
}

const TableReportEvaluation2: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error , setError] = useState(false);
  const [formDate, setFormDate] = useState<dateType>({
    startDate: "",
    endDate: "",
  });
  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
          setFormDate(prevData => ({
              ...prevData,
              [name]: value
          }));
  }

  const handleDownloadExcel = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        // Logika untuk mengunduh file Excel
        const response =await axios.get(`http://localhost:5000/api/training/export?startDate=${formDate.startDate}&endDate=${formDate.endDate}`, { responseType: 'blob' });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Data_Evaluasi_Level1.xlsx'); 
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (error) {
        console.log('eror nih entah dimana pun salahnya')
    }
}

  

  return (
    <div className="max-w-6xl mx-auto bg-white p-12 shadow-md rounded-lg dark:border-strokedark dark:bg-boxdark">
      <h3 className="text-lg font-medium text-gray-700 mb-4 dark:text-white">
        Export Data Detail Rincian Biaya Pelatihan
      </h3>
      <form onSubmit={handleDownloadExcel}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Pilih Tanggal Awal */}
          <div >
            <label htmlFor="tanggalAwal" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Pilih Tanggal Awal
            </label>
            <input
              onChange={handleChangeForm}
              name="startDate"
              value={formDate.startDate}
              type="date"
              id="tanggalAwal"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1 dark:text-gray-300">
              Data pertama ada pada tanggal : 27-02-2023
            </p>
          </div>

          {/* Pilih Tanggal Akhir */}
          <div>
            <label htmlFor="tanggalAkhir" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Pilih Tanggal Akhir
            </label>
            <input
              onChange={handleChangeForm}
              name="endDate"
              value={formDate.endDate}
              type="date"
              id="tanggalAkhir"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1 dark:text-gray-300">
              Data terakhir ada pada tanggal : 18-01-2024
            </p>
          </div>
        </div>

        {/* Download Button */}
        <div className="mt-4 flex justify-end">
          <button className="rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600">
            Download Excel
          </button>
        </div>
        </form>
    </div>
  );
};

export default TableReportEvaluation2;
