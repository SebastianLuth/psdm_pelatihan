// src/components/Tables/TableDataUser.tsx
"use client"
import axios from "axios"
import Link from "next/link"
import React, { useEffect, useState } from "react"

interface User {
  id: number
  username: number
  nama: string
  jabatan: string
}

interface TableDataUserProps {
  selectedUnitKerja: string
}

const TableDataUser: React.FC<TableDataUserProps> = ({ selectedUnitKerja }) => {
  const [users, setUsers] = useState<User[]>([])

  // Get all user by unit kerja
  const fetchAllUserByUnitKerja = async () => {
    try {
      const response = await axios.get<User[]>(
        `http://localhost:5000/api/user?unit_kerja=${selectedUnitKerja}`,
        { withCredentials: true }
      )
      setUsers(response.data)
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  useEffect(() => {
    if (selectedUnitKerja) {
      fetchAllUserByUnitKerja()
    }
  }, [selectedUnitKerja])

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="text-xl font-semibold text-black dark:text-white">Data User</h4>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">Show</span>
          <select className="rounded-md border border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span className="text-gray-700">entries</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2 text-gray-700">Search:</span>
          <input
            type="text"
            className="rounded-md border border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">No</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">NIKSAP</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Nama</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Jabatan</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Action</p>
        </div>
      </div>
      {users.map((user, index) => (
        <Link
        key={user.id}
        href={`/users_manajemen/users_data/${user.id}`}
        >
        <div
          key={user.id}
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
        >
          <div className="col-span-3 flex items-center">
            <p className="text-sm text-black dark:text-white">{index + 1}</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">{user.username}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{user.nama}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{user.jabatan}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <button className="text-sm text-blue-500">Edit</button>
          </div>
        </div>
        </Link>
      ))}
    </div>
  )
}

export default TableDataUser
