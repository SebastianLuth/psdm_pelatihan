import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DetailFreeTextFromUserComponent from "@/components/Layouts/Detail/DetailAnswerFreeTextUser";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "N4TALENT | Detail Evaluasi Free Text Pelatihan",
  description: "Detail data free text pelatihan yang telah diikuti oleh user atau peserta",
  keywords:
    "PTPN4, anggaran RKAP, detail data anggaran, manajemen keuangan, pelatihan karyawan, pengembangan kompetensi",
};

const DetailFreeTextFromUserPage = () => {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DefaultLayout>
       <DetailFreeTextFromUserComponent/>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default DetailFreeTextFromUserPage;
