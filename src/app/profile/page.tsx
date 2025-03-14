import UserDetailComponent from "@/components/Layouts/Detail/DetailUserData";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "PALAPA | Detail User",
  description: "Informasi lengkap tentang Profile User di PALAPA PALMCO AFTER LEARNING APPLICATION ",
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