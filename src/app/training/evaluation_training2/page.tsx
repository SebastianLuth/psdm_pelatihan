import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import TableEvaluationTraining2 from "@/components/Tables/TableEvaluationTraining2";

export const metadata = {
  title: "PALAPA | Data Evaluasi Level 3",
  description:
    "Kumpulan Data Evaluasi Pelatihan Level 3 di PALAPA (PALMCO After Learning Application). Akses dan kelola informasi anggaran pelatihan, evaluasi, dan pengembangan karyawan dengan mudah dan efisien.",
  keywords: [
    "export RKAP anggaran PALAPA",
    "PALMCO After Learning Application",
    "RKAP pelatihan PALMCO",
    "aplikasi pembelajaran karyawan",
    "evaluasi PALMCO",
    "sistem pelatihan PALMCO",
    "manajemen anggaran pelatihan",
    "data RKAP PALMCO",
    "export data anggaran",
  ],
  author: "PTPN 4 PALMCO",
  robots: "index, follow",
};

const Training2Page = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <Breadcrumb/>
        <TableEvaluationTraining2 />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default Training2Page;
