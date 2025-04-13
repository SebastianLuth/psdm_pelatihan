import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UpdateDataVendorComponent from "@/components/Layouts/Detail/UpdateUpdateDataVendorComponent";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "PALAPA | Detail Data Vendor",
  description: "Informasi lengkap tentang Data Vendor yang telah anda tambahkan di PALAPA PALMCO AFTER LEARNING APPLICATION ",
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
const UpdateDataVendorPage = () => {
  return (
    <>
      <ProtectedRoute allowedRoles={["admin", "super admin"]}>
        <DefaultLayout>
          <Breadcrumb/>
          <UpdateDataVendorComponent />
        </DefaultLayout>
      </ProtectedRoute>
    </>
  );
};

export default UpdateDataVendorPage;
