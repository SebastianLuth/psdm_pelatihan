import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

const JobOrientationPage = () => {
    return (
        <ProtectedRoute>
            <DefaultLayout>
            <div>
                <h1>Field Learning</h1>
            </div>
            </DefaultLayout>
        </ProtectedRoute>
       
    );
}

export default JobOrientationPage