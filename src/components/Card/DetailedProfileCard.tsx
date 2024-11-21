import { getUnitKerja } from "@/service/department";
import { UnitKerja, User } from "@/types/manajement-users-type";
import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

type DetailedProfileCardProps = {
  user: User;
  editingStatus: boolean;
  handleSubmit: (
    updatedUser: Partial<User>,
    foto_profil: File | null,
  ) => Promise<void>;
};

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function DetailedProfileCard({
  user,
  editingStatus,
  handleSubmit,
}: DetailedProfileCardProps) {
  const imageUrl = `${baseUrl}/images/${user?.foto_profil}`;
  const [dataAllUnitKerja, setDataAllUnitKerja] = useState<UnitKerja[]>([]);
  const [formData, setFormData] = useState({
    nama: user.nama,
    jabatan: user.jabatan,
    nomor_hp: user.nomor_hp,
    level: user.level,
    role: user.role,
    unit_kerja: user.unit_kerja,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const fetchUnitKerjaData = async () => {
    try {
      const response = await getUnitKerja();
      setDataAllUnitKerja(response);
    } catch (error) {
      console.error("Error fetching unit kerja data:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "unit_kerja" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.unit_kerja || typeof formData.unit_kerja !== "number") {
      Swal.fire("Error", "Mohon pilih Unit Kerja yang valid.", "error");
      return;
    }
  
    try {
      await handleSubmit(formData, selectedFile);
      Swal.fire("Berhasil", "Data berhasil disimpan!", "success");
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire("Gagal", "Terjadi kesalahan saat menyimpan data.", "error");
    }
  };

  useEffect(() => {
    fetchUnitKerjaData();
  }, []);
  return (
    <div className="col-span-1 w-full rounded-2xl bg-white p-6 shadow-lg">
      {editingStatus ? (
        <span className="text-center text-sm font-semibold text-red-900 ">
          Mohon edit data anda dengan benar...
        </span>
      ) : (
        <span className="text-gray-800">{}</span>
      )}
      <div className="flex flex-col items-center">
        <div className="group relative flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-200">
          <Image
            width={150}
            height={150}
            src={previewImage || imageUrl || "/images/user/user-01.png"}
            style={{
              width: "auto",
              height: "auto",
            }}
            alt="User"
          />
          {editingStatus && (
            <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black bg-opacity-50">
              <span className="text-sm text-white">Ganti Profil</span>
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </label>
          )}
        </div>
        {editingStatus ? (
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleInputChange}
            className="rounded-md border border-gray-300 px-2 py-1 text-center text-2xl font-semibold text-gray-800"
          />
        ) : (
          <h3 className="text-center text-2xl font-semibold text-gray-800">
            {user.nama}
          </h3>
        )}
        {editingStatus ? (
          <input
            type="text"
            name="jabatan"
            value={formData.jabatan}
            onChange={handleInputChange}
            className="mt-1 rounded-md border border-gray-300 px-2 py-1 text-center text-sm text-gray-500"
          />
        ) : (
          <p className="text-center text-sm text-gray-500">{user.jabatan}</p>
        )}
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between rounded-lg bg-gray-100 px-4 py-3">
          <span className="font-medium text-gray-600">Nomor HP</span>
          {editingStatus ? (
            <input
              type="text"
              name="nomor_hp"
              value={formData.nomor_hp}
              onChange={handleInputChange}
              className="rounded-md border border-gray-300 px-2 py-1 text-gray-800"
            />
          ) : (
            <span className="text-gray-800">{user.nomor_hp}</span>
          )}
        </div>
        <div className="flex justify-between rounded-lg bg-gray-100 px-4 py-3">
          <span className="font-medium text-gray-600">Unit Kerja</span>
          {editingStatus ? (
            <select
            name="unit_kerja"
            value={formData.unit_kerja}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="" disabled>
                Pilih Unit Kerja
              </option>
              {dataAllUnitKerja.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.unit_kerja}
                </option>
              ))}
            </select>
          ) : (
            <span className="text-gray-800">{user.unit_kerja}</span>
          )}
        </div>
        <div className="flex justify-between rounded-lg bg-gray-100 px-4 py-3">
          <span className="font-medium text-gray-600">Level Jabatan</span>
          {editingStatus ? (
            <input
              type="text"
              name="level"
              value={formData.level}
              onChange={handleInputChange}
              className="rounded-md border border-gray-300 px-2 py-1 text-indigo-600"
            />
          ) : (
            <span className="text-indigo-600">BOD - {user.level}</span>
          )}
        </div>
        <div className="rounded-lg bg-red-500 px-4 py-2 text-center font-semibold text-white">
          {editingStatus ? (
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="rounded-md border border-gray-300 bg-red-500 px-2 py-1 text-white"
            />
          ) : (
            <>Role: {user.role}</>
          )}
        </div>
      </div>
      {editingStatus && (
        <form onSubmit={handleFormSubmit}>
          <button
            type="submit"
            className="mt-6 w-full rounded-md bg-indigo-500 px-4 py-2 text-white"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
