"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;


type skmbtType = {
  nama: string;
  niksap: string;
  jabatan : string; 
};

type skmbtTypeSubmit = {
  nama: string;
  niksap: string;
  jabatan : string; 
};

type SkmbtData = {
  id: number,
  nama: string,
  niksap: number,
  url_pdf_skmbt: string,
  company_id: number,
  company_nama: string,
  created_at: string,
  updated_at: string
}

const FormEditSKMBTKarpimPage = () => {
  const [skmbtData, setSkmbtData] = useState<SkmbtData | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [formData, setFormData] = useState<skmbtType>({
    nama: "",
    niksap: "",
    jabatan : "",
  });
  const [fileNames, setFileNames] = useState({
    pdf_skmbt: "",
    pdf_skmbt2: "",
  });
  const {userData} = useAuth();
  const skmbtId  = useParams().id;

  const getFile = (ref: React.RefObject<HTMLInputElement>) => {
    return ref.current?.files?.[0] || null;
  };
  const SkmbtRef = useRef<HTMLInputElement>(null);
  const SkmbtRef2 = useRef<HTMLInputElement>(null);

  const fetchDetailDataSKMBT = useCallback (async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/skmbt/karpim/admin/${skmbtId}`, {
        withCredentials: true,
      });
      const data = response.data.data[0];
      setSkmbtData(data);

      // Set juga ke formData
      setFormData({
        nama: data.nama || "",
        niksap: data.niksap?.toString() || "",
        jabatan : data.jabatan || "",
      });
    } catch (error) {
      Swal.fire("Gagal!", "Terjadi kesalahan saat mengambil data SKMBT.", "error");
    }
  },[skmbtId])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {

      const data = new FormData();

      const skmbt = getFile(SkmbtRef);
      if (skmbt) data.append("pdf_skmbt", skmbt);
      const skmbt2 = getFile(SkmbtRef2);
      if (skmbt2) data.append("pdf_skmbt2", skmbt2);

      data.append("nama", formData.nama);
      data.append("niksap", formData.niksap);
      data.append("jabatan", formData.jabatan);

      await axios.put(`${baseUrl}/api/skmbt/karpim/admin/${skmbtId}`, data,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      setSuccess(true);
      setFormData({
        nama: "",
        niksap: "",
        jabatan: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan saat mengirim data.",
      })
    }
  };

  // Fungsi untuk menangani perubahan file yang diunggah
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
  

  // Fungsi untuk menghapus file yang dipilih
  const handleRemoveFile = (key: keyof typeof fileNames) => {
    setFileNames((prev) => ({ ...prev, [key]: "" }));
  
    // Kosongkan input file juga dari referensinya
    if (key === "pdf_skmbt" && SkmbtRef.current) {
      SkmbtRef.current.value = "";
    }
    if (key === "pdf_skmbt2" && SkmbtRef2.current) {
      SkmbtRef2.current.value = "";
    }
  };

  useEffect(() => {
    fetchDetailDataSKMBT();
  }, [fetchDetailDataSKMBT]);

  return (
    <>
      <ProtectedRoute allowedRoles={["admin", "super admin"]}>
        <DefaultLayout>
          <div className="mb-8 flex justify-between border-b border-gray-200 pb-4 dark:border-gray-700">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                Edit Wasiat untuk KARPIM
              </h2>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                Lengkapi form berikut untuk Edit Wasiat untuk KARPIM
              </p>
            </div>
            <Breadcrumb />
          </div>
          <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-lg dark:border-strokedark dark:bg-boxdark">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Masukkan Nama Karyawan
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama ?? ""}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border border-gray-300 bg-gray-50 p-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Masukkan NIKSAP karyawan
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="niksap"
                  placeholder="4000215"
                  value={formData.niksap ?? ""}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border border-gray-300 bg-gray-50 p-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Masukkan Jabatan Karyawan
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="jabatan"
                  value={formData.jabatan ?? ""}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border border-gray-300 bg-gray-50 p-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  <span className="text-blue-500">Masukkan ulang file</span>
                  <span className="text-red-500">*</span>
                </label>
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
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PDF Only
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      ref={SkmbtRef}
                      onChange={(e) => handleFileChange(e, "pdf_skmbt")}
                      accept="application/pdf"
                    />
                  </label>
                </div>
                {fileNames.pdf_skmbt  && (
                  <>
                    <div className="mt-4 flex items-center justify-between rounded-lg border border-indigo-100 bg-indigo-50 p-3 shadow-sm">
                      <span className="text-sm font-medium text-indigo-700">
                        {fileNames.pdf_skmbt}
                      </span>
                      <button 
                      type="button"
                      onClick={() => handleRemoveFile("pdf_skmbt")}
                      className="rounded-full p-1 text-red-500 transition-colors duration-200 hover:bg-red-100 hover:text-red-700">
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
                    </>
                )}

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
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PDF Only
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      ref={SkmbtRef2}
                      onChange={(e) => handleFileChange(e, "pdf_skmbt2")}
                      accept="application/pdf"
                    />
                  </label>
                </div>

                {/* Menampilkan Nama File dan Tombol "X" */}
                {fileNames.pdf_skmbt2  && (
                  <>
                    <div className="mt-4 flex items-center justify-between rounded-lg border border-indigo-100 bg-indigo-50 p-3 shadow-sm">
                      <span className="text-sm font-medium text-indigo-700">
                        {fileNames.pdf_skmbt2}
                      </span>
                      <button 
                      type="button"
                      onClick={() => handleRemoveFile("pdf_skmbt2")}
                      className="rounded-full p-1 text-red-500 transition-colors duration-200 hover:bg-red-100 hover:text-red-700">
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
                  </>
                )}
              </div>

              <div className="mt-10 flex justify-end gap-4 border-t border-gray-200 pt-6 dark:border-gray-700">
                <button
                  type="button"
                  className="rounded-md border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Submit
                </button>
              </div>
            </form>

            {success && (
              <div className="mt-6 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                <p className="flex items-center text-green-700 dark:text-green-400">
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Sharing Knowledge MBT berhasil ditambahkan.{" "}
                  <a
                    href="/skmbt"
                    className="ml-1 font-medium text-blue-600 underline hover:text-blue-800 dark:text-blue-400"
                  >
                    Lihat daftar Sharing Knowledge MBT
                  </a>
                </p>
              </div>
            )}
          </div>
        </DefaultLayout>
      </ProtectedRoute>
    </>
  );
};

export default FormEditSKMBTKarpimPage;
