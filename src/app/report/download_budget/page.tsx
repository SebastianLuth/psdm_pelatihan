import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import ExportDataBudget from "@/components/Tables/ExportDataBudget";

const AssessmentReportPage = () => {
    return (
        <>
            <ProtectedRoute allowedRoles={['admin']}>
            <DefaultLayout>
                <ExportDataBudget/>
            </DefaultLayout>
            </ProtectedRoute>
        </>
    );
};

export default AssessmentReportPage;