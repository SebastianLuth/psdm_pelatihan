import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UpdateDataVendorComponent from "@/features/budget/components/UpdateUpdateDataVendorComponent";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";

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
