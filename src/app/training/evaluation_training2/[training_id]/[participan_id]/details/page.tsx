import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DetailEvaluation3Component from "@/components/Layouts/Detail/DetailEvaluation3";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "N4TALENT |Detail Evaluasi lv3 User",
  desription:
    "Detail evaluasi pelatihan level 1. Kumpulan dimana hasil dari jawaban dari user yang mengikuti pelatihan",
  keywords:
    "PTPN4, anggaran RKAP, detail data anggaran, manajemen keuangan, pelatihan karyawan, pengembangan kompetensi",
};

const DetailEvaluation3Page = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <Breadcrumb/>
        <DetailEvaluation3Component />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default DetailEvaluation3Page;
