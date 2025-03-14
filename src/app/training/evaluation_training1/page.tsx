import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import TableEvaluationTraining1 from "@/components/Tables/TableEvaluationTraining1";

export const metadata = {
  title: "PALAPA | Data Evaluasi Level 1",
  description:
    "Kumpulan Data Evaluasi Pelatihan Level 1 di PALAPA (PALMCO After Learning Application). Akses dan kelola informasi anggaran pelatihan, evaluasi, dan pengembangan karyawan dengan mudah dan efisien.",
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

const Training1Page = () => {
  return (
    <>
      <ProtectedRoute >
        <DefaultLayout>
          <TableEvaluationTraining1 />
        </DefaultLayout>
      </ProtectedRoute>
    </>
  );
};

export default Training1Page;
