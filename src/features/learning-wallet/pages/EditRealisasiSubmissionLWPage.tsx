import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { EditRealisasiSubmissionLwUserComponent } from "../components/EditRealisasiSubmissionLWComponent";

const EditRealisasiSubmissionLwUser = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <Breadcrumb />
        <EditRealisasiSubmissionLwUserComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default EditRealisasiSubmissionLwUser;
