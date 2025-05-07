import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { AnswerBintalfisdiCKLComponent } from "../../components/users/AnswerCKLBintalfisdisComponent";

const AnswerBintalfisdiCKLPage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <Breadcrumb />
        <AnswerBintalfisdiCKLComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default AnswerBintalfisdiCKLPage;
