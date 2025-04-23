'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { CreateJobOrientedModal } from "@/components/Modal/CreateJobOrientedModal";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Building } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const JobOrientationPage = () => {
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => {
        setShowModal(false);
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
            className="text-sm font-semibold text-blue-500">
              Kerjakan
            </button>
          </div>

          {showModal && (
            <>
              <CreateJobOrientedModal 
              onClose={handleCloseModal} />
            </>
          )}
        </div>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default JobOrientationPage;
