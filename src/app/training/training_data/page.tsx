import DefaultLayout from "@/components/Layouts/DefaultLayout"
import ProtectedRoute from "@/components/ProtectedRoute"
import TableDataTraingin from "@/components/Tables/TableDataTraingin"

const TrainingDataPage = () => {
    return (
        <ProtectedRoute allowedRoles={['admin']}>
        <DefaultLayout>
            <TableDataTraingin/>
        </DefaultLayout>
        </ProtectedRoute>
    )
}

export default TrainingDataPage