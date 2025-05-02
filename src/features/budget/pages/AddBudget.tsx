import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormAddBudget from "@/features/budget/components/FormAddBudget";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
const AddBudgetPage = () => {
  return (
    <>
      <ProtectedRoute allowedRoles={["admin", "super admin"]}>
        <DefaultLayout>
          <Breadcrumb/>
          <FormAddBudget />
        </DefaultLayout>
      </ProtectedRoute>
    </>
  );
};

export default AddBudgetPage;
