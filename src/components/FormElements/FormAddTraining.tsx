"use client";
import {
  budgetType,
  kompetensiOptions,
  metodePelatihanOptions,
  jenisPelatihanOptions,
} from "@/types/budget-types";
import { User } from "@/types/manajement-users-type";
import { FormEvent, useCallback, useEffect, useState } from "react";
import SelectUnitKerja from "../SelectGroup/SelectUnitKerja";
import { getAllDataBawahanInUnitKerja } from "@/service/management-users";
import { TrainingType } from "@/types/training-types";
import Swal from "sweetalert2";
import { addTraining, getJenisPelatihanData } from "@/service/training";
import axios from "axios";

interface vendorType {
  id?: number;
  nama_lembaga: string;
  alamat_lembaga: string;
  layanan_utama: string;
  telpon_lembaga: string;
  email_lembaga: string;
  website_lembaga: string;
  pic_lembaga: string;
}

const AddTraining = () => {
  const [trainingData, setTrainingData] = useState<Partial<TrainingType>>({});
  const [jenisPelatihanRKAP, setJenisPelatihanRKAP] = useState<budgetType[]>(
    [],
  );
  const [selectedUnitKerja, setSelectedUnitKerja] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedParticipants, setSelectedParticipants] = useState<number[]>(
    [],
  );
  const [lembagaData, setLembagaData] = useState<vendorType[]>([]);

  const [participants, setParticipants] = useState<User[]>([]);


  // Get All Lembaga
  const fetchLembagaData = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/api/vendor`);
      const data = result.data.data;
      setLembagaData(data);
    } catch (error) {
      console.error("Error fetching jenis pelatihan data:", error);
    }
  }

  // Get all user by unit kerja
  const fetchAllUserByUnitKerja = useCallback(async () => {
    try {
      if (!selectedUnitKerja) return; // Check if selectedUnitKerja is not empty
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
      const result = await getJenisPelatihanData();
      setJenisPelatihanRKAP(result);
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
      const jumlah_peserta = selectedParticipants.length;
      const peserta = selectedParticipants.map((id) => ({ id }));
      await addTraining(jumlah_peserta, peserta, trainingData);
      setTrainingData({});
      setSelectedParticipants([]);
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
    fetchAllUserByUnitKerja();
  }, [fetchAllUserByUnitKerja]);

  useEffect(() => {
    fetchLembagaData();
  }, []);

  console.log("ini lembaga data", lembagaData);

  return (
    <div className="max-w-6xl mx-auto bg-white p-12 shadow-md rounded-lg dark:border-strokedark dark:bg-boxdark">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">
        Tambah Data Pelatihan
      </h2>
      <form
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
        onSubmit={handleAddTraining}
      >
        {/* Nama Pelatihan */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nama Pelatihan</label>
          <input
            type="text"
            name="judul"
            value={trainingData.judul}
            onChange={handleInputChange}
            placeholder="Contoh: Capacity Building"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {/* Jenis Pelatihan */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">RKAP Type</label>
          <select
            name="jenis"
            value={trainingData.jenis || ""}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option value="" disabled>
              Pilih RKAP Pelatihan
            </option>
            {/* Options here */}
            {jenisPelatihanRKAP.map((item, index) => (
              <option key={index} value={item.jenis_anggaran}>
                {item.jenis_anggaran}
              </option>
            ))}
          </select>
        </div>

        {/* Metode Pelatihan */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 ">Metode Pelatihan</label>
          <select
            name="metode"
            onChange={handleInputChange}
            value={trainingData.metode || ""}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
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
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Lokasi Pelatihan</label>
          <input
            type="text"
            name="lokasi"
            value={trainingData.lokasi}
            onChange={handleInputChange}
            placeholder="Contoh: Medan / Webinar"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {/* Lembaga Pelatihan */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Lembaga Pelatihan</label>
          <select
              name="lembaga"
              value={trainingData.lembaga || ""}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value="" disabled>Pilih Unit Kerja</option>
              {lembagaData.map(unit => (
                <option key={unit.id} value={unit.nama_lembaga}>{unit.nama_lembaga}</option>
              ))}
          </select>
        </div>

        {/* Jam Pelajaran */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Jam Pelajaran Pelatihan</label>
          <input
            type="number"
            name="jam_pelajaran"
            value={trainingData.jam_pelajaran}
            onChange={handleInputChange}
            placeholder="Contoh: 10 (Berarti 10jam)"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {/* Kompetensi Pelatihan */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Kompetensi Pelatihan</label>
          <select
            name="kompetensi"
            onChange={handleInputChange}
            value={trainingData.kompetensi || ""}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value={""} disabled>Pilih Kompetensi Pelatihan</option>
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
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Jumlah Anggaran</label>
          <input
            name="jumlah_anggaran"
            value={trainingData.jumlah_anggaran}
            onChange={handleInputChange}
            placeholder="Contoh: 5000000"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
          ></input>
        </div>

        {/* RKAP Type */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Jenis Pelatihan</label>
          <select
            name="rkap_type"
            onChange={handleInputChange}
            value={trainingData.rkap_type || ""}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value={""} disabled>Pilih Jenis Pelatihan</option>
            {/* Options here */}
            {jenisPelatihanOptions.map((item, index) => (
              <option key={index} value={item.label}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        {/* Tanggal Mulai */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tanggal Mulai</label>
          <input
            name="tgl_mulai"
            value={trainingData.tgl_mulai}
            onChange={handleInputChange}
            type="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {/* Tanggal Selesai */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tanggal Selesai</label>
          <input
            name="tgl_selesai"
            value={trainingData.tgl_selesai}
            onChange={handleInputChange}
            type="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {/* Jumlah Peserta */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Jumlah Peserta</label>
          <input
            type="number"
            min={0}
            name="jumlah_peserta"
            value={trainingData.jumlah_peserta}
            onChange={handleInputChange}
            placeholder="Contoh: 25"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Cari Peserta Pelatihan
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari nama peserta..."
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:bg-gray-800">
            <table  className="min-w-full border-collapse text-left text-sm text-gray-700 dark:text-gray-300">
              {/* Header Tabel */}
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <th className="px-4 py-4 ">
                    No
                  </th>
                  <th className="px-4 py-4">
                    Pilih
                  </th>
                  <th className="px-4 py-4">
                    NIK_SAP
                  </th>
                  <th className="px-4 py-4">
                    Nama Peserta
                  </th>
                  <th className="px-4 py-4">
                    Jabatan
                  </th>
                </tr>
              </thead>

              {/* Body Tabel */}
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
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
                        className="group transform transition-transform duration-200 hover:scale-[1.02] hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                          {index + 1}
                        </td>

                        <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
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
                        <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                          {participant.username}
                        </td>
                        <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                          {participant.nama}
                        </td>
                        <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                          {participant.jabatan}
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td
                      colSpan={2}
                      className="px-6 py-4 text-gray-800 dark:text-gray-100"
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
