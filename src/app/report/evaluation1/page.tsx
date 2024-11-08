import DefaultLayout from "@/components/Layouts/DefaultLayout"
import ProtectedRoute from "@/components/ProtectedRoute"
import TableReportEvaluation1 from "@/components/Tables/TableReportEvaluation1"

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