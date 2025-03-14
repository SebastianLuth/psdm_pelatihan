import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import TableDataUnitKerja from "@/components/Tables/TableDataUnitKerja";

export const metadata = {
  title: "PALAPA | Data Unit Kerja",
  description: "Informasi lengkap tentang Unit Kerja yang telah anda tambahkan di PALAPA PALMCO AFTER LEARNING APPLICATION ",
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

const DataDepartmentPage = () => {
  return (
    <ProtectedRoute allowedRoles={["admin", "super admin"]}>
      <DefaultLayout>
        <TableDataUnitKerja />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default DataDepartmentPage;