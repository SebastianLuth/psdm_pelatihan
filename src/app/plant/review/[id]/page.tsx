import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/Layouts/ProtectedRoute";

const reviewPage = () => {
  return (
    <>
      <ProtectedRoute allowedRoles={["admin", "super admin"]}>
        <DefaultLayout>
          <div>Review Page</div>
        </DefaultLayout>
      </ProtectedRoute>
    </>
  );
};

export default reviewPage;
