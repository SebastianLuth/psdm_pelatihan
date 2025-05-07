import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { AnswerKepemimpinanCKLComponent } from "../../components/users/AnswerCKLKepemimpinanComponent";

const AnswerKepemimpinanCKLPage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <Breadcrumb />
        <AnswerKepemimpinanCKLComponent/>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default AnswerKepemimpinanCKLPage;
