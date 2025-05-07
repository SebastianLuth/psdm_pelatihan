import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { ImplementationInovationPAComponent } from "../../components/users/AnswerPAImplementasiComponent";

const ImplementationInovationPAPage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <Breadcrumb />
        <ImplementationInovationPAComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default ImplementationInovationPAPage;
