import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { ProjectAssigmentComponent } from "../../components/users/PAComponent";
const ProjectAssigmentPage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <Breadcrumb />
        <ProjectAssigmentComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default ProjectAssigmentPage;
