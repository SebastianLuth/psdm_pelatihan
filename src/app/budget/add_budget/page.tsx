import FormAddBudget from "@/components/FormElements/FormAddBudget";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "N4TALENT | Tambah Anggaran",
  description: "Tambah Anggaran RKAP",
};

const AddBudgetPage = () => {
  return (
    <>
      <ProtectedRoute allowedRoles={["admin", "super admin"]}>
        <DefaultLayout>
          <FormAddBudget />
        </DefaultLayout>
      </ProtectedRoute>
    </>
  );
};

export default AddBudgetPage;
