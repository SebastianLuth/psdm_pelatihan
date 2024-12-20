import DefaultLayout from "@/components/Layouts/DefaultLayout";
import QuestionComponent from "@/components/Layouts/QuestionComponent";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "N4TALENT | Pertanyaan Evaluasi level 1",
  description: "Kumpulan Pertanyaan Evaluasi level 1",
  keywords:
    "PTPN4, anggaran RKAP, detail data anggaran, manajemen keuangan, pelatihan karyawan, pengembangan kompetensi",
};

const QuestionPage = () => {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DefaultLayout>
        <QuestionComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default QuestionPage;
