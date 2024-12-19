import AddDepartmentComponent from "@/components/Layouts/AddDepartmentComponent";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "N4TALENT | Tambah Unit Kerja",
  description: "Tambah Unit Kerja RKAP",
  keywords: "PTPN4, anggaran RKAP, detail data anggaran, manajemen keuangan, pelatihan karyawan, pengembangan kompetensi",
}

const AddDepartmentPage = () => {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DefaultLayout>
        <AddDepartmentComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default AddDepartmentPage;
