import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { FormEditWasiatKarpimComponent } from "../components/FormEditWasiatKarpimComponent";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
const FormEditWasiatKarpimPage = () => {
  return (
    <>
      <ProtectedRoute allowedRoles={["admin", "super admin"]}>
        <DefaultLayout>
          <Breadcrumb/>
          <FormEditWasiatKarpimComponent/>
        </DefaultLayout>
      </ProtectedRoute>
    </>
  );
};

export default FormEditWasiatKarpimPage;