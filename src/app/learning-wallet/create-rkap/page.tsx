'use client';
import { useState } from "react";
import * as XLSX from "xlsx";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const CreateRKAPLearningWalletPage = () => {
    const [file, setFile] = useState(null); // State untuk menyimpan file
    const [fileName, setFileName] = useState(""); // State untuk menyimpan nama file
    const router = useRouter();

    // Fungsi untuk menangani perubahan file yang diunggah
    const handleFileChange = (event : any) => {
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
        window.open(`${baseUrl}/api/learning-wallet/download-template`, "_blank");
    }

    // Fungsi untuk mengunggah file dan mengirim data ke API
    const handleUpload = async () => {
        if (!file) {
            alert("Silakan pilih file terlebih dahulu!");
            return;
        }

        const reader = new FileReader();
        reader.onload = async (e : any) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0]; // Ambil sheet pertama
            const worksheet = workbook.Sheets[sheetName];

            // Parse Excel ke JSON
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            // Transformed Data
            const transformedData = jsonData.map((item : any) => ({
                username: item["NIKSAP"], 
                nama: item["Nama"], 
                biaya_rkap_lw: item["RKAP Biaya Learning Wallet"], 
                rkap_jpl: item["RKAP Jam Pembelajaran Learning Wallet"], 
                rkap_tahun: item["Rkap Tahun"],
            }));


            // Kirim JSON ke API
            try {
                const response = await axios.post(`${baseUrl}/api/learning-wallet/admin/rkaplw`, transformedData , {
                        withCredentials: true
                    });

                if (response.status === 200 || 201) {
                    await Swal.fire({
                            title: "Success!",
                            text: "Berhasil Menambahkan Anggaran",
                            icon: "success",
                            confirmButtonText: "OK",
                    });
                    router.replace("/learning-wallet/create-rkap");
                } else {
                    alert("Gagal mengirim data ke API.");
                }
            } catch (error) {
                alert("Terjadi kesalahan saat mengirim data ke API.");
            }
        };

        reader.readAsBinaryString(file); // Baca file sebagai binary string
    };

    return (
        <ProtectedRoute>
            <DefaultLayout>
                <Breadcrumb />
                <div className="w-full h-auto p-5 bg-white from-indigo-500 to-purple-600 rounded-lg shadow-lg dark:bg-gray-800">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Tambahkan RKAP Learning Wallet
                        </h1>
                        <button
                        onClick={handleDowloadTemplate}
                        type="button"
                        className="flex items-center gap-2 px-4 py-2 text-white text-sm text-bold bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition">
                            <svg
                                className="w-5 h-5"
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
                    <div className="flex items-center justify-center w-full mt-5">
                        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
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
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">XLSX (Excel file)</p>
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
                        <div className="flex items-center justify-between mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100 shadow-sm">
                            <span className="text-sm text-indigo-700 font-medium">{fileName}</span>
                            <button
                                onClick={handleRemoveFile}
                                className="text-red-500 hover:text-red-700 hover:bg-red-100 p-1 rounded-full transition-colors duration-200"
                            >
                                <svg
                                    className="w-5 h-5"
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
                    <div className="flex justify-end mt-10">
                        <button
                            className="flex items-center gap-2 px-4 py-2 text-white text-sm text-bold bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition"
                            onClick={handleUpload}
                        >
                            Upload File
                            <svg
                                className="w-8 h-8 mb-4 text-gray-500"
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
            </DefaultLayout>
        </ProtectedRoute>
    );
};

export default CreateRKAPLearningWalletPage;