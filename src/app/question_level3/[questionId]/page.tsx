import QuestionEvaluationLevel3DetailComponent from "@/components/Layouts/Detail/DetailQuestionLevel3";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "N4TALENT |Update Pertanyaan Evaluasi level 3",
  description: "Update Pertanyaan Evaluasi level 3",
  keywords:
    "PTPN4, anggaran RKAP, detail data anggaran, manajemen keuangan, pelatihan karyawan, pengembangan kompetensi",
};

const QuestionEvaluationLevel3DetailPage = () => {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DefaultLayout>
        <QuestionEvaluationLevel3DetailComponent/>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default QuestionEvaluationLevel3DetailPage;
