import React from 'react';

const TableReportEvaluation2: React.FC = () => {
    return (
        <div className="p-6 bg-gray-50 font-sans">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Export Data Evaluasi Level 3</h2>
            <p className="text-gray-600 mb-6">Halaman ini untuk export data evaluasi penilaian level 3 & 4.</p>

            {/* Export Data Laporan Penilaian Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Export Data Laporan Penilaian</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Tahun Anggaran */}
                    <div>
                        <label htmlFor="tahunAnggaran" className="block text-gray-700 mb-1">Tahun Anggaran</label>
                        <select
                            id="tahunAnggaran"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Pilih Tahun Anggaran</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>

                    {/* Pilih Tanggal Awal */}
                    <div>
                        <label htmlFor="tanggalAwal" className="block text-gray-700 mb-1">Pilih Tanggal Awal</label>
                        <input
                            type="date"
                            id="tanggalAwal"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-sm text-gray-500 mt-1">Data pertama ada pada tanggal : 27-02-2023</p>
                    </div>

                    {/* Pilih Tanggal Akhir */}
                    <div>
                        <label htmlFor="tanggalAkhir" className="block text-gray-700 mb-1">Pilih Tanggal Akhir</label>
                        <input
                            type="date"
                            id="tanggalAkhir"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-sm text-gray-500 mt-1">Data terakhir ada pada tanggal : 18-01-2024</p>
                    </div>
                </div>

                {/* Download Button */}
                <div className="mt-4 flex justify-end">
                    <button className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
                        Download Excel
                    </button>
                </div>
            </div>

            {/* Export Data Status Penilaian Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Export Data Status Penilaian</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Tahun Anggaran */}
                    <div>
                        <label htmlFor="tahunAnggaranStatus" className="block text-gray-700 mb-1">Tahun Anggaran</label>
                        <select
                            id="tahunAnggaranStatus"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Pilih Tahun Anggaran</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>

                    {/* Pilih Status */}
                    <div>
                        <label htmlFor="status" className="block text-gray-700 mb-1">Pilih Status</label>
                        <select
                            id="status"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Belum Menilai</option>
                        </select>
                    </div>
                </div>

                {/* Download Button */}
                <div className="mt-4 flex justify-end">
                    <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
                        Download Excel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TableReportEvaluation2;
