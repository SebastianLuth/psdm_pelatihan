"use client";
import { useAuth } from "@/context/AuthContext";
import { getAllCompany } from "@/service/company";
import { DownloadExcelRincianBiaya, DownloadExcelRincianBiayaOtherRegional } from "@/service/training";
import { CompanyType, downloadType } from "@/types/vendor";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";


const TableReportEvaluation2: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formDate, setFormDate] = useState<downloadType>({
    startDate: "",
    endDate: "",
  });
  const [formDateOtherRegional, setFormDateOtherRegional] = useState<downloadType>({
    startDate: "",
    endDate: "",
    company_id: "" 
  });

  const [company, setCompany] = useState<CompanyType[]>([]);

  const userData = useAuth().userData;

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDate((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 const handleChangeFormOtherRegioional = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
   const  {name , value} = e.target;
   setFormDateOtherRegional((prevData) => ({
     ...prevData,
     [name]: name === "companyId" ? Number(value) || 0 : value,
    }))
 }

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
        setError(false);
    }
}

  const handleDownloadExcel = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Logika untuk mengunduh file Excel
      const response = await DownloadExcelRincianBiaya(
        formDate.startDate,
        formDate.endDate,
      );
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Data Rincian Biaya Pelatihan.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      setError(true);
    }
  };

  const handleDownloadExcelOtherRegional = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Logika untuk mengunduh file Excel
      const selectedCompany = company.find((company) => company.id === Number(formDateOtherRegional.company_id));
      const companyName = selectedCompany ? selectedCompany.nama : '';


      const response = await DownloadExcelRincianBiayaOtherRegional(
        formDateOtherRegional.startDate,
        formDateOtherRegional.endDate,
        Number(formDateOtherRegional.company_id)
      );
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Data Rincian Biaya Pelatihan ${companyName}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      setError(true);
    }
  }

  useEffect(() => {
    if(userData?.role === "super admin")  fetchAllCompany()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="mx-auto max-w-6xl rounded-lg bg-white p-12 shadow-md dark:border-strokedark dark:bg-boxdark">
      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-700 dark:text-white">
          Export Data Detail Rincian Biaya Pelatihan
        </h3>
        <form onSubmit={handleDownloadExcel}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Pilih Tanggal Awal */}
            <div>
              <label
                htmlFor="tanggalAwal"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Pilih Tanggal Awal
              </label>
              <input
                onChange={handleChangeForm}
                name="startDate"
                value={formDate.startDate}
                type="date"
                id="tanggalAwal"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                Data pertama ada pada tanggal : 27-02-2023
              </p>
            </div>

            {/* Pilih Tanggal Akhir */}
            <div>
              <label
                htmlFor="tanggalAkhir"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Pilih Tanggal Akhir
              </label>
              <input
                onChange={handleChangeForm}
                name="endDate"
                value={formDate.endDate}
                type="date"
                id="tanggalAkhir"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                Data terakhir ada pada tanggal : 18-01-2024
              </p>
            </div>
          </div>

          {/* Download Button */}
          <div className="mt-4 flex justify-end">
            <button className="rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600">
              Download Excel
            </button>
          </div>
        </form>
      </div>

      {/* For Other Regional */}
      {userData?.role === "super admin" && 
        (
          <div>
            <h3 className="mb-4 text-lg font-medium text-gray-700 dark:text-white">
              Export Data Detail Rincian Biaya Pelatihan Regional Lainnya
            </h3>
            <form onSubmit={handleDownloadExcelOtherRegional}>
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
                    onChange={handleChangeFormOtherRegioional}
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
                    onChange={handleChangeFormOtherRegioional}
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
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                    Pilih Tanggal Akhir
                  </label>
                  <input
                    onChange={handleChangeFormOtherRegioional}
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
                <button className="rounded-md bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600">
                  Download Excel
                </button>
              </div>
            </form>
          </div>
        )
      }
      

    </div>
  );
};

export default TableReportEvaluation2;
