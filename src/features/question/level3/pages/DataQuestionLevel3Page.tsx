import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import DataQuestionEvaluationLevel3Component from "../components/Question3Component";

const DataQuestionEvaluationLevel3Page = () => {
  return (
    <ProtectedRoute allowedRoles={["super admin"]}>
      <DefaultLayout>
        <DataQuestionEvaluationLevel3Component />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default DataQuestionEvaluationLevel3Page;
