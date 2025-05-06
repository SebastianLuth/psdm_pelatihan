"use client";
import { useAuth } from "@/context/AuthContext";
import {
  detailRealisasiLWUserByLWId,
  EditRealisasiLearningWallet,
} from "@/service/learningWallet";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

type RealisasiLWData = {
  id: number;
  username: number;
  nama: string;
  judul_pelatihan: string;
  biaya_pelatihan: number;
  jpl: number;
  nama_vendor: string;
  no_vendor: string;
  foto_pelatihan_url: string;
  foto_resi_url: string;
  foto_materi_url: string;
  foto_sertifikat: string;
};

export const EditRealisasiSubmissionLwUserComponent = () => {
  const [formData, setFormData] = useState({
    nama: "",
    judul: "",
    biaya: "",
    jpl: "",
    vendor: "",
    noVendor: "",
  });

  const [fileNames, setFileNames] = useState({
    fotoPelatihan: "",
    struk: "",
    materi: "",
    sertifikat: "",
  });

  const [detailLWData, setDetailLWData] = useState<RealisasiLWData[]>([]);

  const { lwId } = useParams();
  const { userData } = useAuth();
  const router = useRouter();

  const fetchDetailData = useCallback(async () => {
    try {
      const result = await detailRealisasiLWUserByLWId(Number(lwId));

      setDetailLWData(result.data);
      if (Array.isArray(result.data) && result.data.length > 0) {
        const data = result.data[0];
        setFormData({
          nama: data.nama || "",
          judul: data.judul_pelatihan || "",
          biaya: data.biaya_pelatihan?.toString() || "",
          jpl: data.jpl?.toString() || "",
          vendor: data.nama_vendor || "",
          noVendor: data.no_vendor || "",
        });
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }, [lwId]);

  const getFile = (ref: React.RefObject<HTMLInputElement>) => {
    return ref.current?.files?.[0] || null;
  };

  const fotoPelatihanRef = useRef<HTMLInputElement>(null);
  const strukRef = useRef<HTMLInputElement>(null);
  const materiRef = useRef<HTMLInputElement>(null);
  const sertifikatRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof typeof fileNames,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        alert("Hanya file PDF yang diperbolehkan.");
        e.target.value = ""; // reset input file
        setFileNames((prev) => ({ ...prev, [key]: "" }));
        return;
      }
      setFileNames((prev) => ({ ...prev, [key]: file.name }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const username = userData?.username || "";
      const result = await EditRealisasiLearningWallet(
        formData,
        {
          fotoPelatihan: getFile(fotoPelatihanRef),
          fotoStruk: getFile(strukRef),
          fotoMateri: getFile(materiRef),
          fotoSertifikat: getFile(sertifikatRef),
        },
        username,
        Number(lwId),
      );

      if (result.success) {
        // setSuccess(true);
        await Swal.fire({
          title: "Success!",
          text: "Berhasil Mengedit Realisasi LW",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          router.push("/learning-wallet");
        });
      } else {
        // setError("Gagal Menambahakn Realisasi LW");
        await Swal.fire({
          title: "Gagal!",
          text: "Gagal Mengedit Realisasi LW. Silakan coba lagi.",
          icon: "error",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Gagal!",
        text: "Gagal Menambahakn Realisasi LW. Silakan coba lagi.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    fetchDetailData().catch(console.error);
  }, [fetchDetailData]);

  return (
    <>
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
                Judul Pelatihan
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all hover:shadow-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Masukkan Judul Pelatihan Yang Telah Anda Ikuti"
                value={formData.judul}
                onChange={handleChange}
                name="judul"
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
                Total Jam Pelajaran
              </label>
              <input
                type="number"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all hover:shadow-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Total Jam Pelajaran Anda"
                value={formData.jpl}
                onChange={handleChange}
                name="jpl"
              />
            </div>
            <div className=" w-[calc(50%-8px)]">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Biaya Pelatihan
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all hover:shadow-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Biaya Yang Anda Keluarkan"
                value={formData.biaya}
                onChange={handleChange}
                name="biaya"
              />
            </div>
          </div>

          <div className="animate-slide-in-left flex flex-wrap items-center gap-4">
            <div className="w-[calc(50%-8px)]">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Vendor
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all hover:shadow-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Masukkan Vendor Yang Anda Ikuti"
                value={formData.vendor}
                onChange={handleChange}
                name="vendor"
              />
            </div>
            <div className="w-[calc(50%-8px)]">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                No Vendor
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all hover:shadow-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Masukkan No Telp Vendor Yang Dapat dihubungi"
                value={formData.noVendor}
                onChange={handleChange}
                name="noVendor"
              />
            </div>
          </div>

          {/* File Inputs */}
          <p className="text-sm font-medium tracking-wide text-blue-600 underline decoration-blue-400 decoration-2 underline-offset-4 sm:text-base">
            Untuk File Mohon Di Upload Ulang
          </p>

          <div className="flex justify-center space-x-4">
            <div className="animate-slide-in-left w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Upload Foto Pelatihan Anda{" "}
              </label>
              <div className="flex w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-6 transition-all hover:bg-gray-100 hover:shadow-md">
                <input
                  type="file"
                  className="hidden"
                  id="foto_pelatihan"
                  ref={fotoPelatihanRef}
                  onChange={(e) => handleFileChange(e, "fotoPelatihan")}
                />
                <label
                  htmlFor="foto_pelatihan"
                  className="cursor-pointer text-center"
                >
                  <span className="font-semibold text-indigo-600">
                    Upload a file
                  </span>{" "}
                  or drag and drop
                  <p className="mt-2 text-xs text-gray-500">
                    {" "}
                    PDF Only up to 10MB
                  </p>
                  {fileNames.fotoPelatihan && (
                    <p className="mt-2 text-sm text-green-600">
                      {fileNames.fotoPelatihan}
                    </p>
                  )}
                </label>
              </div>
            </div>
            <div className="animate-slide-in-right w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Upload Struk Pembelian
              </label>
              <div className="flex w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-6 transition-all hover:bg-gray-100 hover:shadow-md">
                <input
                  type="file"
                  className="hidden"
                  id="foto_struk"
                  ref={strukRef}
                  onChange={(e) => handleFileChange(e, "struk")}
                />
                <label
                  htmlFor="foto_struk"
                  className="cursor-pointer text-center"
                >
                  <span className="font-semibold text-indigo-600">
                    Upload a file
                  </span>{" "}
                  or drag and drop
                  <p className="mt-2 text-xs text-gray-500">
                    {" "}
                    PDF Only up to 10MB
                  </p>
                  {fileNames.struk && (
                    <p className="mt-2 text-sm text-green-600">
                      {fileNames.struk}
                    </p>
                  )}
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <div className="animate-slide-in-left w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Upload Materi Pembelajaran Dalam 1 File
              </label>
              <div className="flex w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-6 transition-all hover:bg-gray-100 hover:shadow-md">
                <input
                  type="file"
                  className="hidden"
                  id="file_materi"
                  ref={materiRef}
                  onChange={(e) => handleFileChange(e, "materi")}
                />
                <label
                  htmlFor="file_materi"
                  className="cursor-pointer text-center"
                >
                  <span className="font-semibold text-indigo-600">
                    Upload a file
                  </span>{" "}
                  or drag and drop
                  <p className="mt-2 text-xs text-gray-500">
                    PDF Only up to 10MB
                  </p>
                  {fileNames.materi && (
                    <p className="mt-2 text-sm text-green-600">
                      {fileNames.materi}
                    </p>
                  )}
                </label>
              </div>
            </div>

            <div className="animate-slide-in-left w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Upload Sertifikat
              </label>
              <div className="flex w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-6 transition-all hover:bg-gray-100 hover:shadow-md">
                <input
                  type="file"
                  className="hidden"
                  id="file_sertifikat"
                  ref={sertifikatRef}
                  onChange={(e) => handleFileChange(e, "sertifikat")}
                />
                <label
                  htmlFor="file_sertifikat"
                  className="cursor-pointer text-center"
                >
                  <span className="font-semibold text-indigo-600">
                    Upload a file
                  </span>{" "}
                  or drag and drop
                  <p className="mt-2 text-xs text-gray-500">
                    {" "}
                    PDF Only up to 10MB
                  </p>
                  {fileNames.sertifikat && (
                    <p className="mt-2 text-sm text-green-600">
                      {fileNames.sertifikat}
                    </p>
                  )}
                </label>
              </div>
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
    </>
  );
};
