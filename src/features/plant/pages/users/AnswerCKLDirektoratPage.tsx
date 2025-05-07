import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import AnswerDirektoratCKLComponent from "../../components/users/AnswerCKLDirektoratComponent";

const AnswerDirektoratCKLPage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <AnswerDirektoratCKLComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default AnswerDirektoratCKLPage;
