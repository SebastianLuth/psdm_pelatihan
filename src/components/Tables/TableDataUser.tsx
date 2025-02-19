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

  const [searchQuery, setSearchQuery] = useState('');
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

  const filteredUsersData = users.filter((user) => {
    return (
      user.username.toString().includes(searchQuery) ||
      user.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.jabatan.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

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
            <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <th className="px-6 py-4">No</th>
              <th className="px-6 py-4">NIKSAP</th>
              <th className="px-6 py-4">Nama</th>
              <th className="px-6 py-4">Jabatan</th>
              <th className="px-6 py-4">action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {
              filteredUsersData.length === 0 ? (
                <tr className="bg-white">
                  <td colSpan={4} className="px-6 py-4 text-center">
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                filteredUsersData.map((user, index) => (
                  <tr
                    key={user.id}
                    className="group transform transition-transform duration-200 hover:scale-[1.02] hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                      {index + 1}
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
      </div>
    </div>
  );
};

export default TableDataUser;
