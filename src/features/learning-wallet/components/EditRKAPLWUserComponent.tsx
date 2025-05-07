"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { detailRKAPLWById, editRKAPLWById } from "@/service/learningWallet";
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      editRKAPLWById(formData, Number(lwId));
    } catch (err) {
      console.error("Error Submit Data")
    }
  };

  useEffect(() => {
    fetchDetailData().catch(console.error);
  }, [fetchDetailData]);

  return (
    <div className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Edit Pengajuan Learning Wallet
        </h2>
        
        <div className="mt-4 rounded-lg bg-blue-50 p-4">
          <h3 className="text-lg font-medium text-blue-800">Petunjuk Pengisian</h3>
          <ul className="mt-2 space-y-2 pl-5 text-sm text-gray-700">
            <li className="list-disc">Isi semua inputan seperti nama, NIKSAP, dan lainnya.</li>
            <li className="list-disc">Untuk inputan file, hanya format PDF yang diterima.</li>
            <li className="list-disc">
              Kumpulkan semua foto struk belanja dalam satu file dan kirimkan sebagai PDF.
            </li>
          </ul>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* NIKSAP */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              NIKSAP
            </label>
            <input
              type="text"
              className="w-full bg-transparent border-0 px-0 py-1 text-gray-900 cursor-default focus:outline-none focus:ring-0"
              placeholder="Masukkan NIKSAP Pegawai"
              value={formData.username}
              onChange={handleChange}
              name="username"
              readOnly
            />
          </div>

          {/* Nama */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Nama
            </label>
            <input
              type="text"
              className="w-full bg-transparent border-0 px-0 py-1 text-gray-900 cursor-default focus:outline-none focus:ring-0"
              placeholder="Masukkan Nama Anda"
              value={formData.nama}
              onChange={handleChange}
              name="nama"
              readOnly
            />
          </div>

          {/* Biaya RKAP LW */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Biaya RKAP LW
            </label>
            <input
              type="number"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Masukkan Biaya RKAP LW Pegawai"
              value={formData.biaya_rkap_lw}
              onChange={handleChange}
              name="biaya_rkap_lw"
            />
          </div>

          {/* Sisa Biaya LW */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Sisa Biaya LW
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Masukkan Biaya Sisa LW Pegawai"
              value={formData.sisa_biaya_lw}
              onChange={handleChange}
              name="sisa_biaya_lw"
            />
          </div>

          {/* RKAP Jam Pelajaran */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              RKAP Jam Pelajaran
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Masukkan Vendor Yang Anda Ikuti"
              value={formData.rkap_jpl}
              onChange={handleChange}
              name="rkap_jpl"
            />
          </div>

          {/* Sisa Jam Pelajaran */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Sisa Jam Pelajaran
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Masukkan No Telp Vendor Yang Dapat dihubungi"
              value={formData.sisa_jpl}
              onChange={handleChange}
              name="sisa_jpl"
            />
          </div>

          {/* Tahun RKAP LW */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Tahun RKAP LW
            </label>
            <input
              type="text"
              className="w-full bg-transparent border-0 px-0 py-1 text-gray-900 cursor-default focus:outline-none focus:ring-0"
                placeholder="Masukkan Tahun RKAP"
              value={formData.rkap_tahun}
              onChange={handleChange}
              name="rkap_tahun"
              readOnly
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-6 py-4 text-lg font-semibold text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
};