import DefaultLayout from "@/components/Layouts/DefaultLayout"
import ProtectedRoute from "@/components/ProtectedRoute"
import TableDataAnggaran from "@/components/Tables/TableDataAnggaran"

export const metadata = {
    title: "N4TALENT | Data Anggaran",
    description: "Lihat data anggaran RKAP PTPN4 terkini. Informasi lengkap mengenai anggaran karyawan pimpinan, pelatihan, dan pengembangan kompetensi karyawan di PTPN4.",
    keywords: "PTPN4, anggaran RKAP, data anggaran, manajemen keuangan, pelatihan karyawan, pengembangan kompetensi",
}

const DataBudgetPage = () => {
    return (
        <>
        <ProtectedRoute allowedRoles={['admin', 'super admin']}>
        <DefaultLayout>
            <TableDataAnggaran/>
        </DefaultLayout>
        </ProtectedRoute>
        </>
    )
}
export default DataBudgetPage