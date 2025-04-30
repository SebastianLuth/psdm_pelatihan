"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;


type CKPDataType = {
    id: number,
    user_id: number | string,
    nama_peserta: string,
    status: string,
    created_at: string,
    updated_at: string,
    corp_knowledge_id: number,
    field_learning_id: number,
    job_orientation_id: number,
    project_assignment_id: number,
    peserta_ckp_id: 1,
    company_id: number,
    company_name: string,
    ckl_bintalfisdis: string,
    ckl_holding: string,
    ckl_direksi: string,
    ckl_direktorat: string,
    ckl_direktorat2: string,
    ckl_direktorat3: string,
    ckl_direktorat4: string,
    ckl_direktorat5: string,
    ckl_direktorat6: string,
    ckl_direktorat7: string,
    ckl_kepemimpinan: string,
    ckl_bidang: string,
    ckl_studi_lapangan: string,
    minggu1: string,
    minggu2: string,
    minggu3: string,
    minggu4: string,
    minggu5: string,
    minggu6: string,
    minggu7: string,
    minggu8: string,
    presentasi: string,
    presentasi2: string,
    ide: string,
    implementasi: string,
    url: string
};

const PlantPage = () => {
  const [ckpData, setCkpData] = useState<CKPDataType[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState<number>(10);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const router = useRouter();

  const getFilteredData = (data: CKPDataType[]) => {
    let filtered = data.filter((item) =>
      item.nama_peserta.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    // Pagination berdasarkan hasil filter
    const totalEntries = filtered?.length || 0;
    const totalPages = Math.ceil(totalEntries / limit);
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    const currentData = filtered?.slice(startIndex, endIndex);

    return {
      filtered,
      currentData,
      totalEntries,
      totalPages,
      startIndex,
      endIndex,
    };
  };

  const fetchAllDataCKP = async () => {
    try {
      const result = await axios.get(
        `
        ${baseUrl}/api/ckp/super-admin
        `,
        {
          withCredentials: true,
        },
      );

      setCkpData(result.data.data);
    } catch (error) {
      Swal.fire(
        "Gagal!",
        "Terjadi kesalahan saat mengambil data CKP.",
        "error",
      );
    }
  };

  const {
    filtered: filteredData,
    currentData: currenData,
    totalEntries: totalEntries,
    totalPages: totalPages,
    startIndex: startIndex,
    endIndex: endIndex,
  } = getFilteredData(ckpData);

  const handleNextPageAdmin = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const debouncedSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(event.target.value));
  };

  const toggleDropdown = (id: number) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    fetchAllDataCKP();
  }, []);

  const calculateProgress = (item: CKPDataType) => {
    const fieldsToCheck = [
    item.ckl_bintalfisdis,
    item.ckl_holding,
    item.ckl_direksi,
    item.ckl_direktorat,
    item.ckl_direktorat2,
    item.ckl_direktorat3,
    item.ckl_direktorat4,
    item.ckl_direktorat5,
    item.ckl_direktorat6,
    item.ckl_direktorat7,
    item.ckl_kepemimpinan,
    item.ckl_bidang,
    item.ckl_studi_lapangan,
    item.minggu1,
    item.minggu2,
    item.minggu3,
    item.minggu4,
    item.minggu5,
    item.minggu6,
    item.minggu7,
    item.minggu8,
    item.presentasi,
    item.presentasi2,
    item.ide,
    item.implementasi,
    item.url
    ];

    const totalFields = fieldsToCheck.length;
    const filledFields = fieldsToCheck.filter(field => field !== null).length;
    const percentage = (filledFields / totalFields) * 100;

    return Math.round(percentage); 
  };

  const handleDetailAnswerCKP = (id: string | number) => {
   router.push(`/plant/review/${id}`);
  };

  return (
    <ProtectedRoute allowedRoles={["admin", "super admin"]}>
      <DefaultLayout>
        <>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h4 className="p-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
                Kumpulan Progress PLANT
              </h4>
              <Breadcrumb />
            </div>
            <p className="p-4 text-sm text-gray-600 dark:text-gray-400">
              Ini Halaman Report Progress Laporan Karyawan CKP
            </p>
          </div>

          {/* content */}
          <div className="relative overflow-hidden rounded-xl border border-gray-300 bg-white shadow-xl backdrop-blur-lg dark:border-gray-700 dark:bg-gray-900/70">
            <div className="px-6">
              <div className="flex items-center justify-between space-x-4 py-4">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-700 dark:text-gray-300">Show</span>
                  <select
                    onChange={handleLimitChange}
                    value={limit}
                    className="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
                <div className="flex-grow items-center">
                  <input
                    onChange={handleSearchChange}
                    type="text"
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                    placeholder="Search..."
                  />
                </div>
                <Link
                  href="/plant/create-ckp"
                  className="flex items-center justify-center rounded-lg bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  Tambah Karyawan CKP
                </Link>
              </div>
              <div className="overflow-visible rounded-lg border border-gray-200 shadow-sm">
                {/* Header Table */}
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        No
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Nama Pegawai
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Asal Region
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Progress
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {Array.isArray(currenData) &&
                    currenData.length > 0 ? (
                        currenData.map((ckp, index) => (
                        <tr
                          key={index}
                          className="transition-colors duration-150 hover:bg-gray-50"
                        >
                          <td className="whitespace-nowrap px-6 py-4">
                            {(currentPage - 1) * limit + index + 1}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex items-center">
                              <p className="text-sm font-medium text-gray-900">
                                {ckp.nama_peserta}
                              </p>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex items-center">
                              <p className="text-sm font-medium text-gray-900">
                                {ckp.company_name}
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                              <div 
                              style={{ width: `${calculateProgress(ckp)}%` }}
                              className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" > {calculateProgress(ckp)}%</div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                            <div className="relative">
                              <button
                                className="rounded-md p-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                onClick={() => toggleDropdown(ckp.id)}
                                aria-label="Menu"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  stroke="currentColor"
                                >
                                  <path
                                    d="M4.16667 10.8332C4.62691 10.8332 5 10.4601 5 9.99984C5 9.5396 4.62691 9.1665 4.16667 9.1665C3.70643 9.1665 3.33334 9.5396 3.33334 9.99984C3.33334 10.4601 3.70643 10.8332 4.16667 10.8332Z"
                                    strokeWidth="1.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></path>
                                  <path
                                    d="M10 10.8332C10.4602 10.8332 10.8333 10.4601 10.8333 9.99984C10.8333 9.5396 10.4602 9.1665 10 9.1665C9.53976 9.1665 9.16666 9.5396 9.16666 9.99984C9.16666 10.4601 9.53976 10.8332 10 10.8332Z"
                                    strokeWidth="1.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></path>
                                  <path
                                    d="M15.8333 10.8332C16.2936 10.8332 16.6667 10.4601 16.6667 9.99984C16.6667 9.5396 16.2936 9.1665 15.8333 9.1665C15.3731 9.1665 15 9.5396 15 9.99984C15 10.4601 15.3731 10.8332 15.8333 10.8332Z"
                                    strokeWidth="1.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></path>
                                </svg>
                              </button>

                              {openDropdownId === ckp.id && (
                                <div className=" right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  <div className="py-1">
                                    <button
                                      className="block w-full px-4 py-2 text-left text-sm text-blue-700 hover:bg-blue-100"
                                      onClick={() => handleDetailAnswerCKP(ckp.id)}
                                    >
                                      Lihat Detail
                                    </button>
                                    <button
                                      className="block w-full px-4 py-2 text-left text-sm text-red-700 hover:bg-red-100"
                                    //   onClick={() =>
                                    //     handleDeleteSkmbt(ckp.id)
                                    //   }
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="px-6 py-4 text-center text-sm text-gray-500">
                          Anda belum melakukan pengajuan apapun
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex items-center justify-between p-8 text-sm text-gray-500">
              <span>
                {" "}
                {/* Showing {startIndexAdmin + 1} to {Math.min(endIndexAdmin, totalEntriesAdmin)}{" "}
                            of {totalEntriesAdmin} entries */}
              </span>
              <div className="space-x-2">
                <button
                  className="rounded-lg bg-gray-200 px-3 py-1 transition hover:bg-gray-300"
                  // onClick={handlePreviousPage}
                  // disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className="rounded-lg bg-gray-200 px-3 py-1 transition hover:bg-gray-300"
                  // onClick={handleNextPageAdmin}
                  // disabled={currentPage === totalPagesAdmin}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default PlantPage;
