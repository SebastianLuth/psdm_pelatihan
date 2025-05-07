import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { Siklus1Week2FLComponent } from "../../components/users/AnswerFLWeek2Siklus1Component";

const Siklus1Week2FLPage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <Breadcrumb />
        <Siklus1Week2FLComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default Siklus1Week2FLPage;
