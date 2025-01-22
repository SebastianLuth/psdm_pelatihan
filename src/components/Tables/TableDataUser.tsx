"use client";
import { getAllDataBawahanInUnitKerja } from "@/service/management-users";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

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

  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-300 bg-white/70 shadow-xl backdrop-blur-lg dark:border-gray-700 dark:bg-gray-900/70">
      <div className="px-6 py-5">
        <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Data User
        </h4>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-3"> 
            <span className="text-gray-700 dark:text-gray-300">Show</span>
            <select className="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
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
            />
          </div>
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
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {
              users.length === 0 ? (
                <tr className="bg-white">
                  <td colSpan={4} className="px-6 py-4 text-center">
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
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
