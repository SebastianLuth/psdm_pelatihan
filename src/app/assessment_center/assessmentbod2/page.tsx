import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import TableAssessmentBod2 from "@/components/Tables/TableAssessmentBod2";

const AssessmentBOD2Page = () => {
    return (
        <ProtectedRoute>
        <DefaultLayout>
            <TableAssessmentBod2/>
        </DefaultLayout>
        </ProtectedRoute>
    )
};

export default AssessmentBOD2Page;