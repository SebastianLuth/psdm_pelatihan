import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { AnswerDireksiCKLComponent } from "../../components/users/AnswerCKLDireksiComponent";

const AnswerDireksiCKLPage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <Breadcrumb/>
        <AnswerDireksiCKLComponent/>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default AnswerDireksiCKLPage;
