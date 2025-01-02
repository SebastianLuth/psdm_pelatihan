'use client'
import axios from 'axios';
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
            // Logika untuk mengunduh file Excel
            const response =await axios.get(`http://localhost:5000/api/evaluation/export?startDate=${formDate.startDate}&endDate=${formDate.endDate}`, { responseType: 'blob' });

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

    const handleDownloadExcelEvaluation3 = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Logika untuk mengunduh file Excel
            const response =await axios.get(`http://localhost:5000/api/evaluation3/export?startDate=${formDateEvaluation3.startDate}&endDate=${formDateEvaluation3.endDate}`, { responseType: 'blob' });

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
        <div className="p-6 bg-gray-50 font-sans">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Export Data Evaluasi Level 1</h2>
            <p className="text-gray-600 mb-6">Halaman ini untuk export data evaluasi penilaian level 1.</p>

            {/* Export Data Laporan Penilaian Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Export Data Laporan Penilaian Evaluasi Level 1</h3>
                <form onSubmit={handleDownloadExcel}>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Pilih Tanggal Awal */}
                    <div>
                        <label htmlFor="tanggalAwal" className="block text-gray-700 mb-1">Pilih Tanggal Awal</label>
                        <input
                            onChange={handleChangeForm}
                            name="startDate"
                            value={formDate.startDate}
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
                           onChange={handleChangeForm}
                           name="endDate"
                           value={formDate.endDate}
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
                </form>
            </div>

            {/* Export Data Laporan Penilaian Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Export Data Laporan Penilaian Evaluasi Level 3</h3>
                <form onSubmit={handleDownloadExcelEvaluation3}>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Pilih Tanggal Awal */}
                    <div>
                        <label htmlFor="tanggalAwal" className="block text-gray-700 mb-1">Pilih Tanggal Awal</label>
                        <input
                            onChange={handleChangeFormEvaluation3}
                            name='startDate'
                            value={formDateEvaluation3.startDate}
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
                            onChange={handleChangeFormEvaluation3}
                            name='endDate'
                            value={formDateEvaluation3.endDate}
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
                </form>
            </div>
        </div>
    );
};

export default TableReportEvaluation1;
