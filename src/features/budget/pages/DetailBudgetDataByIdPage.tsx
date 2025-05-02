import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import DetailBudgetComponent from "@/features/budget/components/DetailBudget";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
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
