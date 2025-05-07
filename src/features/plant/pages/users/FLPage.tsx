import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { FieldLearningComponent } from "../../components/users/FLComponent";
const FieldLearningPage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <Breadcrumb />
        <FieldLearningComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default FieldLearningPage;
