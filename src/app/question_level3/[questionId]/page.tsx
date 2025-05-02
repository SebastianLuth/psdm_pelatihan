import QuestionEvaluationLevel3DetailComponent from "@/components/Layouts/Detail/DetailQuestionLevel3";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";

export const metadata = {
  title: "PALAPA | Edit Pertanyaan Evaluasi level 3",
  description: "Informasi lengkap tentang  Pertanyaan Evaluasi level 3 yang telah anda buat di PALAPA PALMCO AFTER LEARNING APPLICATION ",
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
  robots: "index, follow",
};

const QuestionEvaluationLevel3DetailPage = () => {
  return (
    <ProtectedRoute allowedRoles={["super admin"]}>
      <DefaultLayout>
        <QuestionEvaluationLevel3DetailComponent/>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default QuestionEvaluationLevel3DetailPage;
