import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DetailUsersEvaluationFreetextStatus from "@/components/Layouts/Detail/DetailUsersEvaluationFreetextStatus";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";

export const metadata = {
  title: "PALAPA | Detail Evaluasi Feedback Pelatihan",
  description:
    "Informasi lengkap Evaluasi Feedback Pelatihan yang telah diikuti setiap karyawam di PALAPA (PALMCO After Learning Application). Akses dan kelola informasi anggaran pelatihan, evaluasi, dan pengembangan karyawan dengan mudah dan efisien.",
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
        <DetailUsersEvaluationFreetextStatus/>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default EvaluasiTraining1Page;
