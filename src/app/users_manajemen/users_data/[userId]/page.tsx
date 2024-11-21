"use client";
import DetailedProfileCard from "@/components/Card/DetailedProfileCard";
import DropdownSettingProfile from "@/components/Dropdowns/DropdownSettingProfile";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CreateBawahanModal from "@/components/Modal/CreateBawahan";
import ProtectedRoute from "@/components/ProtectedRoute";
import { TableListBawahan } from "@/components/Tables/TableListBawahan";
import {
  addBawahan,
  deleteBawahan,
  getAllDataBawahanInUnitKerja,
  getBawahanByAtasan,
  getDetailUser,
} from "@/service/management-users";
import {
  BawahanUser,
  unitKerjaList,
  User,
} from "@/types/manajement-users-type";
import axios from "axios";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";

const UserDetailPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const { userId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [allBawahan, setAllBawahan] = useState<BawahanUser[]>([]);
  const [dataAllUserByUnitKerja, setDataAllUserByUnitKerja] = useState<User[]>(
    [],
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [editingStatus, setEditingStatus] = useState(false);

  const getUnitKerjaId = (unitKerjaName: string) => {
    const unitKerja = unitKerjaList.find((item) => item.name === unitKerjaName);
    return unitKerja ? unitKerja.id : null;
  };

  const fetchDetailUser = useCallback(async () => {
    try {
      const response = await getDetailUser(Number(userId));
      console.log(response);
      setUser(response);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [userId]);

  const handleAddBawahan = async (username: number, nama: string) => {
    try {
      setSuccess(false);
      setError(null);
      const atasan = user?.username;
      const result = await addBawahan(atasan, username, nama);
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.message);
        return;
      }
      getBawahan();
      setShowModal(false);
    } catch (error) {
      console.error("Error adding bawahan:", error);
    }
  };

  const fetchAllDataBawahan = useCallback(async () => {
    const unitKerjaId = getUnitKerjaId(user?.unit_kerja ?? "");
    if (unitKerjaId) {
      try {
        const response = await getAllDataBawahanInUnitKerja(unitKerjaId);
        setDataAllUserByUnitKerja(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      console.error("ID unit kerja not found");
    }
  }, [user?.unit_kerja]);

  const getBawahan = useCallback(async () => {
    try {
      const response = await getBawahanByAtasan(user?.username);
      setAllBawahan(response);
    } catch (error) {
      console.error("Error fetching bawahan data:", error);
    }
  }, [user?.username]);

  const handleDeleteBawahan = async (bawahan_username: number) => {
    try {
      const result = await Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Bawahan ini akan dihapus",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        await deleteBawahan(user?.username, bawahan_username);
        await Swal.fire("Terhapus!", "Bawahan telah dihapus.", "success");
      }
      getBawahan();
    } catch (error) {
      console.error("Failed to delete bawahan:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSuccess(false);
    setError(null);
  };

  const handleStatusUpdate = () => {
    setEditingStatus(true);
  };
  const handleSubmit = async (updatedUser: Partial<User>, foto_profil: File | null) => {
    try {
      const finalData = {
        nama: updatedUser.nama || user?.nama,
        jabatan: updatedUser.jabatan || user?.jabatan,
        nomor_hp: updatedUser.nomor_hp || user?.nomor_hp,
        level: updatedUser.level || user?.level,
        role: updatedUser.role || user?.role,
        unit_kerja: updatedUser.unit_kerja || user?.unit_kerja,
      };
      
      console.log("Mengirim data ke API:", finalData, foto_profil);
  
      // Kirim data ke API menggunakan FormData
      const response = await axios.put(
        `http://localhost:5000/api/user/${userId}`,
        {
          finalData, foto_profil

        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data", // Header khusus untuk FormData
          },
        }
      );
  
      if (response.status !== 200) {
        throw new Error("Gagal memperbarui data pengguna");
      }
      console.log("Response API:", response.status);
  
      Swal.fire("Berhasil", "Data pengguna berhasil diperbarui!", "success");
  
      // Nonaktifkan mode edit
      setEditingStatus(false);
  
      // Perbarui data pengguna
      fetchDetailUser();
    } catch (error) {
      console.error("Gagal memperbarui data pengguna:", error);
      Swal.fire("Gagal", "Terjadi kesalahan saat memperbarui data.", "error");
    }
  };
  
  

  useEffect(() => {
    fetchDetailUser();
  }, [fetchDetailUser]);

  useEffect(() => {
    if (user?.username) {
      getBawahan();
    }
  }, [user?.username, getBawahan]);

  useEffect(() => {
    if (user?.unit_kerja) {
      fetchAllDataBawahan();
    }
  }, [user?.unit_kerja, fetchAllDataBawahan]);

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
    <ProtectedRoute>
      <DefaultLayout>
        <div className="mx-auto flex min-h-screen flex-col items-center bg-gradient-to-r from-gray-50 to-gray-200 p-4">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8 w-full">
            <div>
            <h2 className="text-4xl font-bold text-gray-900">User Profile</h2>
            <p className="text-base text-gray-500">
              Detail informasi user @{user.username}
            </p>
            </div>
            <div>
              <DropdownSettingProfile handleStatusUpdate={handleStatusUpdate}/>
            </div>
          </div>
          <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Profile Section */}
            <DetailedProfileCard
            user={user}
            editingStatus={editingStatus}
            handleSubmit={handleSubmit}
            />            
            {/* Profile Section End */}
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
                    <CreateBawahanModal
                      dataAllUserByUnitKerja={dataAllUserByUnitKerja}
                      onClose={handleCloseModal}
                      onAddBawahan={handleAddBawahan}
                      success={success}
                      error={error}
                    />
                  </>
                ) : null}
                {/* Modal add bawahan End*/}
                <TableListBawahan
                  allBawahan={allBawahan}
                  onDeleteBawahan={handleDeleteBawahan}
                />
              </div>
              {/* List Bawahan End */}
            </div>
          </div>
        </div>
      </DefaultLayout>
    </ProtectedRoute>
  );
};
export default UserDetailPage;