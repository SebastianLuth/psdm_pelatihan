import UsersDataComponent from "@/features/users-manajemen/components/UsersDataComponent";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata = {
  title: "PALAPA | Data User",
  description: "Lihat data user RKAP PTPN4 terkini. Informasi lengkap mengenai anggaran karyawan pimpinan, pelatihan, dan pengembangan kompetensi karyawan di PTPN4.",
  keywords: "PTPN4, anggaran RKAP, data anggaran, manajemen keuangan, pelatihan karyawan, pengembangan kompetensi",
}

const DataUsersPage = () => {
  return (
    <ProtectedRoute allowedRoles={["admin", "super admin"]}>
      <DefaultLayout>
        <Breadcrumb/>
        <UsersDataComponent/>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default DataUsersPage;
