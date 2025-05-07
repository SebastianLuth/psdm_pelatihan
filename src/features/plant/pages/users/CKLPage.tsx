import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";

import { CKLProgressComponent } from "../../components/users/CKLProgressComponent";

const CORPKnowledgePage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <CKLProgressComponent/>
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default CORPKnowledgePage;
