import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

const FieldLearningPage = () => {
    return (
        <ProtectedRoute>
            <DefaultLayout>
            <div>
                <h1>Field Learning</h1>
            </div>
            </DefaultLayout>
=        </ProtectedRoute>
       
    );
}

export default FieldLearningPage