"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { CreateJobOrientedModal } from "@/components/Modal/CreateJobOrientedModal";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { Building } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

const JobOrientationPage = () => {
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const { userData } = useAuth();
   
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        alert("Hanya file PDF yang diperbolehkan.");
        event.target.value = ""; // reset input file
        return;
      }
      setFile(selectedFile);
      setFileName(selectedFile.name); // Simpan nama file
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileName("");
  };

  const handleAddJobOrientation = async () => {
    if (!file) return;
  
    try {
      const formData = new FormData();
      formData.append("pdf_jo", file);
      formData.append("niksap", String(userData?.username)); 
  
      await axios.put(
        "http://localhost:8080/api/ckp/user/jo",
          formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      alert("File berhasil diunggah.");
      setFile(null);
      setFileName("");
      setShowModal(false);
    } catch (error) {
      setError("Terjadi kesalahan saat mengunggah Job Oriented.");
    }
  };
  

  return (
    <ProtectedRoute>
      <DefaultLayout>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <h4 className="p-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Job Oriented
            </h4>
            <Breadcrumb />
          </div>
          <p className="p-4 text-sm text-gray-600 dark:text-gray-400">
            Ini Halaman untuk menilai kemampuan karyawan pimpinan terhadap field
            learning, Segera isi semua nya
          </p>

          <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                <Building />
              </div>
              <p className="text-sm font-medium text-gray-800">
                Laporan Job Oriented
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="text-sm font-semibold text-blue-500"
            >
              Kerjakan
            </button>
          </div>

          {showModal && (
            <>
              <CreateJobOrientedModal
                onClose={handleCloseModal}
                onAddJobOriented={handleAddJobOrientation}
                onRemoveFile={handleRemoveFile}
                fileName={fileName}
                file={file}
                onFileChange={handleFileChange}
              />
            </>
          )}
        </div>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default JobOrientationPage;
