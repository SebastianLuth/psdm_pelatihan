import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import AssessmentReport from "@/components/Tables/AssesmentReport";

const AssessmentReportPage = () => {
    return (
        <>
            <ProtectedRoute allowedRoles={['admin']}>
            <DefaultLayout>
                <AssessmentReport/>
            </DefaultLayout>
            </ProtectedRoute>
        </>
    );
};

export default AssessmentReportPage;