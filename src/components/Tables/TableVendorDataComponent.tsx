"use client";
import { getAllVendorData } from "@/service/vendor";
import { vendorType } from "@/types/vendor";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const TableVendorDataComponent = () => {
  const [vendorData, setVendorData] = useState<vendorType[]>([]);

  const fetchAllVendorData = async () => {
    try {
      const data = await getAllVendorData();
      setVendorData(
        data.map((item: any) => {
          return {
            id: item.id,
            nama: item.nama_lembaga,
            alamat_lembaga: item.alamat_lembaga,
            layanan_utama: item.layanan_utama,
            telpon_lembaga: item.telpon_lembaga,
            email_lembaga: item.email,
            website_lembaga: item.website,
            pic_lembaga: item.pic_lembaga,
          };
        }),
      );
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteBudget = async (id: number | undefined) => {
    try {
      const result = await Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Data Anggaran ini akan dihapus secara permanen dan data-data pelatihannya juga akan dihapus!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/api/vendor/${id}`);
      }
      fetchAllVendorData();
    } catch (error) {
      throw error;
    }
  };

  const handleDetail = (id: number | undefined) => {
    if (id) {
      window.location.href = `/budget/vendor_data/${id}`;
    }
  };

  useEffect(() => {
    fetchAllVendorData();
  }, []);

  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-300 bg-white/70 shadow-xl backdrop-blur-lg dark:border-gray-700 dark:bg-gray-900/70">
      <div className="px-6 py-5">
        <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Semua Data Lembaga/Vendor
        </h4>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-3">
            <span className="text-gray-700 dark:text-gray-300">Show</span>
            <select
              // onChange={handleLimitChange}
              // value={limit}
              className="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span className="text-gray-700 dark:text-gray-300">entries</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-gray-700 dark:text-gray-300">
              Search:
            </span>
            <input
              type="text"
              className="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
              placeholder="Search..."
              //   onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {/* Header Table */}
        <table className="min-w-full border-collapse text-left text-sm text-gray-700 dark:text-gray-300">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <th className="px-4 py-4">No</th>
              <th className="px-4 py-4">Jenis Anggaran</th>
              <th className="px-4 py-4">Total Anggaran</th>
              <th className="px-4 py-4">Sisa Anggaran</th>
              <th className="px-4 py-4">Tahun Anggaran</th>
              <th className="px-4 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            { vendorData.length === 0 ?(
              <tr>
                <td colSpan={6} className="px-4 py-4 text-center">
                  Tidak ada data
                </td>
              </tr>
            ) : (
              vendorData.map((vendor, index) => (
                <tr
                  key={vendor.id}
                  className="group transform transition-transform duration-200 hover:scale-[1.02] hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-4 text-gray-800 dark:text-gray-100">
                    {index + 1}
                  </td>
                  <td className="px-4 py-4 text-gray-800 dark:text-gray-100">
                    {vendor.nama}
                  </td>
                  <td className="px-4 py-4 text-gray-800 dark:text-gray-100">
                    {vendor.alamat_lembaga}
                  </td>
                  <td className="px-4 py-4 text-gray-800 dark:text-gray-100">
                    {vendor.email_lembaga}
                  </td>
                  <td className="px-4 py-4 text-gray-800 dark:text-gray-100">
                    {vendor.layanan_utama}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button
                      onClick={() => handleDetail(vendor.id)}
                      className="mr-2 inline-flex items-center space-x-2 rounded-lg bg-gradient-to-r from-green-400 to-green-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:from-green-500 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 5h2m-1 14V5m9 4H4m5 0a1 1 0 000 2h6a1 1 0 000-2H9z"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteBudget(vendor.id)}
                      className="inline-flex items-center space-x-2 rounded-lg bg-gradient-to-r from-red-400 to-red-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:from-red-500 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableVendorDataComponent;
