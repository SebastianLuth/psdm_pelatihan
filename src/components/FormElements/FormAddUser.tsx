'use client';
import { getUnitKerja } from "@/service/department";
import { addUser } from "@/service/management-users";
import { LevelJabatanOptions, RoleOptions, UnitKerja, UserDataToAdd } from "@/types/manajement-users-type";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Swal from 'sweetalert2';

const FormDataUser = () => {
  const [userData, setUserData] = useState<UserDataToAdd>({
    nama: "",
    username : "",
    nomor_hp: "",
    jabatan: "",
    unit_kerja: 1,
    level: 6,
    role: "user",
    password: "",
  });
  
  const [dataAllUnitKerja, setDataAllUnitKerja] = useState<UnitKerja[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const fetchUnitKerjaData = async () => {
    try {
      const response = await getUnitKerja();
      setDataAllUnitKerja(response);
    } catch (error) {
      console.error("Error fetching unit kerja data:", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    const numericFields = ["username", "unit_kerja", "level"];
  
    setUserData(prevData => {
      const newValue = numericFields.includes(name) && value !== "" ? Number(value) : value;
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
  
    const result = await addUser(userData);
    if (result.success) {
      setSuccess(true);
      window.location.reload();
    } else {
      setError(result.message);
      await Swal.fire({
        title: 'Gagal!',
        text: 'Gagal menambahkan User. Silakan coba lagi.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  useEffect(() => {
    fetchUnitKerjaData();
  }, []);

  return (
    <>
    <div className="max-w-4xl mx-auto bg-white p-12 shadow-md rounded-lg dark:border-strokedark dark:bg-boxdark">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Tambah User</h1>
      <form onSubmit={handleAddUser}>
        <div className="grid gap-6 mb-6 lg:grid-cols-2">
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Nama
            </label>
            <input
              type="text"
              name="nama"
              value={userData.nama || ""}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Masukkan Nama User"
              required
            />
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              NIKSAP
            </label>
            <input
              type="number"
              name="username"
              value={userData.username || ""}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="contoh : 49999999"
              required
            />
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Jabatan
            </label>
            <input
              type="text"
              name="jabatan"
              value={userData.jabatan}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Contoh : Staff Sub Bagian Persona"
              required
            />
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Nomor Ponsel
            </label>
            <input
              type="tel"
              name="nomor_hp"
              value={userData.nomor_hp}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="081376059457"
              required
            />
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Level Jabatan
            </label>
            <select
              name="level"
              value={userData.level}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              {LevelJabatanOptions.map(level => (
                <option key={level.value} value={level.value}>{level.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Role
            </label>
            <select
              name="role"
              value={userData.role}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              {RoleOptions.map(role => (
                <option key={role.value} value={role.value}>{role.label}</option>
              ))}
            </select>

          </div>
        </div>
        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Unit Kerja
          </label>
          <select
              name="unit_kerja"
              value={userData.unit_kerja}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value="" disabled>Pilih Unit Kerja</option>
              {dataAllUnitKerja.map(unit => (
                <option key={unit.id} value={unit.id}>{unit.unit_kerja}</option>
              ))}
          </select>

        </div>
        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Simpan
        </button>
      </form>

      {success && <p className="mt-5 text-green-500">User berhasil ditambahkan!</p>}
      {error && <p className="mt-5 text-red-500">{error}</p>}
    </div>
    </>
)
}

export default FormDataUser