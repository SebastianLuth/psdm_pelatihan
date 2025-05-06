"use client";
import SkeletonTable from "@/components/Skeleton/SkeletonTable";
import { useAuth } from "@/context/AuthContext";
import { getAllRKAPLW, handleDeleteRKAPLWById } from "@/service/learningWallet";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

interface LearningWallet {
  id: number;
  username: number | string;
  nama: string;
  biaya_rkap_lw: number;
  sisa_biaya_lw: number;
  rkap_jpl: number;
  sisa_jpl: number;
  rkap_tahun: number;
  company_id: number;
}

export const RKAPLearningWalletDataComponent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const [learningWalletData, setLearningWalletData] = useState<
    LearningWallet[]
  >([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState<number>(10);

  const router = useRouter();
  const { userData } = useAuth();

  const fetchAllLearningWalletAdmin = async () => {
    try {
      const result = await getAllRKAPLW();
      setLearningWalletData(result);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRKAP = async (lwId: number) => {
    try {
      const result = await handleDeleteRKAPLWById(lwId);
      if (result.status === 200) {
        Swal.fire("Terhapus!", "Learning Wallet telah dihapus.", "success");
      } else if (result.status === 404) {
        Swal.fire("Gagal!", "Learning Wallet tidak ditemukan.", "error");
      } else {
        alert(
          `Gagal menghapus: ${result.data?.message || "Terjadi kesalahan"}`,
        );
      }
    } catch (error) {
      throw error;
    } finally {
      await fetchAllLearningWalletAdmin();
    }
  };

  const handleEditRKAP = async (lwId: number) => {
    try {
      router.push(`/learning-wallet/rkap-learning-wallet/edit/${lwId}`);
    } catch (error) {
      throw error;
    }
  };

  const getFilteredData = (data: LearningWallet[]) => {
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
    filtered: filteredBudgetData,
    currentData,
    totalEntries,
    totalPages,
    startIndex,
    endIndex,
  } = getFilteredData(learningWalletData);

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

  const debouncedSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(event.target.value));
  };

  const filteredData = Array.isArray(learningWalletData)
    ? learningWalletData.filter((learningWallet) => {
        return learningWallet.nama
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      })
    : [];

  const toggleDropdown = (id: number) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    setLoading(true);
    if (userData?.role === "super admin" || userData?.role === "admin")
      fetchAllLearningWalletAdmin();
  }, [userData?.role]);

  if (loading === true) return <SkeletonTable title="Learning Wallet" />;

  return (
    <>
      <div className="flex justify-between">
        <h4 className="p-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
          RKAP Learning Wallet Pegawai
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
            <Link
              href="/learning-wallet/create-rkap"
              className="flex items-center justify-center rounded-lg bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Tambah RKAP LW
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
                    NIKSAP
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    RKAP LW Pegawai
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Sisa RKAP LW Pegawai
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    RKAP LW JPL Pegawai
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Sisa LW JPL Pegawai
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    RKAP Tahun
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
                {Array.isArray(filteredData) && filteredData.length > 0 ? (
                  filteredData.map((learningWallet, index) => (
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
                            {learningWallet.nama}
                          </p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-gray-900">
                            {learningWallet.username}
                          </p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            className="text-gray-500"
                          >
                            <path
                              d="M10 2.5V17.5M13.75 5.83333H8.75C7.71447 5.83333 6.875 6.67281 6.875 7.70833C6.875 8.74386 7.71447 9.58333 8.75 9.58333H11.25C12.2855 9.58333 13.125 10.4228 13.125 11.4583C13.125 12.4939 12.2855 13.3333 11.25 13.3333H6.875"
                              stroke="currentColor"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p className="ml-2 text-sm text-gray-900">
                            Rp. {learningWallet.biaya_rkap_lw.toLocaleString()}
                          </p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            className="text-gray-500"
                          >
                            <path
                              d="M10 2.5V17.5M13.75 5.83333H8.75C7.71447 5.83333 6.875 6.67281 6.875 7.70833C6.875 8.74386 7.71447 9.58333 8.75 9.58333H11.25C12.2855 9.58333 13.125 10.4228 13.125 11.4583C13.125 12.4939 12.2855 13.3333 11.25 13.3333H6.875"
                              stroke="currentColor"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p className="ml-2 text-sm text-gray-900">
                            Rp. {learningWallet.sisa_biaya_lw.toLocaleString()}
                          </p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            className="text-gray-500"
                          >
                            <path
                              d="M10 2.5V17.5M13.75 5.83333H8.75C7.71447 5.83333 6.875 6.67281 6.875 7.70833C6.875 8.74386 7.71447 9.58333 8.75 9.58333H11.25C12.2855 9.58333 13.125 10.4228 13.125 11.4583C13.125 12.4939 12.2855 13.3333 11.25 13.3333H6.875"
                              stroke="currentColor"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p className="ml-2 text-sm text-gray-900">
                            {learningWallet.rkap_jpl.toLocaleString()}
                          </p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            className="text-gray-500"
                          >
                            <path
                              d="M10 2.5V17.5M13.75 5.83333H8.75C7.71447 5.83333 6.875 6.67281 6.875 7.70833C6.875 8.74386 7.71447 9.58333 8.75 9.58333H11.25C12.2855 9.58333 13.125 10.4228 13.125 11.4583C13.125 12.4939 12.2855 13.3333 11.25 13.3333H6.875"
                              stroke="currentColor"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p className="ml-2 text-sm text-gray-900">
                            {learningWallet.sisa_jpl.toLocaleString()}
                          </p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <p className="ml-2 text-sm text-gray-900">
                            {learningWallet.rkap_tahun}
                          </p>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <div className="relative">
                          <button
                            className="rounded-md p-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            onClick={() => toggleDropdown(learningWallet.id)}
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

                          {openDropdownId === learningWallet.id && (
                            <div className=" right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div className="py-1">
                                <button
                                  className="block w-full px-4 py-2 text-left text-sm text-blue-700 hover:bg-blue-100"
                                  onClick={() =>
                                    handleEditRKAP(learningWallet.id)
                                  }
                                >
                                  Edit
                                </button>
                                <button
                                  className="block w-full px-4 py-2 text-left text-sm text-red-700 hover:bg-red-100"
                                  onClick={() =>
                                    handleDeleteRKAP(learningWallet.id)
                                  }
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
            Showing {startIndex + 1} to {Math.min(endIndex, totalEntries)} of{" "}
            {totalEntries} entries
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
    </>
  );
};
