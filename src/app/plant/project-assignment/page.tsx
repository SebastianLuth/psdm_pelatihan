import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Building, Dumbbell, Lightbulb } from "lucide-react";
import Link from "next/link";

const ProjectAssigmentPage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <h4 className="p-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Project Assignment
            </h4>
            <Breadcrumb />
          </div>
          <p className="p-4 text-sm text-gray-600 dark:text-gray-400">
            Ini Halaman untuk menilai kemampuan karyawan pimpinan terhadap field
            learning, Segera isi semua nya
          </p>
          {/* Next Content */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                  <Lightbulb />
                </div>
                <p className="text-sm font-medium text-gray-800">
                  Ide Inovasi
                </p>
              </div>
              <Link href={"#"} className="text-sm font-semibold text-blue-500">
                Kerjakan
              </Link>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                  <Building />
                </div>
                <p className="text-sm font-medium text-gray-800">
                  Implementasi Inovasi
                </p>
              </div>
              <Link href={"#"} className="text-sm font-semibold text-blue-500">
                Kerjakan
              </Link>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default ProjectAssigmentPage;
