'use client'
import { DownloadExcelEvaluation3 } from '@/service/evaluasi3';
import { DownloadExcelEvaluation1 } from '@/service/evaluation1';
import React, { useState } from 'react';

interface dateType {
    startDate: string;
    endDate: string;
}

const TableReportEvaluation1: React.FC = () => {
    const [formDate, setFormDate] = useState<dateType>({
        startDate: '',
        endDate: '',
    });

    const [formDateEvaluation3, setFormDateEvaluation3] = useState<dateType>({
        startDate: '',
        endDate: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error , setError] = useState(false);

    const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormDate(prevData => ({
            ...prevData,
            [name]: value
        }));
    }
    const handleChangeFormEvaluation3 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormDateEvaluation3(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleDownloadExcel = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response =await DownloadExcelEvaluation1(formDate.startDate, formDate.endDate);

            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Data_Evaluasi_Level1.xlsx'); 
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            setError(true);
        } finally {
            setIsLoading(false);
        }
    }

    const handleDownloadExcelEvaluation3 = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response =await DownloadExcelEvaluation3(formDateEvaluation3.startDate, formDateEvaluation3.endDate);

            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Data_Evaluasi_Level1.xlsx'); 
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            setError(true);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="max-w-6xl mx-auto bg-white p-12 shadow-md rounded-lg dark:border-strokedark dark:bg-boxdark">
            {/* Export Data Laporan Penilaian Section */}
                <h3 className="text-lg font-medium text-gray-700 mb-4 dark:text-white">Export Data Laporan Penilaian Evaluasi Level 1</h3>
                <form onSubmit={handleDownloadExcel}>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Pilih Tanggal Awal */}
                    <div>
                        <label htmlFor="tanggalAwal" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pilih Tanggal Awal</label>
                        <input
                            onChange={handleChangeForm}
                            name="startDate"
                            value={formDate.startDate}
                            type="date"
                            id="tanggalAwal"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <p className="text-sm text-gray-500 mt-1 dark:text-gray-300">Data pertama ada pada tanggal : 27-02-2023</p>
                    </div>

                    {/* Pilih Tanggal Akhir */}
                    <div>
                        <label htmlFor="tanggalAkhir" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pilih Tanggal Akhir</label>
                        <input
                            onChange={handleChangeForm}
                            name="endDate"
                            value={formDate.endDate}
                            type="date"
                            id="tanggalAkhir"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <p className="text-sm text-gray-500 mt-1 dark:text-gray-300">Data terakhir ada pada tanggal : 18-01-2024</p>
                    </div>
                </div>

                {/* Download Button */}
                <div className="mt-4 flex justify-end">
                    <button className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
                        Download Excel
                    </button>
                </div>
                </form>

            {/* Export Data Laporan Penilaian Section */}
                <h3 className="text-lg font-medium text-gray-700 mb-4 mt-5 dark:text-white">Export Data Laporan Penilaian Evaluasi Level 3</h3>
                <form onSubmit={handleDownloadExcelEvaluation3}>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Pilih Tanggal Awal */}
                    <div>
                        <label htmlFor="tanggalAwal" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pilih Tanggal Awal</label>
                        <input
                            onChange={handleChangeFormEvaluation3}
                            name='startDate'
                            value={formDateEvaluation3.startDate}
                            type="date"
                            id="tanggalAwal"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <p className="text-sm text-gray-500 mt-2 dark:text-gray-300">Data pertama ada pada tanggal : 27-02-2023</p>
                    </div>

                    {/* Pilih Tanggal Akhir */}
                    <div>
                        <label htmlFor="tanggalAkhir" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pilih Tanggal Akhir</label>
                        <input
                            onChange={handleChangeFormEvaluation3}
                            name='endDate'
                            value={formDateEvaluation3.endDate}
                            type="date"
                            id="tanggalAkhir"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <p className="text-sm text-gray-500 mt-2 dark:text-gray-300">Data terakhir ada pada tanggal : 18-01-2024</p>
                    </div>
                </div>

                {/* Download Button */}
                <div className="mt-4 flex justify-end">
                    <button className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
                        Download Excel
                    </button>
                </div>
                </form>
        </div>
    );
};

export default TableReportEvaluation1;
