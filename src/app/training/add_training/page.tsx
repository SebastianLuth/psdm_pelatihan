import FormAddTraining from "@/components/FormElements/FormAddTraining"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import ProtectedRoute from "@/components/ProtectedRoute"

const AddTrainingPage = () => {
    return (
        <ProtectedRoute>
        <DefaultLayout>
            <FormAddTraining/>
        </DefaultLayout>
        </ProtectedRoute>
    )
}
export default AddTrainingPage