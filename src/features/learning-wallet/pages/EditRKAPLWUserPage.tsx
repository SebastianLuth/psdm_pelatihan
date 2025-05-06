import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { EditRKAPLWUserComponent } from "../components/EditRKAPLWUserComponent";
const EditRKAPLWUser = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <Breadcrumb />
        <EditRKAPLWUserComponent/>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default EditRKAPLWUser;
