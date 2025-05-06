import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { UpdateDepartmentDataIdComponent } from "../components/UpdateDepartmentDataIdComponent";

const UpdateDepartmentPageById = () => {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DefaultLayout>
        <Breadcrumb />
        <UpdateDepartmentDataIdComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
}

export default UpdateDepartmentPageById
