import DetailQuestionLevel1Component from "@/components/Layouts/Detail/DetailQuestionLevel1";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "PALAPA | Edit Pertanyaan Evaluasi level 1",
  description: "Informasi lengkap tentang  Pertanyaan Evaluasi level 1 yang telah anda buat di PALAPA PALMCO AFTER LEARNING APPLICATION ",
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

const QuestionIdPage = () => {
  return (
    <ProtectedRoute allowedRoles={["super admin"]}>
      <DefaultLayout>
        <DetailQuestionLevel1Component />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default QuestionIdPage;
