import AddDepartmentComponent from "@/components/Layouts/AddDepartmentComponent";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "PALAPA | Tambah Unit Kerja",
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

const AddDepartmentPage = () => {
  return (
    <ProtectedRoute allowedRoles={["admin", "super admin"]}>
      <DefaultLayout>
        <AddDepartmentComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default AddDepartmentPage;
