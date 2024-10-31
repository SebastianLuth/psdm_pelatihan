'use client';
import axios from "axios";
import { useEffect, useState } from "react";
interface UnitKerja {
  id: number;
  unit_kerja: string;
}

interface LevelJabatan{
  label: string;
  value: number;
}

interface Role{
  label: string;
  value: string;
}

const RoleOptions: Role[] = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
];

const levelJabatanOptions: LevelJabatan[] = [
  { value: 1, label: "BOD-1" },
  { value: 2, label: "BOD-2" },
  { value: 3, label: "BOD-3" },
  { value: 4, label: "BOD-4" },
  { value: 5, label: "BOD-5" },
  { value: 6, label: "BOD-6" },
];


const FormDataUser = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [selectedOptionUnitKerja, setSelectedOptionUnitKerja] = useState<string>("");
  const [selectedOptionLevelJabatan, setSelectedOptionLevelJabatan] = useState<number>(6);
  const [selectedOptionRole, setSelectedOptionRole] = useState<string>("user");


  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const [dataAllUnitKerja, setDataAllUnitKerja] = useState<UnitKerja[]>([]);

  const [nama, setNama] = useState<string>("");
  const [username, setUsername] = useState<number>(0);
  const [nomorHp, setNomorHp] = useState<string>("");
  const [unitKerja, setUnitKerja] = useState<number>(0);
  const [jabatan, setJabatan] = useState<string>("");
  const [level, setLevel] = useState<number>(0);
  const [role, setRole] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState<string>("");
  const [biayaPelatihanUser, setBiayaPelatihanUser] = useState<number>(0);

  // Fungsi untuk mengambil data unit kerja dari API
  const fetchUnitKerjaData = async () => {
    try {
      const response = await axios.get<UnitKerja[]>(
        "http://localhost:5000/api/unitkerja",
        {
          withCredentials: true,
        },
      );
      setDataAllUnitKerja(response.data);
    } catch (error) {
      console.error("Error fetching unit kerja data:", error);
    }
  };

  //Fungsi untuk menyimpan data user 
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setError(null);     
    setSuccess(false);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup',
        {
          username : username,
          nama : nama,
          nomor_hp : nomorHp,
          unit_kerja : selectedOptionUnitKerja,
          jabatan : jabatan,
          level : selectedOptionLevelJabatan,
          role : selectedOptionRole,
          password : password,
          biaya_pelatihan_user : biayaPelatihanUser,
        },
        {
          withCredentials: true, 
        }
       );
       console.log('Response:', response.data);
       setSuccess(true);  
    } catch (error) {
      setError("Gagal menambahkan User. Silakan coba lagi.");
      console.error(error);
    }

  }


  // Memuat data pada saat komponen pertama kali dirender
  useEffect(() => {
    fetchUnitKerjaData();
    console.log(selectedOptionLevelJabatan);
  }, []);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <>
      <div className="mx-auto rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Tambah Data User
        </h2>
        <form onSubmit={handleAddUser}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1 block font-medium text-gray-600">
                Nama
              </label>
              <input
                type="text"
                onChange={(e) => setNama(e.target.value)}
                placeholder="Contoh : Muhammad Fikri Haikal"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-100"
              />
            </div>
            <div>
              <label className="mb-1 block font-medium text-gray-600">
                NIK-SAP
              </label>
              <input
                type="text"
                onChange={(e) => setUsername(Number(e.target.value))}
                placeholder="Contoh : 499999"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-100"
              />
            </div>

            {/* Row with 3 columns for Nomor HP, Unit Kerja, and Jabatan */}
            <div className="grid grid-cols-1 gap-6 md:col-span-2 md:grid-cols-3">
              <div>
                <label className="mb-1 block font-medium text-gray-600">
                  Nomor HP
                </label>
                <input
                  type="text"
                  onChange={(e) => setNomorHp(e.target.value)}
                  placeholder="Contoh : 081263270357"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="mb-1 block font-medium text-gray-600">
                  Unit Kerja
                </label>
                <select
                  value={selectedOptionUnitKerja}
                  onChange={(e) => {
                    setSelectedOptionUnitKerja(e.target.value);
                    changeTextColor();
                  }}
                  className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-4 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                    isOptionSelected ? "text-black dark:text-white" : ""
                  }`}
                >
                  <option
                    value=""
                    disabled
                    className="text-body dark:text-bodydark"
                  >
                    Pilih Unit Kerja  
                  </option>
                  {dataAllUnitKerja.map((unit) => (
                    <option 
                    key={unit.id}
                    value={unit.id} 
                    className="text-body dark:text-bodydark">
                    {unit.unit_kerja}
                  </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block font-medium text-gray-600">
                  Jabatan
                </label>
                <input
                  type="text"
                  onChange={(e) => setJabatan(e.target.value)}
                  placeholder="Contoh : Staff Sub Bagian Persona"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block font-medium text-gray-600">
                Level Jabatan
              </label>
              <select
                  value={selectedOptionLevelJabatan}
                  onChange={(e) => {
                    setSelectedOptionLevelJabatan(Number(e.target.value));
                    changeTextColor();
                  }}
                  className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-4 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                    isOptionSelected ? "text-black dark:text-white" : ""
                  }`}
                >
                  {levelJabatanOptions.map((option) => (
                    <option 
                    key={option.value}
                    value={option.value} 
                    className="text-body dark:text-bodydark">
                    {option.label}
                  </option>
                  ))}
                </select>
            </div>
            <div>
              <label className="mb-1 block font-medium text-gray-600">
                Role
              </label>
              <select
                  value={selectedOptionRole}
                  onChange={(e) => {
                    setSelectedOptionRole(e.target.value);
                    changeTextColor();
                  }}
                  className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-4 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                    isOptionSelected ? "text-black dark:text-white" : ""
                  }`}
                >
                  
                    {
                      RoleOptions.map((role, index) => (
                        <option 
                        key={index}
                        value={role.value}
                        className="text-body dark:text-bodydark">
                        {role.label}
                      </option>
                      ))
                    }
                </select>
            </div>
            <div>
              <label className="mb-1 block font-medium text-gray-600">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="*******"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-100"
              />
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-4">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Tambah User
            </button>
          </div>
        </form>
        {success && <p className="mt-4 text-green-500">User berhasil ditambahkan!</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </>
  );
};

export default FormDataUser;
