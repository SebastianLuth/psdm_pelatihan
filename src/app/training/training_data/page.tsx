import DefaultLayout from "@/components/Layouts/DefaultLayout"
import ProtectedRoute from "@/components/ProtectedRoute"
import TableDataTraingin from "@/components/Tables/TableDataTraingin"

export const metadata = {
    title: "N4TALENT | Data Pelatihan",
    description: "Kumpulan Data Pelatihan ",
    keywords: "PTPN4, anggaran RKAP, detail data anggaran, manajemen keuangan, pelatihan karyawan, pengembangan kompetensi",
}
const TrainingDataPage = () => {
    return (
        <ProtectedRoute allowedRoles={['admin', 'super admin']}>
        <DefaultLayout>
            <TableDataTraingin/>
        </DefaultLayout>
        </ProtectedRoute>
    )
}

export default TrainingDataPage