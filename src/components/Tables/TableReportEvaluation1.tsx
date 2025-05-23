'use client'
import { useAuth } from '@/context/AuthContext';
import { getAllCompany } from '@/service/company';
import { DownloadExcelEvaluation3, DownloadExcelEvaluation3otherRegional } from '@/service/evaluasi3';
import { DownloadExcelEvaluation1, DownloadExcelEvaluation1OtherRegional } from '@/service/evaluation1';
import { CompanyType, downloadType } from '@/types/vendor';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';


const TableReportEvaluation1: React.FC = () => {
    const [formDate, setFormDate] = useState<downloadType>({
        startDate: '',
        endDate: '',
    });

    const [formDateEvaluation3, setFormDateEvaluation3] = useState<downloadType>({
        startDate: '',
        endDate: '',
    });

    const [formDateOtherRegional, setFormDateOtherRegional] = useState<downloadType>({
        startDate: '',
        endDate: '',
        company_id : ''
    });

    const [formDateEvaluation3OtherRegional, setFormDateEvaluation3OtherRegional] = useState<downloadType>({
        startDate: '',
        endDate: '',
        company_id : ''
    });

    const [company, setCompany] = useState<CompanyType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error , setError] = useState(false);

    const userData = useAuth().userData;

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

    const handleChangeFormOtherRegioionalEvaluation1 = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormDateOtherRegional(prevData => ({
            ...prevData,
            [name]: value === "companyId" ? Number(value) || 0 : value
        }));

    }

    const handleChangeFormOtherRegioionalEvaluation3 = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormDateEvaluation3OtherRegional(prevData => ({
            ...prevData,
            [name]: value === "companyId" ? Number(value) || 0 : value
        }))
    }

    const fetchAllCompany = async () => {
        try {
            setIsLoading(true);
            const result =  await getAllCompany();
            setCompany(result)
        } catch (error) {
            Swal.fire("Gagal!", "Terjadi kesalahan saat mengambil data perusahaan.", "error");
            setError(true);
        } finally {
            setIsLoading(false);
            setError(false);
        }
    }

    const handleDownloadExcel = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response =await DownloadExcelEvaluation1(formDate.startDate, formDate.endDate);

            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Data Evaluasi Level 1.xlsx'); 
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
            link.setAttribute('download', 'Data Evaluasi Level 3.xlsx'); 
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            setError(true);
        } finally {
            setIsLoading(false);
        }
    }

    const handleDownloadE1OtherRegional = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);

            const selectedCompany = company.find((company) => company.id === Number(formDateOtherRegional.company_id));
            const companyName = selectedCompany ? selectedCompany.nama : '';

            const response =await DownloadExcelEvaluation1OtherRegional(formDateOtherRegional.startDate, formDateOtherRegional.endDate, Number(formDateOtherRegional.company_id));

            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Data Evaluasi Level ${companyName}.xlsx`); 
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            setError(true);
        } finally {
            setIsLoading(false);
        }
    }

    const handleDownloadE3OtherRegional = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);

            const selectedCompany = company.find((company) => company.id === Number(formDateEvaluation3OtherRegional.company_id));
            const companyName = selectedCompany ? selectedCompany.nama : '';

            const response =await DownloadExcelEvaluation3otherRegional(formDateEvaluation3OtherRegional.startDate, formDateEvaluation3OtherRegional.endDate, Number(formDateEvaluation3OtherRegional.company_id));


            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Data Evaluasi Level 3 ${companyName}.xlsx`); 
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            setError(true);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (userData?.role === "super admin")  fetchAllCompany();
    }, [userData?.role]);

    return (
        <>
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
        {
            userData?.role === "super admin" && (
                <div className="max-w-6xl mx-auto bg-white p-12 shadow-md rounded-lg dark:border-strokedark dark:bg-boxdark">
                {/* Export Data Laporan Penilaian Section */}
                    <h3 className="text-lg font-medium text-gray-700 mb-4 dark:text-white">Export Data Laporan Penilaian Evaluasi Level 1 Regional Lainnya</h3>
                    <form onSubmit={handleDownloadE1OtherRegional}>
    
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4">
                        {/* Pilih Perusahaan */}
                        <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                            Pilih Perusahaan
                        </label>
                        <select
                            id="tahunAssessment1"
                            name="company_id" 
                            className="w-full rounded-md border border-gray-300 bg-white p-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            onChange={handleChangeFormOtherRegioionalEvaluation1}
                            value={formDateOtherRegional.company_id}
                        >
                            <option value="" disabled>Pilih Perusahaan</option>
                            {company?.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.nama}
                            </option>
                            ))}
                        </select>
                    </div>


                        {/* Pilih Tanggal Awal */}
                        <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                            Pilih Tanggal Awal
                        </label>
                            <input
                                onChange={handleChangeFormOtherRegioionalEvaluation1}
                                name="startDate"
                                value={formDateOtherRegional.startDate}
                                type="date"
                                id="tanggalAwal"
                                className="w-full rounded-md border border-gray-300 bg-white p-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Data pertama ada pada tanggal: <span className="font-medium">27-02-2023</span>
                            </p>
                        </div>
    
                        {/* Pilih Tanggal Akhir */}
                        <div>
                        <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                            Pilih Tanggal Akhir
                        </label>
                            <input
                                onChange={handleChangeFormOtherRegioionalEvaluation1}
                                name="endDate"
                                value={formDateOtherRegional.endDate}
                                type="date"
                                id="tanggalAkhir"
                                className="w-full rounded-md border border-gray-300 bg-white p-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            />
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Data terakhir ada pada tanggal: <span className="font-medium">18-01-2024</span>
                         </p>                        
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
                    <h3 className="text-lg font-medium text-gray-700 mb-4 mt-5 dark:text-white">Export Data Laporan Penilaian Evaluasi Level 3 Regional Lainnya</h3>
                    <form onSubmit={handleDownloadE3OtherRegional}>
    
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4">
                        {/* Pilih Perusahaan */}
                        <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                            Pilih Perusahaan
                        </label>
                        <select
                            id="tahunAssessment1"
                            name="company_id" 
                            className="w-full rounded-md border border-gray-300 bg-white p-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            onChange={handleChangeFormOtherRegioionalEvaluation3}
                            value={formDateEvaluation3OtherRegional.company_id}
                        >
                            <option value="" disabled>Pilih Perusahaan</option>
                            {company?.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.nama}
                            </option>
                            ))}
                        </select>
                    </div>


                        {/* Pilih Tanggal Awal */}
                        <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                            Pilih Tanggal Awal
                        </label>
                            <input
                                onChange={handleChangeFormOtherRegioionalEvaluation3}
                                name="startDate"
                                value={formDateEvaluation3OtherRegional.startDate}
                                type="date"
                                id="tanggalAwal"
                                className="w-full rounded-md border border-gray-300 bg-white p-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Data pertama ada pada tanggal: <span className="font-medium">27-02-2023</span>
                            </p>
                        </div>
    
                        {/* Pilih Tanggal Akhir */}
                        <div>
                        <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                            Pilih Tanggal Akhir
                        </label>
                            <input
                                onChange={handleChangeFormOtherRegioionalEvaluation3}
                                name="endDate"
                                value={formDateEvaluation3OtherRegional.endDate}
                                type="date"
                                id="tanggalAkhir"
                                className="w-full rounded-md border border-gray-300 bg-white p-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            />
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Data terakhir ada pada tanggal: <span className="font-medium">18-01-2024</span>
                         </p>                        
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
            )
        }
        </>
    );
};

export default TableReportEvaluation1;
