import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import ExportDataBudget from "@/components/Tables/ExportDataBudget";

export const metadata = {
    title: "N4TALENT |Export Anggaran",
    description: "Export Data Anggaran berdasarkan tahun anggaran",
    keywords:
      "PTPN4, anggaran RKAP, detail data anggaran, manajemen keuangan, pelatihan karyawan, pengembangan kompetensi",
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