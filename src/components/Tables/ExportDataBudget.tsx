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
                { 
                    responseType: 'blob', 
                    withCredentials: true
                } 
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
        <div className="max-w-6xl mx-auto bg-white p-12 shadow-md rounded-lg dark:border-strokedark dark:bg-boxdark">
            <h2 className="text-xl font-semibold text-gray-700 mb-2 dark:text-white">Export Data Anggaran PTPN</h2>

            {/* Export Data Assessment BOD - 1 */}
                <div className="mb-4">
                    <label htmlFor="tahunAssessment1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tahun Anggaran</label>
                    <select
                        onChange={changeHandleYears}
                        id="tahunAssessment1"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
    );
};

export default ExportDataBudget;
