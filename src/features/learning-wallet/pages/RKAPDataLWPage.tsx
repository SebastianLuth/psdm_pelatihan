import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { RKAPLearningWalletDataComponent } from "../components/RKAPDataLWComponent";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const RKAPLearningWalletDataPage = () => {
  return (
    <ProtectedRoute allowedRoles={["super admin", "admin"]}>
      <DefaultLayout>
        <Breadcrumb />
        <RKAPLearningWalletDataComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default RKAPLearningWalletDataPage;
