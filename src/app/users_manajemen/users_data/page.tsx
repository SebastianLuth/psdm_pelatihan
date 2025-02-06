import UsersDataComponent from "@/components/Layouts/UsersData";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "N4TALENT | Data User",
  description: "Lihat data user RKAP PTPN4 terkini. Informasi lengkap mengenai anggaran karyawan pimpinan, pelatihan, dan pengembangan kompetensi karyawan di PTPN4.",
  keywords: "PTPN4, anggaran RKAP, data anggaran, manajemen keuangan, pelatihan karyawan, pengembangan kompetensi",
}

const UsersDataPage = () => {
  return (
    <ProtectedRoute allowedRoles={["admin", "super admin"]}>
      <DefaultLayout>
        <UsersDataComponent/>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default UsersDataPage;
