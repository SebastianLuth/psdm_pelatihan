import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { ReviewAnswerCKPComponent } from "../../components/super-admin/ResultAnswerCKPUserComponent";

export const ResultAnswerCKPUserPage = () => {
  return (
    <>
      <ProtectedRoute allowedRoles={["admin", "super admin"]}>
        <DefaultLayout>
          <Breadcrumb />
          <ReviewAnswerCKPComponent />
        </DefaultLayout>
      </ProtectedRoute>
    </>
  );
};

export default ResultAnswerCKPUserPage;
