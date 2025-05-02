import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import EvaluastionFreeTextComponent from "@/components/Tables/TableDataEvaluasiFreeText";

export const metadata = {
  title: "PALAPA | Evaluasi Feedback Pelatihan",
  description:
    "Kumpulan data pelatihan yang telah diikuti untuk melakukan free text di PALAPA (PALMCO After Learning Application). Akses dan kelola informasi anggaran pelatihan, evaluasi, dan pengembangan karyawan dengan mudah dan efisien.",
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

const EvaluastionFreeTextPage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <Breadcrumb/>
        <EvaluastionFreeTextComponent/>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default EvaluastionFreeTextPage;
