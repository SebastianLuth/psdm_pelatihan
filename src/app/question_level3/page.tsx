import DefaultLayout from "@/components/Layouts/DefaultLayout";
import QuestionEvaluationLevel3Component from "@/components/Layouts/Question3Component";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "N4TALENT |Kumpulan Pertanyaan Evaluasi level 1",
  description: "Kumpulan Pertanyaan Evaluasi level 1",
  keywords:
    "PTPN4, anggaran RKAP, detail data anggaran, manajemen keuangan, pelatihan karyawan, pengembangan kompetensi",
};

const QuestionEvaluationLevel3Page = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <QuestionEvaluationLevel3Component />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default QuestionEvaluationLevel3Page;
