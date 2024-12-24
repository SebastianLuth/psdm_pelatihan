import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import DetailBudgetComponent from "@/components/Layouts/Detail/DetailBudget";

export const metadata = {
  title: "N4TALENT | Detail Anggaran",
  description : "Detail Anggaran RKAP PTPN4 terkini. Informasi lengkap mengenai anggaran karyawan pimpinan, pelatihan, dan pengembangan kompetensi karyawan di PTPN4.",
  keywords: "PTPN4, anggaran RKAP, detail data anggaran, manajemen keuangan, pelatihan karyawan, pengembangan kompetensi",
}

const BudgetDataId = () => {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <DefaultLayout>
        <DetailBudgetComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default BudgetDataId;
