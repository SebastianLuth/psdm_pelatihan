"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface User {
  id: number;
  username: number;
  nama: string;
  jabatan: string;
  nomor_hp: string;
  level: number;
  role: string;
  unit_kerja: string;
  biaya_pelatihan_user: number;
}

interface BawahanUser {
  bawahan_username: number;
  nama: string;
}

const unitKerjaList = [
  { id: 1, name: "HR" },
  { id: 2, name: "Finance" },
  { id: 3, name: "Bagian Perencanaan & Sustainability" },
  // tambahkan sesuai data yang ada
];

const UserDetailPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [usernameBawahan, setUsernameBawahan] = useState<number>(0);
  const { userId } = useParams();
  const [showModal, setShowModal] = React.useState(false);
  const [allBawahan, setAllBawahan] = useState<BawahanUser[]>([]);
  const [dataAllUserByUnitKerja, setDataAllUserByUnitKerja] = useState<User[]>(
    [],
  );

  const getUnitKerjaId = (unitKerjaName: string) => {
    const unitKerja = unitKerjaList.find((item) => item.name === unitKerjaName);
    return unitKerja ? unitKerja.id : null; // kembalikan null jika tidak ditemukan
  };

  const fetchDetailUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/user/${userId}`,
        {
          withCredentials: true,
        },
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleAddBawahan = async (username: number) => {
    try {
      await axios.post(
        `http://localhost:5000/api/atasan/`,
        {
          atasan_username: user?.username,
          bawahan_username: username,
        },
        {
          withCredentials: true,
        },
      );
      setShowModal(false);
    } catch {
      console.error("Error fetching user data:");
      setShowModal(true);
    }
  };

  const featchAllDataBahawan = async () => {
    const unitKerjaId = getUnitKerjaId(user?.unit_kerja ?? "");
    if (unitKerjaId) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user?unit_kerja=${unitKerjaId}`,
          {
            withCredentials: true,
          },
        );
        const data = await response.data;
        setDataAllUserByUnitKerja(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      console.error("ID unit kerja tidak ditemukan");
    }
  };

  const getBawahan = async () => {
    try {
      // console.log("ini username atasanyya wakkk",user?.username);
      const response = await axios.get(
        `http://localhost:5000/api/atasan?atasan_username=${user?.username}`,
        {
          withCredentials: true,
        },
      );
      setAllBawahan(response.data);
    } catch {
      console.error("Error fetching user data:");
    }
  };

  useEffect(() => {
    fetchDetailUser();
    console.log("ini user1", user);
  }, []);

  useEffect(() => {
    // Call getBawahan only when user data is available
    if (user?.username) {
      getBawahan();
    }
  }, [user, allBawahan]);

  useEffect(() => {
    if (user?.unit_kerja) {
      featchAllDataBahawan();
      console.log("dataAllUserByUnitKerja", dataAllUserByUnitKerja);
    }
  }, [user?.unit_kerja]);

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
                <button
                  onClick={() => setShowModal(true)}
                  className="rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
                >
                  Tambah Bawahan
                </button>
              </div>

              {/* Modal add bawahan */}
              {showModal ? (
                <>
                  <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                    <div className="relative mx-auto my-6 w-auto max-w-3xl">
                      {/* content */}

                      <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                        {/*header*/}
                        <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5">
                          <h3 className="text-3xl font-semibold">
                            Modal Title
                          </h3>
                          <button
                            className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                            onClick={() => setShowModal(false)}
                          >
                            <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">
                              ×
                            </span>
                          </button>
                        </div>
                        {/*body*/}
                        <div>
                          <div className="relative overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
                              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                  <th scope="col" className="px-6 py-3">
                                    Nama Karyawan
                                  </th>
                                  <th scope="col" className="px-6 py-3">
                                    NIKSAP
                                  </th>
                                  <th scope="col" className="px-6 py-3">
                                    Unit Kerja
                                  </th>
                                  <th scope="col" className="px-6 py-3">
                                    Action
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {dataAllUserByUnitKerja.map((user) => (
                                  <tr
                                    className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                                    key={user.id}
                                  >
                                    <th
                                      scope="row"
                                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                                    >
                                      {user.nama}
                                    </th>
                                    <td className="px-6 py-4">{user.id}</td>
                                    <td className="px-6 py-4">
                                      {user.unit_kerja}
                                    </td>
                                    <td className="px-6 py-4">
                                      <button
                                        className="rounded bg-emerald-500 px-6 py-3 text-xs font-semibold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                                        type="button"
                                        onClick={() =>
                                          handleAddBawahan(user.username)
                                        } // Kirim id pengguna sebagai argumen
                                      >
                                        Tambah Bawahan
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        {/*footer*/}
                        <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6">
                          <button
                            className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                </>
              ) : null}

              {/* Modal add bawahan End*/}

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
                  {allBawahan.map((bawahan, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 text-center">{index + 1}</td>
                      <td className="cursor-pointer px-4 py-3 text-center text-blue-600 hover:underline">
                        {bawahan.bawahan_username}
                      </td>
                      <td className="px-4 py-3">{bawahan.nama}</td>
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
