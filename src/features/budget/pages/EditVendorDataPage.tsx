import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { UpdateDataVendorComponent } from "../components/UpdateUpdateDataVendorComponent";

const EditDataVendorPage = () => {
  return (
    <>
      <ProtectedRoute allowedRoles={["admin", "super admin"]}>
        <DefaultLayout>
          <Breadcrumb/>
          <UpdateDataVendorComponent />
        </DefaultLayout>
      </ProtectedRoute>
    </>
  );
};

export default EditDataVendorPage;
