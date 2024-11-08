import FormAddBudget from "@/components/FormElements/FormAddBudget";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

const AddBudgetPage = () => {
    return (
        <>
        <ProtectedRoute>
        <DefaultLayout>
            <FormAddBudget/>
        </DefaultLayout>
        </ProtectedRoute>
        </>
    )
};

export default AddBudgetPage