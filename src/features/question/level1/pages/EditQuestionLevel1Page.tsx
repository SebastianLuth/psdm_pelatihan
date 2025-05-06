import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import EditQuestionLevel1ByIdComponent from "../components/EditQuestionLevel1ByIdComponent";

export const metadata = {
  title: "Edit Pertanyaan Evaluasi level 1 - PALAPA PTPN IV",
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

const EditQuestionLevel1ByIdPage = () => {
  return (
    <ProtectedRoute allowedRoles={["super admin"]}>
      <DefaultLayout>
        <EditQuestionLevel1ByIdComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default EditQuestionLevel1ByIdPage;
