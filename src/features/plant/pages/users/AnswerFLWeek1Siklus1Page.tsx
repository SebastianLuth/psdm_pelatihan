import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { Siklus1Week1FLComponent } from "../../components/users/AnswerFLWeek1Siklus1Component";

const Siklus1Week1FLPage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <Breadcrumb />
        <Siklus1Week1FLComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default Siklus1Week1FLPage;
