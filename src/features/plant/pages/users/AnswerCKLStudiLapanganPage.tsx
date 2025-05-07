import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { StudiLapanganCKLComponent } from "../../components/users/AnswerCKLStudiLapanganComponent";

const StudiLapanganCKLPage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <Breadcrumb />
        <StudiLapanganCKLComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default StudiLapanganCKLPage;
