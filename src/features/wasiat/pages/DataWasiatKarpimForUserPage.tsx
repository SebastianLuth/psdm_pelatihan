import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { DataWasiatKarpimComponent } from "../components/TableDataWasiatKarpimComponent";

const DataWasiatKarpimForUserPage = () => {
  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <DefaultLayout>
        <DataWasiatKarpimComponent/>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default DataWasiatKarpimForUserPage;
