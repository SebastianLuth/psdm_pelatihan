"use client";
import { getAllDataBawahanInUnitKerja } from "@/service/management-users";
import Link from "next/link";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";

interface User {
  id: number;
  username: number;
  nama: string;
  jabatan: string;
}

interface TableDataUserProps {
  selectedUnitKerja: string;
}

const TableDataUser: React.FC<TableDataUserProps> = ({ selectedUnitKerja }) => {
  const [users, setUsers] = useState<User[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState<number>(10);

  // Get all user by unit kerja
  const fetchAllUserByUnitKerja = useCallback(async () => {
    try {
      const response = await getAllDataBawahanInUnitKerja(
        Number(selectedUnitKerja),
      );
      setUsers(response);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [selectedUnitKerja]);


    const getFilteredData = (data: User[]) => {
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
      filtered: filteredBudgetData,
      currentData,
      totalEntries,
      totalPages,
      startIndex,
      endIndex
    } = getFilteredData(users);
  
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
    if (selectedUnitKerja) {
      fetchAllUserByUnitKerja();
    }
  }, [selectedUnitKerja, fetchAllUserByUnitKerja]);

  const debouncedSearch = (query: string) => {
    setSearchQuery(query);
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  }

  const handleLimitChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(event.target.value));
  }


  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-300 bg-white/70 shadow-xl backdrop-blur-lg dark:border-gray-700 dark:bg-gray-900/70">
      <div className="px-6 py-5">
        <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Data User
        </h4>
        <div className="flex items-center justify-between py-4 space-x-4">
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
            href={"/users_manajemen/add_users"}
            className="inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-indigo-700 hover:shadow-md"
          >
            Tambahkan User
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm text-gray-700 dark:text-gray-300">
          <thead>
            <tr className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
              <th className="px-6 py-4">No</th>
              <th className="px-6 py-4">NIKSAP</th>
              <th className="px-6 py-4">Nama</th>
              <th className="px-6 py-4">Jabatan</th>
              <th className="px-6 py-4">action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {
              currentData.length === 0 ? (
                <tr className="bg-white">
                  <td colSpan={4} className="px-6 py-4 text-center">
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                currentData.map((user, index) => (
                  <tr
                    key={index}
                    className="group transform transition-transform duration-200 hover:scale-[1.02] hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                      {(currentPage - 1) * limit + index + 1}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                      {user.nama}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                      {user.jabatan}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                    <Link
                        href={`/users_manajemen/users_data/${user.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12H9m6 0a3 3 0 1 0 0-6m0 6a3 3 0 1 1 0 6M9 12a3 3 0 1 1 0-6m0 6a3 3 0 1 0 0 6"
                          />
                        </svg>
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))
              )
            }
          </tbody>
        </table>
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
    </div>
  );
};

export default TableDataUser;
