import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DetailUsersEvaluation3Status from "@/components/Layouts/Detail/DetailUsersEvaluation3Status";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "PALAPA | Detail Evaluasi Pelatihan Lv 3",
  description:
    "Detail Evaluasi Pelatihan Lv 3 di PALAPA (PALMCO After Learning Application). Akses dan kelola informasi anggaran pelatihan, evaluasi, dan pengembangan karyawan dengan mudah dan efisien.",
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
  robot : "index, follow",
};


const EvaluasiTraining1Page = () => {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DefaultLayout>
        <Breadcrumb/>
        <DetailUsersEvaluation3Status/>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default EvaluasiTraining1Page;
