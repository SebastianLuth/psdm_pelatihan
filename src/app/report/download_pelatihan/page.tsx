import DefaultLayout from "@/components/Layouts/DefaultLayout"
import ProtectedRoute from "@/components/ProtectedRoute"
import TableReportEvaluation2 from "@/components/Tables/TableReportEvaluation2"

export const metadata = {
    title: "N4TALENT |Export Data Pelatihan",
    description: "Export Semua Data Pelatihan berdasarkan tanggal",
    keywords:
      "PTPN4, anggaran RKAP, detail data anggaran, manajemen keuangan, pelatihan karyawan, pengembangan kompetensi",
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