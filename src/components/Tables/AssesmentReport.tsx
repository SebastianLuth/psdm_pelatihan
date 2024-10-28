import React from 'react';

const AssessmentReport: React.FC = () => {
    return (
        <div className="p-6 bg-gray-50 font-sans">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Export Data Assessment</h2>
            <p className="text-gray-600 mb-3">Halaman ini untuk export data assessment seluruh karyawan PTPN 4 berdasarkan masing masing kamus kompetensi.</p>

            {/* Export Data Assessment BOD - 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Export Data Assessment BOD - 1 | Kamus Kompetensi Kementrian BUMN</h3>
                
                <div className="mb-4">
                    <label htmlFor="tahunAssessment1" className="block text-gray-700 mb-1">Tahun Assessment</label>
                    <select
                        id="tahunAssessment1"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Pilih Tahun Assessment</option>
                        {/* Add more options as needed */}
                    </select>
                </div>

                {/* Download Button */}
                <div className='flex justify-end'>
                <button className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
                    Download Excel
                </button>
                </div>

            </div>

            {/* Export Data Assessment BOD - 2 & 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Export Data Assessment BOD - 2 & 3 | Kamus Kompetensi Holding Perkebunan</h3>
                
                <div className="mb-4">
                    <label htmlFor="tahunAssessment2" className="block text-gray-700 mb-1">Tahun Assessment</label>
                    <select
                        id="tahunAssessment2"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Pilih Tahun Assessment</option>
                        {/* Add more options as needed */}
                    </select>
                </div>

                {/* Download Button */}
                <div className='flex justify-end'>
                <button className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
                    Download Excel
                </button>
                </div>
            </div>
        </div>
    );
};

export default AssessmentReport;
