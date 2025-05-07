import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { Siklus2Week3FLComponent } from "../../components/users/AnswerFLWeek3Siklus2Component";

const Siklus2Week3FLPage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <Breadcrumb />
        <Siklus2Week3FLComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default Siklus2Week3FLPage;
