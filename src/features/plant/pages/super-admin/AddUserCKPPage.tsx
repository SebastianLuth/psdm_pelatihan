import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { FormAddUserCKPComponent } from "../../components/super-admin/FormDataUserComponent";
const AddUserCKPPage = () => {
  return (
    <ProtectedRoute allowedRoles={["super admin"]}>
      <DefaultLayout>
        <Breadcrumb />
        <FormAddUserCKPComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default AddUserCKPPage;
