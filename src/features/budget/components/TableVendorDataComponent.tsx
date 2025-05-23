"use client";
import { deleteVendorData, getAllVendorData } from "@/service/vendor";
import { vendorType } from "@/types/vendor";
import { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import SkeletonTable from "../../../components/Skeleton/SkeletonTable";
import Link from "next/link";
import { debounce } from "lodash";

export const TableVendorDataComponent = () => {
  const [vendorData, setVendorData] = useState<vendorType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState<number>(10);

  const fetchAllVendorData = async () => {
    try {
      setIsLoading(true);
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
            npwp: item.npwp
          };
        }),
      );
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
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
        await deleteVendorData(Number(id));
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

  const getFilteredData = (data: vendorType[]) => {
    let filtered = data.filter((item) =>
      item.nama
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item.layanan_utama
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    );

    // Pagination berdasarkan hasil filter
    const totalEntries = filtered?.length || 0;
    const totalPages = Math.ceil(totalEntries / limit);
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    const currentData = filtered?.slice(startIndex, endIndex);

    return { filtered, currentData, totalEntries, totalPages, startIndex, endIndex };
  };

  const {
    filtered: filteredBudgetData,
    currentData,
    totalEntries,
    totalPages,
    startIndex,
    endIndex
  } = getFilteredData(vendorData);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    fetchAllVendorData();
  }, []);

  const debouncedSearch = debounce((query: string) => {
    setSearchQuery(query);
  }, 300);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(event.target.value));
  };


  return (
    <>
      {isLoading === true ? (
        <SkeletonTable title="Lembaga/Vendor" />
      ) : (
        <div className="relative overflow-hidden rounded-xl border border-gray-300 bg-white/70 shadow-xl backdrop-blur-lg dark:border-gray-700 dark:bg-gray-900/70">
          {/* Header */}
          <div className="px-6 py-5">
            <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Semua Data Lembaga/Vendor
            </h4>
            <div className="mt-10 flex items-center justify-between space-x-4">
              {/* Label */}
              <div className="flex items-center space-x-3">
                <span className="text-gray-700 dark:text-gray-300">Show</span>
                <select
                  onChange={handleLimitChange}
                  value={limit}
                  className="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
               
              </div>
              {/* Search */}
              <div className="flex-grow items-center ">
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 "
                  placeholder="Search..."
                  onChange={handleSearchChange}
                />
              </div>
              {/* Add Vendor */}
              <Link
                href={"/budget/add_vendor"}
               className="inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-indigo-700 hover:shadow-md"
              >
                Tambahkan Data Vendor
              </Link>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {/* Header Table */}
            <table className="min-w-full border-collapse text-left text-sm text-gray-700 dark:text-gray-300">
              <thead>
                <tr className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                  <th className="px-4 py-4">No</th>
                  <th className="px-4 py-4">Lembaga</th>
                  <th className="px-4 py-4">Alamat Lembaga</th>
                  <th className="px-4 py-4">No Telpon Lembaga</th>
                  <th className="px-4 py-4">Email Lembaga</th>
                  <th className="px-4 py-4">Layanan Utama Lembaga</th>
                  <th className="px-4 py-4">NPWP Lembaga</th>
                  <th className="px-4 py-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {currentData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-4 text-center">
                      Tidak ada data
                    </td>
                  </tr>
                ) : (
                  currentData.map((vendor, index) => (
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
                        {vendor.telpon_lembaga}
                      </td>
                      <td className="px-4 py-4 text-gray-800 dark:text-gray-100">
                        {vendor.email_lembaga}
                      </td>
                      <td className="px-4 py-4 text-gray-800 dark:text-gray-100">
                        {vendor.layanan_utama}
                      </td>
                      <td className="px-4 py-4 text-gray-800 dark:text-gray-100">
                        {vendor.npwp}
                      </td>
                      <td className="flex justify-end gap-2 px-4 py-4 text-right">
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
          <div className="mt-8 mb-4 mr-4 flex items-center justify-between text-sm text-gray-500">
                <span>
                  {" "}
                  Showing {startIndex + 1} to {Math.min(endIndex, totalEntries)}{" "}
                  of {totalEntries} entries
                </span>
                <div className="space-x-2">
                  <button
                    className="rounded-lg bg-gray-200 px-3 py-1 transition hover:bg-gray-300"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <button
                    className="rounded-lg bg-gray-200 px-3 py-1 transition hover:bg-gray-300"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
          </div>
        </div>
      )}
    </>
  );
};