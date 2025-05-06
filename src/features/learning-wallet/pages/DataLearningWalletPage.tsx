import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { RealisasiDataLearningWalletComponent } from "../components/DataLearningWalletComponents";

const DataLearningWalletPage = () => {
  return (
    <>
      <ProtectedRoute>
        <DefaultLayout>
          <RealisasiDataLearningWalletComponent/>
        </DefaultLayout>
      </ProtectedRoute>
    </>
  );
};

export default DataLearningWalletPage;
