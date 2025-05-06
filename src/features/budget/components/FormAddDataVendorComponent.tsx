"use client";
import { submitVendorData } from "@/service/vendor";
import { vendorType } from "@/types/vendor";
import { useState } from "react";

export const FormAddDataVendorComponent = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [formData, setFormData] = useState<vendorType>({
    nama: "",
    alamat_lembaga: "",
    layanan_utama: "",
    telpon_lembaga: "",
    email_lembaga: "",
    website_lembaga: "",
    pic_lembaga: "",
    npwp: "",
  });


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitVendorData(formData);
      setSuccess(true);
      setFormData({
        nama: "",
        alamat_lembaga: "",
        layanan_utama: "",
        telpon_lembaga: "",
        email_lembaga: "",
        website_lembaga: "",
        pic_lembaga: "",
        npwp: "",
      });
    } catch (error) {
      throw error
    }
  }


  return (
    <>
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-12 shadow-md dark:border-strokedark dark:bg-boxdark">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">
          Tambah Vendor / Lembaga Penyedia
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="mb-1 block font-medium text-gray-600 dark:text-white">
              Nama Lembaga
            </label>
            <input
              type="text"
              name="nama"
              placeholder="PT. Vendor A"
              value={formData.nama ?? ""}
              onChange={handleInputChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>

          <div className="mb-5">
            <label className="mb-1 block font-medium text-gray-600 dark:text-white">
              Alamat Lengkap Lembaga
            </label>
            <input
              type="text"
              name="alamat_lembaga"
              placeholder="Jl. Semarang No. 12 - Jakarta Pusat"
              value={formData.alamat_lembaga ?? ""}
              onChange={handleInputChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>

          <div className="mb-5">
            <label className="mb-1 block font-medium text-gray-600 dark:text-white">
              Layanan Utama
            </label>
            <input
              type="text"
              name="layanan_utama"
              placeholder="Pelatihan Programming"
              value={formData.layanan_utama ?? ""}
              onChange={handleInputChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>

          <div className="mb-5">
            <label className="mb-1 block font-medium text-gray-600 dark:text-white">
              No Telepon Lembaga
            </label>
            <input
              type="text"
              name="telpon_lembaga"
              placeholder="081376059457"
              value={formData.telpon_lembaga ?? ""}
              onChange={handleInputChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>

          <div className="mb-5">
            <label className="mb-1 block font-medium text-gray-600 dark:text-white">
              Email Lembaga
            </label>
            <input
              type="email"
              name="email_lembaga"
              placeholder="ptpn4@gmail.com"
              value={formData.email_lembaga ?? ""}
              onChange={handleInputChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>

          <div className="mb-5">
            <label className="mb-1 block font-medium text-gray-600 dark:text-white">
              Website Lembaga
            </label>
            <input
              type="text"
              name="website_lembaga"
              placeholder="https://www.ptpn4.co.id"
              value={formData.website_lembaga ?? ""}
              onChange={handleInputChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>

          <div className="mb-5">
            <label className="mb-1 block font-medium text-gray-600 dark:text-white">
              PIC(Person In Charge) Lembaga
            </label>
            <input
              type="text"
              name="pic_lembaga"
              value={formData.pic_lembaga ?? ""}
              onChange={handleInputChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>

          <div className="mb-5">
            <label className="mb-1 block font-medium text-gray-600 dark:text-white">
              NO NPWP Lembaga
            </label>
            <input
              type="text"
              name="npwp"
              value={formData.npwp ?? ""}
              onChange={handleInputChange}
              placeholder="76.888.345.8-352.000"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Tambah Anggaran
            </button>
          </div>
        </form>
        {success && (
          <p className="mb-4 text-green-600">Anggaran Berhasil Ditambahkan segera <a href="/budget/vendor_data" className="text-blue-600 underline hover:text-blue-800">cek ke halaman data vendor</a></p>
        )}
      </div>
    </>
  );
};