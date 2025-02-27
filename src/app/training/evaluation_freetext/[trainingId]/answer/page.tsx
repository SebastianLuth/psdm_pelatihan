import DefaultLayout from "@/components/Layouts/DefaultLayout";
import FreeTextDetailComponent from "@/components/Layouts/Detail/AnswerFreetextByUser";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "N4TALENT | Answer Evaluasi Free Text Pelatihan",
  description: "Answer data free text pelatihan yang telah diikuti oleh user atau peserta",
  keywords:
    "PTPN4, anggaran RKAP, detail data anggaran, manajemen keuangan, pelatihan karyawan, pengembangan kompetensi",
};


const FreeTextDetailPage: React.FC = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
       <FreeTextDetailComponent/>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default FreeTextDetailPage;
