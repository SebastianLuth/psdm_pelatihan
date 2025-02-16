'use client'
import { useAuth } from '@/context/AuthContext';
import { ExportFileBudget, ExportFileBudgetForSuperAdmin } from '@/service/budget';
import { getAllCompany } from '@/service/company';
import { tahunOptions } from '@/types/budget-types';
import { CompanyType } from '@/types/vendor';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const ExportDataBudget: React.FC = () => {
    const [tahunAnggaran, setTahunAnggaran] = useState<string>("");
    const [tahunAnggaranOtherRegional, setTahunAnggaranOtherRegional] = useState<string>("");
    const [companyOtherRegional, setCompanyOtherRegional] =  useState<{id: number | string; nama: string }>({
        id : "",
        nama : ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false)
    const [company, setCompany] = useState<CompanyType[]>([]);

    const {userData} = useAuth();

    const changeHandleYears = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedYear = e.target.value;
        setTahunAnggaran(selectedYear);
    }

    const changeHandleYearsForOtherRegional = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedYear = e.target.value;
        setTahunAnggaranOtherRegional(selectedYear);
    }

    const changeHandleCompanyForOtherRegional = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCompany = e.target.value;
        const selectedCompanyName = e.target.options[e.target.selectedIndex].text;
        setCompanyOtherRegional({
            id : Number(selectedCompany),
            nama : selectedCompanyName
        });
    }

    
    const handleExportFileBudget = async (): Promise<void> => {
        try {
            const response = await ExportFileBudget(Number(tahunAnggaran));
            
            const url = window.URL.createObjectURL(new Blob([response]));
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

    const fetchAllCompany = async () => {
        try {
            setIsLoading(true);
            const result =  await getAllCompany();
            console.log(result)
            setCompany(result)
        } catch (error) {
            Swal.fire("Gagal!", "Terjadi kesalahan saat mengambil data perusahaan.", "error");
            setError(true);
        } finally {
            setIsLoading(false);
        }
    }

    const handleExportFileBudgetOtherRegional = async (): Promise<void> => {
        try {
            const response = await ExportFileBudgetForSuperAdmin(Number(tahunAnggaranOtherRegional), Number(companyOtherRegional.id));
                        
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Data Anggaran ${companyOtherRegional.nama}.xlsx`); 
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Error while exporting budget file:", error);
        }
    };

    useEffect(() => {
        if(userData?.role === "super admin") fetchAllCompany();
    }, [userData])

    if(isLoading) return <div>Loading...</div>
    
    return (
        <div className="max-w-6xl mx-auto bg-white p-12 shadow-md rounded-lg dark:border-strokedark dark:bg-boxdark">
            <h2 className="text-xl font-semibold text-gray-700 mb-2 dark:text-white">Export Data Anggaran {userData?.company_name}</h2>
            {/* Export Data Budget */}
                <div className="mb-4">
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tahun Anggaran</label>
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
                <div className='flex justify-end'>
                <button onClick={handleExportFileBudget} className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
                    Download Excel
                </button>
                </div>

                {/* Export Data Budget Other Regional For HO */}
                {userData?.role === "super admin" && userData.company_name === "PTPN4 Head Office" && (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-2 dark:text-white">
                            Export Data Anggaran Regional Lainnya
                        </h2>
                        <div className="flex flex-wrap md:flex-nowrap gap-4 w-full mb-4">
                            <div className="w-full md:w-1/2 space-y-1">
                                <label className="text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Pilih Perusahaan
                                </label>
                                <select
                                    onChange={changeHandleCompanyForOtherRegional}
                                    id="tahunAssessment1"
                                    className="w-full p-2.5 border border-gray-300 text-sm rounded-lg bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option value="">Pilih Perusahaan </option>
                                    {company?.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.nama}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="w-full md:w-1/2 space-y-1">
                                <label className="text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Tahun Anggaran
                                </label>
                                <select
                                     onChange={changeHandleYearsForOtherRegional}
                                    id="tahunAssessment2"
                                    className="w-full p-2.5 border border-gray-300 text-sm rounded-lg bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option value="">Pilih Tahun Anggaran</option>
                                    {tahunOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleExportFileBudgetOtherRegional}
                                className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
                            >
                                Download Excel
                            </button>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default ExportDataBudget;
