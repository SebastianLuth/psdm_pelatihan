import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UpdateDataVendorComponent from "@/components/Layouts/Detail/UpdateUpdateDataVendorComponent";
import ProtectedRoute from "@/components/ProtectedRoute";

const UpdateDataVendorPage = () => {
  return (
    <>
      <ProtectedRoute allowedRoles={["admin"]}>
        <DefaultLayout>
          <UpdateDataVendorComponent />
        </DefaultLayout>
      </ProtectedRoute>
    </>
  );
};

export default UpdateDataVendorPage;
