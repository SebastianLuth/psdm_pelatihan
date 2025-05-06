import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormDataUser from "@/features/users-manajemen/components/FormAddUserComponent";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";

export const metadata = {
  title: "PALAPA | Tambah User",
  description: "Tambah User RKAP",
  keywords: "PTPN4, anggaran RKAP, detail data anggaran, manajemen keuangan, pelatihan karyawan, pengembangan kompetensi",
}

const AddUserPage = () => {
  return (
    <>
      <ProtectedRoute allowedRoles={["admin", "super admin"]}>
        <DefaultLayout>
          <Breadcrumb />
          <FormDataUser />
        </DefaultLayout>
      </ProtectedRoute>
    </>
  );
};

export default AddUserPage;
