import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { DataWasiatKarpimComponent } from "../components/TableDataWasiatKarpimComponent";

const DataWasiatKarpimPage = () => {
  return (
    <ProtectedRoute allowedRoles={["admin", "super admin"]}>
      <DefaultLayout>
        <DataWasiatKarpimComponent/>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default DataWasiatKarpimPage;
