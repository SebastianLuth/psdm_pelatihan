import FormAddDataVendorComponent from "@/components/FormElements/FormAddDataVendorComponent"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import ProtectedRoute from "@/components/ProtectedRoute"

const AddVendorPage = () => {
    return (
        <ProtectedRoute allowedRoles={['admin']}>
            <DefaultLayout>
                <FormAddDataVendorComponent/>
            </DefaultLayout>
        </ProtectedRoute>
    )
}

export default AddVendorPage