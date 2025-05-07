"use client";
import { useAuth } from "@/context/AuthContext";
import {
  deleteDataWasiatKarpimById,
  getAllDataWasiatKarpimAdmin,
  getAllDataWasiatKarpimSuperAdmin,
} from "@/service/wasiat";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

type SkmbtData = {
  id: number;
  nama: string;
  niksap: number;
  jabatan: string;
  url_pdf_skmbt: string;
  url_pdf_skmbt2: string;
  company_id: number;
  company_nama: string;
  created_at: string;
  updated_at: string;
};

export const DataWasiatKarpimComponent = () => {
  const [skmbtData, setSkmbtData] = useState<SkmbtData[]>([]);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState<number>(10);

  const { userData } = useAuth();
  const router = useRouter();

  const handleDeleteSkmbt = async (id: number) => {
    try {
      await deleteDataWasiatKarpimById(id);
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Gagal!",
        "Terjadi kesalahan saat menghapus data SKMBT.",
        "error",
      );
    }
  };

  const handleEditSkmbt = (id: number) => {
    router.push(`/skmbt/karpim/edit/${id}`);
  };

  const fetchDataWasiatAdmin = async () => {
    try {
      const result = await getAllDataWasiatKarpimAdmin();

      setSkmbtData(
        result.map((item: SkmbtData) => {
          return {
            ...item,
            created_at: new Date(item.created_at).toLocaleString(),
            updated_at: new Date(item.updated_at).toLocaleString(),
          };
        }),
      );
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat mengambil data SKMBT.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const fetchDataWasiatSuperAdmin = async () => {
    try {
      const result = await getAllDataWasiatKarpimSuperAdmin();
      setSkmbtData(
        result.map((item: SkmbtData) => {
          return {
            ...item,
            created_at: new Date(item.created_at).toLocaleString(),
            updated_at: new Date(item.updated_at).toLocaleString(),
          };
        }),
      );
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat mengambil data SKMBT.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const getFilteredData = (data: SkmbtData[]) => {
    let filtered = data.filter((item) =>
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()),
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

  const {
    filtered: filteredAdmin,
    currentData: currenDataAdmin,
    totalEntries: totalEntriesAdmin,
    totalPages: totalPagesAdmin,
    startIndex: startIndexAdmin,
    endIndex: endIndexAdmin,
  } = getFilteredData(skmbtData);

  const handleNextPageAdmin = () => {
    if (currentPage < totalPagesAdmin) {
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
    if (userData?.role === "super admin" || userData?.role === "user") {
      fetchDataWasiatSuperAdmin();
    } else {
      fetchDataWasiatAdmin();
    }
  }, [userData?.role]);

  return (
    <>
      <div className="flex justify-between">
        <h4 className="p-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Data Semua Wasiat Karpim Pra Pensiun
        </h4>
      </div>

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
            {
              userData?.role === "user" ? null : (
                <Link
              href="/skmbt/karpim/create-skmbt"
              className="flex items-center justify-center rounded-lg bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Tambah Wasiat Pra Pensiun Karpim
            </Link>
              )
            }
            

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
                    NIKSAP
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Jabatan
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Tanggal Upload
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
                    Bukti PDF 1
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Bukti PDF 2
                  </th>
                  {userData?.role === "user" ? null : (
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {Array.isArray(currenDataAdmin) &&
                currenDataAdmin.length > 0 ? (
                  currenDataAdmin.map((skmbt, index) => (
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
                            {skmbt.nama}
                          </p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-gray-900">
                            {skmbt.niksap}
                          </p>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-gray-900">
                            {skmbt.jabatan}
                          </p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-gray-900">
                            {skmbt.created_at}
                          </p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            className="ml-2 text-blue-500"
                          >
                            <path
                              d="M6.66669 9.33342C6.88394 9.55515 7.14325 9.73131 7.42944 9.85156C7.71562 9.97182 8.02293 10.0338 8.33335 10.0338C8.64378 10.0338 8.95108 9.97182 9.23727 9.85156C9.52345 9.73131 9.78277 9.55515 10 9.33342L12.6667 6.66676C13.1087 6.22473 13.357 5.62521 13.357 5.00009C13.357 4.37497 13.1087 3.77545 12.6667 3.33342C12.2247 2.89139 11.6251 2.64307 11 2.64307C10.3749 2.64307 9.77538 2.89139 9.33335 3.33342L9.00002 3.66676"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M9.33336 6.66665C9.11611 6.44492 8.8568 6.26876 8.57061 6.14851C8.28442 6.02825 7.97712 5.96631 7.66669 5.96631C7.35627 5.96631 7.04897 6.02825 6.76278 6.14851C6.47659 6.26876 6.21728 6.44492 6.00003 6.66665L3.33336 9.33332C2.89133 9.77534 2.64301 10.3749 2.64301 11C2.64301 11.6251 2.89133 12.2246 3.33336 12.6666C3.77539 13.1087 4.37491 13.357 5.00003 13.357C5.62515 13.357 6.22467 13.1087 6.66669 12.6666L7.00003 12.3333"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-500"
                          >
                            <path d="M3 21V7a2 2 0 0 1 2-2h2V3.5A1.5 1.5 0 0 1 8.5 2h7A1.5 1.5 0 0 1 17 3.5V5h2a2 2 0 0 1 2 2v14" />
                            <path d="M9 21V12h6v9" />
                            <path d="M9 7h6" />
                            <path d="M12 7v5" />
                          </svg>

                          <p className="ml-2 text-sm text-gray-900">
                            {skmbt.company_nama}
                          </p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <a
                          href={skmbt.url_pdf_skmbt}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-blue-600 transition-colors duration-200 hover:text-blue-800"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2"
                          >
                            <path d="M3 8l4-4h10l4 4v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <circle cx="12" cy="13" r="3"></circle>
                          </svg>
                          Lihat
                        </a>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <a
                          href={skmbt.url_pdf_skmbt2}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-blue-600 transition-colors duration-200 hover:text-blue-800"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2"
                          >
                            <path d="M3 8l4-4h10l4 4v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <circle cx="12" cy="13" r="3"></circle>
                          </svg>
                          Lihat
                        </a>
                      </td>

                      {userData?.role === "user" ? null : (
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                          <div className="relative">
                            <button
                              className="rounded-md p-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                              onClick={() => toggleDropdown(skmbt.id)}
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

                            {openDropdownId === skmbt.id && (
                              <div className=" right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                  <button
                                    className="block w-full px-4 py-2 text-left text-sm text-blue-700 hover:bg-blue-100"
                                    onClick={() => handleEditSkmbt(skmbt.id)}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="block w-full px-4 py-2 text-left text-sm text-red-700 hover:bg-red-100"
                                    onClick={() => handleDeleteSkmbt(skmbt.id)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">
                      Belum ada yang melakukan pengajuan apapun
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
            Showing {startIndexAdmin + 1} to{" "}
            {Math.min(endIndexAdmin, totalEntriesAdmin)} of {totalEntriesAdmin}{" "}
            entries
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
              onClick={handleNextPageAdmin}
              disabled={currentPage === totalPagesAdmin}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
