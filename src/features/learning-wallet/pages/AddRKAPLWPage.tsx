import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { AddRKAPLearningWalletComponent } from "../components/AddRKAPLWComponent";

const AddRKAPLearningWalletPage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <Breadcrumb />
        <AddRKAPLearningWalletComponent/>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default AddRKAPLearningWalletPage;
