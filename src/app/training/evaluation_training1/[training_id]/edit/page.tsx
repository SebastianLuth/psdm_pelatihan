import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function EditEvaluasiTraining1Page() {
    return (
        <ProtectedRoute>
            <DefaultLayout>
            <div>edit evaluasi training 1</div>
            </DefaultLayout>
        </ProtectedRoute>
    )
}
