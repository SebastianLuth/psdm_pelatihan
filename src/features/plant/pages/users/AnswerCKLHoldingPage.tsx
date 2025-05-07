import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";
import { AnswerHoldingCKLComponent } from "../../components/users/AnswerCKLHoldingComponent";

const AnswerHoldingCKLPage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <AnswerHoldingCKLComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};

export default AnswerHoldingCKLPage;
