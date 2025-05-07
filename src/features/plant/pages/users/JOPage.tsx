import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { JobOrientationComponent } from "../../components/users/JOComponent";

const JobOrientationPage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <Breadcrumb />
        <JobOrientationComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default JobOrientationPage;
