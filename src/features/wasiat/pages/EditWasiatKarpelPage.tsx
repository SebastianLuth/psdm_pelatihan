import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { FormEditWasiatKarpelComponent } from "../components/FormEditWasiatKarpelComponent";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
const FormEditWasiatKarpelPage = () => {

  return (
    <>
      <ProtectedRoute allowedRoles={["admin", "super admin"]}>
        <DefaultLayout>
          <Breadcrumb/>
         <FormEditWasiatKarpelComponent/>
        </DefaultLayout>
      </ProtectedRoute>
    </>
  );
};

export default FormEditWasiatKarpelPage;