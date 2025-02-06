import TrainingDataIdComponent from "@/components/Layouts/Detail/DetailTraining";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "N4TALENT | Detail Data Pelatihan",
  description: "Detail Data Pelatihan ",
  keywords:
    "PTPN4, anggaran RKAP, detail data anggaran, manajemen keuangan, pelatihan karyawan, pengembangan kompetensi",
};

export default function TrainingDataId() {
  return (
    <ProtectedRoute allowedRoles={["admin", "super admin"]}>
      <DefaultLayout>
        <TrainingDataIdComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
}
