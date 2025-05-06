import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { DetailBudgetComponent } from "../components/DetailBudget";
const DetailBudgetDataByIdPage = () => {
  return (
    <ProtectedRoute allowedRoles={['admin', 'super admin']}>
      <DefaultLayout>
        <Breadcrumb/>
        <DetailBudgetComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default DetailBudgetDataByIdPage;
