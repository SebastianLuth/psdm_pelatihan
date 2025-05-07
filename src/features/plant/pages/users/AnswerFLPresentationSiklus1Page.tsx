import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { Siklus1PresentationFLComponent } from "../../components/users/AnswerFLPresentationSiklus1Component";

const Siklus1PresentationFLPage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <Breadcrumb />
        <Siklus1PresentationFLComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default Siklus1PresentationFLPage;
