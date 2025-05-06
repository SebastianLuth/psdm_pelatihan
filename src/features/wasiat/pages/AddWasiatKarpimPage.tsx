import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { FormAddWasiatKarpimComponent } from "../components/FormAddWasiatKarpimComponent";

const FormAddWasiatKarpimPage = () => {
  return (
    <>
      <ProtectedRoute allowedRoles={["admin", "super admin"]}>
        <DefaultLayout>
          <FormAddWasiatKarpimComponent/>
        </DefaultLayout>
      </ProtectedRoute>
    </>
  );
};

export default FormAddWasiatKarpimPage;
