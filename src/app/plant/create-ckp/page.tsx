"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { getUnitKerja } from "@/service/department";
import { addUser } from "@/service/management-users";
import {
  LevelJabatanOptions,
  RoleOptions,
} from "@/types/manajement-users-type";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Swal from "sweetalert2";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

type CompanyData = {
  id: number;
  nama: string;
  alamat: string;
  created_at: string;
  updated_at: string;
};

type AddDataCKP = {
  nama_peserta: string;
  niksap: number | string;
  company_id: number | string;
};

const FormDataUser = () => {
  const [userData, setUserData] = useState<AddDataCKP>({
    nama_peserta: "",
    niksap: "",
    company_id: "",
  });

  const [companyData, setCompanyData] = useState<CompanyData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const router = useRouter();

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/company`, {
        withCredentials: true,
      });
      setCompanyData(response.data.data);
    } catch (error) {
      setError("Terjadi kesalahan saat mengambil data perusahaan.");
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    const numericFields = ["company_id"];

    setUserData((prevData) => {
      const newValue =
        numericFields.includes(name) && value !== "" ? Number(value) : value;
      return {
        ...prevData,
        [name]: newValue,
      };
    });
  };

  const handleAddUser = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const result = await axios.post(
      `${baseUrl}/api/ckp/super-admin`,
      userData,
      {
        withCredentials: true,
      },
    );
    if (result.status === 201) {
      setSuccess(true);
      Swal.fire({
        title: "Success!",
        text: "Berhasil menambahkan User.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        router.push("/plant");
      });
    } else {
      setError("Gagal menambahkan User.");
      await Swal.fire({
        title: "Gagal!",
        text: "Gagal menambahkan User. Silakan coba lagi.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <ProtectedRoute allowedRoles={["super admin"]}>
      <DefaultLayout>
        <>
          <div className="mx-auto max-w-4xl rounded-lg bg-white p-12 shadow-md dark:border-strokedark dark:bg-boxdark">
            <h1 className="mb-6 text-2xl font-bold dark:text-white">
              Tambah Calon CKP
            </h1>
            <form onSubmit={handleAddUser}>
              <div className="mb-6 grid gap-6 lg:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
                    Nama
                  </label>
                  <input
                    type="text"
                    name="nama_peserta"
                    value={userData.nama_peserta || ""}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Masukkan Nama User"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
                    NIKSAP
                  </label>
                  <input
                    type="number"
                    name="niksap"
                    value={userData.niksap || ""}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="contoh : 49999999"
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
                  Asal Region
                </label>
                <select
                  name="company_id"
                  value={userData.company_id}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  required
                >
                  <option value={""} disabled>
                    Pilih Asal Region
                  </option>
                  {companyData.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                      {unit.nama}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
              >
                Simpan
              </button>
            </form>

            {success && (
              <p className="mt-5 text-green-500">User berhasil ditambahkan!</p>
            )}
            {error && <p className="mt-5 text-red-500">{error}</p>}
          </div>
        </>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default FormDataUser;
