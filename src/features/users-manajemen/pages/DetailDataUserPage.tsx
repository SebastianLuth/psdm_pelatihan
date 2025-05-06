import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DetailUserDataComponent from "../components/DetailUserData";

export const metadata = {
  title: "PALAPA | Detail User",
  description: "Detail User ",
  keywords: "PTPN4, anggaran RKAP, detail data anggaran, manajemen keuangan, pelatihan karyawan, pengembangan kompetensi",
}

const DetailUserPage = () => {
  return (
    <ProtectedRoute allowedRoles={["admin", "super admin"]}>
      <DefaultLayout>
        <Breadcrumb/>
        <DetailUserDataComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};
export default DetailUserPage;