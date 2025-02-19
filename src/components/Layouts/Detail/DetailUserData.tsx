"use client";
import DetailedProfileCard from "@/components/Card/DetailedProfileCard";
import DropdownSettingProfile from "@/components/Dropdowns/DropdownSettingProfile";
import CreateBawahanModal from "@/components/Modal/CreateBawahan";
import { TableListBawahan } from "@/components/Tables/TableListBawahan";
import {
  addEvaluator,
  deleteBawahan,
  getAllDataBawahanInUnitKerja,
  getDetailUser,
  getEvaluator,
  updateUser,
} from "@/service/management-users";
import {
  BawahanUser,
  EvaluatorData,
  FinalData,
  unitKerjaList,
  User,
} from "@/types/manajement-users-type";
import { use, useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import IntegratedComponent from "@/components/Chart/TrainingFundPieChartUser";
import { trainingFundAbsorption } from "@/types/training-types";
import { useAuth } from "@/context/AuthContext";
import { getTrainingFundAbsorptionUser } from "@/service/auth";
import { useParams } from "next/navigation";


const UserDetailComponent = () => {
  const [trainingFundAbsorption, setTrainingFundAbsorption] = useState<trainingFundAbsorption[]>([]);

  const [user, setUser] = useState<User | null>(null);

  const [showModal, setShowModal] = useState(false);

  const [allBawahan, setAllBawahan] = useState<EvaluatorData[]>([]);
  const [dataAllUserByUnitKerja, setDataAllUserByUnitKerja] = useState<User[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [editingStatus, setEditingStatus] = useState(false);
  const [totalBudgetAbsorptionPerUser, setTotalBudgetAbsorptionPerUser] = useState<number>(0);
  const [totalHourAbsorptionPerUser, setTotalHourAbsorptionPerUser] = useState<number>(0);

  const {userData} = useAuth();
  const isRouteExist =  useParams().userId ;
  const userId = isRouteExist  ? isRouteExist : userData?.id.toString();

  const fetchDetailUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getDetailUser(Number(userId));
      setUser(response);
    } catch (error) {
      setError("Terjadi kesalahan saat mengambil data pengguna.");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const handleAddEvaluator = async (evaluator_id : number , nama: string) => {
    try {
      setSuccess(false);
      setError(null);
      const result = await addEvaluator(Number(userId), evaluator_id, nama);
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.message);
        return;
      }
      fetchAllEvaluator();
      setShowModal(false);
    } catch (error) {
      setError(`Terjadi kesalahan saat menambahkan bawahan: ${error}.`);
    }
  };

  const fetchAllDataBawahan = useCallback(async () => {
    const unitKerjaId = user?.unit_kerja_id 
    if (unitKerjaId) {
      try {
        const response = await getAllDataBawahanInUnitKerja(unitKerjaId);
        setDataAllUserByUnitKerja(response);
      } catch (error) {
        setError("Terjadi kesalahan saat mengambil data pengguna.");
      }
    } else {
      setError("Terjadi kesalahan saat mengambil data pengguna.");
    }
  }, [user?.unit_kerja_id]);

  const fetchAllEvaluator = useCallback(async () => {
    try {
      const response = await getEvaluator(Number(userId));
      setAllBawahan(response);
    } catch (error) {
      setError(`Terjadi kesalahan saat mengambil data bawahan: ${error}.`);
    }
  }, [userId]);

  const handleDeleteBawahan = async (user_id: number, evaluator_id : number) => {
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
        await deleteBawahan(user_id, evaluator_id);
        await Swal.fire("Terhapus!", "Bawahan telah dihapus.", "success");
      }
      fetchAllEvaluator();
    } catch (error) {
      setError(`Terjadi kesalahan saat menghapus bawahan: ${error}.`);
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
    const unitKerjaId = user?.unit_kerja_id;
    try {
      const finalData: FinalData = {
        nama: updatedUser.nama || user?.nama,
        jabatan: updatedUser.jabatan || user?.jabatan,
        nomor_hp: updatedUser.nomor_hp || user?.nomor_hp,
        level: updatedUser.level || user?.level,
        role: updatedUser.role || user?.role,
        unit_kerja: updatedUser.unit_kerja ?? unitKerjaId ?? null,
      };

      // Kirim data ke API menggunakan FormData
      await updateUser(Number(userId), finalData, foto_profil);

      // Nonaktifkan mode edit
      setEditingStatus(false);

      // Perbarui data pengguna
      fetchDetailUser();
    } catch (error) {
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
      setIsLoading(true);
      const data = await getTrainingFundAbsorptionUser(Number(userId));
      setTrainingFundAbsorption(data);
      totalAllBudgetTrainingPerUser(data);
      totalHoursTrainingPerUser(data);
    } catch (error) {
      setError("Terjadi kesalahan saat mengambil data pengguna.");
    } finally {
      setIsLoading(false);
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
      fetchAllEvaluator();
    }
  }, [user?.username, fetchAllEvaluator]);

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
          <div className="col-span-2 space-y-4">
            {/* List Bawahan */}
            <div className="w-full rounded-2xl bg-white p-6 shadow-lg">
              {
                userData?.role === "admin" || userData?.role === "super admin"  ? (
                  <div className="mb-4 flex items-center justify-between g">
                    <h3 className="text-xl font-semibold text-gray-800">
                      List Evaluator
                    </h3>
                    <div className="flex gap-2">
                    <button
                      onClick={() => setShowModal(true)}
                      className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-white text-sm font-medium shadow-md transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:scale-95"
                      >
                      Tambah Evaluator
                    </button>

                    <button
                      onClick={() => setShowModal(true)}
                      className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-white text-sm font-medium shadow-md transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:scale-95"
                      >
                      Tambah Kolega
                    </button>
                    </div>
                    
                  </div>
                ) : (
                  <h3 className="text-xl font-semibold text-gray-800 p-4">
                  List Evaluator
                  </h3>
                )
              }
              
              {/* Modal add bawahan */}
              {showModal ? (
                <>
                  <CreateBawahanModal
                    dataAllUserByUnitKerja={dataAllUserByUnitKerja}
                    onClose={handleCloseModal}
                    onAddBawahan={handleAddEvaluator}
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
              <div className="p-6 bg-white font-bold text-xl shadow-[2px_1px_7px_3px_rgba(0,_0,_0,_0.35)] box-shadow: 2px 3px 3px 6px rgba(0, 0, 0, 0.35) z-10">Total Pelatihan Yang Telah Anda Serap</div>
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
