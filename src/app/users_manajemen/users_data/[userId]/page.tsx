import UserDetailComponent from "@/components/Layouts/Detail/DetailUserData";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

const UserDetailPage = () => {
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <UserDetailComponent />
      </DefaultLayout>
    </ProtectedRoute>
  );
};
export default UserDetailPage;