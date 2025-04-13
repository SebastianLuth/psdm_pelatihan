import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import UpdateTrainingComponent from "@/components/FormElements/FormUpdateTraining";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "PALAPA | Edit Data Pelatihan",
  description:
    "Kumpulan Edit Data Pelatihan di PALAPA (PALMCO After Learning Application). Akses dan kelola informasi anggaran pelatihan, evaluasi, dan pengembangan karyawan dengan mudah dan efisien.",
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



export default function TrainingDataId() {
  return (
    <ProtectedRoute allowedRoles={["admin", "super admin"]}>
      <DefaultLayout>
        <Breadcrumb/>
        <UpdateTrainingComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
}
