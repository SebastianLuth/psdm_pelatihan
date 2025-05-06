import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { AddDepartmentComponent } from "../components/AddDepartmentComponent";

const AddDepartmentPage = () => {
  return (
    <ProtectedRoute allowedRoles={["admin", "super admin"]}>
      <DefaultLayout>
        <Breadcrumb/>
        <AddDepartmentComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default AddDepartmentPage;
