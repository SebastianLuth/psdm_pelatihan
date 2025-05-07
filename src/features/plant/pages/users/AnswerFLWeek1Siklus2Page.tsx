import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { Siklus2Week1FLComponent } from "../../components/users/AnswerFLWeek1Siklus2Component";

const Siklus2Week1FLPage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <Breadcrumb />
        <Siklus2Week1FLComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default Siklus2Week1FLPage;
