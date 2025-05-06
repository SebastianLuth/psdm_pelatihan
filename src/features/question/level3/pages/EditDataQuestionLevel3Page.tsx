import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import EditQuestionLevel3DetailComponent from "../components/EditQuestionLevel3";

const EditQuestionEvaluationLevel3DetailPage = () => {
  return (
    <ProtectedRoute allowedRoles={["super admin"]}>
      <DefaultLayout>
        <EditQuestionLevel3DetailComponent/>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default EditQuestionEvaluationLevel3DetailPage;
