"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import SkeletonTable from "@/components/Skeleton/SkeletonTable";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;


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
  status: string;
  company_id: number;
}

type dataRKAPLWUser = {
  username: number,
  nama: string,
  biaya_rkap_lw: number,
  sisa_biaya_lw: number,
  rkap_jpl: number,
  sisa_jpl: number,
  rkap_tahun: number,
  company_id: number
}

const LearningWalletPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const [learningWalletData, setLearningWalletData] = useState<
    LearningWallet[]
  >([]);

  const [dataDetailRKAPLWByUser, setDataDetailRKAPLWByUser] = useState<dataRKAPLWUser[]>([])

  const [learningWalletUser, setLearningWalletUser] = useState<
    LearningWallet[]
  >([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState<number>(10);

  const router = useRouter();
  const { userData } = useAuth();

  const fetchAllLearningWalletAdmin = async () => {
    try {
      const result = await axios.get(
        `
            ${baseUrl}/api/learning-wallet/admin
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

  const fetchAllLearningWalletUser = useCallback (async () => {
    try {
      setLoading(true);
      const result = await axios.get(
        `            
        ${baseUrl}/api/learning-wallet/user/${userData?.username}
        `,
        {
          withCredentials: true,
        },
      );
      setDataDetailRKAPLWByUser(result.data.dataRKAPLWUser)
      setLearningWalletUser(result.data.data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [userData?.username]);

  const handleDeleteRealisasiLWUser = async (id: number) => {
    try {
      const result = await axios.delete(`${baseUrl}/api/learning-wallet/user/lw/${id}`, 
        {
        validateStatus: () => true, // handle manual response 
        withCredentials : true
        }
      );
  
      if (result.status === 200) {
        alert("Berhasil menghapus Realisasi Learning Wallet");
      } else if (result.status === 404) {
        alert("Learning Wallet tidak ditemukan");
      } else {
        alert(`Gagal menghapus: ${result.data?.message || 'Terjadi kesalahan'}`);
      }

    } catch (error) {
      alert("Terjadi error saat menghapus Realisasi Learning Wallet");
    } finally {
      fetchAllLearningWalletUser();
    }
  };

  const handleEditRealisasiLWUser = (id: number, status : string) => {
    if (status === "paid" || status === "approved") {
      return alert("Realisasi Tidak Dapat di Edit Karena sudah disetuji");
    }
     router.push(`/learning-wallet/edit-submission/${id}`);
  }

  const handleUpdateStatusLW = async (status : string, niksap : string | number, lwId : number) => {
    try {
      await axios.put(`
        ${baseUrl}/api/learning-wallet/admin/update-status/${niksap}
        `,
      {
        status : status,
        learningWalletId : lwId
      },
      {
        withCredentials: true
      }
      ).then(
        () => {
          fetchAllLearningWalletAdmin();
        }
      )
    } catch (error) {
      setError(true);
    }
  }

  const getFilteredData = (data: LearningWallet[]) => {
    let filtered = data.filter((item) =>
      item.nama
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
    filtered: filteredUser,
    currentData : currentDataUser,
    totalEntries : totalEntriesUser,
    totalPages : totalPagesUser,
    startIndex : startIndexUser,
    endIndex : endIndexUser
  } = getFilteredData(learningWalletUser);

  const {
    filtered: filteredAdmin,
    currentData : currenDataAdmin,
    totalEntries : totalEntriesAdmin,
    totalPages : totalPagesAdmin,
    startIndex : startIndexAdmin,
    endIndex : endIndexAdmin
  } = getFilteredData(learningWalletData);
  

  const handleNextPageUser = () => {
    if (currentPage < totalPagesUser) {
      setCurrentPage(currentPage + 1);
    }
  };

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
    setLoading(true);
    if (userData?.role === "super admin" || userData?.role === "admin")
      fetchAllLearningWalletAdmin();
    if (userData?.role === "user") fetchAllLearningWalletUser();
  }, [fetchAllLearningWalletUser, userData?.role]);

  if (loading === true) return <SkeletonTable title="Learning Wallet" />;

  return (
    <>
      <ProtectedRoute>
        <DefaultLayout>
          {userData?.role === "super admin" || userData?.role === "admin" ? (
            <>
            <div className="flex justify-between">
            <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 p-4">
                Data Pengajuan Learning Wallet Pegawai
              </h4>
              <Breadcrumb/>
            </div>
              
              <div className="bg-white relative overflow-hidden rounded-xl border border-gray-300 shadow-xl backdrop-blur-lg dark:border-gray-700 dark:bg-gray-900/70">
                <div className="px-6">
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
                  <div className="overflow-visible rounded-lg border border-gray-200 shadow-sm">
                  {/* Header Table */}
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          No
                        </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nama Pegawai
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          NIKSAP
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Judul Pelatihan
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Biaya
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Bukti Pelatihan
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Bukti Pembayaran
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Bukti Sertifikat
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Array.isArray(currenDataAdmin) && currenDataAdmin.length > 0 ? (
                        currenDataAdmin.map((learningWallet, index) => (
                          <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                            <td className="px-6 py-4 whitespace-nowrap">
                            {(currentPage - 1) * limit + index + 1}
                            </td>
                             <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <p className="text-sm font-medium text-gray-900">
                                  {learningWallet.nama}
                                </p>
                                
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <p className="text-sm font-medium text-gray-900">
                                  {learningWallet.username}
                                </p>
                                
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <p className="text-sm font-medium text-gray-900">
                                  {learningWallet.judul_pelatihan}
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
                            <td className="px-6 py-4 whitespace-nowrap">
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
                                  Rp. {learningWallet.biaya_pelatihan.toLocaleString()}
                                </p>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <a
                                href={learningWallet.foto_pelatihan_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
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
                            <td className="px-6 py-4 whitespace-nowrap">
                              <a
                                href={learningWallet.foto_pelatihan_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
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
                            <td className="px-6 py-4 whitespace-nowrap">
                              <a
                                href={learningWallet.foto_pelatihan_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
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
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`
                                inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                ${
                                  learningWallet.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : learningWallet.status === "approved"
                                    ? "bg-blue-100 text-blue-800"
                                    : learningWallet.status === "paid"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                                }
                              `}>
                                {learningWallet.status.charAt(0).toUpperCase() + learningWallet.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="relative">
                                <button
                                  className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md p-1"
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
                                          onClick={() => handleUpdateStatusLW("paid", learningWallet.username, learningWallet.id)}
                                        >
                                        Telah Di Bayar
                                      </button>
                                      <button
                                        className="block w-full px-4 py-2 text-left text-sm text-green-700 hover:bg-green-100"
                                        onClick={() => handleUpdateStatusLW("approved", learningWallet.username, learningWallet.id)}
                                      >
                                        Setujui
                                      </button>
                                      <button
                                        className="block w-full px-4 py-2 text-left text-sm text-red-700 hover:bg-red-100"
                                        onClick={() => handleUpdateStatusLW("rejected", learningWallet.username, learningWallet.id)}
                                      >
                                        Tolak
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
               
                <div className="p-8 flex items-center justify-between text-sm text-gray-500">
                      <span>
                        {" "}
                        Showing {startIndexAdmin + 1} to {Math.min(endIndexAdmin, totalEntriesAdmin)}{" "}
                        of {totalEntriesAdmin} entries
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
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex flex-col gap-6">
                      {/* RKAP Information Card */}
                      <div className="w-full sm:w-auto bg-gray-50 rounded-lg p-5 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">RKAP Summary</h3>
                        
                        {dataDetailRKAPLWByUser.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <p className="text-sm text-gray-600">RKAP Learning Wallet</p>
                              <p className="text-lg font-medium text-indigo-700">
                                Rp{dataDetailRKAPLWByUser[0].biaya_rkap_lw.toLocaleString()}
                              </p>
                              
                              <p className="text-sm text-gray-600">RKAP Jam Pelajaran</p>
                              <p className="text-lg font-medium text-indigo-700">
                                {dataDetailRKAPLWByUser[0].rkap_jpl.toLocaleString()} JPL
                              </p>
                            </div>
                            
                            <div className="space-y-2">
                              <p className="text-sm text-gray-600">Sisa Learning Wallet</p>
                              <p className="text-lg font-medium text-indigo-700">
                                Rp{dataDetailRKAPLWByUser[0].sisa_biaya_lw.toLocaleString()}
                              </p>
                              
                              <p className="text-sm text-gray-600">Sisa Jam Pelajaran</p>
                              <p className="text-lg font-medium text-indigo-700">
                                {dataDetailRKAPLWByUser[0].sisa_jpl.toLocaleString()} JPL
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-4">
                            <p className="text-gray-500">Data RKAP belum tersedia</p>
                          </div>
                        )}
                      </div>

                      {/* Filter and Action Buttons */}
                      <div className="flex justify-between sm:flex-col gap-4">
                        {/* Filter Tabs */}
                        <div className="flex bg-gray-100 rounded-full p-1">
                          <a
                            className="rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            href="javascript:void(0)"
                          >
                            <div className="rounded-full bg-white px-6 py-2 text-indigo-700 shadow-sm">
                              <p className="text-sm font-medium">All</p>
                            </div>
                          </a>
                          <a
                            className="ml-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            href="javascript:void(0)"
                          >
                            <div className="rounded-full px-6 py-2 text-gray-600 hover:bg-white transition-colors duration-200">
                              <p className="text-sm font-medium">Done</p>
                            </div>
                          </a>
                          <a
                            className="ml-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            href="javascript:void(0)"
                          >
                            <div className="rounded-full px-6 py-2 text-gray-600 hover:bg-white transition-colors duration-200">
                              <p className="text-sm font-medium">Pending</p>
                            </div>
                          </a>
                        </div>

                        {/* Add Button */}
                        <Link href="/learning-wallet/create" className="w-full sm:w-auto">
                          <button className="w-full flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200">
                            <PlusIcon className="w-5 h-5 mr-2" />
                            Tambah Learning Wallet
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="mt-7 overflow-x-auto">
                    <table className="w-full whitespace-nowrap">
                      <tbody>
                        { Array.isArray(currentDataUser) && currentDataUser.length > 0 ? 
                        
                          currentDataUser.map((learningWallet, index) => (
                          <tr
                            key={index}
                            className="h-16 rounded border border-gray-100 focus:outline-none"
                          >
                            <td>
                            {(currentPage - 1) * limit + index + 1}
                            </td>
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
                              <span className={`
                                    rounded px-3 py-1 text-sm font-medium leading-none focus:outline-none
                                    ${
                                      learningWallet.status === "pending"
                                        ? "text-yellow-700 bg-yellow-100 hover:bg-yellow-200"
                                        : learningWallet.status === "approved"
                                        ? "text-blue-700 bg-blue-100 hover:bg-blue-200"
                                        : learningWallet.status === "paid"
                                        ? "text-green-700 bg-green-100 hover:bg-green-200"
                                        : "text-gray-700 bg-gray-100"
                                    }
                                  `}>
                                {
                                  learningWallet.status
                                }
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
                                          onClick={() => handleEditRealisasiLWUser(learningWallet.id, learningWallet.status)}
                                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-300 hover:text-blue-600"
                                        >
                                          Edit
                                        </button>
                                        <button
                                          onClick={() => {
                                            handleDeleteRealisasiLWUser(learningWallet.id);
                                          }}
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
                        )) : (
                          <tr
                            className="h-16 rounded border border-gray-100 focus:outline-none"
                          >
                            <td className="text-center">Anda Belum melakukan Pengajuan Apapun</td>
                          </tr>
                          ) 
                        }
                      </tbody>
                    </table>
                    <div className="p-8 flex items-center justify-between text-sm text-gray-500">
                      <span>
                        {" "}
                        Showing {startIndexUser + 1} to {Math.min(endIndexUser, totalEntriesUser)}{" "}
                        of {totalEntriesUser} entries
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
                          onClick={handleNextPageUser}
                          disabled={currentPage === totalPagesUser}
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
