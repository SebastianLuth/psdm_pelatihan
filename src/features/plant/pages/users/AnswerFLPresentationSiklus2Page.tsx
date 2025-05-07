import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { Siklus2PresentationFLComponent } from "../../components/users/AnswerFLPresentationSiklus2Component";

const Siklus2PresentationFLPage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <Breadcrumb />
        <Siklus2PresentationFLComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default Siklus2PresentationFLPage;
