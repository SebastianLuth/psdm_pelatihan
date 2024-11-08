import DefaultLayout from "@/components/Layouts/DefaultLayout"
import ProtectedRoute from "@/components/ProtectedRoute"
import TableEvaluationTraining2 from "@/components/Tables/TableEvaluationTraining2"

const Training2Page = () => {
    return (
        <>
        <ProtectedRoute>
        <DefaultLayout>
            <TableEvaluationTraining2/>
        </DefaultLayout>
        </ProtectedRoute>
        </>
        
    )
}

export default Training2Page