import DefaultLayout from "@/components/Layouts/DefaultLayout"
import ProtectedRoute from "@/components/ProtectedRoute"
import TableVendorDataComponent from "@/components/Tables/TableVendorDataComponent"

const VendorDataPage = () => {
    return (
        <ProtectedRoute allowedRoles={['admin']} >
            <DefaultLayout>
                <TableVendorDataComponent />
            </DefaultLayout>
        </ProtectedRoute>
    )
}

export default VendorDataPage