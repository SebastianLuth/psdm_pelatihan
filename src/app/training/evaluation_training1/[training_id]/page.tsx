import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function EvaluasiTraining1Page() {
    return (
        <ProtectedRoute>
            <DefaultLayout>
            <div>evaluasi training 1</div>;
            </DefaultLayout>
        </ProtectedRoute>
    )
}   