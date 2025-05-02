import DefaultLayout from "@/components/Layouts/DefaultLayout"
import ProtectedRoute from "@/components/Layouts/ProtectedRoute"
import TableReportEvaluation2 from "@/components/Tables/TableReportEvaluation2"

export const metadata = {
    title: "PALAPA | Export Data Pelatihan ",
    description: "Export Data Pelatihan di PALAPA (PALMCO After Learning Application). Akses dan kelola informasi anggaran pelatihan, evaluasi, dan pengembangan karyawan dengan mudah dan efisien.",
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
    author : "PTPN 4 PALMCO",
    robots: "index, follow",
  };

const Evaluation2Page = () => {
    return (
        <ProtectedRoute allowedRoles={['admin', 'super admin']}>
        <DefaultLayout>
            <TableReportEvaluation2/>
        </DefaultLayout>
        </ProtectedRoute>
    )
}

export default Evaluation2Page