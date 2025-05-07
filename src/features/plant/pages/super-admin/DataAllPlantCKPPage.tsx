"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { TableDataProgressCKPComponent } from "../../components/super-admin/TableDataProgressCKPComponent";

const DataPlantPage = () => {
  return (
    <ProtectedRoute allowedRoles={["admin", "super admin"]}>
      <DefaultLayout>
        <Breadcrumb />
        <TableDataProgressCKPComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default DataPlantPage;
