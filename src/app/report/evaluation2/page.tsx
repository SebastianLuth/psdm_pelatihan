import DefaultLayout from "@/components/Layouts/DefaultLayout"
import ProtectedRoute from "@/components/ProtectedRoute"
import TableReportEvaluation2 from "@/components/Tables/TableReportEvaluation2"

const Evaluation2Page = () => {
    return (
        <ProtectedRoute allowedRoles={['admin']}>
        <DefaultLayout>
            <TableReportEvaluation2/>
        </DefaultLayout>
        </ProtectedRoute>
    )
}

export default Evaluation2Page