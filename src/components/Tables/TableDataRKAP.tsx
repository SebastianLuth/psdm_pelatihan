const TableDataRKAP: React.FC = () => {
    return (
        <div className="p-8 bg-gray-50 font-sans min-h-screen">
            {/* Header Section */}
            <h2 className="text-xl font-semibold text-gray-700 mb-1 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Data Monitoring RKAP
            </h2>
            <p className="text-gray-600 mb-6">
                Halaman ini untuk export data RKAP.
            </p>

            {/* Export Section */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Export Data RKAP</h3>

                {/* Year Selection */}
                <div className="mb-6">
                    <label htmlFor="tahunAnggaran" className="block text-gray-600 mb-2">Tahun Anggaran</label>
                    <select
                        id="tahunAnggaran"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    >
                        <option value="">Pilih Tahun Anggaran</option>
                        {/* Add year options here */}
                    </select>
                </div>

                {/* Download Button */}
                <div className="flex justify-end">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
                    <i className="fas fa-download mr-2"></i>
                    Download Excel
                </button>
                </div>
            </div>
        </div>
    );
};

export default TableDataRKAP;
