import DetailQuestionLevel1Component from "@/components/Detail/DetailQuestionLevel1";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "N4TALENT |Update Pertanyaan Evaluasi level 1",
  description: "Update Pertanyaan Evaluasi level 1",
  keywords:
    "PTPN4, anggaran RKAP, detail data anggaran, manajemen keuangan, pelatihan karyawan, pengembangan kompetensi",
};

const QuestionIdPage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <DetailQuestionLevel1Component />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default QuestionIdPage;
