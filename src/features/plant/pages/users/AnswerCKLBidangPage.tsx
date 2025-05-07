import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { AnswerBidangCKLComponent } from "../../components/users/AnswerCKLBidangComponent";

const AnswerBidangCKLPage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <Breadcrumb/>
        <AnswerBidangCKLComponent/>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default AnswerBidangCKLPage;
