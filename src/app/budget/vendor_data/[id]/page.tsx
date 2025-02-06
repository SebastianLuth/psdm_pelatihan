import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UpdateDataVendorComponent from "@/components/Layouts/Detail/UpdateUpdateDataVendorComponent";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "PTPN4 | Update Vendor",
  description: "Update Data Vendor yang telah ditambahkan",
};

const UpdateDataVendorPage = () => {
  return (
    <>
      <ProtectedRoute allowedRoles={["admin", "super admin"]}>
        <DefaultLayout>
          <UpdateDataVendorComponent />
        </DefaultLayout>
      </ProtectedRoute>
    </>
  );
};

export default UpdateDataVendorPage;
