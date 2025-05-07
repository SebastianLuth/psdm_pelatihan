import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { Siklus1Week3FLComponent } from "../../components/users/AnswerFLWeek3Siklus1Component";

const Siklus1Week3FLPage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <Breadcrumb />
        <Siklus1Week3FLComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default Siklus1Week3FLPage;
