import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { Siklus1Week4FLComponent } from "../../components/users/AnswerFLWeek4Siklus1Component";

const Siklus1Week4FLPage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <Breadcrumb />
        <Siklus1Week4FLComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default Siklus1Week4FLPage;
