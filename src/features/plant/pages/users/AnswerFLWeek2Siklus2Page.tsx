import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { Siklus2Week2FLComponent } from "../../components/users/AnswerFLWeek2Siklus2Component";

const Siklus2Week2FLPage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <Breadcrumb />
        <Siklus2Week2FLComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default Siklus2Week2FLPage;
