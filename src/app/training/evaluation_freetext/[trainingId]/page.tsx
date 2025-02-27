import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DetailUsersEvaluationFreetextStatus from "@/components/Layouts/Detail/DetailUsersEvaluationFreetextStatus";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "N4TALENT | Jawab Evaluasi Pelatihan Lv 1",
  description:
    "Jawab Evaluasi Level 1 untuk para user yang mengikuti pelatihan",
  keywords:
    "PTPN4, anggaran RKAP, detail data anggaran, manajemen keuangan, pelatihan karyawan, pengembangan kompetensi",
};


const EvaluasiTraining1Page = () => {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DefaultLayout>
        <DetailUsersEvaluationFreetextStatus/>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default EvaluasiTraining1Page;
