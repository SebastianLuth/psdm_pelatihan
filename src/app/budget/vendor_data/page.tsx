import DefaultLayout from "@/components/Layouts/DefaultLayout"
import ProtectedRoute from "@/components/ProtectedRoute"
import TableVendorDataComponent from "@/components/Tables/TableVendorDataComponent"

export const metadata = {
    title: "PTPN4 | Data Vendor",
    description: "Semua Data Vendor yang telah ditambahkan",
};

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