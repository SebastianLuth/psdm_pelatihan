import DepartmentDataIdComponent from "@/components/Layouts/Detail/DetailDepartmentData";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "PALAPA | Edit Detail Data Unit Kerja",
  description: "Edit detail data unit kerja di PALAPA PALMCO AFTER LEARNING APPLICATION ",
  keywords: [
    "PALAPA DATA RKAP Anggaran",
    "PALMCO After Learning Application",
    "RKAP pelatihan PALMCO",
    "aplikasi pembelajaran karyawan",
    "evaluasi PALMCO",
    "sistem pelatihan PALMCO",
    "Informasi lengkap anggaran"
  ],
  author : "PTPN 4 PALMCO",
  robots: "index, follow"
};

export default function DepartmentDataId() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DefaultLayout>
        <DepartmentDataIdComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
}
