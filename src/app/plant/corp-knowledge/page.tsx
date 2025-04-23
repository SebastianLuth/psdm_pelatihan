import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Bookmark, BookmarkCheck, Building, Dumbbell, FoldersIcon, Gavel, MapPinCheck, UserCheck, UserCog2 } from "lucide-react";
import Link from "next/link";

const CORPKnowledgePage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <h4 className="p-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Corporate Knowledge Learnning
            </h4>
            <Breadcrumb />
          </div>
          <p className="p-4 text-gray-600 dark:text-gray-400 text-sm">Ini Halaman untuk menilai kemampuan karyawan pimpinan, Segera isi semua nya</p>
        </div>
        

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                <Dumbbell/>
              </div>
              <p className="text-sm font-medium text-gray-800">
                Corporate Knowledge Learning Bintalfisdis
              </p>
            </div>
            <Link href={"#"} className="text-sm font-semibold text-blue-500">Kerjakan</Link>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-2 text-blue-600">
               <Building/>
              </div>
              <p className="text-sm font-medium text-gray-800">
                Corporate Knowledge Learnning Holding
              </p>
            </div>
            <Link href={"#"} className="text-sm font-semibold text-blue-500">Kerjakan</Link>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                <Gavel/>
              </div>
              <p className="text-sm font-medium text-gray-800">
                Corporate Knoledge Learnning Direksi
              </p>
            </div>
            <Link href={"#"} className="text-sm font-semibold text-blue-500">Kerjakan</Link>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-2 text-blue-600">
               <FoldersIcon/> 
              </div>
              <p className="text-sm font-medium text-gray-800">
                Corporate Knowledge Learning Direktorat
              </p>
            </div>
            <Link href={"#"} className="text-sm font-semibold text-blue-500">Kerjakan</Link>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                <UserCheck/>
              </div>
              <p className="text-sm font-medium text-gray-800">
                Corporate Knowledge Learnning Kepemimpinan
              </p>
            </div>
            <Link href={"#"} className="text-sm font-semibold text-blue-500">Kerjakan</Link>
          </div>

          

          <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                <BookmarkCheck/>
              </div>
              <p className="text-sm font-medium text-gray-800">
                Corporate Knowledge Learning Bidang Tugas
              </p>
            </div>
            <Link href={"#"} className="text-sm font-semibold text-blue-500">Kerjakan</Link>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-2 text-blue-600">
               <MapPinCheck/>
              </div>
              <p className="text-sm font-medium text-gray-800">
                Corporate Knowledge Learning Studi Lapangan
              </p>
            </div>
            <Link href={"#"} className="text-sm font-semibold text-blue-500">Kerjakan</Link>
          </div>
        </div>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default CORPKnowledgePage;
