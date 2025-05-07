import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { DataWasiatKarpelComponent } from "../components/TableDataWasiatKarpelComponent";

const DataWasiatKarpelForUserPage = () => {
  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <DefaultLayout>
        <Breadcrumb />
        <DataWasiatKarpelComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default DataWasiatKarpelForUserPage;
