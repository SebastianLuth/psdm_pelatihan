import DepartmentDataIdComponent from "@/components/Detail/DetailDepartmentData";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "N4TALENT | Edit Detail Data Unit Kerja",
  description: "Edit detail data unit kerja RKAP PTPN4",
  keywords: "PTPN4, anggaran RKAP, detail data anggaran, manajemen keuangan, pelatihan karyawan, pengembangan kompetensi",
}

export default function DepartmentDataId() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DefaultLayout>
        <DepartmentDataIdComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
}
