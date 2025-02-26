import UpdateTrainingComponent from "@/components/FormElements/FormUpdateTraining";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "N4TALENT | Detail Data Pelatihan",
  description: "Edit Data Pelatihan ",
  keywords:
    "PTPN4, anggaran RKAP, detail data anggaran, manajemen keuangan, pelatihan karyawan, pengembangan kompetensi",
};

export default function TrainingDataId() {
  return (
    <ProtectedRoute allowedRoles={["admin", "super admin"]}>
      <DefaultLayout>
        <UpdateTrainingComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
}
