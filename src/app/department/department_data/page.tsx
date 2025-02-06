import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import TableDataUnitKerja from "@/components/Tables/TableDataUnitKerja";

export const metadata = {
  title: "N4TALENT | Data Unit Kerja",
  description: "Lihat data unit kerja RKAP PTPN4 terkini. Informasi lengkap mengenai anggaran karyawan pimpinan, pelatihan, dan pengembangan kompetensi karyawan di PTPN4.",
  keywords: "PTPN4, anggaran RKAP, data anggaran, manajemen keuangan, pelatihan karyawan, pengembangan kompetensi",
}

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