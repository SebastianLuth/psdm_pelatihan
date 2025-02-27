"use client";
import {
  budgetType,
  kompetensiOptions,
  metodePelatihanOptions,
  jenisPelatihanOptions,
} from "@/types/budget-types";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { TrainingType } from "@/types/training-types";
import Swal from "sweetalert2";
import {getJenisPelatihanData, updateTraining } from "@/service/training";
import { getAllVendorData } from "@/service/vendor";
import { vendorType } from "@/types/vendor";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

const UpdateTrainingComponent = () => {
  const [trainingData, setTrainingData] = useState<Partial<TrainingType>>({});
  const [jenisPelatihanRKAP, setJenisPelatihanRKAP] = useState<budgetType[]>(
    [],
  );
  const [selectedMonth, setSelectedMonth] = useState<string | number>(""); // Bulan yang dipilih
  const [filteredRKAP, setFilteredRKAP] = useState<budgetType[]>([]); // Data yang sudah difilter
  const [lembagaData, setLembagaData] = useState<vendorType[]>([]);

  const trainingId = useParams().trainingId;
  const router = useRouter();


  // Get All LembagatrainingId
  const fetchLembagaData = async () => {
    try {
      const result = await getAllVendorData();
      setLembagaData(result.map((vendor: any) => {
        return {
          ...vendor,
          nama: vendor.nama_lembaga,
        };
      }));
    } catch (error) {
      console.error("Error fetching jenis pelatihan data:", error);
    }
  }

  const fetchDetailTraining = useCallback (async () => {
    try {
      const result = await axios.get(`http://localhost:5000/api/training/${trainingId}`, { withCredentials: true });
      console.log("ini hasil Featching detail training data",result.data.data.training);
      setTrainingData(result.data.data.training);
    } catch (error) {
      console.error("Error fetching jenis pelatihan data:", error);
    }
  }, [trainingId]);


  const fetchJenisPelatihanData = async () => {
    try {
      const result = await getJenisPelatihanData();
      setJenisPelatihanRKAP(result);
    } catch (error) {
      console.error("Error fetching jenis pelatihan data:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
  
    if (name === "jenis") {
      try {
        const parsedValue = JSON.parse(value); 
  
        setTrainingData((prevData) => ({
          ...prevData,
          jenis: parsedValue.jenis, 
          anggaran_id: parsedValue.id,
        }));
  
        console.log("Training Data Updated:", parsedValue);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    } else {
      setTrainingData((prevData) => ({
        ...prevData,
        [name]: name === "jumlah_peserta" || name === "jumlah_anggaran" ? Number(value) : value,
      }));
    }
  };
  
  const handleUpdateTraining = async (e: FormEvent) => {
    e.preventDefault();
    if(!trainingId) return Swal.fire("Gagal!", "Terjadi kesalahan saat menambahkan pelatihan. Silakan coba lagi dan isi data dengan benar.", "error");

    try {
      
      await updateTraining(Number(trainingId), trainingData);
      Swal.fire({
        title: "Berhasil!",
        text: "Data pelatihan berhasil diperbarui.",
        icon: "success",
      }).then(() => router.push(`/budget/budget_data`));
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

  useEffect(()=>{
    fetchDetailTraining();
  }, [fetchDetailTraining])

  useEffect(() => {
    fetchLembagaData();
  }, []);

  useEffect(() => {
    // Reset jenis pelatihan dan anggaran_id jika bulan berubah
    setTrainingData((prevData) => ({
      ...prevData,
      jenis: "",
      anggaran_id: undefined,
    }));
  }, [selectedMonth]);
  
  
  const availableYears = new Set(jenisPelatihanRKAP.map((item) => item.tahun_anggaran));
  const selectedYear = Array.from(availableYears)[0] || new Date().getFullYear();

  useEffect(() => {
    if (selectedMonth) {
      const filtered = jenisPelatihanRKAP.filter(
        (item) => item.bulan_anggaran === Number(selectedMonth)
      );
      setFilteredRKAP(filtered);
    } else {
      setFilteredRKAP([]); // Reset jika bulan tidak dipilih
    }
  }, [selectedMonth, jenisPelatihanRKAP]);

  return (
    <div className="max-w-6xl mx-auto bg-white p-12 shadow-md rounded-lg dark:border-strokedark dark:bg-boxdark">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">
        Edit Realisasi Data Pelatihan
      </h2>
      <form
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
        onSubmit={handleUpdateTraining}
      >
        {/* Nama Pelatihan */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nama Pelatihan</label>
          <input
            type="text"
            name="judul"
            value={trainingData?.judul || ""}
            onChange={handleInputChange}
            placeholder="Contoh: Capacity Building"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
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

        {/* RKAP Pelatihan */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Bulan Pelaksanaan
          </label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Pilih Bulan</option>
            {Array.from(new Set(jenisPelatihanRKAP.map((item) => item.bulan_anggaran))).map((bulan) => (
              <option key={bulan} value={bulan}>
                {new Date(selectedYear, Number(bulan) - 1).toLocaleString("id-ID", { month: "long" })}
              </option>
            ))}
          </select>

          {/* Dropdown Pilihan RKAP */}
          <label className="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Kategori Biaya 
          </label>
          <select
            name="jenis"
            value={trainingData.jenis || ""}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            disabled={!selectedMonth} // Disable jika bulan belum dipilih
          >
            <option value="" disabled>
              {selectedMonth ? "Pilih RKAP Pelatihan" : "Pilih Bulan Terlebih Dahulu"}
            </option>
            {filteredRKAP.map((item) => (
              <option key={item.id} value={JSON.stringify({ id: item.id, jenis: item.jenis_anggaran })}>
                {item.jenis_anggaran}
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
              <option value="" disabled>Pilih Lembaga / Vendor</option>
              {lembagaData.map(unit => (
                <option key={unit.id} value={unit.nama}>{unit.nama}</option>
              ))}
          </select>
        </div>

        {/* Jam Pelajaran */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Jam Pelajaran Pelatihan</label >
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
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Kategory Pelatihan</label>
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
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Biaya Pelatihan</label>
          <input
            name="jumlah_anggaran"
            value={trainingData.jumlah_anggaran}
            onChange={handleInputChange}
            placeholder="Contoh: 5000000"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
          ></input>
        </div>

        {/*Jenis Pelatihan */}
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

        {/* Buttons */}
        <div className="col-span-1 mt-4 flex justify-end space-x-4 md:col-span-3">
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTrainingComponent;
