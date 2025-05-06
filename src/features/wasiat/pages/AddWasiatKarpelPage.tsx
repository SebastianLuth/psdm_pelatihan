import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { FormAddWasiatKarpelComponent } from "../components/FormAddWasiatKarpelComponent";

const FormAddWasiatKarpelPage = () => {
  return (
    <>
      <ProtectedRoute allowedRoles={["admin", "super admin"]}>
        <DefaultLayout>
          <Breadcrumb />
          <FormAddWasiatKarpelComponent />
        </DefaultLayout>
      </ProtectedRoute>
    </>
  );
};

export default FormAddWasiatKarpelPage;
