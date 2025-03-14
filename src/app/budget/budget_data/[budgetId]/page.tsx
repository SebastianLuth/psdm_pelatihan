import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import DetailBudgetComponent from "@/components/Layouts/Detail/DetailBudget";

export const metadata = {
  title: "PALAPA | Detail Data RKAP Anggaran",
  description: "Informasi lengkap tentang RKAP Anggaran yang telah anda tambahkan di PALAPA PALMCO AFTER LEARNING APPLICATION ",
  keywords: [
    "PALAPA DATA RKAP Anggaran",
    "PALMCO After Learning Application",
    "RKAP pelatihan PALMCO",
    "aplikasi pembelajaran karyawan",
    "evaluasi PALMCO",
    "sistem pelatihan PALMCO",
    "Informasi lengkap anggaran"
  ],
  author : "PTPN 4 PALMCO",
  robots: "index, follow",
};

const BudgetDataId = () => {
  return (
    <ProtectedRoute allowedRoles={['admin', 'super admin']}>
      <DefaultLayout>
        <DetailBudgetComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default BudgetDataId;
