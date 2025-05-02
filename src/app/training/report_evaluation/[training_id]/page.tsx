"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState } from "react";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;


const EvaluationDetailReportTrainingPage = () => {
  const { userData } = useAuth();
  const { training_id } = useParams();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleUploadReportEvaluation = async () => {
    if (!selectedFile) {
      setError("Silakan pilih file sebelum mengupload.");
      return;
    }

    try {
      setUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append("report_evaluation", selectedFile);

      await axios.post(
        `${baseUrl}/api/evaluation/uploadPdf/${training_id}/:${userData?.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      alert("File berhasil diupload!");
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat mengupload file. Silakan coba lagi.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.type !== "application/pdf") {
      setError("Hanya file PDF yang diperbolehkan.");
      setSelectedFile(null);
    } else {
      setError(null);
      setSelectedFile(file);
    }
  };

  return (
    <ProtectedRoute>
      <DefaultLayout>
        {userData?.role === "user" && (
          <>
            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">
                Evaluasi Laporan Pelatihan
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Upload Evaluasi yang anda miliki di form dibawah ini!
              </p>
                </div>
                <h1 className="text-lg font-semibold dark:text-white text-blue-500	">Download Template terlebih dahulu</h1>
              </div>
             
              <div className="flex flex-col">
                <div className="mb-5 mt-5 flex w-full items-center justify-center p-8">
                  <label
                    htmlFor="dropzone-file"
                    className={`flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed ${
                      selectedFile
                        ? "border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-blue-700"
                        : "border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-800"
                    }`}
                  >
                    {!selectedFile ? (
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
                          <span className="font-semibold">
                            Click untuk upload
                          </span>{" "}
                          atau drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Hanya Menerima PDF
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <svg
                          className="mb-4 h-8 w-8 text-blue-500 dark:text-blue-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-blue-600 dark:text-blue-400">
                          File siap diupload:{" "}
                          <span className="font-semibold">
                            {selectedFile.name}
                          </span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Klik untuk mengganti file
                        </p>
                      </div>
                    )}
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <div className="mb-2 flex w-full justify-end">
                  <button
                    onClick={handleUploadReportEvaluation}
                    disabled={!selectedFile || uploading}
                    className={`mt-2 px-4 py-2 text-white ${
                      uploading
                        ? "cursor-not-allowed bg-gray-400"
                        : "bg-blue-600 hover:bg-blue-700"
                    } rounded`}
                  >
                    {uploading ? "Uploading..." : "Upload File"}
                  </button>
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-500 dark:text-red-400">
                    {error}
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default EvaluationDetailReportTrainingPage;
