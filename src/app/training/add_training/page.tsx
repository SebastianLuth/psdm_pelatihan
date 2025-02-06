import FormAddTraining from "@/components/FormElements/FormAddTraining"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import ProtectedRoute from "@/components/ProtectedRoute"

export const metadata = {
    title: "N4TALENT | Tambah Pelatihan",
    description: "Tambah Pelatihan RKAP",
    keywords: "PTPN4, anggaran RKAP, detail data anggaran, manajemen keuangan, pelatihan karyawan, pengembangan kompetensi",
}

const AddTrainingPage = () => {
    return (
        <ProtectedRoute allowedRoles={['admin', 'super admin']}>
        <DefaultLayout>
            <FormAddTraining/>
        </DefaultLayout>
        </ProtectedRoute>
    )
}
export default AddTrainingPage