import React from "react";

const TableReportEvaluation2: React.FC = () => {
  return (
    <div className="bg-gray-50 p-6 font-sans">
      <h2 className="mb-2 text-xl font-semibold text-gray-700">
        Export Data Detail Rincian Biaya Pelatihan
      </h2>
      <p className="mb-6 text-gray-600">
        Halaman ini untuk export data Detail Rincian Biaya Pelatihan
      </p>

      {/* Export Data Laporan Penilaian Section */}
      <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-medium text-gray-700">
          Export Data Detail Rincian Biaya Pelatihan
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Tahun Anggaran */}
          <div>
            <label htmlFor="tahunAnggaran" className="mb-1 block text-gray-700">
              Tahun Anggaran
            </label>
            <select
              id="tahunAnggaran"
              className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Pilih Tahun Anggaran</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {/* Pilih Tanggal Awal */}
          <div>
            <label htmlFor="tanggalAwal" className="mb-1 block text-gray-700">
              Pilih Tanggal Awal
            </label>
            <input
              type="date"
              id="tanggalAwal"
              className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-1 text-sm text-gray-500">
              Data pertama ada pada tanggal : 27-02-2023
            </p>
          </div>

          {/* Pilih Tanggal Akhir */}
          <div>
            <label htmlFor="tanggalAkhir" className="mb-1 block text-gray-700">
              Pilih Tanggal Akhir
            </label>
            <input
              type="date"
              id="tanggalAkhir"
              className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-1 text-sm text-gray-500">
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
      </div>
    </div>
  );
};

export default TableReportEvaluation2;
