'use client';
import { getUnitKerja } from "@/service/department";
import { addUser } from "@/service/management-users";
import { LevelJabatanOptions, RoleOptions, UnitKerja } from "@/types/manajement-users-type";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Swal from 'sweetalert2';

const FormDataUser = () => {
  const [userData, setUserData] = useState({
    nama: "",
    username: "",
    nomor_hp: "",
    jabatan: "",
    unit_kerja: 1,
    level: 6,
    role: "user",
    password: "",
    biaya_pelatihan_user: 0,
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
    setUserData(prevData => ({
      ...prevData,
      [name]: name === "username" ? Number(value) : value
    }));
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
    <div className="mx-auto rounded-lg bg-white p-8 shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">Tambah Data User</h2>
      <form onSubmit={handleAddUser}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-1 block font-medium text-gray-600">Nama</label>
            <input
              type="text"
              name="nama"
              value={userData.nama}
              onChange={handleInputChange}
              placeholder="Contoh : Muhammad Fikri Haikal"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-100"
              required
            />
          </div>
          <div>
            <label className="mb-1 block font-medium text-gray-600">NIK-SAP</label>
            <input
              type="number"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              placeholder="Contoh : 499999"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-100"
              required
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-gray-600">Nomor HP</label>
            <input
              type="text"
              name="nomor_hp"
              value={userData.nomor_hp}
              onChange={handleInputChange}
              placeholder="Contoh : 081263270357"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-100"
              required
            />
          </div>
          <div>
            <label className="mb-1 block font-medium text-gray-600">Unit Kerja</label>
            <select
              name="unit_kerja"
              value={userData.unit_kerja}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-100"
              required
            >
              <option value="" disabled>Pilih Unit Kerja</option>
              {dataAllUnitKerja.map(unit => (
                <option key={unit.id} value={unit.id}>{unit.unit_kerja}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block font-medium text-gray-600">Jabatan</label>
            <input
              type="text"
              name="jabatan"
              value={userData.jabatan}
              onChange={handleInputChange}
              placeholder="Contoh : Staff Sub Bagian Persona"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-100"
              required
            />
          </div>
          <div>
            <label className="mb-1 block font-medium text-gray-600">Level Jabatan</label>
            <select
              name="level"
              value={userData.level}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-100"
              required
            >
              {LevelJabatanOptions.map(level => (
                <option key={level.value} value={level.value}>{level.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block font-medium text-gray-600">Role</label>
            <select
              name="role"
              value={userData.role}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-100"
              required
            >
              {RoleOptions.map(role => (
                <option key={role.value} value={role.value}>{role.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block font-medium text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              placeholder="Masukkan password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-100"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-100"
        >
          Tambah User
        </button>
      </form>
      {success && <p className="mt-4 text-green-500">User berhasil ditambahkan!</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default FormDataUser;