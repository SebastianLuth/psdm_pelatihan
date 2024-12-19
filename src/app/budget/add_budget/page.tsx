import FormAddBudget from "@/components/FormElements/FormAddBudget";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
    title: "PTPN4 | Tambah Anggaran",
    description: "Tambah Anggaran RKAP",
}

const AddBudgetPage = () => {
    return (
        <>
        <ProtectedRoute allowedRoles={['admin']}>
        <DefaultLayout>
            <FormAddBudget/>
        </DefaultLayout>
        </ProtectedRoute>
        </>
    )
};

export default AddBudgetPage