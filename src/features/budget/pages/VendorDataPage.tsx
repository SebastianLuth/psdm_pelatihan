import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import ProtectedRoute from "@/components/Layouts/ProtectedRoute"
import { TableVendorDataComponent } from "../components/TableVendorDataComponent";

const VendorDataPage = () => {
    return (
        <ProtectedRoute allowedRoles={['admin', 'super admin']} >
            <DefaultLayout>
                <Breadcrumb />
                <TableVendorDataComponent />
            </DefaultLayout>
        </ProtectedRoute>
    )
}

export default VendorDataPage