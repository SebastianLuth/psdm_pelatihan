import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { Siklus2Week4FLComponent } from "../../components/users/AnswerFLWeek4Siklus2Component";

const Siklus2Week4FLPage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <Breadcrumb />
        <Siklus2Week4FLComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default Siklus2Week4FLPage;
