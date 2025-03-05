import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DetailUsersEvaluation3Status from "@/components/Layouts/Detail/DetailUsersEvaluation3Status";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "N4TALENT | Detail Evaluasi Pelatihan Lv 3",
  description:
    "Detail Evaluasi Level 3 untuk para user yang mengikuti pelatihan dan evaluator yang mengevaluasi user",
  keywords:
    "PTPN4, anggaran RKAP, detail data anggaran, manajemen keuangan, pelatihan karyawan, pengembangan kompetensi",
};


const EvaluasiTraining1Page = () => {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DefaultLayout>
        <DetailUsersEvaluation3Status/>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default EvaluasiTraining1Page;
