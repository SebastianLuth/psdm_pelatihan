import DefaultLayout from "@/components/Layouts/DefaultLayout";
import QuestionComponent from "@/components/Layouts/QuestionComponent";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "PALAPA | Pertanyaan Evaluasi level 1",
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

const QuestionPage = () => {
  return (
    <ProtectedRoute allowedRoles={["super admin"]}>
      <DefaultLayout>
        <QuestionComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default QuestionPage;
