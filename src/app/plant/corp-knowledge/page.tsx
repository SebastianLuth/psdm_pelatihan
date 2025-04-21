import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute"

const CORPKnowledgePage = () => {
    return (
        <ProtectedRoute>
            <DefaultLayout>
            <div>
                <h1>Corp Knowledge</h1>
            </div>
            </DefaultLayout>
        </ProtectedRoute>
        
    );
}

export default CORPKnowledgePage