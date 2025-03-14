import DefaultLayout from "@/components/Layouts/DefaultLayout";
import QuestionEvaluationLevel3Component from "@/components/Layouts/Question3Component";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "PALAPA | Kumpulan Pertanyaan Evaluasi level 3",
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

const QuestionEvaluationLevel3Page = () => {
  return (
    <ProtectedRoute allowedRoles={["super admin"]}>
      <DefaultLayout>
        <QuestionEvaluationLevel3Component />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default QuestionEvaluationLevel3Page;
