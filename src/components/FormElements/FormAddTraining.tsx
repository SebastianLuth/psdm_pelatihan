"use client";
import {
  budgetType,
  kompetensiOptions,
  metodePelatihanOptions,
  rkapTypeOptions,
  tahunOptions,
} from "@/types/budget-types";
import { User } from "@/types/manajement-users-type";
import axios from "axios";
import { FormEvent, useCallback, useEffect, useState } from "react";
import SelectUnitKerja from "../SelectGroup/SelectUnitKerja";
import { getAllDataBawahanInUnitKerja } from "@/service/management-users";
import { TrainingType } from "@/types/training-types";
import Swal from "sweetalert2";

// app/components/FormElements/FormAddTraining.tsx
const AddTraining = () => {
  const [trainingData, setTrainingData] = useState<Partial<TrainingType>>({});
  const [jenisPelatihan, setJenisPelatihan] = useState<budgetType[]>([]);
  const [selectedUnitKerja, setSelectedUnitKerja] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedParticipants, setSelectedParticipants] = useState<number[]>(
    [],
  ); // Peserta yang dipilih
  const [participants, setParticipants] = useState<User[]>([]);

  // Get all user by unit kerja
  const fetchAllUserByUnitKerja = useCallback(async () => {
    try {
      if (!selectedUnitKerja) return; // Cegah pemanggilan API jika kosong
      const response = await getAllDataBawahanInUnitKerja(
        Number(selectedUnitKerja),
      );
      setParticipants(response);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [selectedUnitKerja]);

  const fetchJenisPelatihanData = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/api/budget`, {
        withCredentials: true,
      });
      setJenisPelatihan(result.data.data);
    } catch (error) {
      console.error("Error fetching jenis pelatihan data:", error);
    }
  };

  const handleParticipantSelection = (id: number) => {
    setSelectedParticipants((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id],
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setTrainingData((prevData) => ({
      ...prevData,
      [name]:
        name === "jumlah_peserta" || name === "jumlah_anggaran"
          ? Number(value)
          : value,
    }));
  };
  const handleAddTraining = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        ...trainingData,
        jumlah_peserta: selectedParticipants.length,
        peserta: selectedParticipants.map((id) => ({ id })),
      };
      const result = await axios.post(
        `http://localhost:5000/api/training`,
        payload,
      );
      if (result.status === 201) {
        await Swal.fire({
          title: "Success!",
          text: "Berhasil Menambahkan Pelatihan",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data.message ||
        error.response?.data.error ||
        "Terjadi kesalahan saat menambahkan pelatihan. Silakan coba lagi dan isi data dengan benar.";

      await Swal.fire({
        title: "Gagal!",
        text: `${errorMessage}`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    fetchJenisPelatihanData();
  }, []);
  useEffect(() => {
    fetchAllUserByUnitKerja(); // Dipanggil ulang saat selectedUnitKerja berubah
  }, [fetchAllUserByUnitKerja]);

  return (
    <div className="mx-auto rounded-lg bg-white p-8 shadow-lg">
      <h2 className="mb-2 text-2xl font-semibold text-blue-600">
        Tambah Data Pelatihan
      </h2>
      <p className="mb-6 text-gray-500">
        Halaman ini untuk tambah data pelatihan.
      </p>
      <form
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
        onSubmit={handleAddTraining}
      >
        {/* Nama Pelatihan */}
        <div>
          <label className="text-gray-700">Nama Pelatihan</label>
          <input
            type="text"
            name="judul"
            value={trainingData.judul}
            onChange={handleInputChange}
            placeholder="Contoh: Capacity Building"
            className="mt-1 w-full rounded-md border p-2"
          />
        </div>

        {/* Jenis Pelatihan */}
        <div>
          <label className="text-gray-700">Jenis Pelatihan</label>
          <select
            name="jenis"
            value={trainingData.jenis}
            onChange={handleInputChange}
            className="mt-1 w-full rounded-md border p-2"
          >
            <option value={""} disabled>
              Pilih Jenis Pelatihan
            </option>
            {/* Options here */}
            {jenisPelatihan.map((item, index) => (
              <option key={index} value={item.jenis_anggaran}>
                {item.jenis_anggaran}
              </option>
            ))}
          </select>
        </div>

        {/* Metode Pelatihan */}
        <div>
          <label className="text-gray-700">Metode Pelatihan</label>
          <select
            name="metode"
            onChange={handleInputChange}
            className="mt-1 w-full rounded-md border p-2"
          >
            <option value={""} disabled>
              Pilih Metode Pelatihan
            </option>
            {/* Options here */}
            {metodePelatihanOptions.map((item, index) => (
              <option key={index} value={item.label}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        {/* Lokasi Pelatihan */}
        <div>
          <label className="text-gray-700">Lokasi Pelatihan</label>
          <input
            type="text"
            name="lokasi"
            value={trainingData.lokasi}
            onChange={handleInputChange}
            placeholder="Contoh: Medan / Webinar"
            className="mt-1 w-full rounded-md border p-2"
          />
        </div>

        {/* Lembaga Pelatihan */}
        <div>
          <label className="text-gray-700">Lembaga Pelatihan</label>
          <input
            type="text"
            name="lembaga"
            value={trainingData.lembaga}
            onChange={handleInputChange}
            placeholder="Contoh: LPP / NON LPP (GML, and other...)"
            className="mt-1 w-full rounded-md border p-2"
          />
        </div>

        {/* Kompetensi Pelatihan */}
        <div>
          <label className="text-gray-700">Kompetensi Pelatihan</label>
          <select
            name="kompetensi"
            onChange={handleInputChange}
            className="mt-1 w-full rounded-md border p-2"
          >
            <option disabled>Pilih Kompetensi Pelatihan</option>
            {/* Options here */}
            {kompetensiOptions.map((item, index) => (
              <option key={index} value={item.label}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        {/* Jumlah Anggaran */}
        <div>
          <label className="text-gray-700">Jumlah Anggaran</label>
          <input
            name="jumlah_anggaran"
            value={trainingData.jumlah_anggaran}
            onChange={handleInputChange}
            placeholder="Contoh: 5000000"
            className="mt-1 w-full rounded-md border p-2"
            type="text"
          ></input>
        </div>

        {/* RKAP Type */}
        <div>
          <label className="text-gray-700">RKAP Type</label>
          <select
            name="rkap_type"
            onChange={handleInputChange}
            className="mt-1 w-full rounded-md border p-2"
          >
            <option disabled>Pilih Type</option>
            {/* Options here */}
            {rkapTypeOptions.map((item, index) => (
              <option key={index} value={item.label}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        {/* Tanggal Mulai */}
        <div>
          <label className="text-gray-700">Tanggal Mulai</label>
          <input
            name="tgl_mulai"
            value={trainingData.tgl_mulai}
            onChange={handleInputChange}
            type="date"
            className="mt-1 w-full rounded-md border p-2"
          />
        </div>

        {/* Tanggal Selesai */}
        <div>
          <label className="text-gray-700">Tanggal Selesai</label>
          <input
            name="tgl_selesai"
            value={trainingData.tgl_selesai}
            onChange={handleInputChange}
            type="date"
            className="mt-1 w-full rounded-md border p-2"
          />
        </div>

        {/* Jumlah Peserta */}
        <div>
          <label className="text-gray-700">Jumlah Peserta</label>
          <input
            type="number"
            min={0}
            name="jumlah_peserta"
            value={trainingData.jumlah_peserta}
            onChange={handleInputChange}
            placeholder="Contoh: 25"
            className="mt-1 w-full rounded-md border p-2"
          />
        </div>

        {/* Fitur seleksi peserta */}
        <div className="col-span-1 md:col-span-3">
          {/* Header */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Dropdown Unit Kerja */}
            <SelectUnitKerja onUnitKerjaChange={setSelectedUnitKerja} />

            <h1>Jumlah Peserta yang telah ditambahkan : {}</h1>

            {/* Input Cari Peserta */}
            <div className="w-full md:w-1/3">
              <label className="mb-2 block font-medium text-gray-800">
                Cari Peserta Pelatihan
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari nama peserta..."
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-700 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="absolute right-4 top-3.5 text-gray-400">
                  <i className="fas fa-search"></i>
                </span>
              </div>
            </div>
          </div>

          {/* Tabel */}
          <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
            <table className="w-full border-collapse text-left text-sm">
              {/* Header Tabel */}
              <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <tr>
                  <th className="px-4 py-4 text-center font-medium tracking-wide">
                    No
                  </th>
                  <th className="px-4 py-4 text-center font-medium tracking-wide">
                    Pilih
                  </th>
                  <th className="px-4 py-4 font-medium tracking-wide">
                    NIK_SAP
                  </th>
                  <th className="px-4 py-4 font-medium tracking-wide">
                    Nama Peserta
                  </th>
                  <th className="px-4 py-4 font-medium tracking-wide">
                    Jabatan
                  </th>
                </tr>
              </thead>

              {/* Body Tabel */}
              <tbody>
                {participants.length > 0 ? (
                  participants
                    .filter((participant) =>
                      participant.nama
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()),
                    )
                    .map((participant, index) => (
                      <tr
                        key={participant.id}
                        className={`${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } transition hover:bg-blue-50`}
                      >
                        <td className="px-6 py-4 font-medium text-gray-800">
                          {index + 1}
                        </td>

                        <td className="px-6 py-4 text-center">
                          <input
                            type="checkbox"
                            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            checked={selectedParticipants.includes(
                              participant.id,
                            )}
                            onChange={() =>
                              handleParticipantSelection(participant.id)
                            }
                          />
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-800">
                          {participant.username}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-800">
                          {participant.nama}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-800">
                          {participant.jabatan}
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td
                      colSpan={2}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      Tidak ada peserta yang ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Buttons */}
        <div className="col-span-1 mt-4 flex justify-end space-x-4 md:col-span-3">
          <button
            type="reset"
            className="rounded-md bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
          >
            Reset Form
          </button>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Tambah Pelatihan
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTraining;
