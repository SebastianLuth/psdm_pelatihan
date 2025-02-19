import UserDetailComponent from "@/components/Layouts/Detail/DetailUserData";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "N4TALENT | Detail User",
  description: "Profile User ",
  keywords: "PTPN4, anggaran RKAP, detail data anggaran, manajemen keuangan, pelatihan karyawan, pengembangan kompetensi",
}

const UserDetailPage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <UserDetailComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};
export default UserDetailPage;