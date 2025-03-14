import DefaultLayout from "@/components/Layouts/DefaultLayout"
import ProtectedRoute from "@/components/ProtectedRoute"
import TableReportEvaluation1 from "@/components/Tables/TableReportEvaluation1"

export const metadata = {
    title: "PALAPA | Export Data Evaluasi ",
    description: "Export Data Evaluasi (Evaluasi 1 & 3) di PALAPA (PALMCO After Learning Application). Akses dan kelola informasi anggaran pelatihan, evaluasi, dan pengembangan karyawan dengan mudah dan efisien.",
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

const Evaluation1Page = () => {
    return (
        <ProtectedRoute allowedRoles={['admin', 'super admin']}>
        <DefaultLayout>
            <TableReportEvaluation1/>
        </DefaultLayout>
        </ProtectedRoute>
    )
}

export default Evaluation1Page