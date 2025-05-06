import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { FormAddBudget } from "../components/FormAddBudget";
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
