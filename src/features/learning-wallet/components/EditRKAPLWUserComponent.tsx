"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { detailRKAPLWById } from "@/service/learningWallet";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export const EditRKAPLWUserComponent = () => {
  const [formData, setFormData] = useState({
    username: "",
    nama: "",
    biaya_rkap_lw: "",
    sisa_biaya_lw: "",
    rkap_jpl: "",
    sisa_jpl: "",
    rkap_tahun: "",
  });

  const { lwId } = useParams();
  const { userData } = useAuth();

  const fetchDetailData = useCallback(async () => {
    try {
      const result = await detailRKAPLWById(Number(lwId));
      if (Array.isArray(result.data) && result.data.length > 0) {
        const data = result.data[0];
        setFormData({
          username: data.username || "",
          nama: data.nama || "",
          biaya_rkap_lw: data.biaya_rkap_lw || "",
          sisa_biaya_lw: data.sisa_biaya_lw?.toString() || "",
          rkap_jpl: data.rkap_jpl?.toString() || "",
          sisa_jpl: data.sisa_jpl || "",
          rkap_tahun: data.rkap_tahun || "",
        });
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }, [lwId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Belum Selesai Handle Submit Untuk Edit RKAP LW Baik FE dan BE
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log(formData);
    } catch (err) {}
  };

  useEffect(() => {
    fetchDetailData().catch(console.error);
  }, [fetchDetailData]);

  return (
    <div className="mx-auto mt-6 w-full transform rounded-lg bg-white p-8 shadow-lg transition-all hover:scale-105 hover:shadow-2xl">
      <div className="p-4 ">
        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          Edit Pengajuan Learning Wallet Anda
        </h2>

        <p className="mt-2 mt-5 text-sm text-gray-700">
          Berikut ini cara untuk pengajuan:
        </p>

        <ul className="mt-2 list-inside list-disc space-y-2 text-sm text-gray-600">
          <li>Isi semua inputan seperti nama, NIKSAP, dan lainnya.</li>
          <li>Untuk inputan file, hanya format PDF yang diterima.</li>
          <li>
            Kumpulkan semua foto struk belanja dalam satu file dan kirimkan
            sebagai PDF.
          </li>
        </ul>
      </div>
      <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
        {/* Text Inputs */}
        <div className="animate-slide-in-left flex flex-wrap items-center gap-4">
          <div className="w-[calc(50%-8px)]">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              NIKSAP
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all hover:shadow-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Masukkan NIKSAP Pegawai"
              value={formData.username}
              onChange={handleChange}
              name="username"
            />
          </div>
          <div className="w-[calc(50%-8px)]">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Nama
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all hover:shadow-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Masukkan Nama Anda"
              value={formData.nama}
              onChange={handleChange}
              name="nama"
            />
          </div>
        </div>

        <div className="animate-slide-in-left flex flex-wrap items-center gap-4">
          <div className="w-[calc(50%-8px)]">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Biaya RKAP LW
            </label>
            <input
              type="number"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all hover:shadow-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Masukkan Biaya RKAP LW Pegawai"
              value={formData.biaya_rkap_lw}
              onChange={handleChange}
              name="biaya_rkap_lw"
            />
          </div>
          <div className=" w-[calc(50%-8px)]">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Sisa Biaya LW
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all hover:shadow-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Masukkan Biaya Sisa LW Pegawai"
              value={formData.sisa_biaya_lw}
              onChange={handleChange}
              name="sisa_biaya_lw"
            />
          </div>
        </div>

        <div className="animate-slide-in-left flex flex-wrap items-center gap-4">
          <div className="w-[calc(50%-8px)]">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              RKAP Jam Pelajaran
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all hover:shadow-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Masukkan Vendor Yang Anda Ikuti"
              value={formData.rkap_jpl}
              onChange={handleChange}
              name="rkap_jpl"
            />
          </div>
          <div className="w-[calc(50%-8px)]">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Sisa Jam Pelajaran
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all hover:shadow-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Masukkan No Telp Vendor Yang Dapat dihubungi"
              value={formData.sisa_jpl}
              onChange={handleChange}
              name="sisa_jpl"
            />
          </div>
        </div>

        <div className="animate-slide-in-left flex flex-wrap items-center gap-4">
          <div className="w-[calc(50%-8px)]">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Tahun RKAP LW
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all hover:shadow-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Masukkan Vendor Yang Anda Ikuti"
              value={formData.rkap_tahun}
              onChange={handleChange}
              name="rkap_tahun"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="animate-fade-in text-center">
          <button
            type="submit"
            className="w-full transform rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 font-semibold text-white transition-all hover:scale-105 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
