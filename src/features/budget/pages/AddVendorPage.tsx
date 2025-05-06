import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import ProtectedRoute from "@/components/Layouts/ProtectedRoute"
import { FormAddDataVendorComponent } from "../components/FormAddDataVendorComponent";

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