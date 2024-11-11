import FormDataUser from "@/components/FormElements/FormAddUser";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

const AddUserPage = () => {
  return (
    <>
      <ProtectedRoute allowedRoles={["admin"]}>
        <DefaultLayout>
          <FormDataUser />
        </DefaultLayout>
      </ProtectedRoute>
    </>
  );
};

export default AddUserPage;
