import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DetailEvaluasiTraining1Component from "@/components/Layouts/Detail/DetailEvaluasition1";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";

export const metadata = {
  title: "PALAPA | Detail Evaluasi Level 1 Pelatihan",
  description:
    "Informasi lengkap Detail Jawaban Evaluasi Level 1 Pelatihan yang telah diikuti karyawam di PALAPA (PALMCO After Learning Application). Akses dan kelola informasi anggaran pelatihan, evaluasi, dan pengembangan karyawan dengan mudah dan efisien.",
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

export default function EditEvaluasiTraining1Page() {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <Breadcrumb/>
        <DetailEvaluasiTraining1Component />
      </DefaultLayout>
    </ProtectedRoute>
  );
}
