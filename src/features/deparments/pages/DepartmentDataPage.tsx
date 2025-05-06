import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { TableDataUnitKerja } from "../components/TableDataUnitKerja";

const DataDepartmentPage = () => {
  return (
    <ProtectedRoute allowedRoles={["admin", "super admin"]}>
      <DefaultLayout>
        <Breadcrumb/>
        <TableDataUnitKerja />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default DataDepartmentPage;