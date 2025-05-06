import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { DataWasiatKarpelComponent } from "../components/TableDataWasiatKarpelComponent";

const DataWasiatKarpelPage = () => {
  return (
    <ProtectedRoute allowedRoles={["admin", "super admin"]}>
      <DefaultLayout>
        <Breadcrumb />
        <DataWasiatKarpelComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default DataWasiatKarpelPage;
