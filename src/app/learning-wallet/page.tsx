"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import SkeletonTable from "@/components/Skeleton/SkeletonTable";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

interface LearningWallet {
  id: number;
  username: number;
  nama: string;
  judul_pelatihan: string;
  biaya_pelatihan: number;
  nama_vendor: string;
  no_vendor: number;
  foto_pelatihan_url: string;
  foto_resi_url: string;
  foto_materi_url: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  status: number;
  company_id: number;
}

const LearningWalletPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const [learningWalletData, setLearningWalletData] = useState<
    LearningWallet[]
  >([]);

  const [learningWalletUser, setLearningWalletUser] = useState<
    LearningWallet[]
  >([]);

  const { userData } = useAuth();

  const fetchAllLearningWalletAdmin = async () => {
    try {
      const result = await axios.get(
        `
            http://localhost:5000/api/learning-wallet/admin
            `,
        {
          withCredentials: true,
        },
      );
      setLearningWalletData(result.data.data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllLearningWalletUser = async () => {
    try {
      setLoading(true);
      const result = await axios.get(
        `            
        http://localhost:5000/api/learning-wallet/user
        `,
        {
          withCredentials: true,
        },
      );

      setLearningWalletUser(result.data.data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
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

  const filteredData = learningWalletData.filter((learningWallet) => {
    return learningWallet.judul_pelatihan
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  const toggleDropdown = (id: number) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    setLoading(true);
    if (userData?.role === "super admin" || userData?.role === "admin")
      fetchAllLearningWalletAdmin();
    if (userData?.role === "user") fetchAllLearningWalletUser();
  }, [userData?.role]);

  if (loading === true) return <SkeletonTable title="Learning Wallet" />;

  return (
    <>
      <ProtectedRoute>
        <DefaultLayout>
          {userData?.role === "super admin" || userData?.role === "admin" ? (
            <div className="relative overflow-hidden rounded-xl border border-gray-300 shadow-xl backdrop-blur-lg dark:border-gray-700 dark:bg-gray-900/70">
              <div className="px-6 py-5">
                <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                  Data Learnig Wallet
                </h4>
                <div className="flex items-center justify-between space-x-4 py-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-700 dark:text-gray-300">
                      Show
                    </span>
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
                </div>
              </div>
              {/* Table */}
              <div className="overflow-visible">
                {/* Header Table */}
                <table className="min-w-full border-collapse overflow-hidden rounded-lg text-left text-sm text-gray-700 shadow-lg dark:text-gray-300 ">
                  <thead>
                    <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                      {[
                        "No",
                        "NIKSAP",
                        "Nama",
                        "Judul Pelatihan",
                        "Biaya Pelatihan",
                        "Nama Vendor",
                        "Nomor Vendor",
                        "Created at",
                        "Status",
                        "Action",
                      ].map((header, index) => (
                        <th
                          key={index}
                          className="px-6 py-4 text-center font-semibold"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                    {filteredData.length === 0 ? (
                      <tr>
                        <td
                          colSpan={10}
                          className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                        >
                          Tidak ada data
                        </td>
                      </tr>
                    ) : (
                      filteredData.map((learningWallet, index) => (
                        <tr
                          key={index}
                          className="group transition duration-200 hover:bg-indigo-50 dark:hover:bg-gray-800"
                        >
                          <td className="px-6 py-4 text-center text-gray-800 dark:text-gray-100">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                            {learningWallet.username}
                          </td>
                          <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                            {learningWallet.nama}
                          </td>
                          <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                            {learningWallet.judul_pelatihan}
                          </td>
                          <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                            {learningWallet.biaya_pelatihan}
                          </td>
                          <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                            {learningWallet.nama_vendor}
                          </td>
                          <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                            {learningWallet.no_vendor}
                          </td>
                          <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                            {learningWallet.created_at}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span
                              className={`inline-block rounded-full px-3 py-1 text-xs font-medium transition-all ${
                                learningWallet.status === 0
                                  ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200"
                                  : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-200"
                              }`}
                            >
                              {learningWallet.status === 0
                                ? "Disetujui"
                                : "Pending"}
                            </span>
                          </td>
                          {/* Disetujui Atau Tidak */}
                          <td className="relative w-[8%] border-b border-slate-200 p-4 text-right">
                            {/* Button to toggle dropdown */}
                            <button
                              className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20"
                              type="button"
                              onClick={() => toggleDropdown(learningWallet.id)}
                            >
                              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  aria-hidden="true"
                                  className="h-4 w-4"
                                >
                                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                                </svg>
                              </span>
                            </button>

                            {/* Dropdown menu */}
                            {openDropdownId == learningWallet.id && (
                              <>
                                <div
                                  className={`absolute ${
                                    index === learningWalletData.length - 1
                                      ? "bottom-full"
                                      : "mt-2"
                                  } right-0 z-50 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
                                >
                                  <div className="py-1">
                                    <button
                                      // onClick={() => handleEdit(item.id)}
                                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-green-300 hover:text-green-600"
                                    >
                                      Setujui
                                    </button>
                                    <button
                                      // onClick={() => {
                                      //   handleDelete(item.id);
                                      // }}
                                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-red-300 hover:text-red-600"
                                    >
                                      Tolak
                                    </button>
                                  </div>
                                </div>
                              </>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <>
              <div className="w-full sm:px-6">
                <div className="px-4 py-4 md:px-10 md:py-7">
                  <div className="flex items-center justify-between">
                    <p className="text-base font-bold leading-normal text-gray-800 focus:outline-none sm:text-lg md:text-xl lg:text-2xl">
                      Daftar Learning Wallet Anda
                    </p>

                    <Breadcrumb />
                  </div>
                </div>
                <div className="bg-white px-4 py-4 md:px-8 md:py-7 xl:px-10">
                  <div className="items-center justify-between sm:flex">
                    <div className="flex items-center">
                      <a
                        className="rounded-full focus:bg-indigo-50 focus:outline-none  focus:ring-2 focus:ring-indigo-800"
                        href=" javascript:void(0)"
                      >
                        <div className="rounded-full bg-indigo-100 px-8 py-2 text-indigo-700">
                          <p>All</p>
                        </div>
                      </a>
                      <a
                        className="ml-4 rounded-full focus:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-800 sm:ml-8"
                        href="javascript:void(0)"
                      >
                        <div className="rounded-full px-8 py-2 text-gray-600 hover:bg-indigo-100 hover:text-indigo-700 ">
                          <p>Done</p>
                        </div>
                      </a>
                      <a
                        className="ml-4 rounded-full focus:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-800 sm:ml-8"
                        href="javascript:void(0)"
                      >
                        <div className="rounded-full px-8 py-2 text-gray-600 hover:bg-indigo-100 hover:text-indigo-700 ">
                          <p>Pending</p>
                        </div>
                      </a>
                    </div>
                    <button className="mt-4 inline-flex items-start justify-start rounded bg-indigo-700 px-6 py-3 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 sm:mt-0">
                      <p className="text-sm font-medium leading-none text-white">
                        <Link href={"/learning-wallet/create"}>
                          Tambah Learning Wallet
                        </Link>
                      </p>
                    </button>
                  </div>
                  <div className="mt-7 overflow-x-auto">
                    <table className="w-full whitespace-nowrap">
                      <tbody>
                        {learningWalletUser.map((learningWallet, index) => (
                          <tr
                            key={index}
                            className="h-16 rounded border border-gray-100 focus:outline-none"
                          >
                            <td className="">
                              <div className="flex items-center pl-5">
                                <p className="mr-2 text-base font-medium leading-none text-gray-700">
                                  {learningWallet.judul_pelatihan}
                                </p>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    d="M6.66669 9.33342C6.88394 9.55515 7.14325 9.73131 7.42944 9.85156C7.71562 9.97182 8.02293 10.0338 8.33335 10.0338C8.64378 10.0338 8.95108 9.97182 9.23727 9.85156C9.52345 9.73131 9.78277 9.55515 10 9.33342L12.6667 6.66676C13.1087 6.22473 13.357 5.62521 13.357 5.00009C13.357 4.37497 13.1087 3.77545 12.6667 3.33342C12.2247 2.89139 11.6251 2.64307 11 2.64307C10.3749 2.64307 9.77538 2.89139 9.33335 3.33342L9.00002 3.66676"
                                    stroke="#3B82F6"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M9.33336 6.66665C9.11611 6.44492 8.8568 6.26876 8.57061 6.14851C8.28442 6.02825 7.97712 5.96631 7.66669 5.96631C7.35627 5.96631 7.04897 6.02825 6.76278 6.14851C6.47659 6.26876 6.21728 6.44492 6.00003 6.66665L3.33336 9.33332C2.89133 9.77534 2.64301 10.3749 2.64301 11C2.64301 11.6251 2.89133 12.2246 3.33336 12.6666C3.77539 13.1087 4.37491 13.357 5.00003 13.357C5.62515 13.357 6.22467 13.1087 6.66669 12.6666L7.00003 12.3333"
                                    stroke="#3B82F6"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                </svg>
                              </div>
                            </td>
                            <td className="pl-24">
                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                >
                                  <path
                                    d="M10 2.5V17.5M13.75 5.83333H8.75C7.71447 5.83333 6.875 6.67281 6.875 7.70833C6.875 8.74386 7.71447 9.58333 8.75 9.58333H11.25C12.2855 9.58333 13.125 10.4228 13.125 11.4583C13.125 12.4939 12.2855 13.3333 11.25 13.3333H6.875"
                                    stroke="#52525B"
                                    stroke-width="1.25"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                                <p className="ml-2 text-sm leading-none text-gray-600">
                                  Rp. {learningWallet.biaya_pelatihan}
                                </p>
                              </div>
                            </td>
                            <td className="pl-5">
                              <a
                                href={learningWallet.foto_pelatihan_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-blue-600 transition duration-300 hover:text-blue-800"
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
                                Lihat Sertifikat
                              </a>
                            </td>
                            <td className="pl-5">
                              <a
                                href={learningWallet.foto_pelatihan_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-blue-600 transition duration-300 hover:text-blue-800"
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
                                Lihat Sertifikat
                              </a>
                            </td>
                            <td className="pl-5">
                              <a
                                href={learningWallet.foto_pelatihan_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-blue-600 transition duration-300 hover:text-blue-800"
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
                                Lihat Sertifikat
                              </a>
                            </td>
                            <td className="pl-5">
                              <span className="rounded bg-yellow-100 px-3 py-3 text-sm leading-none text-yellow-700 hover:bg-yellow-200 focus:outline-none">
                                Pending
                              </span>
                            </td>
                            <td>
                              <div className="relative px-5 pt-2">
                                <button
                                  className="rounded-md focus:outline-none focus:ring-2"
                                  role="button"
                                  aria-label="option"
                                  onClick={() =>
                                    toggleDropdown(learningWallet.id)
                                  }
                                >
                                  <svg
                                    className="dropbtn"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                  >
                                    <path
                                      d="M4.16667 10.8332C4.62691 10.8332 5 10.4601 5 9.99984C5 9.5396 4.62691 9.1665 4.16667 9.1665C3.70643 9.1665 3.33334 9.5396 3.33334 9.99984C3.33334 10.4601 3.70643 10.8332 4.16667 10.8332Z"
                                      stroke="#9CA3AF"
                                      stroke-width="1.25"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></path>
                                    <path
                                      d="M10 10.8332C10.4602 10.8332 10.8333 10.4601 10.8333 9.99984C10.8333 9.5396 10.4602 9.1665 10 9.1665C9.53976 9.1665 9.16666 9.5396 9.16666 9.99984C9.16666 10.4601 9.53976 10.8332 10 10.8332Z"
                                      stroke="#9CA3AF"
                                      stroke-width="1.25"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></path>
                                    <path
                                      d="M15.8333 10.8332C16.2936 10.8332 16.6667 10.4601 16.6667 9.99984C16.6667 9.5396 16.2936 9.1665 15.8333 9.1665C15.3731 9.1665 15 9.5396 15 9.99984C15 10.4601 15.3731 10.8332 15.8333 10.8332Z"
                                      stroke="#9CA3AF"
                                      stroke-width="1.25"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></path>
                                  </svg>
                                </button>

                                {openDropdownId == learningWallet.id && (
                                  <>
                                    <div
                                      className={`absolute ${
                                        index === learningWalletData.length - 1
                                          ? "bottom-full"
                                          : "mt-2"
                                      } right-0 z-50 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
                                    >
                                      <div className="py-1">
                                        <button
                                          // onClick={() => handleEdit(item.id)}
                                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-300 hover:text-blue-600"
                                        >
                                          Edit
                                        </button>
                                        <button
                                          // onClick={() => {
                                          //   handleDelete(item.id);
                                          // }}
                                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-red-300 hover:text-red-600"
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="mt-8 flex items-center justify-between text-sm text-gray-500">
                      <span>
                        {/* {" "}
                        Showing {startIndex + 1} to {Math.min(endIndex, totalEntries)}{" "}
                        of {totalEntries} entries */}
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
                          // onClick={handleNextPage}
                          // disabled={currentPage === totalPages}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DefaultLayout>
      </ProtectedRoute>
    </>
  );
};

export default LearningWalletPage;
