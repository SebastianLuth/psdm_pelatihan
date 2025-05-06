"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { downloadTemplateRKAPLW, submitRKAPLearningWallet } from "@/service/learningWallet";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const AddRKAPLearningWalletComponent = () => {
  const [file, setFile] = useState(null); // State untuk menyimpan file
  const [fileName, setFileName] = useState(""); // State untuk menyimpan nama file
  const router = useRouter();

  // Fungsi untuk menangani perubahan file yang diunggah
  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name); // Simpan nama file
    }
  };

  // Fungsi untuk menghapus file yang dipilih
  const handleRemoveFile = () => {
    setFile(null);
    setFileName("");
  };

  const handleDowloadTemplate = () => {
       downloadTemplateRKAPLW();
  };

  // Fungsi untuk mengunggah file dan mengirim data ke API
  const handleUpload = async () => {
    try {
      await submitRKAPLearningWallet(file);
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Terjadi kesalahan saat Mengrimkan File.",
          confirmButtonText: "OK",
        })
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Terjadi kesalahan saat Mengrimkan File.",
          confirmButtonText: "OK",
        })
      }
    }
  };

  return (
        <div className="h-auto w-full rounded-lg bg-white from-indigo-500 to-purple-600 p-5 shadow-lg dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Tambahkan RKAP Learning Wallet
            </h1>
            <button
              onClick={handleDowloadTemplate}
              type="button"
              className="text-bold flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white shadow-md transition hover:bg-indigo-700"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 2H14l4 4v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
                />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              Download Template
            </button>
          </div>

          {/* Area Unggah File */}
          <div className="mt-5 flex w-full items-center justify-center">
            <label className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 dark:hover:bg-gray-800">
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <svg
                  className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  XLSX (Excel file)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".xlsx"
              />
            </label>
          </div>

          {/* Menampilkan Nama File dan Tombol "X" */}
          {fileName && (
            <div className="mt-4 flex items-center justify-between rounded-lg border border-indigo-100 bg-indigo-50 p-3 shadow-sm">
              <span className="text-sm font-medium text-indigo-700">
                {fileName}
              </span>
              <button
                onClick={handleRemoveFile}
                className="rounded-full p-1 text-red-500 transition-colors duration-200 hover:bg-red-100 hover:text-red-700"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Tombol Upload */}
          <div className="mt-10 flex justify-end">
            <button
              className="text-bold flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white shadow-md transition hover:bg-indigo-700"
              onClick={handleUpload}
            >
              Upload File
              <svg
                className="mb-4 h-8 w-8 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16V8M16 12l-4-4-4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
                />
              </svg>
            </button>
          </div>
        </div>
  );
};
