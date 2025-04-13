import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout"
import ProtectedRoute from "@/components/ProtectedRoute"
import TableVendorDataComponent from "@/components/Tables/TableVendorDataComponent"

export const metadata = {
    title: "PALAPA |  Data Vendor",
    description: "Informasi lengkap tentang Data Vendor yang telah anda tambahkan di PALAPA PALMCO AFTER LEARNING APPLICATION ",
    keywords: [
      "PALAPA DATA RKAP Anggaran",
      "PALMCO After Learning Application",
      "RKAP pelatihan PALMCO",
      "aplikasi pembelajaran karyawan",
      "evaluasi PALMCO",
      "sistem pelatihan PALMCO",
      "Informasi lengkap anggaran"
    ],
    author : "PTPN 4 PALMCO",
    robots: "index, follow",
  };

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