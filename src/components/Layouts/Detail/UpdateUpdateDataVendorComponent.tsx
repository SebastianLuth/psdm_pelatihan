"use client";
import FormSkeleton from "@/components/Skeleton/FormSkeleton";
import { getDetailVendorData, updateVendorData } from "@/service/vendor";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface vendorType {
  id?: number;
  nama_lembaga: string;
  alamat_lembaga: string;
  layanan_utama: string;
  telpon_lembaga: string;
  email: string;
  website: string;
  pic_lembaga: string;
}

const UpdateDataVendorComponent = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [vendorData, setVendorData] = useState<vendorType | null>(null);
  const [formData, setFormData] = useState<vendorType>({
    nama_lembaga: "",
    alamat_lembaga: "",
    layanan_utama: "",
    telpon_lembaga: "",
    email: "",
    website: "",
    pic_lembaga: "",
  });

  const vendorId = useParams().id;

  const fetchDetailDataVendor = useCallback(async () => {
    try {
      setIsLoading(true);
      const data =  await getDetailVendorData(Number(vendorId));
      setVendorData(data);
      setFormData(data);
    } catch (error) {
      setError("Gagal memuat data vendor. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  }, [vendorId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorData) return;
    const updatedData = { ...vendorData, ...formData };

    try {
      updateVendorData(Number(vendorId), updatedData);
      setSuccess(true);
    } catch (error) {
      setError("Gagal memperbarui data vendor. Silakan coba lagi.");
    }
  };

  useEffect(() => {
    fetchDetailDataVendor();
  }, [fetchDetailDataVendor, vendorId]);

  return (
    <>
      {isLoading === true ? (
        <FormSkeleton />
      ) : (
        <div className="mx-auto max-w-4xl rounded-lg bg-white p-12 shadow-md dark:border-strokedark dark:bg-boxdark">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">
            Tambah Anggaran
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="mb-1 block font-medium text-gray-600 dark:text-white">
                Nama Lembaga
              </label>
              <input
                type="text"
                name="nama_lembaga"
                value={formData.nama_lembaga}
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
                value={formData.alamat_lembaga}
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
                value={formData.layanan_utama}
                onChange={handleInputChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>

            <div className="mb-5">
              <label className="mb-1 block font-medium text-gray-600 dark:text-white">
                Nomor Telepon
              </label>
              <input
                type="text"
                name="telpon_lembaga"
                value={formData.telpon_lembaga}
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
                name="email"
                value={formData.email}
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
                name="website"
                value={formData.website}
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
                value={formData.pic_lembaga}
                onChange={handleInputChange}
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
            <p className="mb-4 text-green-600">
              Anggaran Berhasil Diupdate segera{" "}
              <a
                href="/budget/vendor_data"
                className="text-blue-600 underline hover:text-blue-800"
              >
                cek ke halaman data vendor
              </a>
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default UpdateDataVendorComponent;
