import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import ExportDataBudget from "@/components/Tables/ExportDataBudget";
export const metadata = {
    title: "PALAPA | Export RKAP Anggaran ",
    description: "Export data RKAP (Rencana Kerja dan Anggaran Perusahaan) di PALAPA (PALMCO After Learning Application). Akses dan kelola informasi anggaran pelatihan, evaluasi, dan pengembangan karyawan dengan mudah dan efisien.",
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

const AssessmentReportPage = () => {
    return (
        <>
            <ProtectedRoute allowedRoles={['admin', 'super admin']}>
                <DefaultLayout>
                    <ExportDataBudget/>
                </DefaultLayout>
            </ProtectedRoute>
        </>
    );
};

export default AssessmentReportPage;