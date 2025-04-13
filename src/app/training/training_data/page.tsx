import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import TableDataTraingin from "@/components/Tables/TableDataTraingin";

export const metadata = {
  title: "PALAPA | Data Pelatihan",
  description:
    "Kumpulan  Data Pelatihan di PALAPA (PALMCO After Learning Application). Akses dan kelola informasi anggaran pelatihan, evaluasi, dan pengembangan karyawan dengan mudah dan efisien.",
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

const TrainingDataPage = () => {
  return (
    <ProtectedRoute allowedRoles={["admin", "super admin"]}>
      <DefaultLayout>
        <Breadcrumb />
        <TableDataTraingin />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default TrainingDataPage;
