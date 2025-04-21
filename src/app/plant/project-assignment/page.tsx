import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

const ProjectAssigmentPage = () => {
    return (
        <ProtectedRoute>
            <DefaultLayout>
            <div>
                <h1>Project Assigment</h1>
            </div>
            </DefaultLayout>
        </ProtectedRoute>
        
    );
}

export default ProjectAssigmentPage