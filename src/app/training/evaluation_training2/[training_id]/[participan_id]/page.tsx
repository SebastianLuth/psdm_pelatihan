import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import Evaluasi3TrainingComponent from "@/components/Layouts/Detail/AnswerQuestionEvaluasi3";

export const metadata = {
  title: "N4TALENT | Jawab Evaluasi 3",
  description:
    "Jawab Evaluasi Level 3 untuk para user yang mengikuti pelatihan",
  keywords:
    "PTPN4, anggaran RKAP, detail data anggaran, manajemen keuangan, pelatihan karyawan, pengembangan kompetensi",
};

const Evaluasia3TrainingPage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <Evaluasi3TrainingComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default Evaluasia3TrainingPage;
