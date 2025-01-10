"use client";
import DetailedProfileCard from "@/components/Card/DetailedProfileCard";
import DropdownSettingProfile from "@/components/Dropdowns/DropdownSettingProfile";
import CreateBawahanModal from "@/components/Modal/CreateBawahan";
import { TableListBawahan } from "@/components/Tables/TableListBawahan";
import {
  addBawahan,
  deleteBawahan,
  getAllDataBawahanInUnitKerja,
  getBawahanByAtasan,
  getDetailUser,
  updateUser,
} from "@/service/management-users";
import {
  BawahanUser,
  FinalData,
  unitKerjaList,
  User,
} from "@/types/manajement-users-type";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import IntegratedComponent from "@/components/Chart/TrainingFundPieChartUser";
import { trainingFundAbsorption } from "@/types/training-types";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

const UserDetailComponent = () => {
  const [trainingFundAbsorption, setTrainingFundAbsorption] = useState<trainingFundAbsorption[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const userId = useAuth().userData?.id;
  const [showModal, setShowModal] = useState(false);
  const [allBawahan, setAllBawahan] = useState<BawahanUser[]>([]);
  const [dataAllUserByUnitKerja, setDataAllUserByUnitKerja] = useState<User[]>(
    [],
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [editingStatus, setEditingStatus] = useState(false);
  const [totalBudgetAbsorptionPerUser, setTotalBudgetAbsorptionPerUser] = useState<number>(0);
  const [totalHourAbsorptionPerUser, setTotalHourAbsorptionPerUser] = useState<number>(0);


  const getUnitKerjaId = (unitKerjaName: string) => {
    const unitKerja = unitKerjaList.find((item) => item.name === unitKerjaName);
    return unitKerja ? unitKerja.id : null;
  };

  const fetchDetailUser = useCallback(async () => {
    try {
      const response = await getDetailUser(Number(userId));
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
  const handleSubmit = async (
    updatedUser: Partial<User>,
    foto_profil: File | null,
  ) => {
    const unitKerjaId = getUnitKerjaId(user?.unit_kerja ?? "");
    try {
      const finalData: FinalData = {
        nama: updatedUser.nama || user?.nama,
        jabatan: updatedUser.jabatan || user?.jabatan,
        nomor_hp: updatedUser.nomor_hp || user?.nomor_hp,
        level: updatedUser.level || user?.level,
        role: updatedUser.role || user?.role,
        unit_kerja: updatedUser.unit_kerja || unitKerjaId,
      };

      // Kirim data ke API menggunakan FormData
      await updateUser(Number(userId), finalData, foto_profil);

      // Nonaktifkan mode edit
      setEditingStatus(false);

      // Perbarui data pengguna
      fetchDetailUser();
    } catch (error) {
      console.error("Gagal memperbarui data pengguna:", error);
      Swal.fire("Gagal", "Terjadi kesalahan saat memperbarui data.", "error");
    }
  };

  const totalAllBudgetTrainingPerUser = (trainingFundAbsorption : trainingFundAbsorption[]) =>{
    const total = trainingFundAbsorption.reduce((acc, item) => acc + parseFloat(item.biaya_per_user), 0);
    setTotalBudgetAbsorptionPerUser(total);
  }

  const totalHoursTrainingPerUser = (trainingFundAbsorption : trainingFundAbsorption[]) =>{
    const total : number = trainingFundAbsorption.reduce((acc, item) => acc +item.jam_pelajaran_pelatihan, 0);
    setTotalHourAbsorptionPerUser(total);
  }

  const fetchTrainingFundAbsorption = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/${userId}/profil_budget_user`);
      setTrainingFundAbsorption(response.data.data);
      totalAllBudgetTrainingPerUser(response.data.data);
      totalHoursTrainingPerUser(response.data.data);
    } catch (error) {
      console.error("Error fetching training data:", error);
    }
  }, [userId]);
  
    useEffect(() => {
      fetchTrainingFundAbsorption();
    }, [fetchTrainingFundAbsorption]);


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
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto flex min-h-screen flex-col items-center p-4">
        {/* Header Section */}
        <div className="mb-8 flex w-full items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">User Profile</h2>
            <p className="text-base text-gray-500">
              Detail informasi user @{user.username}
            </p>
          </div>
          <div>
            <DropdownSettingProfile handleStatusUpdate={handleStatusUpdate} />
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

          {/* pie char */}
          <div className="flex flex-col col-span-3 mt-20">
          <div className="flex flex-wrap">
              <div className="p-6 bg-white font-bold text-xl shadow-[2px_1px_7px_3px_rgba(0,_0,_0,_0.35)] box-shadow: 2px 3px 3px 6px rgba(0, 0, 0, 0.35) z-10">Total Pelatihan Yang telah di serap</div>
              <div className="p-6 bg-blue-500 text-white font-bold text-xl shadow-[2px_1px_7px_3px_rgba(0,_0,_0,_0.35)] box-shadow: 2px 3px 3px 6px rgba(0, 0, 0, 0.35) z-5">RP. {totalBudgetAbsorptionPerUser.toLocaleString("id-ID")}</div>
          </div>
          <p className="p-0 mt-3">Total Jam Pelajaran <b>| {totalHourAbsorptionPerUser}</b></p>
         <IntegratedComponent trainingFundAbsorption={trainingFundAbsorption}/>
      </div>
        </div>
      </div>
     
    </>
  );
};
export default UserDetailComponent;
