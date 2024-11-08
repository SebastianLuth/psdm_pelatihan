import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import TableEvaluationTraining1 from "@/components/Tables/TableEvaluationTraining1";

const Training1Page = () => {
    return (
        <>
            <ProtectedRoute allowedRoles={['admin']}>
            <DefaultLayout>
                <TableEvaluationTraining1/>
            </DefaultLayout>
            </ProtectedRoute>
        </>
    );
};

export default Training1Page