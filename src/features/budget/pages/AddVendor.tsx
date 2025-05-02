import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormAddDataVendorComponent from "@/features/budget/components/FormAddDataVendorComponent"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import ProtectedRoute from "@/components/Layouts/ProtectedRoute"

const AddVendorPage = () => {
    return (
        <ProtectedRoute allowedRoles={['admin', 'super admin']}>
            <DefaultLayout>
                <Breadcrumb/>
                <FormAddDataVendorComponent/>
            </DefaultLayout>
        </ProtectedRoute>
    )
}

export default AddVendorPage