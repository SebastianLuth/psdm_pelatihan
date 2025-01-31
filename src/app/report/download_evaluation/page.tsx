import DefaultLayout from "@/components/Layouts/DefaultLayout"
import ProtectedRoute from "@/components/ProtectedRoute"
import TableReportEvaluation1 from "@/components/Tables/TableReportEvaluation1"

export const metadata = {
    title: "N4TALENT |Export Data Evaluasi",
    description: "Export Data Evaluasi level 1 dan level 3 berdasarkan tanggal ",
    keywords:
      "PTPN4, anggaran RKAP, detail data anggaran, manajemen keuangan, pelatihan karyawan, pengembangan kompetensi",
};

const Evaluation1Page = () => {
    return (
        <ProtectedRoute allowedRoles={['admin']}>
        <DefaultLayout>
            <TableReportEvaluation1/>
        </DefaultLayout>
        </ProtectedRoute>
    )
}

export default Evaluation1Page