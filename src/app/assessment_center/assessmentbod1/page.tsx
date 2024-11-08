import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import TableAssessmentBod1 from "@/components/Tables/TableAssessmentBod1";

const AssessmentBOD1Page = () => {
    return (
        <ProtectedRoute allowedRoles={['admin']}>
        <DefaultLayout>
            <TableAssessmentBod1/>
        </DefaultLayout>
        </ProtectedRoute>
    )
};

export default AssessmentBOD1Page;