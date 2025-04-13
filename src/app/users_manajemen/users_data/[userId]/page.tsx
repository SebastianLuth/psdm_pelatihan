import UserDetailComponent from "@/components/Layouts/Detail/DetailUserData";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata = {
  title: "PALAPA | Detail User",
  description: "Detail User ",
  keywords: "PTPN4, anggaran RKAP, detail data anggaran, manajemen keuangan, pelatihan karyawan, pengembangan kompetensi",
}

const UserDetailPage = () => {
  return (
    <ProtectedRoute allowedRoles={["admin", "super admin"]}>
      <DefaultLayout>
        <Breadcrumb/>
        <UserDetailComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};
export default UserDetailPage;