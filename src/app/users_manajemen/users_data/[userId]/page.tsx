"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface User {
  id: number;
  username: string;
  nama: string;
  jabatan: string;
  nomor_hp: string;
  level: number;
  role: string;
  biaya_pelatihan_user: number;
}

const UserDetailPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const { userId } = useParams();
  const fetchDetailUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/user/${userId}`,
        {
          withCredentials: true,
        },
      );
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchDetailUser();
  }, []);

  if (!user) {
    return (
      <DefaultLayout>
        <div className="flex min-h-screen items-center justify-center">
          <p>Loading...</p>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="mx-auto flex min-h-screen flex-col items-center bg-gradient-to-r from-gray-50 to-gray-200 p-4">
        {/* Header Section */}
        <div className="mb-8 w-full">
          <h2 className="text-4xl font-bold text-gray-900">User Profile</h2>
          <p className="text-base text-gray-500">
            Detail informasi user @{user.username}
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Profile Section */}
          <div className="col-span-1 w-full rounded-2xl bg-white p-6 shadow-lg">
            <div className="flex flex-col items-center">
              <span className="h-25 w-25 rounded-full">
                <img
                  width={150}
                  height={150}
                  src={"/images/user/user-01.png"}
                  style={{
                    width: "auto",
                    height: "auto",
                  }}
                  alt="User"
                />
              </span>
              <h3 className="text-center text-2xl font-semibold text-gray-800">
                {user.nama}
              </h3>
              <p className="text-center text-sm text-gray-500">
                {user.jabatan}
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between rounded-lg bg-gray-100 px-4 py-3">
                <span className="font-medium text-gray-600">Nomor HP</span>
                <span className="text-gray-800">{user.nomor_hp}</span>
              </div>
              <div className="flex justify-between rounded-lg bg-gray-100 px-4 py-3">
                <span className="font-medium text-gray-600">
                  Total Biaya Pelatihan
                </span>
                <span className="font-semibold text-green-600">
                  Rp {user.biaya_pelatihan_user.toLocaleString("id-ID")},00
                </span>
              </div>
              <div className="flex justify-between rounded-lg bg-gray-100 px-4 py-3">
                <span className="font-medium text-gray-600">Level Jabatan</span>
                <span className="text-indigo-600">BOD - {user.level}</span>
              </div>
              <div className="flex justify-between rounded-lg bg-gray-100 px-4 py-3">
                <span className="font-medium text-gray-600">Unit Kerja</span>
                <span className="text-gray-800">
                  Bagian Perencanaan & Sustainability
                </span>
              </div>
              <div className="rounded-lg bg-red-500 px-4 py-2 text-center font-semibold text-white">
                Role: {user.role}
              </div>
            </div>
          </div>

          {/* Action & Bawahan List Section */}
          <div className="col-span-2 space-y-6">
            {/* List Bawahan */}
            <div className="w-full rounded-2xl bg-white p-6 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">
                  List Bawahan
                </h3>
                <button className="rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600">
                  Tambah Bawahan
                </button>
              </div>

              <table className="w-full overflow-hidden rounded-lg border border-gray-200 text-left">
                <thead>
                  <tr className="bg-gray-100 text-sm text-gray-700">
                    <th className="px-4 py-3">No</th>
                    <th className="px-4 py-3">NIK-SAP</th>
                    <th className="px-4 py-3">Nama</th>
                    <th className="px-4 py-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      id: 1,
                      nik: "4000067",
                      name: "Swelli Solihah Nasution, SP",
                    },
                  ].map((bawahan, index) => (
                    <tr
                      key={bawahan.id}
                      className="border-t border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 text-center">{index + 1}</td>
                      <td className="cursor-pointer px-4 py-3 text-center text-blue-600 hover:underline">
                        {bawahan.nik}
                      </td>
                      <td className="px-4 py-3">{bawahan.name}</td>
                      <td className="px-4 py-3 text-center">
                        <button className="rounded-md bg-red-500 px-3 py-1 text-white transition hover:bg-red-600">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span>Showing 1 to 4 of 4 entries</span>
                <div className="space-x-2">
                  <button className="rounded-lg bg-gray-200 px-3 py-1 transition hover:bg-gray-300">
                    Previous
                  </button>
                  <button className="rounded-lg bg-gray-200 px-3 py-1 transition hover:bg-gray-300">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UserDetailPage;
