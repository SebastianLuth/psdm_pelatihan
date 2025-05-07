import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { IdeInovationPAComponent } from "../../components/users/AnswerPAIdeComponent";

const IdeInovationPAPage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <Breadcrumb />
        <IdeInovationPAComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default IdeInovationPAPage;
