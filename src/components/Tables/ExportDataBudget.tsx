'use client'
import { tahunOptions } from '@/types/budget-types';
import axios from 'axios';
import React from 'react';

const ExportDataBudget: React.FC = () => {
    const [tahunAnggaran, setTahunAnggaran] = React.useState<string>("");
    const changeHandleYears = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedYear = e.target.value;
        setTahunAnggaran(selectedYear);
    }
    
    const handleExportFileBudget = async (): Promise<void> => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/budget/export?tahun_anggaran=${tahunAnggaran}`, 
                { responseType: 'blob' } 
            );
            
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Data_Anggaran.xlsx'); 
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Error while exporting budget file:", error);
        }
    };
    
    return (
        <div className="p-6 bg-gray-50 font-sans">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Export Data Anggaran</h2>
            <p className="text-gray-600 mb-3">Halaman ini untuk export data Anggaran</p>

            {/* Export Data Assessment BOD - 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Export Data Anggaran | PT. Perkebunan Nusantara (PTPN) </h3>
                
                <div className="mb-4">
                    <label htmlFor="tahunAssessment1" className="block text-gray-700 mb-1">Tahun Anggaran</label>
                    <select
                        onChange={changeHandleYears}
                        id="tahunAssessment1"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Pilih Tahun Anggaran</option>
                        {tahunOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Download Button */}
                <div className='flex justify-end'>
                <button onClick={handleExportFileBudget} className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
                    Download Excel
                </button>
                </div>

            </div>
            
        </div>
    );
};

export default ExportDataBudget;
