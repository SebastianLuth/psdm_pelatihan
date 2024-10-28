import React from 'react';

const TableAssessmentBod1: React.FC = () => {
    return (
        <div className="p-6 bg-gray-50 font-sans">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Data Assessment</h2>
            <p className="text-gray-600 mb-4">Halaman ini untuk melihat data assessment.</p>
            
            {/* Assessment Year Selection */}
            <div className="mb-4">
                <label htmlFor="tahunAssessment" className="block text-gray-700 mb-1">Tahun Assessment</label>
                <select
                    id="tahunAssessment"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Pilih Tahun Assessment</option>
                    {/* Add options dynamically if needed */}
                </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mb-4">
                <button className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
                    + Tambah Data Assessment
                </button>
                <button className="px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500">
                    Import Assessment
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full bg-white border border-gray-200 rounded-md">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-4 border-b">No</th>
                            <th className="py-3 px-4 border-b">NIK-SAP</th>
                            <th className="py-3 px-4 border-b">Nama</th>
                            <th className="py-3 px-4 border-b">Tanggal</th>
                            <th className="py-3 px-4 border-b">Total Skor</th>
                            <th className="py-3 px-4 border-b">Rekomendasi</th>
                            <th className="py-3 px-4 border-b">Status</th>
                            <th className="py-3 px-4 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={8} className="text-center py-4 text-gray-500">
                                No data available in table
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 text-gray-600">
                <p>Showing 0 to 0 of 0 entries</p>
                <div className="flex gap-2">
                    <button className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300">Previous</button>
                    <button className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300">Next</button>
                </div>
            </div>
        </div>
    );
};

export default TableAssessmentBod1;
