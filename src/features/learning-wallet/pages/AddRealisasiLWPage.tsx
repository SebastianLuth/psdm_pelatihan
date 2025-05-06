import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { AddRealisasiLearningWalletComponent } from "../components/AddRealisasiLWComponent";


const AddRealisasiLearningWalletPage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <Breadcrumb />
        <AddRealisasiLearningWalletComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default AddRealisasiLearningWalletPage;
