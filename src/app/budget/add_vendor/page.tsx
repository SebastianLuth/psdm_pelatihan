import FormAddDataVendorComponent from "@/components/FormElements/FormAddDataVendorComponent"
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import ProtectedRoute from "@/components/ProtectedRoute"

export const metadata = {
    title: "N4TALENT | Tambah Vendor",
    description: "Tambah Vendor untuk sebuah lembaga",
};
  

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